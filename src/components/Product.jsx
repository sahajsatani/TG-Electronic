import React from "react";
import { useState } from "react"; // Import useState for managing cart
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = ({ items,cart, setCart }) => {
  const handleAddToCart = (item) => {
    const currentCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    sessionStorage.setItem("cart", JSON.stringify([...currentCart, item]));
    setCart([...currentCart, item]);
    toast.success("Item added to cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleRemoveFromCart = (item) => {
    const currentCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const updatedCart = currentCart.filter(cartItem => cartItem.id !== item.id);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    toast.success("Item removed from cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container my-5">
        <div className="row">
          {items.map((product) => {
            return (
              <div
                key={product.id}
                className="col-lg-4 col-md-6 my-3 text-center"
              >
                <div className="card" style={{ 
                  width: "350px",
                  height: "550px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <div className="img" style={{ 
                    height: "300px", 
                    overflow: "hidden",
                    flexShrink: 0,
                    position: "relative"
                  }}>
                    <img
                      src={product.imgSrc}
                      className="card-img-top img"
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                        position: "absolute",
                        top: 0,
                        left: 0
                      }}
                    />
                  </div>
                  <div className="card-body" style={{
                    padding: "20px",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "200px"
                  }}>
                    <Link
                      to={`/product/${product.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                    <h5 className="card-title" style={{
                      fontSize: "1.1rem",
                      marginBottom: "10px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}>{product.title}</h5>
                    <p className="card-text" style={{
                      fontSize: "0.9rem",
                      // marginBottom: "10px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical"
                    }}>{product.description}</p>

                    </Link>
                    <div>
                    <span
                      className="product-price"
                      style={{
                        fontSize: "1.5rem",
                        color: "black",
                        fontWeight: "900px",
                        marginRight: "50px"
                      }}
                    >
                      ${product.price}
                    </span>
                    {cart.some(cartItem => cartItem.id === product.id) ? (
                      <button
                        onClick={() => handleRemoveFromCart(product)}
                        className="btn btn-danger"
                        style={{
                          padding: "10px 20px",
                          fontSize: "1rem",
                          borderRadius: "5px",
                          alignSelf: "center"
                        }}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-warning"
                        style={{
                          padding: "10px 20px",
                          fontSize: "1rem",
                          borderRadius: "5px",
                          alignSelf: "center"
                        }}
                      >
                        Add To Cart
                      </button>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Product;
