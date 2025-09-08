import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom"; 

function Navbar({ setSelectedCategory }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      {/* Nav Links (Desktop) */}
      <ul className="nav-links">
        <li>
          <Link to="/home">
            Home
          </Link>
        </li>

        {/* All Categories Dropdown */}
        <li
          className="dropdown"
          onMouseEnter={() => setDropdown("all")}
          onMouseLeave={() => setDropdown(null)}
        >
          <a href="#">All Categories ▾</a>
          {dropdown === "all" && (
            <ul className="dropdown-menu">
              <li><Link to="/home" onClick={() => setSelectedCategory("")}>All</Link></li>
              <li><Link to="/home" onClick={() => setSelectedCategory("Men")}>Men</Link></li>
              <li><Link to="/home" onClick={() => setSelectedCategory("Women")}>Women</Link></li>
              <li><Link to="/home" onClick={() => setSelectedCategory("Kids")}>Kids</Link></li>
            </ul>
          )}
        </li>

        <li> <Link to="/contact">Contact</Link> </li>
      </ul>

      {/* Hamburger with "All" */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰ <span className="all-text">All</span>
      </div>

      {/* Sidebar (Amazon-style) */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={toggleMenu}>✖</div>
        <ul>
          <li><Link to="/home" onClick={() => setSelectedCategory("")}>Home</Link></li>
          <li>
            <details>
              <summary>All Categories</summary>
              <ul>
                <li><Link to="/home" onClick={() => setSelectedCategory("")}>All</Link></li>
                <li><Link to="/home" onClick={() => setSelectedCategory("Men")}>Men</Link></li>
                <li><Link to="/home" onClick={() => setSelectedCategory("Women")}>Women</Link></li>
                <li><Link to="/home" onClick={() => setSelectedCategory("Kids")}>Kids</Link></li>
              </ul>
            </details>
          </li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </nav>
  );
}

export default Navbar;
