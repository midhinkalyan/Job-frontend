import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  const userName = localStorage.getItem("userName") || "Guest";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=27ae60&color=fff`;

  return (
    <header className="app-header">
      <div className="logo">Jobbie App</div>
      <nav className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/">Login</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/profile" className="profile-link">
          <img src={avatarUrl} alt="Profile" className="profile-icon" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
