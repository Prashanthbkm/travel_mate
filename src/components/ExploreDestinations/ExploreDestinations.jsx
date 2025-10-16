import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaSearch, FaMoneyBillWave, FaCloudSun, FaMountain, FaUmbrellaBeach, FaLandmark, FaStar, FaFilter, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReviewsSection from "./ReviewsSection";

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

// Sample data for trending destinations
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

// Real city data with actual attractions
const realCityData = {
    "bangalore": {
        name: "Bangalore",
        lat: 12.9716,
        lng: 77.5946,
        imageUrl: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        budget: "medium",
        weather: "mild",
        interests: ["urban", "cultural"],
        description: "The Silicon Valley of India, known for its pleasant climate, tech parks, and vibrant culture.",
        attractions: [
            { name: "Lalbagh Botanical Garden", lat: 12.9507, lng: 77.5848, type: "attraction" },
            { name: "Bangalore Palace", lat: 12.9987, lng: 77.5925, type: "attraction" },
            { name: "Cubbon Park", lat: 12.9764, lng: 77.5927, type: "attraction" },
            { name: "ISKCON Temple", lat: 13.0105, lng: 77.5510, type: "attraction" },
            { name: "UB City Mall", lat: 12.9714, lng: 77.5943, type: "attraction" },
            { name: "Windmills Craftworks", lat: 12.9279, lng: 77.6791, type: "restaurant" },
            { name: "Taj West End", lat: 12.9665, lng: 77.5870, type: "hotel" }
        ]
    },
    "london": {
        name: "London",
        lat: 51.5074,
        lng: -0.1278,
        imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        budget: "high",
        weather: "mild",
        interests: ["historical", "cultural"],
        description: "The capital of England, famous for its history, royal palaces, and world-class museums.",
        attractions: [
            { name: "Buckingham Palace", lat: 51.5014, lng: -0.1419, type: "attraction" },
            { name: "London Eye", lat: 51.5033, lng: -0.1195, type: "attraction" },
            { name: "Tower of London", lat: 51.5081, lng: -0.0759, type: "attraction" },
            { name: "British Museum", lat: 51.5194, lng: -0.1270, type: "attraction" },
            { name: "The Shard", lat: 51.5045, lng: -0.0865, type: "attraction" },
            { name: "The Wolseley", lat: 51.5076, lng: -0.1494, type: "restaurant" },
            { name: "The Ritz London", lat: 51.5073, lng: -0.1406, type: "hotel" }
        ]
    },
    "dubai": {
        name: "Dubai",
        lat: 25.2048,
        lng: 55.2708,
        imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        budget: "high",
        weather: "tropical",
        interests: ["urban", "adventure"],
        description: "A modern metropolis known for luxury shopping, ultramodern architecture, and lively nightlife.",
        attractions: [
            { name: "Burj Khalifa", lat: 25.1972, lng: 55.2744, type: "attraction" },
            { name: "The Dubai Mall", lat: 25.1972, lng: 55.2791, type: "attraction" },
            { name: "Palm Jumeirah", lat: 25.1102, lng: 55.1371, type: "attraction" },
            { name: "Dubai Fountain", lat: 25.1972, lng: 55.2792, type: "attraction" },
            { name: "Dubai Marina", lat: 25.0763, lng: 55.1386, type: "attraction" },
            { name: "At.mosphere Burj Khalifa", lat: 25.1972, lng: 55.2744, type: "restaurant" },
            { name: "Burj Al Arab", lat: 25.1412, lng: 55.1852, type: "hotel" }
        ]
    },
    "mumbai": {
        name: "Mumbai",
        lat: 19.0760,
        lng: 72.8777,
        imageUrl: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        budget: "medium",
        weather: "tropical",
        interests: ["urban", "cultural"],
        description: "The financial capital of India, known for Bollywood, street food, and colonial architecture.",
        attractions: [
            { name: "Gateway of India", lat: 18.9220, lng: 72.8347, type: "attraction" },
            { name: "Marine Drive", lat: 18.9445, lng: 72.8226, type: "attraction" },
            { name: "Elephanta Caves", lat: 18.9633, lng: 72.9315, type: "attraction" },
            { name: "Chhatrapati Shivaji Terminus", lat: 18.9441, lng: 72.8359, type: "attraction" },
            { name: "Juhu Beach", lat: 19.1074, lng: 72.8263, type: "attraction" },
            { name: "Trishna Restaurant", lat: 18.9322, lng: 72.8264, type: "restaurant" },
            { name: "Taj Mahal Palace", lat: 18.9217, lng: 72.8332, type: "hotel" }
        ]
    },
    "delhi": {
        name: "Delhi",
        lat: 28.6139,
        lng: 77.2090,
        imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        budget: "medium",
        weather: "varied",
        interests: ["historical", "cultural"],
        description: "The capital of India, rich in history with Mughal architecture and bustling markets.",
        attractions: [
            { name: "India Gate", lat: 28.6129, lng: 77.2295, type: "attraction" },
            { name: "Red Fort", lat: 28.6562, lng: 77.2410, type: "attraction" },
            { name: "Qutub Minar", lat: 28.5244, lng: 77.1855, type: "attraction" },
            { name: "Lotus Temple", lat: 28.5535, lng: 77.2588, type: "attraction" },
            { name: "Chandni Chowk", lat: 28.6562, lng: 77.2307, type: "attraction" },
            { name: "Bukhara Restaurant", lat: 28.6353, lng: 77.2250, type: "restaurant" },
            { name: "The Imperial", lat: 28.6349, lng: 77.2198, type: "hotel" }
        ]
    }
};

