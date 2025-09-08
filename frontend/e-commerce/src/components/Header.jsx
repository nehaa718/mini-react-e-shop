import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ search, setSearch, cartItems, user, handleLogout }) {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="nav-logo">
        <div className="logo">
          <h2>E-<span>shop</span></h2>
        </div>
      </div>

      <div className="search">
        <input
          type="search"
          placeholder="Search for products, brands and more"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="nav">
        {!user ? (
          <div className="login">
            <Link to="/login"><button>Login</button></Link>
          </div>
        ) : (
          <div className="login">
            <button onClick={logout}>Logout</button>
          </div>
        )}

        <div className="cart-logo">
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping cart"></i>
            <span className="count">{cartItems.length}</span>
            <strong>Cart</strong>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
