import React, { useState, useEffect } from 'react';
import { carbonAPI } from '../../api';  // Fixed import path
import '../styles/carbonCalculator.css';

const CarbonCalculator = () => {
  const [distance, setDistance] = useState('');
  const [transportMode, setTransportMode] = useState('car');
  const [result, setResult] = useState(null);
  const [factors, setFactors] = useState({});
  const [loading, setLoading] = useState(false);

  // Load emission factors on component mount
  useEffect(() => {
    loadEmissionFactors();
  }, []);

  const loadEmissionFactors = async () => {
    try {
      const response = await carbonAPI.getFactors();
      setFactors(response.data);
    } catch (error) {
      console.error('Error loading emission factors:', error);
      // Fallback factors
      setFactors({
        car: 0.25,
        flight: 0.25,
        train: 0.05,
        bus: 0.08,
        bike: 0.0,
        walk: 0.0
      });
    }
  };

  const calculateFootprint = async () => {
    const dist = parseFloat(distance);
    if (isNaN(dist) || dist <= 0) {
      alert('Please enter a valid distance');
      return;
    }

    try {
      setLoading(true);
      const response = await carbonAPI.calculate(dist, transportMode);
      setResult(response.data);
    } catch (error) {
      console.error('Error calculating footprint:', error);
      // Fallback calculation
      const footprint = (dist * (factors[transportMode] || 0.25)).toFixed(2);
      setResult({
        footprint: parseFloat(footprint),
        transportMode,
        distance: dist,
        factor: factors[transportMode] || 0.25,
        recommendation: getRecommendation(transportMode, parseFloat(footprint))
      });
    } finally {
      setLoading(false);
    }
  };

  const getRecommendation = (mode, footprint) => {
    if (footprint > 10) return "Consider using train or bus to reduce your carbon footprint!";
    if (footprint <= 2) return "Great eco-friendly choice!";
    return "Good choice, but there are greener options available.";
  };

  return (
    <div className="carbon-calculator">
      <h2>🌱 Sustainability - Carbon Footprint Calculator</h2>
      
      <div className="input-group">
        <input
          type="number"
          placeholder="Distance traveled (km)"
          min="0"
          step="0.1"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        
        <select 
          value={transportMode} 
          onChange={(e) => setTransportMode(e.target.value)}
        >
          <option value="car">Car</option>
          <option value="flight">Flight</option>
          <option value="train">Train</option>
          <option value="bus">Bus</option>
          <option value="bike">Bicycle</option>
          <option value="walk">Walking</option>
        </select>
      </div>

      <button onClick={calculateFootprint} disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate'}
      </button>

      {result && (
        <div className="result">
          <h3>Calculation Results</h3>
          <p><strong>Distance:</strong> {result.distance} km</p>
          <p><strong>Transport:</strong> {result.transportMode}</p>
          <p><strong>Emission Factor:</strong> {result.factor} kg CO₂/km</p>
          <p className="footprint">
            Your estimated carbon footprint: <strong>{result.footprint} kg CO₂</strong>
          </p>
          <p className="recommendation">{result.recommendation}</p>
        </div>
      )}

      <small>Try to choose eco-friendly travel options to reduce your footprint!</small>
    </div>
  );
};

export default CarbonCalculator;