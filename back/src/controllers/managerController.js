import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";
import Role from "../models/Role.js";
import jwt from "jsonwebtoken";
import stripe from "stripe";
dotenv.config();

const adminSecretKey = process.env.SALT_KEY;

const stripeInstance = new stripe(
  "sk_test_51NRF6LBHkhDIYYSv8MovkjYod1A4Q8rTUF9r51cVuivtz2UzCXBWCBOtYutiNK2chlavX04uxCsyXpo2OsmWHLP600cy1ZXdM3"
);
///fonction to create user

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userRole = await Role.findOne({ name: "user" });
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, adminSecretKey);

    let managerId = decoded.id;

    const manager = await User.findById(managerId);
    if (!userRole) {
      return res.status(500).send({ message: "Role not found" });
    }

    const assignedRoles = [];

    if (!manager) {
      return res.status(500).send({ message: "Manager not found" });
    }
    assignedRoles.push(userRole);

    if (assignedRoles.length === 0) {
      return res
        .status(500)
        .send({ message: "At least one valid role is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      roles: assignedRoles.map((role) => role._id),
      manager: managerId,
    });

    await newUser.save();

    const userWithRoles = await User.findById(newUser._id).populate(
      "roles",
      "name"
    );

    res.status(201).send(userWithRoles);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to create user" });
  }
};
export const deleteManager = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "Manager not found" });
    }
    res.status(200).send({ message: "Manager deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to delete manager" });
  }
};

export const updateManager = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body; // Les données mises à jour envoyées depuis le frontend

    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!user) {
      return res.status(404).send({ message: "Manager not found" });
    }

    res.status(200).send({ message: "Manager updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to update manager" });
  }
};

export const resetPasswordManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "Manager not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
 
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ message: "Password updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to update password" });
  }
};

// function to get manager by id
export const getManagerById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("roles", "name");
    user.password = undefined;
    if (!user) {
      return res.status(404).send({ message: "Manager not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to retrieve manager" });
  }
};
