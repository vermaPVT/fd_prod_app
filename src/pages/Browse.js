import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import myGif from '../assets/loading.gif';
import {url} from "../Constants";


const BrowsePage = () => {
  const [restaurants, setRestaurants] = useState([]);  // State to hold the restaurant data
  const [loading, setLoading] = useState(true);  // State to handle loading state

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${url}/browse`); // API call to get restaurants
        setRestaurants(response.data);  // Update state with restaurant data
        setLoading(false);  // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      }
    };

    fetchRestaurants();  // Call the fetch function
  }, []);

  if (loading) {
    return <div className="centerDiv"><img src={myGif} /></div>;  // Display loading message while fetching data
  }

  return (
    <div className="browse-container">
      <h2>Browse Restaurants and Food</h2>
      <div className="restaurants-list">
        {restaurants.map((restaurant) => (
          <div className="restaurant-card" key={restaurant._id}>
            <h3>{restaurant.name}</h3>
            <div className="menu-items">
              {restaurant.menu.length > 0 ? (
                restaurant.menu.map((item, index) => (
                  <div key={index} className="menu-item">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>Price: Rs. {item.price} + 30 (Charge)</p>
                    <Link to={`/food/${restaurant._id}/${encodeURIComponent(item.name)}`}>
                    <button className="viewButton">View</button>
                    </Link>
                  </div>
                ))
              ) : (
                <p>No menu items available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowsePage;
