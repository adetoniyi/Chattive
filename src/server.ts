import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";
import { connectDB } from "./config";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

const mongoURL = process.env.MONGODB_URL;
if (!mongoURL) {
  throw new Error("MONGODB_URL is not defined in environment variables");
}

mongoose
  .connect(mongoURL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err: unknown) => console.log("MongoDB connection failed", err));
