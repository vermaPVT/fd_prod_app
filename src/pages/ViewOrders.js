import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./View.css";
import {url} from "../Constants";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("user");
    if (!userEmail) {
      alert("Please login first!");
      navigate("/user-login");
      return;
    }

    axios
      .get(`${url}/vieworders/${userEmail}`)
      .then((response) => setOrders(response.data))
      .catch(() => alert("Error fetching orders"));
  }, [navigate]);

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return; // If user cancels, do nothing
  
    try {
      const response = await axios.post(`${url}/cancelorder/${orderId}`);
      alert(response.data);
      
      // Remove the canceled order from UI
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      alert("Error cancelling order");
    }
  };

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      <small>Note*: Orders can only be cancelled while pending (Refund (exc. charge) will be credited within 2-3 working days).</small>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Restaurant: {order.restaurantId ? order.restaurantId.name : "Unknown"}</p>
              <p>Status: {order.status}</p>
              <p>OTP: <strong className="green">{order.otp?order.otp:"XXXX"}</strong></p>
              <p>Total Price: Rs. {order.totalPrice} + 30/per item (Charge)</p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.quantity} x {item.name}</li>
                ))}
              </ul>
              {order.status === "Pending" && (
                <span className="buttons" onClick={() => handleCancelOrder(order._id)}>
                  <a href="#">Cancel Order</a>
                </span>
              )}
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

export default ViewOrders;
