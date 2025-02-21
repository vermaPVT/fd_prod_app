import React, {useState} from "react";
import { Link, useNavigate  } from "react-router-dom";
import './Home.css'

const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/search?q=${searchText}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Food Delivery</h1>
          <hr />
          <p>Find your favorite meals delivered right to your doorstep</p>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for food, restaurant..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="btn-small1" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </section>

      {/* Food Items List */}
      <section className="food-items">
        <h2>Popular Food Items</h2>
        <div className="food-items-list">
          <div className="food-item">
            <img src="https://th.bing.com/th/id/OIP.RWaaZCnAJwE8O0FxwD7y0AHaEo?rs=1&pid=ImgDetMain" alt="Pizza" />
            <p>Pizza</p>
          </div>
          <div className="food-item">
            <img src="https://th.bing.com/th/id/OIP.Rzad6Ueik6hqRCSM7zbi3AHaHa?rs=1&pid=ImgDetMain" alt="Burger" />
            <p>Burger</p>
          </div>
          <div className="food-item">
            <img src="https://th.bing.com/th/id/OIP.PYxOK3lxEUaeiTt-sELaHgHaE8?rs=1&pid=ImgDetMain" alt="Sushi" />
            <p>Sushi</p>
          </div>
          <div className="food-item">
            <img src="https://th.bing.com/th/id/OIP.MiAGrYafshORM2n_HLu4swHaHa?rs=1&pid=ImgDetMain" alt="Pasta" />
            <p>Pasta</p>
          </div>
          <div className="food-item">
            <img src="https://th.bing.com/th/id/OIP.9FPW_ej5T2aAGYCO9QKwugHaJl?rs=1&pid=ImgDetMain" alt="Salad" />
            <p>Salad</p>
          </div>
        </div>
        <div className="containsButtons">
          <span className="buttons btnColourChange"><a href="/view-orders">View Orders</a></span>
          <span className="buttons"><a href="/browse">Browse</a></span>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
