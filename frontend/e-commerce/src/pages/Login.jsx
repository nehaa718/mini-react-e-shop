import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./login.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-logo">E-<span>shop</span></h2>
      <div className="login-box">
        <h3>Log In</h3>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="login-btn">Login</button>
        </form>
      </div>
      <div className="new-account">
        <p>Don't Have an Account? <Link to="/register">Register Here</Link></p>
      </div>
    </div>
  );
};

export default Login;
