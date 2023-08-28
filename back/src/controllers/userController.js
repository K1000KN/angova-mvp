import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";
import Role from "../models/Role.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

dotenv.config();

const adminSecretKey = process.env.SALT_KEY;



export const createUser = async (req, res) => {
  try {
    const { username, email, password, managerId, roles, adminId } = req.body;
    const managerRole = await Role.findOne({ name: "manager" });
    const userRole = await Role.findOne({ name: "user" });
    const adminRole = await Role.findOne({ name: "admin" });
    if (!managerRole || !adminRole) {
      return res.status(500).send({ message: "Role not found" });
    }

    const assignedRoles = [];
    const manager = await User.findById(managerId);
    const adminUser = await User.findById(adminId);

    if (roles.indexOf("manager") > -1) {
      if (!adminRole) {
        return res.status(500).send({ message: "Admin role not found" });
      }
      assignedRoles.push(managerRole);
    }
    if (roles.indexOf("user") > -1) {
      if (!managerId) {
        return res.status(500).send({ message: "Manager not found" });
      }
      assignedRoles.push(userRole);
    }
    if (assignedRoles.length === 0) {
      return res
        .status(500)
        .send({ message: "At least one valid role is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      roles: assignedRoles.map((role) => role._id),
      manager: manager ? manager._id : null,
      admin: adminUser ? adminUser._id : null,
    });

    await user.save();

    const userWithRoles = await User.findById(user._id).populate(
      "roles",
      "name"
    );

    res.status(201).send(userWithRoles);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to create user" });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, managerId, roles, adminId } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const managerRole = await Role.findOne({ name: "manager" });
    const userRole = await Role.findOne({ name: "user" });
    if (!managerRole || !userRole) {
      return res.status(500).send({ message: "Role not found" });
    }

    const assignedRoles = [];
    const manager = await User.findById(managerId);
    const adminUser = await User.findById(adminId);

    if (roles.indexOf("manager") > -1) {
      assignedRoles.push(managerRole);
    }
    if (roles.indexOf("user") > -1) {
      if (!managerId) {
        return res.status(500).send({ message: "Manager not found" });
      }
      assignedRoles.push(userRole);
    }
    if (assignedRoles.length === 0) {
      return res
        .status(500)
        .send({ message: "At least one valid role is required" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.roles = assignedRoles.map((role) => role._id);
    user.manager = manager ? manager._id : null;
    user.admin = adminUser ? adminUser._id : null;

    await user.save();

    const userWithRoles = await User.findById(user._id).populate(
      "roles",
      "name"
    );

    res.status(200).send(userWithRoles);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to update user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("roles", "name");
   
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to retrieve users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("roles", "name");
    user.password = undefined;
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to retrieve user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to delete user" });
  }
};

function generateRandomCode(length) {
  const codeLength = length || 6; // Default code length is 6 digits
  let code = "";

  for (let i = 0; i < codeLength; i++) {
    const randomDigit = Math.floor(Math.random() * 10); // Generate random digit (0-9)
    code += randomDigit.toString();
  }

  return code;
}

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const code = generateRandomCode(6);

    // Store the code in the user object or any other desired location
    user.resetCode = code;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailSender,
        pass: emailPassword,
      },
    });

    const mailOptions = {
      from: emailSender,
      to: user.email,
      subject: "Password Reset",
      text: `Your password reset code is: ${code}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({ message: "Password reset code sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to send password reset code" });
  }
};

export const verifyResetPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Verify the code against the stored code
    if (code !== user.resetCode) {
      return res.status(400).send({ message: "Invalid verification code" });
    }

    // Update the user's password
    user.password = password;
    await user.save();

    res.status(200).send({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to verify password reset" });
  }
};




/// refresh user token
export const refreshUserToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Verify the refresh token
    jwt.verify(refreshToken, adminSecretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Invalid refresh token" });
      }

      // Find the user by ID
      User.findById(decoded.id, (err, user) => {
        if (err) {
          console.error(err);
          return res.status(500).send({ message: "Failed to find user" });
        }

        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }

        // Generate a new access token
        const token = jwt.sign({ id: user._id, role: "user" }, userSecretKey, {
          expiresIn: "3h",
        });

        res.status(200).send({ auth: true, token });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to refresh token" });
  }
};

