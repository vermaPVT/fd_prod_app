import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";
import { Link } from "react-router-dom";
import {url} from "../Constants";

const SearchPage = () => {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("q") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    fetch(`${url}/browse`)
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
        filterResults(queryParam, data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filterResults = (query, data) => {
    if (!query) {
      setFilteredResults([]);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    
    const filtered = data
      .map((restaurant) => ({
        ...restaurant,
        menu: restaurant.menu.filter((item) =>
          item.name.toLowerCase().includes(lowerCaseQuery)
        ),
      }))
      .filter((restaurant) =>
        restaurant.name.toLowerCase().includes(lowerCaseQuery) ||
        restaurant.menu.length > 0
      );

    setFilteredResults(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    filterResults(value, restaurants);
  };

  return (
    <div className="search-page">
      <input
        type="text"
        placeholder="Search for food, restaurant..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      {filteredResults.length === 0 ? (
        <p className="no-results">No results found</p>
      ) : (
        <div className="search-results">
          {filteredResults.map((restaurant) => (
            <div key={restaurant._id} className="restaurant">
              <h3>{restaurant.name}</h3>
              <ul>
                {restaurant.menu.map((item) => (
                  <li key={item.name}>
                    <strong>{item.name}</strong> - ${item.price}
                    <p>{item.description}</p><br />
                    <Link to={`/food/${restaurant._id}/${encodeURIComponent(item.name)}`}>
                      <button className="viewButton1">View</button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
