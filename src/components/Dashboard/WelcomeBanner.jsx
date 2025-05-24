// WelcomeBanner.js (updated with travel theme)
import React from "react";

const WelcomeBanner = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        color: "#fff",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Welcome Back, Explorer!</h1>
      <p style={{ margin: "5px 0" }}>Your next adventure awaits</p>
      <div style={{ 
        display: "flex", 
        justifyContent: "center",
        gap: "15px",
        marginTop: "10px"
      }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          ✈️ Next trip: Paris in 14 days
        </span>
        <span style={{ display: "flex", alignItems: "center" }}>
          🌍 32 countries visited
        </span>
      </div>
    </div>
  );
};

export default WelcomeBanner;