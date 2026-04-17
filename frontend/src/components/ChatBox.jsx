import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { franc } from "franc";

export default function ChatBox({ user, selectedChat }) {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(null);

  const messagesEndRef = useRef(null);

  // ✅ Load selected chat OR new chat
  useEffect(() => {
    if (selectedChat) {
      setChat(selectedChat.messages || []);
      setChatId(selectedChat._id);
    } else {
      setChat([]);
      setChatId(null);
    }
  }, [selectedChat]);

  // ✅ Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  // 🌍 Detect language
  const detectLanguage = (text) => {
    const lang = franc(text);
    if (lang === "ben") return "bn";
    if (lang === "hin") return "hi";
    return "en";
  };

  // 🌐 Translate
  const translateText = async (text, targetLang) => {
    if (targetLang === "en") return text;

    try {
      const res = await axios.get(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
      );
      return res.data.responseData.translatedText;
    } catch {
      return text;
    }
  };

  // 🚀 Send message
  const sendMessage = async () => {
    if (!msg.trim()) return;

    const userLang = detectLanguage(msg);

    const userMessage = { role: "user", text: msg };

    const updatedChat = [...chat, userMessage];

    setChat(updatedChat);
    setMsg("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        messages: updatedChat,
        userId: user,
        chatId: chatId // 🔥 IMPORTANT (continue chat)
      });

      const translated = await translateText(res.data.reply, userLang);

      // 🔥 Save chatId for future messages
      if (!chatId && res.data.chatId) {
        setChatId(res.data.chatId);
      }

      setChat((prev) => [
        ...prev,
        { role: "bot", text: translated }
      ]);

    } catch {
      setChat((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error fetching response" }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chatbox">

      {/* 💬 Messages */}
      <div className="messages">
        {chat.map((c, i) => (
          <div key={i} className={`message ${c.role}`}>
            <span className="icon">
              {c.role === "user" ? "👤" : "🤖"}
            </span>
            <span>{c.text}</span>
          </div>
        ))}

        {/* 🤖 Typing animation */}
        {loading && (
          <div className="message bot">
            <span className="icon">🤖</span>
            <span className="typing">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {/* ✍️ Input */}
      <div className="input-area">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Ask something..."
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}