// Function to fetch real city data from external API (fallback to our data)
const fetchRealCityData = async (query) => {
    const normalizedQuery = query.toLowerCase().trim();
    
    // First check if we have pre-defined real data
    if (realCityData[normalizedQuery]) {
        return {
            ...realCityData[normalizedQuery],
            id: Math.abs(query.split('').reduce((a, b) => { 
                a = ((a << 5) - a) + b.charCodeAt(0); 
                return a & a; 
            }, 0)),
            isRealData: true
        };
    }

    // If not in our pre-defined data, try to fetch from external API
    try {
        // Using OpenTripMap API for real attractions (free tier)
        const response = await fetch(
            `https://api.opentripmap.com/0.1/en/places/geoname?name=${encodeURIComponent(query)}&apikey=5ae2e3f221c38a28845f05b6e1e72f6e`
        );
        
        if (response.ok) {
            const cityData = await response.json();
            
            if (cityData && cityData.lat && cityData.lon) {
                // Fetch attractions for this city
                const radius = 5000; // 5km radius
                const attractionsResponse = await fetch(
                    `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${cityData.lon}&lat=${cityData.lat}&apikey=5ae2e3f221c38a28845f05b6e1e72f6e`
                );
                
                let attractions = [];
                if (attractionsResponse.ok) {
                    const attractionsData = await attractionsResponse.json();
                    attractions = attractionsData.features.slice(0, 6).map((place, index) => ({
                        name: place.properties.name || `${query} Attraction ${index + 1}`,
                        lat: place.geometry.coordinates[1],
                        lng: place.geometry.coordinates[0],
                        type: "attraction"
                    }));
                }
                
                // Add some default restaurants and hotels
                attractions.push(
                    { name: `${query} Fine Dining`, lat: cityData.lat + 0.01, lng: cityData.lon + 0.01, type: "restaurant" },
                    { name: `${query} Grand Hotel`, lat: cityData.lat - 0.01, lng: cityData.lon - 0.01, type: "hotel" }
                );

                return {
                    id: Math.abs(query.split('').reduce((a, b) => { 
                        a = ((a << 5) - a) + b.charCodeAt(0); 
                        return a & a; 
                    }, 0)),
                    name: query,
                    lat: cityData.lat,
                    lng: cityData.lon,
                    imageUrl: `https://source.unsplash.com/500x300/?${encodeURIComponent(query + ' city landscape')}`,
                    budget: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
                    weather: ["tropical", "mild", "cold", "varied"][Math.floor(Math.random() * 4)],
                    interests: [["historical"], ["adventure"], ["beach"], ["urban"]][Math.floor(Math.random() * 4)],
                    description: `Discover ${query}, a beautiful destination with rich culture and amazing attractions.`,
                    attractions,
                    isRealData: true
                };
            }
        }
    } catch (error) {
        console.log("API fetch failed, using fallback data");
    }

    // Fallback: Generate basic dynamic destination
    return generateDynamicDestination(query);
};

