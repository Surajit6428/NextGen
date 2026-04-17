import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile({ user, onClose, setToast }) {
  const [data, setData] = useState({});
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/user/${user}`
      );
      setData(res.data);
    } catch {
      setToast("Failed to load user");
    }
  };

  const changePassword = async () => {
    if (loading) return;

    if (!current || !newPass || !confirm) {
      return setToast("All fields required");
    }

    if (newPass !== confirm) {
      return setToast("Passwords do not match ❌");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/change-password",
        {
          userId: user,
          currentPassword: current,
          newPassword: newPass
        }
      );

      setToast(res.data.message || "Password updated ✅");

      // clear fields
      setCurrent("");
      setNewPass("");
      setConfirm("");

    } catch (err) {
      setToast(
        err.response?.data?.error || "Wrong password ❌"
      );
    } finally {
      // 🔥 IMPORTANT FIX
      setLoading(false);
    }
  };

  return (
    <div className="profile-modal">
      <div className="profile-box">

        <span className="close-btn" onClick={onClose}>✖</span>

        {/* Avatar */}
        <div className="avatar-big">
          {data.name
            ?.split(" ")
            .map(n => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()}
        </div>

        <h2>{data.name}</h2>
        <p className="email">{data.email}</p>

        <hr />

        <h3>🔒 Change Password</h3>

        <input
          type="password"
          placeholder="Current Password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          onClick={changePassword}
          disabled={loading}
          className="update-btn"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </div>
    </div>
  );
}