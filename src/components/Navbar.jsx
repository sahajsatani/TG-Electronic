import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { items } from "./Data";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa"; // Importing search icon
import { ToastContainer, toast } from "react-toastify";

import logo from "../assets/TG Logo White.png"; // Import the logo

const Navbar = ({ setData, cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filterByCategory = (category) => {
    if (category === "all") {
      setData(items); // Show all products
    } else {
      const element = items.filter((product) => product.category === category);
      setData(element);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredItems.length === 0) {
      setData([]);
      toast.error("No such have item", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setData(filteredItems);
    setSearchTerm("");
    navigate("/"); // Navigate back to the home page to display results
  };

  return (
    <>
      <header className="sticky-top">
        <div className="nav-bar">
          <Link to={"/"} className="brand">
            <div
              style={{ display: "flex", alignItems: "center", margin: "3px" }}
            >
              <img src={logo} alt="Logo" style={{ height: "25px" }} />
              <span
                style={{
                  fontSize: "26px",
                  marginTop: "3px",
                  marginLeft: "9px",
                }}
              >
                Electronics
              </span>
            </div>
          </Link>

          <form
            onSubmit={handleSubmit}
            className="search-bar"
            style={{ position: "relative" }}
          >
            <input
              value={searchTerm}
              h
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products"
              style={{
                borderRadius: "20px", // Rounded corners
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Shadow effect
                padding: "10px 40px", // Padding to accommodate the icon
              }}
            />
          </form>
          <div className="cart">
            {/* <Link to={"/cart"}> */}
            <button
              href="/cart"
              id="cartbtn"
              className="btn btn-primary position-relative"
            >
              <BsFillCartCheckFill style={{ fontSize: "1.5rem" }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
            {/* </Link> */}
          </div>
        </div>

        {location.pathname === "/" && (
          <div
            className="nav-bar-wrapper"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <label htmlFor="filter-dropdown" style={{ marginRight: "10px" }}>
              Filter by:
            </label>
            <select
              id="filter-dropdown"
              style={{
                cursor: "pointer",
                borderRadius: "5px",
                padding: "1px",
                backgroundColor: "#4b1b78",
                color: "white",
              }}
              onChange={(e) => filterByCategory(e.target.value)}
              className="filter-dropdown"
            >
              <option value="all">All Products</option>
              <option value="mobiles">Mobiles</option>
              <option value="laptops">Laptops</option>
              <option value="tablets">Tablets</option>
            </select>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
