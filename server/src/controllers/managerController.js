import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";
import Role from "../models/Role.js";
import jwt from "jsonwebtoken";
dotenv.config();

const adminSecretKey = process.env.SALT_KEY;

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

    if (!managerId) {
      return res.status(500).send({ message: "Manager not found" });
    }
    assignedRoles.push(userRole);

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
      manager: manager._id,
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
