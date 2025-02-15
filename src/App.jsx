import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/ProductDetails";
import SearchItem from "./components/SearchItem";
import Cart from "./components/Cart";
import { items } from "./components/Data";
import Footer from "./components/Footer";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";

const App = () => {
  const [data, setData] = useState([...items]);
  const [cart, setCart] = useState([]);

  // Initialize cart from sessionStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Router>
        <Navbar cart={cart} setData={setData} />
        <div style={{ flex: 1, paddingBottom: '60px' }}>
          <Routes>
            <Route
              path="/"
              element={<Product setCart={setCart} cart={cart} items={data} />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetail cart={cart} setCart={setCart} />}
            />
            <Route
              path="/search/:term"
              element={<SearchItem cart={cart} setCart={setCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} setCart={setCart} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} setCart={setCart} />}
            />
            <Route
              path="/confirmation"
              element={<Confirmation />}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
