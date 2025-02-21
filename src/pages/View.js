import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./View.css";
import myGif from '../assets/loading.gif';
import {url} from "../Constants";

const FoodItemView = () => {
  const { restaurantId, foodName } = useParams();
  const [foodItem, setFoodItem] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${url}/browse`).then((response) => {
      const restaurant = response.data.find((r) => r._id === restaurantId);
      if (restaurant) {
        const item = restaurant.menu.find((f) => f.name === decodeURIComponent(foodName));
        setFoodItem(item);
        setRestaurantName(restaurant.name);
      }
    });

    // Fetch reviews for this restaurant
    axios.get(`http://localhost:3000/api/reviews/${restaurantId}`).then((response) => {
      setReviews(response.data);
    });
  }, [restaurantId, foodName]);

  const handleAddToCart = () => {
    const userEmail = localStorage.getItem("user");

    if (!userEmail) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (!foodItem) {
      alert("Food item not found!");
      return;
    }

    const cartKey = `cart_${userEmail}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existingItem = cart.find((item) => item.productId === foodItem._id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId: foodItem._id,
        name: foodItem.name,
        price: foodItem.price,
        quantity,
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert("Item added to cart!");
  };

  const handlePlaceOrder = () => {
    const userEmail = localStorage.getItem("user");

    if (!userEmail) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (!foodItem) {
      alert("Food item not found!");
      return;
    }

    const orderDetails = {
      foodName: foodItem.name,
      quantity,
      price: foodItem.price,
      restaurantId,
    };

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    navigate("/confirm-order");
  };

  const handlePostReview = () => {
    navigate(`/review/${restaurantId}`);
  };

  if (!foodItem) return <div className="centerDiv"><img src={myGif} /></div>;

  return (
    <div className="food-item-view">
      <h2>{foodItem.name}</h2>
      <p className="restaurant-name">from {restaurantName.toLowerCase()}</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <p>Price: Rs. {foodItem.price} + 30 (Charge)</p>

      <div className="quantity-selector">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>

      <button className="btn-orange" onClick={handleAddToCart}>Add to Cart</button>
      <button className="btn-yellow" onClick={handlePlaceOrder}>Place Order</button>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={review._id} className="review-card">
              <p className="review-user">User ID: {review.userId}</p>
              <p className="review-text">Review: "{review.reviewText}"</p>
              <p className="review-rating">Rating: {review.rating} ⭐</p>
              {index < reviews.length - 1 && <hr />}
            </div>
          ))
        )}
      {/* Review Button */}
      <button className="btn-review" onClick={handlePostReview}>Post a Review</button>
      </div>

    </div>
  );
};

export default FoodItemView;
