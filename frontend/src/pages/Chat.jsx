import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import { useState } from "react";

export default function Chat({ user }) {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="app">
      <Sidebar user={user} setSelectedChat={setSelectedChat} />
      <ChatBox user={user} selectedChat={selectedChat} />
    </div>
  );
}