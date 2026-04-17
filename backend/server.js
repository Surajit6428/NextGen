import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import chatRoute from "./routes/chat.js";
import authRoute from "./routes/auth.js";
import { connectDB } from "./config/db.js";

const app = express();

// 🔥 Middleware
app.use(cors());
app.use(express.json());

// 🔥 Routes
app.use("/api/chat", chatRoute);
app.use("/api/auth", authRoute);

// 🔥 Start Server AFTER DB Connect
const startServer = async () => {
  await connectDB(); // ✅ wait for DB

  app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
  });
};

startServer();