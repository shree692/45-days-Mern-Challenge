import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import WorkExperience from "./models/WorkExperience.js";
import experiences from "./data/experiences.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await WorkExperience.deleteMany(); // Clear previous data
    await WorkExperience.insertMany(experiences); // Insert dummy data
    console.log("✅ Dummy Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
};

importData();
