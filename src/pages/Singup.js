import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import axios from "axios";
import {url} from "../Constants";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");  // New state for address

  const navigate = useNavigate();  // Initialize navigate hook

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        // Sending user data, including address, to the backend
        const userData = {
          name,
          email,
          password,
          address, // Adding the address to the request payload
        };
        const response = await axios.post(`${url}/signup`, userData);
        localStorage.setItem("user", email); // Save user email to localStorage
        alert("Signup Successful!");
        
        // Redirect to login page after successful signup
        navigate("/user-login");
      } catch (error) {
        console.error("Signup error:", error);
        alert("Error during signup: " + error.response.data.error);
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
	<div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Signup</button>
      </form>
      <div className="link-container">
        <Link to="/user-login">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default Signup;
