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
    const roles = ["admin", "manager", "user"];
    const users = [
      {
        email: EMAIL_ADMIN,
        username: USERNAME_ADMIN,
        password: PASS_ADMIN,
        roles: ["admin"],
      },
      {
        email: "manager@manager.com",
        username: "Angova manager",
        password: PASS_ADMIN,
        roles: ["manager"],
      },
      {
        email: "user@user.com",
        username: "Angova user",
        password: PASS_ADMIN,
        roles: ["user"],
        managerEmail: "manager@manager.com",
      },
    ];

    // Create roles if they do not exist
    const rolePromises = roles.map(async (role) => {
      const existingRole = await Role.findOne({ name: role });
      if (!existingRole) {
        await new Role({ name: role }).save();
      }
    });
    await Promise.all(rolePromises);

    // Create users if they do not exist
    const userPromises = users.map(async (user) => {
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const roles = await Role.find({ name: { $in: user.roles } });
        const newUser = new User({
          email: user.email,
          username: user.username,
          password: hashedPassword,
          roles: roles.map((role) => role._id),
        });
        if (user.managerEmail) {
          const manager = await User.findOne({ email: user.managerEmail });
          if (manager) {
            newUser.manager = manager._id;
          } else {
            console.log(
              `Could not find manager with email ${user.managerEmail}`
            );
          }
        }
        await newUser.save();
        console.log(`${user.username} initialized`);
      }
    });
    await Promise.all(userPromises);
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

export { Role, User };
