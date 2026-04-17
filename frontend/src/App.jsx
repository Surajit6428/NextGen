import { useState, useEffect } from "react";
import ChatBox from "./components/ChatBox";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [provider, setProvider] = useState("openai");
  const [user, setUser] = useState(localStorage.getItem("userId"));
  const [page, setPage] = useState("login");

  // 🔥 Toast system
  const [toast, setToast] = useState("");

  // 🔥 Chat selection
  const [selectedChat, setSelectedChat] = useState(null);

  // ✅ Auto hide toast (NEW)
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  // ❌ Not logged in
  if (!user) {
    return (
      <>
        {page === "login" ? (
          <Login
            setUser={setUser}
            setPage={setPage}
            setToast={setToast}
          />
        ) : (
          <Signup
            setPage={setPage}
            setToast={setToast}
          />
        )}

        {/* ✅ Toast */}
        {toast && <div className="toast">{toast}</div>}
      </>
    );
  }

  // ✅ Logged in UI
  return (
    <div className="app">

      <Sidebar
        user={user}
        setSelectedChat={setSelectedChat}
      />

      <ChatBox
        user={user}
        selectedChat={selectedChat}
      />

      {/* ✅ Toast */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;