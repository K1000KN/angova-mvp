import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";
import Role from "../models/Role.js";
import jwt from "jsonwebtoken";

dotenv.config();

const adminSecretKey = process.env.SALT_KEY;


/// fonction pour creer l'admin
export const createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(409).send({ message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const adminRole = await Role.findOne({ name: "admin" });

    if (!adminRole) {
      return res.status(500).send({ message: "Admin role not found" });
    }
    const admin = new User({
      username,
      email,
      password: hashedPassword,
      roles: [adminRole._id],
    });
    await admin.save();
    res.status(201).send(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to register admin" });
  }
};

/// fonction pour creer le manager
export const createManager = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, adminSecretKey);
    let adminId = decoded.id;

    const { username, email, password } = req.body;
    const managerRole = await Role.findOne({ name: "manager" });
    const existingManager = await User.findOne({ email });
    if (existingManager) {
      return res.status(409).send({ message: "Manager already exists" });
    }

    if (!managerRole) {
      return res.status(500).send({ message: "Manager role not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newManager = new User({
      username,
      email,
      password: hashedPassword,
      roles: [managerRole._id],
      admin: adminId,
    });
    await newManager.save();
    res.status(201).send(newManager);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to register admin" });
  }
};

//fonction pour récupérer un admin
export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("roles", "name");
    user.password = undefined;

    if (!user) {
      return res.status(404).send({ message: "Admin not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to retrieve admin" });
  }
};


///fonction to create user
export const createUserFromAdmin = async (req, res) => {
  try {
    const { username, email, password, managerId } = req.body;
    const userRole = await Role.findOne({ name: "user" });

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

export const testApi = async (req, res) => {
  res.status(200).send({ message: "API is working" });
}