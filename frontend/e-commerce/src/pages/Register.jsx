import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password });
      navigate("/login"); 
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-logo">E-<span>shop</span></h2>
      <div className="login-box">
        <h3>Create account</h3>
        <form onSubmit={handleSubmit}>
          <label>Your name</label>
          <input type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <label>Email</label>
          <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="login-btn">Register</button>
        </form>
      </div>
      <div className="new-account">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
