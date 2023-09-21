import mongoose from "mongoose";
import dotenv from "dotenv";
``;
import { exportAllCollections } from "./backup.js";
import cron from "node-cron";
import seedDatabase from "./seed.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Create users if they don't exist
    seedDatabase();
    // Export all collections on startup
    exportAllCollections();

    // Schedule the backup to run every day at midnight
    cron.schedule("0 0 * * *", () => {
      exportAllCollections();
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit();
  });

export default mongoose;
