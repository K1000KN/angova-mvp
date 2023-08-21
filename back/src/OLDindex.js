import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const PORT = 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const adminSecretKey = process.env.SALT_KEY;
// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    initial();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit();
  });

// Create Mongoose models
const { Schema } = mongoose;

const RoleSchema = new Schema({
  name: String,
});

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  manager: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", UserSchema);
const Role = mongoose.model("Role", RoleSchema);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "manager",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'manager' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// Middleware to validate admin token
const validateAdminToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).send({ message: "No token provided" });
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, adminSecretKey);

    // Add additional checks here if necessary, such as verifying user role or permissions
    req.userRole = decoded.role;

    next();
  } catch (err) {
    console.log(err);
    res.status(403).send({ message: "Invalid token" });
  }
};

// Admin registration route
app.post("/api/admin/create", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // const existingAdmin = await Admin.findOne({ email });
    // if (existingAdmin) {
    //   return res.status(409).send({ message: "Admin already exists" });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Find the admin role
    const adminRole = await Role.findOne({ name: "admin" });

    if (!adminRole) {
      return res.status(500).send({ message: "Admin role not found" });
    }

    const admin = new User({
      username,
      email,
      password: hashedPassword,
      roles: [adminRole._id], // Assign the admin role ObjectId
    });

    await admin.save();

    res.status(201).send(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to create admin" });
  }
});

// Admin login route
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminRole = await Role.findOne({ name: "admin" });

    const admin = await User.findOne({
      email,
      roles: [adminRole._id],
    });
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: admin._id, role: "admin" }, adminSecretKey, {
      expiresIn: "1h",
    });

    res.status(200).send({ auth: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to login" });
  }
});

// Create user route
app.post("/api/users/create", validateAdminToken, async (req, res) => {
  try {
    const { username, email, password, managerId, roles } = req.body;
    const managerRole = await Role.findOne({ name: "manager" });
    const userRole = await Role.findOne({ name: "user" });
    if (!managerRole || !userRole) {
      return res.status(500).send({ message: "Role not found" });
    }

    const assignedRoles = [];
    const manager = await User.findById(managerId);

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

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      roles: assignedRoles.map((role) => role._id),
      manager: manager ? manager._id : null,
    });

    await user.save();

    const userWithRoles = await User.findById(user._id).populate(
      "roles",
      "name"
    );

    res.status(200).send(userWithRoles);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to create user" });
  }
});

// Update user route
app.patch("/api/users/:id", validateAdminToken, async (req, res) => {
  try {
    const { username, email, managerId, roles } = req.body;
    const updatedRoles = Array.isArray(roles) ? roles : [roles];

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username,
        email,
        manager: managerId ? mongoose.Types.ObjectId(managerId) : null,
        roles: updatedRoles.map((role) => mongoose.Types.ObjectId(role._id)),
      },
      { new: true }
    ).populate("roles", "name");

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to update user" });
  }
});

// Get all users route
app.get("/api/users/all", validateAdminToken, async (req, res) => {
  try {
    const users = await User.find().populate("roles", "name");
    users.forEach((user) => {
      user.password = undefined;
    });
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to fetch users" });
  }
});
// Get user by ID route
app.get("/api/users/:id", validateAdminToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("roles", "name");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    user.password = undefined;
    user.manager = await User.findByEmail(user.manager);
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to fetch user" });
  }
});

// Update user route
app.patch("/api/users/:id", validateAdminToken, async (req, res) => {
  try {
    const { username, email, managerId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username,
        email,
        managerId,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to update user" });
  }
});

// Delete user route
app.delete("/api/users/:id", validateAdminToken, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to delete user" });
  }
});
