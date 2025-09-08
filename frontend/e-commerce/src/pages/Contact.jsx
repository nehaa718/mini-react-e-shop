import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      alert("Message sent successfully!");
      navigate("/home");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-logo">
        E-<span>shop</span>
      </h2>
      <div className="login-box">
        <h3>Contact Us</h3>
        <form onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Message</label>
          <textarea
  rows="5"
  className="input-field"
  placeholder="Write your message here..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  required
></textarea>

          <button type="submit" className="login-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
