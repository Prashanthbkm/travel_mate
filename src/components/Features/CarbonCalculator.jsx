import React, { useState } from 'react';
import '../styles/carbonCalculator.css';  // relative path import

const CarbonCalculator = () => {
  const [distance, setDistance] = useState('');
  const [footprint, setFootprint] = useState(null);

  const calculateFootprint = () => {
    const dist = parseFloat(distance);
    if (isNaN(dist) || dist <= 0) {
      alert('Please enter a valid distance');
      return;
    }
    const result = (dist * 0.25).toFixed(2);
    setFootprint(result);
  };

  return (
    <div className="carbon-calculator">
      <h2>🌱 Sustainability - Carbon Footprint Calculator</h2>
      <input
        type="number"
        placeholder="Distance traveled (km)"
        min="0"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />
      <button onClick={calculateFootprint}>Calculate</button>
      {footprint && (
        <p>Your estimated carbon footprint: <strong>{footprint} kg CO₂</strong></p>
      )}
      <small>Try to choose eco-friendly travel options to reduce your footprint!</small>
    </div>
  );
};

export default CarbonCalculator;
