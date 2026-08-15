import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { clearToken } from "../auth";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        clearToken();
        navigate("/login");
      });
  }, [navigate]);

  const logout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Dashboard</h2>
      {user ? <p>Logged in as {user.email}</p> : <p>Loading…</p>}
      <button onClick={logout}>Log out</button>
    </div>
  );
}