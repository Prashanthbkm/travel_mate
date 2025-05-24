import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaSearch, FaMoneyBillWave, FaCloudSun, FaMountain, FaUmbrellaBeach, FaLandmark, FaStar, FaFilter } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons for different types
const attractionIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const hotelIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const restaurantIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Sample data
const trendingDestinations = [
  { 
    id: 1, 
    name: "Paris", 
    lat: 48.8566, 
    lng: 2.3522, 
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    budget: "medium",
    weather: "mild",
    interests: ["historical", "romantic"],
    description: "The city of love with iconic landmarks like the Eiffel Tower and Louvre Museum.",
    attractions: [
      { name: "Eiffel Tower", lat: 48.8584, lng: 2.2945, type: "attraction" },
      { name: "Louvre Museum", lat: 48.8606, lng: 2.3376, type: "attraction" },
      { name: "Le Jules Verne", lat: 48.8579, lng: 2.2949, type: "restaurant" },
      { name: "Hôtel Plaza Athénée", lat: 48.8666, lng: 2.3014, type: "hotel" }
    ]
  },
  { 
    id: 2, 
    name: "New York", 
    lat: 40.7128, 
    lng: -74.0060, 
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    budget: "high",
    weather: "varied",
    interests: ["urban", "cultural"],
    description: "The city that never sleeps with iconic skyscrapers and Broadway shows.",
    attractions: [
      { name: "Statue of Liberty", lat: 40.6892, lng: -74.0445, type: "attraction" },
      { name: "Central Park", lat: 40.7829, lng: -73.9654, type: "attraction" },
      { name: "Eleven Madison Park", lat: 40.7416, lng: -73.9877, type: "restaurant" },
      { name: "The Plaza Hotel", lat: 40.7644, lng: -73.9746, type: "hotel" }
    ]
  },
  { 
    id: 3, 
    name: "Tokyo", 
    lat: 35.6762, 
    lng: 139.6503, 
    imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    budget: "medium",
    weather: "varied",
    interests: ["urban", "cultural"],
    description: "A vibrant mix of traditional culture and futuristic technology.",
    attractions: [
      { name: "Shibuya Crossing", lat: 35.6586, lng: 139.7016, type: "attraction" },
      { name: "Senso-ji Temple", lat: 35.7148, lng: 139.7967, type: "attraction" },
      { name: "Sukiyabashi Jiro", lat: 35.6659, lng: 139.7599, type: "restaurant" },
      { name: "Park Hotel Tokyo", lat: 35.6644, lng: 139.7631, type: "hotel" }
    ]
  },
  { 
    id: 4, 
    name: "Bali", 
    lat: -8.4095, 
    lng: 115.1889, 
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    budget: "low",
    weather: "tropical",
    interests: ["beach", "adventure"],
    description: "Tropical paradise with beautiful beaches and rich cultural heritage.",
    attractions: [
      { name: "Uluwatu Temple", lat: -8.8293, lng: 115.0849, type: "attraction" },
      { name: "Tegallalang Rice Terrace", lat: -8.4286, lng: 115.2831, type: "attraction" },
      { name: "Locavore", lat: -8.5069, lng: 115.2625, type: "restaurant" },
      { name: "Four Seasons Bali", lat: -8.8166, lng: 115.1666, type: "hotel" }
    ]
  }
];

