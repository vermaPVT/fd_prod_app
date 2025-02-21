import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Review.css";
import {url} from "../Constants";

const ReviewForm = () => {
  const { restaurantId } = useParams();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const orderId = Date.now().toString();
  const userId = localStorage.getItem("user");

  const submitReview = async () => {
    if (!userId) {
      alert("Please log in to submit a review.");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    try {
      await axios.post(`${url}/api/reviews`, { 
        userId, 
        restaurantId, 
        orderId, 
        rating, 
        reviewText 
      });
      alert("Review submitted!");
      setRating(0);
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  return (
    <div className="review-form-container">
      <h4 className="review-form-title">Leave a Review as {userId}</h4>
      <select 
        className="review-form-select"
        value={rating} 
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value={0}>Select Rating</option>
        {[1, 2, 3, 4, 5].map(num => (
          <option key={num} value={num}>{num} Stars</option>
        ))}
      </select>
      <textarea
        className="review-form-textarea"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review..."
      />
      <button className="review-form-button" onClick={submitReview}>
        Submit
      </button>
    </div>
  );
};

export default ReviewForm;
