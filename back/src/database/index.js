import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const EMAIL_ADMIN = process.env.EMAIL_ADMIN;
const PASS_ADMIN = process.env.PASS_ADMIN;
const USERNAME_ADMIN = process.env.USERNAME_ADMIN;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(async () => {
    console.log("Connected to MongoDB");
    await initializeDatabase();
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit();
  });
async function initializeDatabase() {
  try {
    // Create admin role if it does not exist
    const adminRole = await Role.findOne({ name: "admin" });
    if (!adminRole) {
      await new Role({ name: "admin" }).save();
      console.log("Admin role created");
    }
    const hashedPassword = await bcrypt.hash(PASS_ADMIN, 10);

    // Create admin user if it does not exist
    const adminUser = await User.findOne({ email: "admin@example.com" });
    if (!adminUser) {
      const newUser = new User({
        username: USERNAME_ADMIN,
        email: EMAIL_ADMIN,
        password: hashedPassword,
        roles: [adminRole._id],
      });
      await newUser.save();
      console.log("Admin user created");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

export { Role, User };
