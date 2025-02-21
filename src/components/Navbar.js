import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUser, setUserName] = useState("");

  useEffect(() => {
    // Check localStorage for login status
    const user = localStorage.getItem("user");
    if (user) {
      setUserName("ID:"+user)
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <nav className="navbar">
      <div className="navbar-title"><a href="/">FoodDelivery</a></div>
      <div className="navbar-actions">
        {!isLoggedIn ? (
          <>
            <button className="btn"><a href="/user-login">Login</a></button>
            <button className="btn"><a href="/user-signup">Signup</a></button>
          </>
        ) : (
          <>
          <span className="userIdDis">{isUser}</span>
          <span className="buttons btnColourChange"><a href="/view-cart">View Cart</a></span>
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
