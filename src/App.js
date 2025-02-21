import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Singup';
import HomePage from './pages/Home';
import BrowsePage from './pages/Browse';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import SearchPage from './pages/SearchPage';
import FoodItemView from './pages/View';
import ViewOrders from './pages/ViewOrders';
import ViewCart from './pages/Cart';
import ConfirmOrder from './pages/ConfirmOrder';
import ReviewForm from './pages/Review.js'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<HomePage />} />  {/* Add this route */}
        <Route path="/browse" element={<BrowsePage />} />  {/* Add this route */}
        {/* Other routes here */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/food/:restaurantId/:foodName" element={<FoodItemView />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-signup" element={<Signup />} />
        <Route path='/view-orders' element={<ViewOrders />} />
        <Route path='/view-cart' element={<ViewCart />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/review/:restaurantId" element={<ReviewForm />} />
      </Routes>
      <Footer />
      </>
    );
  }

export default App;
