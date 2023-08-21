import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from "../models/Role.js";
import User from "../models/User.js";

dotenv.config();

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    initial();
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    console.log("roles", count);
    if (!err && count === 0) {
      const roles = ["user", "manager", "admin"];

      roles.forEach((role) => {
        new Role({ name: role }).save((error) => {
          if (error) {
            console.error("Error creating role: ", error);
          }
          console.log(`Added ${role} to roles collection`);
        });
      });
    }
  });
}

export { Role, User };
