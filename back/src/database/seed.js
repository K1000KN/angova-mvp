import bcrypt from "bcrypt";
import Role from "../models/Role.js";
import User from "../models/User.js";

// Define user roles
const roles = [{ name: "admin" }, { name: "manager" }, { name: "user" }];
const adminPassword = process.env.PASS_ADMIN;
const emailAdminPassword = process.env.EMAIL_ADMIN;

// Create a role if it doesn't exist
const createRole = async (roleName) => {
  const existingRole = await Role.findOne({ name: roleName });
  if (!existingRole) {
    await Role.create({ name: roleName });
    console.log(`Created role: ${roleName}`);
  }
};

// Create a user if it doesn't exist
const createUser = async (username, email, password, roleName) => {
  const userRole = await Role.findOne({ name: roleName });
  if (!userRole) {
    await createRole(roleName);
  }

  const userExists = await User.findOne({ email });
  if (!userExists) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      roles: [userRole._id],
    });

    await newUser.save();
  }
};

// Function to seed the database
const seedDatabase = async () => {
  await roles.forEach((role) => createRole(role.name));
  await createUser("Admin", emailAdminPassword, adminPassword, "admin");
  await createUser("Manager", "manager@manager.com", adminPassword, "manager");
  await createUser("User", "user@user.com", adminPassword, "user");
};

export default seedDatabase;
