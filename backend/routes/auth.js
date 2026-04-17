import express from "express";
import bcrypt from "bcrypt";
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();


// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const db = getDB();

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    // 🔍 Check existing user
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    // 🔐 Hash password
    const hash = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      name,
      email,
      password: hash,
      createdAt: new Date()
    });

    res.json({ message: "Signup success" });

  } catch (err) {
    console.log("Signup Error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const db = getDB();

    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Wrong password" });
    }

    res.json({ userId: user._id });

  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});


// ✅ GET USER PROFILE
router.get("/user/:id", async (req, res) => {
  try {
    const db = getDB();

    const user = await db.collection("users").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email
    });

  } catch (err) {
    console.log("User Fetch Error:", err);
    res.status(500).json({ error: "User fetch error" });
  }
});


// ✅ CHANGE PASSWORD (FINAL FIXED)
router.post("/change-password", async (req, res) => {
  try {
    const db = getDB();

    const { userId, currentPassword, newPassword } = req.body;

    // 🔥 validation
    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({ error: "All fields required" });
    }

    const user = await db.collection("users").findOne({
      _id: new ObjectId(userId)
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // 🔐 check current password
    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match) {
      return res.status(400).json({ error: "Wrong current password" });
    }

    // 🔐 prevent same password reuse
    const same = await bcrypt.compare(newPassword, user.password);
    if (same) {
      return res.status(400).json({ error: "New password must be different" });
    }

    // 🔐 hash new password
    const hash = await bcrypt.hash(newPassword, 10);

    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { password: hash } }
    );

    res.json({ message: "Password updated successfully ✅" });

  } catch (err) {
    console.log("Password Update Error:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

export default router;