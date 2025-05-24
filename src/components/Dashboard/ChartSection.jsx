// ChartSection.js (updated with travel data)
import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const getChartData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { name: "Jan", trips: 2, destinations: 3 },
    { name: "Feb", trips: 3, destinations: 5 },
    { name: "Mar", trips: 1, destinations: 2 },
    { name: "Apr", trips: 4, destinations: 6 },
    { name: "May", trips: 2, destinations: 4 },
  ];
};

const ChartSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const chartData = await getChartData();
      setData(chartData);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Travel Activity</h2>
      {loading ? (
        <div>Loading travel data...</div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="trips" stroke="#8884d8" name="Trips" />
            <Line type="monotone" dataKey="destinations" stroke="#82ca9d" name="Destinations" />
          </LineChart>
        </ResponsiveContainer>
      )}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="bg-blue-50 p-2 rounded">
          <p className="text-sm text-blue-800">Upcoming Trips: 3</p>
        </div>
        <div className="bg-green-50 p-2 rounded">
          <p className="text-sm text-green-800">Saved Destinations: 12</p>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;