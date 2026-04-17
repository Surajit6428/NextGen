import { useState } from "react";
import axios from "axios";

export default function Login({ setUser, setPage, setToast }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 FIXED (Form Submit)
  const handleSubmit = async (e) => {
    e.preventDefault(); // ⚠️ IMPORTANT (Enter fix)

    if (!email || !password) {
      setToast("⚠️ Please fill all fields");
      setTimeout(() => setToast(""), 2000);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("userId", res.data.userId);
      setUser(res.data.userId);

      setToast("✅ Login successful");

    } catch (err) {
      setToast(
        err.response?.data?.error || "❌ Login failed"
      );
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 2000);
    }
  };

  return (
    <div className="auth-container">

      <h1 className="logo">⚡ NextGen</h1>

      {/* 🔥 FORM START */}
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

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

        {/* 🔥 BUTTON FIX */}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="signup-text">
          Don't have an account?
          <span onClick={() => setPage("signup")}> Signup</span>
        </p>
      </form>

    </div>
  );
}