const ExploreDestinations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState(trendingDestinations);
  const [budget, setBudget] = useState("any");
  const [weather, setWeather] = useState("any");
  const [interests, setInterests] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [mapCenter, setMapCenter] = useState([20, 0]);
  const [mapZoom, setMapZoom] = useState(2);
  const navigate = useNavigate();

  // Filter destinations based on search and filters
  useEffect(() => {
    const filtered = trendingDestinations.filter((destination) => {
      const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBudget = budget === "any" || destination.budget === budget;
      const matchesWeather = weather === "any" || destination.weather === weather;
      const matchesInterests = interests.length === 0 || 
        interests.some(interest => destination.interests.includes(interest));
      
      return matchesSearch && matchesBudget && matchesWeather && matchesInterests;
    });
    setFilteredDestinations(filtered);
  }, [searchQuery, budget, weather, interests]);

  const handleMarkerClick = (destination) => {
    navigate(`/destination/${destination.id}`);
  };

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
    setMapCenter([destination.lat, destination.lng]);
    setMapZoom(12);
    toast.info(`Showing details for ${destination.name}`);
  };

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const resetFilters = () => {
    setBudget("any");
    setWeather("any");
    setInterests([]);
    setSearchQuery("");
    toast.success("Filters reset");
  };

  const getIconForType = (type) => {
    switch(type) {
      case "attraction": return attractionIcon;
      case "hotel": return hotelIcon;
      case "restaurant": return restaurantIcon;
      default: return L.Icon.Default;
    }
  };

  return (
    <div className="explore-container">
      <h1 className="explore-title">
        <span className="title-text">Explore Destinations</span>
        <span className="title-subtext">Discover your next adventure</span>
      </h1>

      <div className="search-container">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
          >
            <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showFilters && (
          <div className="filters-container">
            <div className="filter-group">
              <label><FaMoneyBillWave /> Budget</label>
              <select 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)}
                className="filter-select"
              >
                <option value="any">Any Budget</option>
                <option value="low">Low Budget</option>
                <option value="medium">Medium Budget</option>
                <option value="high">High Budget</option>
              </select>
            </div>

            <div className="filter-group">
              <label><FaCloudSun /> Weather</label>
              <select 
                value={weather} 
                onChange={(e) => setWeather(e.target.value)}
                className="filter-select"
              >
                <option value="any">Any Weather</option>
                <option value="tropical">Tropical</option>
                <option value="mild">Mild</option>
                <option value="cold">Cold</option>
                <option value="varied">Varied</option>
              </select>
            </div>

            <div className="filter-group">
              <label><FaMountain /> Interests</label>
              <div className="interest-tags">
                <button 
                  onClick={() => toggleInterest("historical")}
                  className={`interest-tag ${interests.includes("historical") ? 'active' : ''}`}
                >
                  <FaLandmark /> Historical
                </button>
                <button 
                  onClick={() => toggleInterest("adventure")}
                  className={`interest-tag ${interests.includes("adventure") ? 'active' : ''}`}
                >
                  <FaMountain /> Adventure
                </button>
                <button 
                  onClick={() => toggleInterest("beach")}
                  className={`interest-tag ${interests.includes("beach") ? 'active' : ''}`}
                >
                  <FaUmbrellaBeach /> Beach
                </button>
              </div>
            </div>

            <button onClick={resetFilters} className="reset-filters">
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      <div className="content-container">
        <div className="destinations-list-container">
          <h2 className="section-title">
            {searchQuery ? "Search Results" : "Trending Destinations"}
            <span className="results-count">{filteredDestinations.length} found</span>
          </h2>

          {filteredDestinations.length === 0 ? (
            <div className="no-results">
              <p>No destinations match your search criteria.</p>
              <button onClick={resetFilters} className="reset-filters">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="destinations-grid">
              {filteredDestinations.map((destination) => (
                <div
                  key={destination.id}
                  onClick={() => handleDestinationClick(destination)}
                  className={`destination-card ${selectedDestination?.id === destination.id ? 'selected' : ''}`}
                >
                  <div className="card-image-container">
                    <img
                      src={destination.imageUrl}
                      alt={destination.name}
                      className="card-image"
                    />
                    <div className="card-badge">
                      <FaStar className="star-icon" />
                      <span>Trending</span>
                    </div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{destination.name}</h3>
                    <p className="card-description">{destination.description}</p>
                    <div className="card-tags">
                      <span className={`budget-tag ${destination.budget}`}>
                        {destination.budget} budget
                      </span>
                      <span className="weather-tag">
                        {destination.weather} weather
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="map-container">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            className="leaflet-map"
          >
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Street View">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Satellite View">
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                />
              </LayersControl.BaseLayer>
            </LayersControl>

            {selectedDestination ? (
              <>
                {selectedDestination.attractions.map((attraction, index) => (
                  <Marker
                    key={index}
                    position={[attraction.lat, attraction.lng]}
                    icon={getIconForType(attraction.type)}
                    eventHandlers={{
                      click: () => navigate(`/attraction/${selectedDestination.id}/${attraction.name}`),
                    }}
                  >
                    <Popup>
                      <div className="map-popup">
                        <h4>{attraction.name}</h4>
                        <p className="popup-type">{attraction.type}</p>
                        <button 
                          onClick={() => navigate(`/attraction/${selectedDestination.id}/${attraction.name}`)}
                          className="popup-button"
                        >
                          View Details
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </>
            ) : (
              filteredDestinations.map((destination) => (
                <Marker
                  key={destination.id}
                  position={[destination.lat, destination.lng]}
                  eventHandlers={{
                    click: () => handleDestinationClick(destination),
                  }}
                >
                  <Popup>
                    <div className="map-popup">
                      <h4>{destination.name}</h4>
                      <p>{destination.description}</p>
                      <button 
                        onClick={() => handleMarkerClick(destination)}
                        className="popup-button"
                      >
                        Explore {destination.name}
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))
            )}
          </MapContainer>

          {selectedDestination && (
            <div className="destination-details">
              <h3>{selectedDestination.name}</h3>
              <p>{selectedDestination.description}</p>
              <div className="detail-tags">
                <span className={`budget-tag ${selectedDestination.budget}`}>
                  {selectedDestination.budget} budget
                </span>
                <span className="weather-tag">
                  {selectedDestination.weather} weather
                </span>
              </div>
              <h4>Top Attractions:</h4>
              <ul className="attractions-list">
                {selectedDestination.attractions.map((attraction, index) => (
                  <li key={index} onClick={() => navigate(`/attraction/${selectedDestination.id}/${attraction.name}`)}>
                    {attraction.name} ({attraction.type})
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleMarkerClick(selectedDestination)}
                className="explore-button"
              >
                Explore {selectedDestination.name}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// CSS Styles
const styles = `
.explore-container {
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f7f9fc;
  color: #333;
  min-height: 100vh;
}

.explore-title {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.title-text {
  display: block;
  font-size: 32px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 8px;
}

.title-subtext {
  display: block;
  font-size: 16px;
  color: #7f8c8d;
  font-weight: normal;
}

.search-container {
  max-width: 1000px;
  margin: 0 auto 30px;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 15px;
  color: #7f8c8d;
  font-size: 18px;
}

.search-input {
  padding: 14px 20px 14px 45px;
  border-radius: 30px;
  border: 2px solid #ddd;
  width: 100%;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52,152,219,0.2);
}

.filter-toggle {
  position: absolute;
  right: 10px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.filter-toggle:hover {
  background: #2980b9;
}

.filter-toggle.active {
  background: #2c3e50;
}

.filters-container {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-top: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.filter-group {
  margin-bottom: 10px;
}

.filter-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 14px;
}

.interest-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.interest-tag {
  padding: 6px 12px;
  border-radius: 20px;
  background: #ecf0f1;
  border: none;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.interest-tag:hover {
  background: #bdc3c7;
}

.interest-tag.active {
  background: #3498db;
  color: white;
}

.reset-filters {
  grid-column: 1 / -1;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-filters:hover {
  background: #c0392b;
}

.content-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.destinations-list-container {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.section-title {
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.results-count {
  font-size: 14px;
  color: #7f8c8d;
  font-weight: normal;
}

.no-results {
  text-align: center;
  padding: 40px 20px;
  color: #7f8c8d;
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.destination-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.destination-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.destination-card.selected {
  border: 3px solid #3498db;
}

.card-image-container {
  position: relative;
  height: 150px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.destination-card:hover .card-image {
  transform: scale(1.05);
}

.card-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.star-icon {
  color: #f1c40f;
}

.card-content {
  padding: 15px;
}

.card-title {
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.card-description {
  font-size: 14px;
  color: #7f8c8d;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.budget-tag {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.budget-tag.low {
  background: #2ecc71;
  color: white;
}

.budget-tag.medium {
  background: #f39c12;
  color: white;
}

.budget-tag.high {
  background: #e74c3c;
  color: white;
}

.weather-tag {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: #3498db;
  color: white;
}

.map-container {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  height: calc(100vh - 200px);
}

.leaflet-map {
  height: 100%;
  width: 100%;
}

.map-popup {
  padding: 10px;
}

.map-popup h4 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.popup-type {
  font-size: 12px;
  color: #7f8c8d;
  margin: 0 0 10px 0;
}

.popup-button {
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.popup-button:hover {
  background: #2980b9;
}

.destination-details {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 20px;
  border-top: 1px solid #ddd;
  z-index: 1000;
  max-height: 40%;
  overflow-y: auto;
}

.destination-details h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.detail-tags {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.attractions-list {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.attractions-list li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.3s ease;
}

.attractions-list li:hover {
  color: #3498db;
}

.explore-button {
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 10px;
}

.explore-button:hover {
  background: #27ae60;
}

@media (max-width: 1024px) {
  .content-container {
    grid-template-columns: 1fr;
  }
  
  .map-container {
    height: 500px;
  }
}

@media (max-width: 768px) {
  .filters-container {
    grid-template-columns: 1fr;
  }
  
  .destinations-grid {
    grid-template-columns: 1fr;
  }
  
  .search-input {
    padding-right: 120px;
  }
}
`;

// Add styles to the head
const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default ExploreDestinations;