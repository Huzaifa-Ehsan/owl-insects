import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">LOGO</div>
        <ul className="navbar-links">
          <li>
            <a href="/">Library</a>
          </li>
          <li>
            <a href="/">Previous</a>
          </li>
          <li>
            <a href="/">Next</a>
          </li>
          <li>
            <a href="/">Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
