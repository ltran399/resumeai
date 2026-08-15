import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    try {
      await api.post("/register", { email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Register</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <br />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <br />
      <button onClick={handleSubmit}>Sign up</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}