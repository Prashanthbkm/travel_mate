import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewsSection from "./ExploreDestinations/ReviewsSection";

import {
  FaMoneyBillWave,
  FaCloudSun,
  FaMountain,
  FaUmbrellaBeach,
  FaLandmark,
  FaSpinner,
} from "react-icons/fa";

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/destinations/${id}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch destination: ${response.status}`);
        }

        const data = await response.json();
        setDestination(data);
      } catch (err) {
        console.error("Error fetching destination:", err);
        setError(err.message);

        // Fallback: Try to get from trending destinations
        const trendingDestinations = [
          {
            id: 1,
            name: "Paris",
            imageUrl:
              "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80",
            budget: "medium",
            weather: "mild",
            interests: ["historical", "romantic"],
            description:
              "The city of love with iconic landmarks like the Eiffel Tower and Louvre Museum.",
            attractions: [
              { name: "Eiffel Tower", type: "attraction" },
              { name: "Louvre Museum", type: "attraction" },
            ],
          },
        ];

        const foundDestination = trendingDestinations.find(
          (dest) => dest.id === parseInt(id)
        );
        if (foundDestination) {
          setDestination(foundDestination);
        } else {
          setError("Destination not found");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  // Helper function to handle interests (could be string or array)
  const getInterestsArray = () => {
    if (!destination?.interests) return [];
    if (Array.isArray(destination.interests)) return destination.interests;
    if (typeof destination.interests === 'string') {
      return destination.interests.split(',').map(item => item.trim());
    }
    return [];
  };

  // Inline Styles
  const styles = {
    container: {
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    backButton: {
      background: "#3498db",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      marginBottom: "30px",
      transition: "all 0.3s ease",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    },
    hero: {
      position: "relative",
      borderRadius: "15px",
      overflow: "hidden",
      marginBottom: "30px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    },
    heroImage: {
      width: "100%",
      height: "400px",
      objectFit: "cover",
    },
    heroContent: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
      color: "white",
      padding: "30px",
    },
    description: { fontSize: "1.2rem", margin: 0, opacity: 0.9 },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
      marginBottom: "40px",
    },
    infoCard: {
      background: "white",
      padding: "25px",
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    },
    tag: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 12px",
      borderRadius: "15px",
      marginRight: "10px",
      fontSize: "14px",
    },
    attractionsList: { listStyle: "none", padding: 0, margin: 0 },
    attractionItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid #eee",
    },
    attractionType: {
      background: "#ecf0f1",
      padding: "4px 12px",
      borderRadius: "15px",
      fontSize: "12px",
      color: "#7f8c8d",
    },
    errorMessage: { textAlign: "center", padding: "60px 20px", color: "#e74c3c" },
    spinner: {
      textAlign: "center",
      padding: "60px 20px",
      color: "#666",
    },
    exploreButton: {
      background: "#2ecc71",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "20px",
      transition: "all 0.3s ease",
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.spinner}>
          <FaSpinner
            style={{
              animation: "spin 1s linear infinite",
              fontSize: "40px",
              marginBottom: "20px",
              color: "#3498db",
            }}
          />
          <p>Loading destination details...</p>
        </div>
        {/* Spin animation keyframes */}
        <style>
          {`@keyframes spin { 
              from { transform: rotate(0deg);} 
              to { transform: rotate(360deg);} 
            }`}
        </style>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div style={styles.container}>
        <button onClick={() => navigate("/explore")} style={styles.backButton}>
          ← Back to Explore
        </button>
        <div style={styles.errorMessage}>
          <h2>⚠️ Destination Not Found</h2>
          <p>{error || "The destination you're looking for doesn't exist."}</p>
          <button
            onClick={() => navigate("/explore")}
            style={styles.exploreButton}
          >
            Explore Other Destinations
          </button>
        </div>
      </div>
    );
  }

  const interestsArray = getInterestsArray();

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/explore")} style={styles.backButton}>
        ← Back to Explore
      </button>

      {/* Hero Section */}
      <div style={styles.hero}>
        <img
          src={destination.imageUrl}
          alt={destination.name}
          style={styles.heroImage}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=500&q=80";
          }}
        />
        <div style={styles.heroContent}>
          <h1 style={{ fontSize: "2.5rem", margin: "0 0 10px 0" }}>
            {destination.name}
          </h1>
          <p style={styles.description}>{destination.description}</p>
        </div>
      </div>

      {/* Info Cards */}
      <div style={styles.infoGrid}>
        <div style={styles.infoCard}>
          <h3>📊 Destination Details</h3>
          <div>
            <span style={{ ...styles.tag, background: "#f1c40f" }}>
              <FaMoneyBillWave /> {destination.budget} budget
            </span>
            <span style={{ ...styles.tag, background: "#3498db", color: "white" }}>
              <FaCloudSun /> {destination.weather} weather
            </span>
          </div>

          {interestsArray.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h4>Interests:</h4>
              <div>
                {interestsArray.map((interest, index) => (
                  <span
                    key={index}
                    style={{ ...styles.tag, background: "#ecf0f1" }}
                  >
                    {interest === "historical" && <FaLandmark />}
                    {interest === "adventure" && <FaMountain />}
                    {interest === "beach" && <FaUmbrellaBeach />}
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {destination.attractions && destination.attractions.length > 0 && (
          <div style={styles.infoCard}>
            <h3>🏛️ Top Attractions</h3>
            <ul style={styles.attractionsList}>
              {destination.attractions.map((attraction, index) => (
                <li key={index} style={styles.attractionItem}>
                  <span style={{ fontWeight: "600", color: "#2c3e50" }}>
                    {attraction.name}
                  </span>
                  <span style={styles.attractionType}>{attraction.type}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <ReviewsSection destinationId={id} />
    </div>
  );
};

export default DestinationDetail;