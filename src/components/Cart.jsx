import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);
  
  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return ( 
    <>
      <div className="container my-5" style={{ width: "54%" }}>
        {cart.length === 0 ? (
          <div className="text-center">
            <h1>Your Cart is Empty</h1>
            <Link to={"/"} style={{ marginTop: '30px' }} className="btn btn-warning">
              Continue Shopping...
            </Link>
          </div>
        ) : (
          cart.map((product) => {
            return (
              <div key={product.id} className="card mb-3 my-5" style={{ width: "700px" }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={product.imgSrc}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8" style={{ marginTop: '30px' }}>
                    <div className="card-body text-center">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                      <span className="product-price" style={{ fontSize: '1.5rem', color: 'black' }}>
                      ${product.price} 
                      </span>
                      <button onClick={() => handleRemove(product.id)} style={{ marginLeft: '100px'}} 
                      id={"removebtn"+product.id} className="btn btn-danger">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {cart.length !== 0 && (
        <div
          className="container text-center my-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/checkout">
            <button className="btn btn-warning mx-4">CheckOut</button>
          </Link>
          <button onClick={() => {
            setCart([]);
            sessionStorage.removeItem("cart");
          }} className="btn btn-danger">
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
