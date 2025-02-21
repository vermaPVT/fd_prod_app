import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./View.css";

const ViewCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("user");
    if (!userEmail) {
      alert("Please login first!");
      navigate("/user-login");
      return;
    }

    const cartKey = `cart_${userEmail}`;
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartItems(storedCart);
  }, [navigate]);

  const handleRemoveItem = (productId) => {
    const userEmail = localStorage.getItem("user");
    if (!userEmail) return;

    const cartKey = `cart_${userEmail}`;
    const updatedCart = cartItems.filter((item) => item.productId !== productId);

    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handlePlaceOrder = (item) => {
    const userEmail = localStorage.getItem("user");

    if (!userEmail) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    const orderDetails = {
      foodName: item.name,
      quantity: item.quantity,
      price: item.price,
      productId: item.productId,
    };

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    navigate("/confirm-order");
  };

  return (
    <div className="orders-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: Rs. {item.price} x {item.quantity} = Rs. {item.price * item.quantity}</p>
              <button className="btn1 btnColourChange" onClick={() => handleRemoveItem(item.productId)}>
                Remove
              </button>
              <button className="btn1" onClick={() => handlePlaceOrder(item)}>
                Place Order
              </button>
            </li>
          ))}
        </ul>
      )}
      <span className="buttons">
        <a href="/browse">Browse More</a>
      </span>
    </div>
  );
};

export default ViewCart;
