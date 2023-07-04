import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import managerRoutes from "./src/routes/managerRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

dotenv.config();
// init the database connection
import "./src/database/index.js";
import authentificationRoutes from "./src/routes/authentificationRoutes.js";

const app = express();

const PORT = 3001;
const cors = process.env.CORS;
app.use(cors(
  {
    origin: "*",
    credentials: true,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRoutes);
app.use("/api/v1", managerRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1", authentificationRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
