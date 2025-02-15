import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Checkout = ({ cart, setCart }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    console.log("clear");
    sessionStorage.clear();
    setCart([]);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', backgroundColor: '#f8f9fa' }}>
      <form style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', width: '600px' }}>
        <h2 style={{ color: '#270858', textAlign: 'center' }}>Checkout</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <div style={{ marginBottom: '15px' }}>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Zip Code:</label>
          <input
            type="number"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <Link to="/confirmation">
        <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#270858', color: 'white', border: 'none' }} disabled={!firstName || !lastName || !zipCode} onClick={()=>handleSubmit()}>Continue</button>
        </Link>
        
      </form>
    </div>
  );
};

export default Checkout;
