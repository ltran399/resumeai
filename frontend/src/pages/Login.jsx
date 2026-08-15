import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { saveToken } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = async () => {
  setError("");
  try {
    const res = await api.post("/login", { email, password });
    saveToken(res.data.access_token);
    navigate("/dashboard");
  } catch (err) {
    setError(err.response?.data?.detail || "Login failed");
  }
};

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <br />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <br />
      <button onClick={handleSubmit}>Log in</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}