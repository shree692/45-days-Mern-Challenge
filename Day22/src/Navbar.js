import React from 'react';

function Navbar({ onNavigate }) {
  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => onNavigate("home")}>MyPortfolio</h2>
      <ul className="nav-links">
        <li onClick={() => onNavigate("projects")}>Projects</li>
        <li onClick={() => onNavigate("login")}>Login</li>
      </ul>
    </nav>
  );
}

export default Navbar;
