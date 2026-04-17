import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../pages/Profile";

export default function Sidebar({ user, setSelectedChat, setToast }) {
  const [history, setHistory] = useState([]);
  const [name, setName] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  // ✅ Load data
  useEffect(() => {
    if (user) {
      loadHistory();
      getUser();
    }
  }, [user]);

  // 📜 Load chat history
  const loadHistory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chat/history/${user}`
      );
      setHistory(res.data);
    } catch {
      setToast && setToast("Failed to load history");
    }
  };

  // 👤 Get user
  const getUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/user/${user}`
      );
      setName(res.data.name);
    } catch {}
  };

  // ❌ Delete chat
  const deleteChat = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/chat/${id}`);
      loadHistory();
      setSelectedChat(null);
      setToast && setToast("Chat deleted");
    } catch {
      setToast && setToast("Delete failed");
    }
  };

  // 🆕 New Chat
  const handleNewChat = () => {
    setSelectedChat(null);
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("userId");
    window.location.reload();
  };

  // 🔥 Avatar initials (SB)
  const getInitials = () => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="sidebar">
      <h2>⚡ NextGen</h2>

      {/* 🆕 New Chat */}
      <button onClick={handleNewChat}>
        + New Chat
      </button>

      {/* 📜 History */}
      <div className="history">
        {history.length === 0 && (
          <p style={{ color: "#aaa", fontSize: "14px" }}>
            No chats yet...
          </p>
        )}

        {history.map((chat) => {
          const lastUserMsg = chat.messages
            ?.filter((m) => m.role === "user")
            ?.slice(-1)[0]?.text;

          return (
            <div key={chat._id} className="chat-item">

              <span
                onClick={() => setSelectedChat(chat)}
                style={{ flex: 1, cursor: "pointer" }}
              >
                {lastUserMsg
                  ? lastUserMsg.slice(0, 25)
                  : "New Chat"}...
              </span>

              <button onClick={() => deleteChat(chat._id)}>
                ❌
              </button>

            </div>
          );
        })}
      </div>

      {/* 👤 PROFILE (FIXED UI) */}
      <div className="profile">

        <div
          className="profile-mini"
          onClick={() => setShowProfile(true)}
        >
          <div className="avatar-circle">
            {getInitials()}
          </div>

          <span>{name || "User"}</span>
        </div>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* 🔥 MODAL */}
      {showProfile && (
        <Profile
          user={user}
          onClose={() => setShowProfile(false)}
          setToast={setToast}
        />
      )}
    </div>
  );
}