// Fallback function (kept for compatibility)
const generateDynamicDestination = (query) => {
    const id = Math.abs(query.split('').reduce((a, b) => { 
        a = ((a << 5) - a) + b.charCodeAt(0); 
        return a & a; 
    }, 0));
    
    const budgets = ["low", "medium", "high"];
    const weathers = ["tropical", "mild", "cold", "varied"];
    const interestsList = [["historical"], ["adventure"], ["beach"], ["historical", "adventure"], ["beach", "adventure"]];
    
    const randomBudget = budgets[Math.floor(Math.random() * budgets.length)];
    const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
    const randomInterests = interestsList[Math.floor(Math.random() * interestsList.length)];
    
    const lat = (Math.random() * 130) - 65;
    const lng = (Math.random() * 360) - 180;
    
    const attractions = [
        { name: `${query} Central Park`, lat: lat + (Math.random() * 0.1 - 0.05), lng: lng + (Math.random() * 0.1 - 0.05), type: "attraction" },
        { name: `${query} Museum`, lat: lat + (Math.random() * 0.1 - 0.05), lng: lng + (Math.random() * 0.1 - 0.05), type: "attraction" },
        { name: `${query} Fine Dining`, lat: lat + (Math.random() * 0.1 - 0.05), lng: lng + (Math.random() * 0.1 - 0.05), type: "restaurant" },
        { name: `${query} Grand Hotel`, lat: lat + (Math.random() * 0.1 - 0.05), lng: lng + (Math.random() * 0.1 - 0.05), type: "hotel" }
    ];
    
    return {
        id,
        name: query,
        lat,
        lng,
        imageUrl: `https://source.unsplash.com/500x300/?${encodeURIComponent(query + ' city')}`,
        budget: randomBudget,
        weather: randomWeather,
        interests: randomInterests,
        description: `Explore the beautiful destination of ${query} with its unique attractions and cultural experiences.`,
        attractions,
        isRealData: false
    };
};

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
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    // Handle search functionality
    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setIsSearchActive(false);
            setFilteredDestinations(trendingDestinations);
            setSelectedDestination(null);
            setMapCenter([20, 0]);
            setMapZoom(2);
            toast.info("Showing all trending destinations");
            return;
        }

        setIsSearching(true);
        setIsSearchActive(true);

        try {
            // Check if the search query matches any trending destination (partial match)
            const matches = trendingDestinations.filter(dest => 
                dest.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (matches.length > 0) {
                setFilteredDestinations(matches);
                setSelectedDestination(matches[0]);
                setMapCenter([matches[0].lat, matches[0].lng]);
                setMapZoom(12);
                toast.success(`Found ${matches.length} matching destination(s)`);
            } else {
                // Fetch real city data
                const realDestination = await fetchRealCityData(searchQuery);
                setFilteredDestinations([realDestination]);
                setSelectedDestination(realDestination);
                setMapCenter([realDestination.lat, realDestination.lng]);
                setMapZoom(12);
                
                if (realDestination.isRealData) {
                    toast.success(`Showing real attractions for ${searchQuery}`);
                } else {
                    toast.info(`Showing generated results for "${searchQuery}"`);
                }
            }
        } catch (error) {
            console.error("Search error:", error);
            toast.error("Failed to search. Please try again.");
        } finally {
            setIsSearching(false);
        }
    };

    // Filter destinations based on search and filters
    useEffect(() => {
        let destinationsToFilter = isSearchActive ? filteredDestinations : trendingDestinations;
        
        const filtered = destinationsToFilter.filter((destination) => {
            const matchesBudget = budget === "any" || destination.budget === budget;
            const matchesWeather = weather === "any" || destination.weather === weather;
            const matchesInterests = interests.length === 0 || 
                interests.some(interest => destination.interests.includes(interest));
            
            return matchesBudget && matchesWeather && matchesInterests;
        });
        
        setFilteredDestinations(filtered);
        
        // Update selected destination if it's no longer in filtered results
        if (selectedDestination && !filtered.some(dest => dest.id === selectedDestination.id)) {
            setSelectedDestination(filtered.length > 0 ? filtered[0] : null);
        }
    }, [budget, weather, interests, isSearchActive, trendingDestinations]);

    // Reset search when search query is cleared
    useEffect(() => {
        if (!searchQuery.trim() && isSearchActive) {
            setIsSearchActive(false);
            setFilteredDestinations(trendingDestinations);
            setSelectedDestination(null);
            setMapCenter([20, 0]);
            setMapZoom(2);
        }
    }, [searchQuery, isSearchActive]);

    // Function to create itinerary for a destination
    const handleExploreItinerary = async (destination) => {
        try {
            const itineraryData = {
                title: `My ${destination.name} Adventure`,
                description: `Automatically generated itinerary for ${destination.name}`,
                destination: destination.name,
                activities: destination.attractions.map(attr => ({
                    name: attr.name,
                    position: [attr.lat, attr.lng],
                    type: attr.type,
                    duration: 2,
                    startTime: "",
                    notes: ""
                }))
            };

            const response = await fetch('http://localhost:8080/api/itineraries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itineraryData)
            });

            if (response.ok) {
                const newItinerary = await response.json();
                navigate(`/itinerary/${newItinerary.id}`, { state: { destination: destination.name } });
                toast.success(`Itinerary created for ${destination.name}!`);
            } else {
                throw new Error('Failed to create itinerary');
            }
        } catch (error) {
            console.error('Error creating itinerary:', error);
            toast.error('Failed to create itinerary. Using demo mode.');
            navigate('/itinerary/create', { 
                state: { destination: destination.name } 
            });
        }
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
        setIsSearchActive(false);
        setFilteredDestinations(trendingDestinations);
        setSelectedDestination(null);
        setMapCenter([20, 0]);
        setMapZoom(2);
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

    const handleImageError = (e) => {
        e.target.src = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
        e.target.onerror = null;
    };

    return (
        <div className="explore-container">
            <h1 className="explore-title">
                <span className="title-text">Explore Destinations</span>
                <span className="title-subtext">Discover your next adventure</span>
            </h1>

            <div className="search-container">
                <div className="search-input-group">
                    <div className="search-input-wrapper">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search for destinations (e.g., Bangalore, London, Dubai)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="search-input"
                            disabled={isSearching}
                        />
                    </div>
                    <div className="search-buttons-group">
                        <button 
                            onClick={handleSearch}
                            className="search-button"
                            disabled={isSearching}
                        >
                            {isSearching ? <FaSpinner className="spinner" /> : <FaSearch />} 
                            {isSearching ? 'Searching...' : 'Search'}
                        </button>
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className={`filter-toggle ${showFilters ? 'active' : ''}`}
                            disabled={isSearching}
                        >
                            <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>
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
                        {isSearchActive ? "Search Results" : "Trending Destinations"}
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
                                            onError={handleImageError}
                                        />
                                        {!isSearchActive && (
                                            <div className="card-badge">
                                                <FaStar className="star-icon" />
                                                <span>Trending</span>
                                            </div>
                                        )}
                                        {isSearchActive && (
                                            <div className={`card-badge ${destination.isRealData ? 'real-data-badge' : 'search-result-badge'}`}>
                                                <FaMapMarkerAlt className="marker-icon" />
                                                <span>{destination.isRealData ? 'Real Data' : 'Search Result'}</span>
                                            </div>
                                        )}
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
                        key={mapCenter.toString() + mapZoom}
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
                            selectedDestination.attractions.map((attraction, index) => (
                                <Marker
                                    key={`${selectedDestination.id}-${attraction.name}`}
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
                            ))
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
                                                onClick={() => handleDestinationClick(destination)}
                                                className="popup-button"
                                            >
                                                View Details
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
                                <div className="interest-tags">
                                    {selectedDestination.interests.map((interest, index) => (
                                        <span key={index} className="interest-tag active">
                                            {interest === "historical" && <FaLandmark />}
                                            {interest === "adventure" && <FaMountain />}
                                            {interest === "beach" && <FaUmbrellaBeach />}
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <h4>Top Attractions:</h4>
                            <ul className="attractions-list">
                                {selectedDestination.attractions.map((attraction, index) => (
                                    <li key={index} onClick={() => navigate(`/attraction/${selectedDestination.id}/${attraction.name}`)}>
                                        {attraction.name} ({attraction.type})
                                    </li>
                                ))}
                            </ul>
                            
                            <ReviewsSection destinationId={selectedDestination.id} />
                            
                            <button 
                                onClick={() => handleExploreItinerary(selectedDestination)}
                                className="explore-button"
                            >
                                Plan Trip to {selectedDestination.name}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Updated CSS Styles
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

.search-input-group {
    display: flex;
    align-items: stretch;
    gap: 10px;
    background: white;
    padding: 8px;
    border-radius: 30px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    flex-grow: 1;
}

.search-icon {
    position: absolute;
    left: 15px;
    color: #7f8c8d;
    font-size: 18px;
}

.search-input {
    padding: 14px 15px 14px 45px;
    border-radius: 30px;
    border: 2px solid #e9ecef;
    width: 100%;
    font-size: 16px;
    transition: all 0.3s ease;
    background: #f8f9fa;
}

.search-input:focus {
    outline: none;
    border-color: #3498db;
    background: white;
    box-shadow: 0 0 0 3px rgba(52,152,219,0.1);
}

.search-input:disabled {
    background: #e9ecef;
    cursor: not-allowed;
}

.search-buttons-group {
    display: flex;
    gap: 10px;
    align-items: center;
}

.search-button, .filter-toggle {
    position: static;
    background: #2ecc71;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 12px 18px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.search-button:hover:not(:disabled) {
    background: #27ae60;
}

.search-button:disabled {
    background: #95a5a6;
    cursor: not-allowed;
}

.filter-toggle {
    background: #3498db;
}

.filter-toggle:hover:not(:disabled) {
    background: #2980b9;
}

.filter-toggle:disabled {
    background: #95a5a6;
    cursor: not-allowed;
}

.filter-toggle.active {
    background: #2c3e50;
}

.spinner {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
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

.search-result-badge {
    background: rgba(46, 204, 113, 0.8);
}

.real-data-badge {
    background: rgba(52, 152, 219, 0.8);
}

.star-icon {
    color: #f1c40f;
}

.marker-icon {
    color: #fff;
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
    flex-wrap: wrap;
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

    .search-input-group {
        flex-direction: column;
        gap: 8px;
        padding: 10px;
        border-radius: 10px;
    }
    
    .search-buttons-group {
        justify-content: stretch;
        flex-wrap: wrap;
    }
    
    .search-button, .filter-toggle {
        flex-grow: 1;
        padding: 10px 15px;
    }
}
`;

// Add styles to the head
const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default ExploreDestinations;