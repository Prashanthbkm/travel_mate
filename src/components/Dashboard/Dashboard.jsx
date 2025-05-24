import React, { useEffect, useState } from 'react';
import WelcomeBanner from './WelcomeBanner';
import ProfileCard from './ProfileCard';
import ChartSection from './ChartSection';
import Globe from './Globe';
import RecentActivity from './RecentActivity';
import TaskList from './TaskList';
import { getDestinations} from '../../api'; // Adjust the path if needed

const Dashboard = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinations(data);
      } catch (err) {
        setError('Failed to fetch destinations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(to bottom, #4facfe, #00f2fe)",
        minHeight: "100vh",
        padding: "20px",
        color: "#333",
      }}
    >
      <WelcomeBanner />

      {loading && <p>Loading destinations...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Example: Display destinations count */}
      {!loading && !error && (
        <p>{`Total destinations fetched: ${destinations.length}`}</p>
      )}

      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr 1fr 1fr" }}>
        <ProfileCard />
        <ChartSection />
        <Globe />
      </div>

      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr 1fr" }}>
        <RecentActivity />
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
