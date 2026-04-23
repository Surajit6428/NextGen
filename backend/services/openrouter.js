import axios from "axios";

export const openrouterResponse = async (messages) => {
  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",

        messages: messages.map(m => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.text
        }))
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",

          // 🔥 IMPORTANT (OpenRouter required headers)
          "HTTP-Referer": "https://next-gen-iota-eight.vercel.app",
          "X-Title": "NextGen Chat App"
        }
      }
    );

    return res.data.choices[0].message.content;

  } catch (error) {
    console.log("OpenRouter ERROR:", error.response?.data || error.message);

    return "⚠️ AI service error. Please try again.";
  }
};