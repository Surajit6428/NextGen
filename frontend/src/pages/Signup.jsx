import { useState } from "react";
import axios from "axios";

// 🔥 Backend URL (LIVE)
const API_URL = "https://nextgen-backend-1rk3.onrender.com";

export default function Signup({ setPage, setToast }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setToast("⚠️ All fields are required");
      setTimeout(() => setToast(""), 2000);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/auth/signup`, // ✅ FIXED URL
        { name, email, password }
      );

      setToast(res.data.message || "✅ Signup successful");

      // 👉 go to login
      setPage("login");

    } catch (err) {
      setToast(
        err.response?.data?.error ||
        "❌ Signup failed (Server error)"
      );
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 2000);
    }
  };

  return (
    <div className="auth-container">

      <h1 className="logo">⚡ NextGen</h1>

      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Signup"}
        </button>

        <p className="signup-text">
          Already have an account?
          <span onClick={() => setPage("login")}> Login</span>
        </p>
      </form>

    </div>
  );
}