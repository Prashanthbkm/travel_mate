import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const ChartSection = ({ chartData, upcomingTrips, savedDestinations }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chartData) {
      setData(chartData);
      setLoading(false);
    } else {
      // Fallback to empty data
      setData([]);
      setLoading(false);
    }
  }, [chartData]);

  return (
    <div className="chart-section">
      <h2>Travel Activity</h2>
      {loading ? (
        <div className="chart-loading">Loading travel data...</div>
      ) : data.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="trips" fill="#8884d8" name="Trips" radius={[4, 4, 0, 0]} />
            <Bar dataKey="destinations" fill="#82ca9d" name="Destinations" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="no-data">
          <p>No travel data available yet</p>
          <small>Start planning trips to see your activity!</small>
        </div>
      )}
      <div className="chart-stats">
        <div className="stat-card">
          <div className="stat-icon">✈️</div>
          <div className="stat-info">
            <div className="stat-number">{upcomingTrips || 0}</div>
            <div className="stat-label">Upcoming Trips</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">❤️</div>
          <div className="stat-info">
            <div className="stat-number">{savedDestinations || 0}</div>
            <div className="stat-label">Saved Destinations</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;