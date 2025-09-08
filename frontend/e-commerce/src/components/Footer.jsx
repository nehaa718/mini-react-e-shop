import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom"; 

function Footer() {
  return (
    <footer className="footer">
      {/* Footer Sections */}
      <div className="footer-sections">
        {/* Section 1 */}
        <div className="footer-section">
          <h4>Women</h4>
          <a href="#">Dresses</a>
          <a href="#">Pants</a>
          <a href="#">Skirts</a>
        </div>

        {/* Section 2 */}
        <div className="footer-section">
          <h4>Men</h4>
          <a href="#">Shirts</a>
          <a href="#">Pants</a>
          <a href="#">Hoodies</a>
        </div>

        {/* Section 3 */}
        <div className="footer-section">
          <h4>Kids</h4>
          <a href="#">T-Shirts</a>
          <a href="#">Jeans</a>
          <a href="#">Shoes</a>
        </div>

        {/* Section 4 */}
        <div className="footer-section">
          <h4>Links</h4>
          <Link to="/home">
            Home
          </Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">
            Login
          </Link>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-logo">
          <h2>
            E-<span>shop</span>
          </h2>
        </div>
        <p>Copyright © 2025 E-COMMERCE. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
