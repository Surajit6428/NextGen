import axios from "axios";

export const openrouterResponse = async (messages) => {
  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-3.5-turbo",

      // ✅ FULL CHAT HISTORY SEND
      messages: messages.map(m => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text
      }))
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
      }
    }
  );

  return res.data.choices[0].message.content;
};