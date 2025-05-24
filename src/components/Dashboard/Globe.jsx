import React, { useState, useEffect } from "react";

const Globe = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.5);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const globeStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(to bottom right, #4dabf5, #1890ff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2em',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transform: `rotate(${rotation}deg)`,
    transition: 'transform 0.1s linear',
  };

  return (
    <div style={globeStyle}>🌍</div>
  );
};

export default Globe;
