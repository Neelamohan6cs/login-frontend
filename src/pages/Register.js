import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; // Importing the CSS file
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const backendURL = process.env.REACT_APP_API_URL;

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendURL}/register`, formData);
      setMessage(res.data.message);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container"> {/* ✅ Added className */}
      <h2>Register</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required 
        /><br /><br />

        <button type="submit">Register</button>
      </form>
      <h2>if you have already account <Link to="/login">LOGIN here</Link></h2>
    </div>
  );
}

export default Register;

