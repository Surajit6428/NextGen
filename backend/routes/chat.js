import express from "express";
import { openrouterResponse } from "../services/openrouter.js";
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();


// ✅ SEND MESSAGE + SAVE CHAT
router.post("/", async (req, res) => {
  try {
    const db = getDB();

    const { messages, userId, chatId } = req.body;

    if (!messages || !userId) {
      return res.status(400).json({ error: "Missing data" });
    }

    const lastMsg = messages[messages.length - 1]?.text?.toLowerCase()?.trim() || "";
    const now = new Date();

    // ⏰ TIME / DATE
    if (lastMsg.includes("time") && !lastMsg.includes("date")) {
      return res.json({
        reply: `🕒 Current time is ${now.toLocaleTimeString()}`
      });
    }

    if (lastMsg.includes("date") && !lastMsg.includes("time")) {
      return res.json({
        reply: `📅 Today is ${now.toLocaleDateString()}`
      });
    }

    if (lastMsg.includes("time") && lastMsg.includes("date")) {
      return res.json({
        reply: `📅 ${now.toLocaleDateString()} | 🕒 ${now.toLocaleTimeString()}`
      });
    }

    // 🤖 AI RESPONSE
    const reply = await openrouterResponse(messages);

    let currentChat;

    // 🔄 CONTINUE CHAT
    if (chatId) {
      await db.collection("chats").updateOne(
        { _id: new ObjectId(chatId) },
        {
          $push: {
            messages: {
              $each: [
                { role: "user", text: messages[messages.length - 1].text },
                { role: "bot", text: reply }
              ]
            }
          }
        }
      );

      currentChat = await db.collection("chats").findOne({
        _id: new ObjectId(chatId)
      });

    } else {
      // 🆕 NEW CHAT
      const result = await db.collection("chats").insertOne({
        userId,
        messages: [...messages, { role: "bot", text: reply }],
        createdAt: new Date()
      });

      currentChat = {
        _id: result.insertedId
      };
    }

    res.json({
      reply,
      chatId: currentChat._id
    });

  } catch (error) {
    console.log("Chat ERROR:", error.message);
    res.status(500).json({ error: "API error" });
  }
});


// 📜 GET USER CHAT HISTORY
router.get("/history/:userId", async (req, res) => {
  try {
    const db = getDB();

    const chats = await db
      .collection("chats")
      .find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(chats);

  } catch (err) {
    console.log("History ERROR:", err.message);
    res.status(500).json({ error: "Fetch error" });
  }
});


// ❌ DELETE CHAT
router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();

    await db.collection("chats").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.log("Delete ERROR:", err.message);
    res.status(500).json({ error: "Delete error" });
  }
});

export default router;