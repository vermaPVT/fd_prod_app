import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import myGif from '../assets/loading.gif';
import {url} from "../Constants";

const ConfirmOrder = () => {
  const [userAddress, setUserAddress] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [isPaid, setIsPaid] = useState(false); // Track payment status
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("user");
    if (!userEmail) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    axios.get(`${url}/user/${userEmail}`).then((response) => {
      setUserAddress(response.data.address || "No address found");
    });

    const storedOrder = JSON.parse(localStorage.getItem("orderDetails"));
    if (storedOrder) {
      setOrderDetails(storedOrder);
    }
  }, []);

  const handleConfirmOrder = async () => {
    if (!orderDetails) {
      alert("No order details found!");
      return;
    }

    const orderData = {
      userEmail: localStorage.getItem("user"),
      items: [{ 
        name: orderDetails.foodName, 
        quantity: orderDetails.quantity, 
        price: orderDetails.price 
      }],
    };

    try {
      await axios.post(`${url}/placeorder/${orderDetails.restaurantId}`, orderData);
      alert("Order placed successfully!");
      navigate("/view-orders");
    } catch (error) {
      alert("Error placing order: " + error.message);
    }
  };

  if (!orderDetails) return <div className="centerDiv">L<img src={myGif} /></div>;

  return (
    <div className="orders-page">
      <h2>Confirm Your Order</h2>
      <p><strong>Delivery Address:</strong> {userAddress}</p>

      <h3>Order Details</h3>
      <p>{orderDetails.foodName} x {orderDetails.quantity}</p>
      <p>Total Price: Rs. {orderDetails.price * orderDetails.quantity + 30 * orderDetails.quantity } (incl. charge)</p>
      <br />

      <h3>Mock Payment</h3>
      <p>Select a payment method:</p>
      <button className="btn-orange" onClick={() => setIsPaid(true)}>Pay with Card</button>
      <button className="btn-orange" onClick={() => setIsPaid(true)}>Pay with UPI</button>

      <button className="btn-yellow" onClick={handleConfirmOrder} disabled={!isPaid}>
        Confirm Order
      </button>
    </div>
  );
};

export default ConfirmOrder;
