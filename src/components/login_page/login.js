import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/login-or-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const message = await response.text();
      if (response.ok) {
        alert(message);
        localStorage.setItem("userName", username);
        navigate("/home");
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server not responding.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome to Jobby</h2>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={!username.trim() || !password.trim()}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Login;
