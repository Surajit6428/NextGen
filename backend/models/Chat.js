import { ObjectId } from "mongodb";

export const createChat = ({ userId, message, reply }) => ({
  _id: new ObjectId(),
  userId,
  messages: [
    { role: "user", text: message },
    { role: "bot", text: reply }
  ],
  createdAt: new Date()
});