import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import managerRoutes from "./src/routes/managerRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import statusRoutes from "./src/routes/statusRoutes.js";
import s3Routes from "./src/routes/s3Routes.js";
dotenv.config();
// init the database connection
import "./src/database/index.js";
import authentificationRoutes from "./src/routes/authentificationRoutes.js";

const app = express();

const PORT = 3001;
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", contactRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", managerRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1", authentificationRoutes);
app.use("/api/v1", statusRoutes);
app.use("/api/v1", s3Routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
