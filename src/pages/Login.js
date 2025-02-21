import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  
import axios from "axios";  
import { url } from "../Constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const navigate = useNavigate();  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/login`, { email, password });

      // Check if login was successful
      if (response.data.success) {  
        localStorage.setItem("user", email); // Store user data
        window.location.href = "/browse";
      } else {
        setError("Invalid credentials!"); 
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-text">{error}</p>} 
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="btn">Login</button>
      </form>
      <div className="link-container">
        <Link to="/user-signup">Don't have an account? Signup</Link>
        <p>
          Click here for 
          <a className="noblock" href={`${url}/login/deliverypartner`}> Delivery Partner</a> or 
          <a className="noblock" href={`${url}/login/restaurant`}>&nbsp;Restaurant.</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
