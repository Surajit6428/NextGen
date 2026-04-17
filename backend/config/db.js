import { MongoClient } from "mongodb";

let db;

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI not found in .env");
    }

    const client = new MongoClient(process.env.MONGO_URI);

    await client.connect();

    db = client.db("nextgen"); // ✅ keep this

    console.log("✅ MongoDB Connected");

  } catch (err) {
    console.log("❌ DB ERROR:", err.message);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("❌ DB not initialized");
  }
  return db;
};