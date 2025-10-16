import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { useLocation, useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ItineraryPlanner.css";

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Activity types
const ACTIVITY_TYPES = {
  ATTRACTION: "attraction",
  RESTAURANT: "restaurant",
  HOTEL: "hotel",
  EVENT: "event"
};

// Recommendation categories
const recommendationCategories = [
  { label: "Attractions", type: ACTIVITY_TYPES.ATTRACTION },
  { label: "Restaurants", type: ACTIVITY_TYPES.RESTAURANT },
  { label: "Hotels", type: ACTIVITY_TYPES.HOTEL },
  { label: "Events", type: ACTIVITY_TYPES.EVENT }
];

// Popular destinations with sample recommendations
const DESTINATIONS = {
  "Paris, France": {
    center: [48.8566, 2.3522],
    recommendations: {
      [ACTIVITY_TYPES.ATTRACTION]: [
        { name: "Eiffel Tower", position: [48.8584, 2.2945] },
        { name: "Louvre Museum", position: [48.8606, 2.3376] },
        { name: "Arc de Triomphe", position: [48.8738, 2.2950] },
        { name: "Musée d'Orsay", position: [48.8599, 2.3266] },
        { name: "Luxembourg Gardens", position: [48.8462, 2.3372] }
      ],
      [ACTIVITY_TYPES.RESTAURANT]: [
        { name: "Le Jules Verne", position: [48.8579, 2.2949] },
        { name: "Café de Flore", position: [48.854, 2.3327] }
      ],
      [ACTIVITY_TYPES.HOTEL]: [
        { name: "Hôtel Plaza Athénée", position: [48.8666, 2.3014] },
        { name: "Le Meurice", position: [48.8656, 2.3276] }
      ],
      [ACTIVITY_TYPES.EVENT]: [
        { name: "Seine River Cruise", position: [48.8566, 2.3522] },
        { name: "Moulin Rouge Show", position: [48.8841, 2.3323] }
      ]
    }
  },
  "Bangalore, India": {
    center: [12.9716, 77.5946],
    recommendations: {
      [ACTIVITY_TYPES.ATTRACTION]: [
        { name: "Lalbagh Botanical Garden", position: [12.9507, 77.5848] },
        { name: "Bangalore Palace", position: [12.9987, 77.5925] },
        { name: "Cubbon Park", position: [12.9764, 77.5928] },
        { name: "Vidhana Soudha", position: [12.9794, 77.5905] },
        { name: "ISKCON Temple", position: [13.0105, 77.5510] }
      ],
      [ACTIVITY_TYPES.RESTAURANT]: [
        { name: "Mavalli Tiffin Rooms", position: [12.9591, 77.5734] },
        { name: "Karavalli", position: [12.9148, 77.6336] }
      ],
      [ACTIVITY_TYPES.HOTEL]: [
        { name: "Taj West End", position: [12.9665, 77.5870] },
        { name: "The Leela Palace", position: [12.9597, 77.6474] }
      ],
      [ACTIVITY_TYPES.EVENT]: [
        { name: "Bangalore Food Festival", position: [12.9716, 77.5946] },
        { name: "Namma Metro Cultural Show", position: [12.9716, 77.5946] }
      ]
    }
  },
  "New York, USA": {
    center: [40.7128, -74.0060],
    recommendations: {
      [ACTIVITY_TYPES.ATTRACTION]: [
        { name: "Statue of Liberty", position: [40.6892, -74.0445] },
        { name: "Central Park", position: [40.7812, -73.9665] },
        { name: "Times Square", position: [40.7580, -73.9855] },
        { name: "Empire State Building", position: [40.7484, -73.9857] },
        { name: "Metropolitan Museum of Art", position: [40.7794, -73.9632] }
      ],
      [ACTIVITY_TYPES.RESTAURANT]: [
        { name: "Katz's Delicatessen", position: [40.7223, -73.9875] },
        { name: "Peter Luger Steak House", position: [40.7099, -73.9621] }
      ],
      [ACTIVITY_TYPES.HOTEL]: [
        { name: "The Plaza Hotel", position: [40.7644, -73.9740] },
        { name: "The Ritz-Carlton", position: [40.7614, -73.9776] }
      ],
      [ACTIVITY_TYPES.EVENT]: [
        { name: "Broadway Show", position: [40.7590, -73.9845] },
        { name: "Yankees Baseball Game", position: [40.8296, -73.9262] }
      ]
    }
  },
  "Tokyo, Japan": {
    center: [35.6762, 139.6503],
    recommendations: {
      [ACTIVITY_TYPES.ATTRACTION]: [
        { name: "Senso-ji Temple", position: [35.7148, 139.7967] },
        { name: "Tokyo Skytree", position: [35.7101, 139.8107] },
        { name: "Shibuya Crossing", position: [35.6595, 139.7005] },
        { name: "Meiji Shrine", position: [35.6764, 139.6993] },
        { name: "Imperial Palace", position: [35.6852, 139.7528] }
      ],
      [ACTIVITY_TYPES.RESTAURANT]: [
        { name: "Sukiyabashi Jiro", position: [35.6656, 139.7599] },
        { name: "Ichiran Ramen", position: [35.6692, 139.6959] }
      ],
      [ACTIVITY_TYPES.HOTEL]: [
        { name: "Park Hyatt Tokyo", position: [35.6585, 139.6973] },
        { name: "The Ritz-Carlton", position: [35.6905, 139.6923] }
      ],
      [ACTIVITY_TYPES.EVENT]: [
        { name: "Sumo Tournament", position: [35.6970, 139.7915] },
        { name: "Cherry Blossom Festival", position: [35.6895, 139.6917] }
      ]
    }
  }
};

// Add these API functions to your component
const API_BASE_URL = "http://localhost:8080/api";

const itineraryAPI = {
  // Get all itineraries
  getItineraries: () => fetch(`${API_BASE_URL}/itineraries`).then(async (res) => {
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Backend Error Response:", errorText);
      throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
    }
    return res.json();
  }),
  
  // Get specific itinerary
  getItinerary: (id) => fetch(`${API_BASE_URL}/itineraries/${id}`).then(async (res) => {
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Backend Error Response:", errorText);
      throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
    }
    return res.json();
  }),
  
  // Create new itinerary
  createItinerary: (itinerary) => 
    fetch(`${API_BASE_URL}/itineraries`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(itinerary)
    }).then(async (res) => {
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend Error Response:", errorText);
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }
      return res.json();
    }),
  
  // Update itinerary activities
  updateActivities: (id, activities) =>
    fetch(`${API_BASE_URL}/itineraries/${id}/activities`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(activities)
    }).then(async (res) => {
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend Error Response:", errorText);
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }
      return res.json();
    }),
  
  // Generate share link
  generateShareLink: (id) =>
    fetch(`${API_BASE_URL}/itineraries/${id}/share`, {
      method: 'POST',
      headers: { 
        'Accept': 'application/json'
      }
    }).then(async (res) => {
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend Error Response:", errorText);
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }
      return res.json();
    })
};

// Fallback API for demo mode
const demoAPI = {
  createItinerary: (itinerary) => {
    const id = 'demo-' + Date.now();
    localStorage.setItem(`itinerary-${id}`, JSON.stringify({...itinerary, id}));
    return Promise.resolve({ ...itinerary, id });
  },
  
  updateActivities: (id, activities) => {
    const existing = JSON.parse(localStorage.getItem(`itinerary-${id}`) || '{}');
    const updated = {...existing, activities};
    localStorage.setItem(`itinerary-${id}`, JSON.stringify(updated));
    return Promise.resolve(updated);
  },
  
  generateShareLink: (id) => {
    return Promise.resolve({ shareToken: id });
  }
};

const ItineraryPlanner = () => {
  const [activities, setActivities] = useState([]);
  const [activeCategory, setActiveCategory] = useState(ACTIVITY_TYPES.ATTRACTION);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [currentItineraryId, setCurrentItineraryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState("Paris, France");
  const [itineraryTitle, setItineraryTitle] = useState("My Travel Itinerary");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [usingDemoMode, setUsingDemoMode] = useState(false);

  // Get destination from navigation state
  const location = useLocation();
  const { id } = useParams();
  const destinationFromState = location.state?.destination;

  // Load itinerary on component mount
  useEffect(() => {
    loadItinerary();
  }, [id, destinationFromState]);

  // Function to generate dynamic recommendations for new destinations
  const generateDynamicRecommendations = (destName) => {
    return {
      [ACTIVITY_TYPES.ATTRACTION]: [
        { name: `${destName} City Center`, position: [0, 0] },
        { name: `${destName} Museum`, position: [0.01, 0.01] },
        { name: `${destName} Park`, position: [-0.01, -0.01] }
      ],
      [ACTIVITY_TYPES.RESTAURANT]: [
        { name: `Traditional ${destName} Cuisine`, position: [0.005, 0.005] },
        { name: `${destName} Cafe`, position: [-0.005, -0.005] }
      ],
      [ACTIVITY_TYPES.HOTEL]: [
        { name: `${destName} Grand Hotel`, position: [0.008, 0.008] },
        { name: `${destName} Boutique Inn`, position: [-0.008, -0.008] }
      ],
      [ACTIVITY_TYPES.EVENT]: [
        { name: `${destName} Cultural Festival`, position: [0, 0] },
        { name: `${destName} Night Market`, position: [0.002, 0.002] }
      ]
    };
  };

  // Load or create itinerary
  const loadItinerary = async () => {
    try {
      setLoading(true);
      
      // Check if we need to create a new itinerary for a dynamic destination
      if (destinationFromState && !Object.keys(DESTINATIONS).includes(destinationFromState)) {
        DESTINATIONS[destinationFromState] = {
          center: [0, 0], // Default center
          recommendations: generateDynamicRecommendations(destinationFromState)
        };
        setDestination(destinationFromState);
        setItineraryTitle(`My ${destinationFromState} Itinerary`);
      }
      
      // If we have an itinerary ID, try to load it
      if (id && id !== "create") {
        try {
          const itinerary = await itineraryAPI.getItinerary(id);
          setCurrentItineraryId(itinerary.id);
          setActivities(itinerary.activities || []);
          setDestination(itinerary.destination || "Paris, France");
          setItineraryTitle(itinerary.title || "My Travel Itinerary");
          toast.success(`✅ Itinerary "${itinerary.title}" loaded successfully!`);
        } catch (error) {
          console.error("Error loading itinerary from backend, using demo mode:", error);
          setUsingDemoMode(true);
          // Try to load from demo storage
          const demoItinerary = JSON.parse(localStorage.getItem(`itinerary-${id}`) || 'null');
          if (demoItinerary) {
            setActivities(demoItinerary.activities || []);
            setDestination(demoItinerary.destination || "Paris, France");
            setItineraryTitle(demoItinerary.title || "My Travel Itinerary");
            toast.info("📱 Loaded from demo storage");
          } else {
            // Create new demo itinerary
            createDemoItinerary();
          }
        }
      } else {
        // Create a new itinerary
        try {
          const newItinerary = await itineraryAPI.createItinerary({
            title: itineraryTitle,
            description: `My amazing trip to ${destination}`,
            destination: destination,
            activities: []
          });
          
          setCurrentItineraryId(newItinerary.id);
          setActivities(newItinerary.activities || []);
          toast.success("✨ New itinerary created! Start adding activities.");
        } catch (error) {
          console.error("Error creating itinerary, using demo mode:", error);
          setUsingDemoMode(true);
          createDemoItinerary();
        }
      }
    } catch (error) {
      console.error("Unexpected error loading itinerary:", error);
      toast.error("❌ Failed to load itinerary");
      setUsingDemoMode(true);
      createDemoItinerary();
    } finally {
      setLoading(false);
    }
  };

  // Create demo itinerary
  const createDemoItinerary = () => {
    const demoId = 'demo-' + Date.now();
    const demoItinerary = {
      title: itineraryTitle,
      description: `My amazing trip to ${destination}`,
      destination: destination,
      activities: [
        {
          id: "1",
          name: "Eiffel Tower",
          position: [48.8584, 2.2945],
          type: ACTIVITY_TYPES.ATTRACTION,
          duration: 2,
          startTime: "10:00",
          notes: "Buy tickets in advance"
        },
        {
          id: "2",
          name: "Louvre Museum",
          position: [48.8606, 2.3376],
          type: ACTIVITY_TYPES.ATTRACTION,
          duration: 3,
          startTime: "14:00"
        }
      ]
    };
    
    localStorage.setItem(`itinerary-${demoId}`, JSON.stringify(demoItinerary));
    setCurrentItineraryId(demoId);
    setActivities(demoItinerary.activities);
    toast.info("🔄 Using demo mode with sample activities");
  };

  // Get the appropriate API based on mode
  const getAPI = () => {
    return usingDemoMode ? demoAPI : itineraryAPI;
  };

  // Handle destination change
  const handleDestinationChange = async (newDestination) => {
    setDestination(newDestination);
    
    // Create a new itinerary for the selected destination
    try {
      setLoading(true);
      const api = getAPI();
      const newItinerary = await api.createItinerary({
        title: `My ${newDestination} Itinerary`,
        description: `My amazing trip to ${newDestination}`,
        destination: newDestination,
        activities: []
      });
      
      setCurrentItineraryId(newItinerary.id);
      setActivities([]);
      setItineraryTitle(`My ${newDestination} Itinerary`);
      toast.success(`📍 Created new itinerary for ${newDestination}`);
    } catch (error) {
      console.error("Error creating itinerary:", error);
      toast.error("❌ Failed to create new itinerary");
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter recommendations based on search and category
  const filteredRecommendations = DESTINATIONS[destination]?.recommendations[activeCategory]?.filter(rec =>
    rec.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Handle drag and drop
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedActivities = Array.from(activities);
    const [movedItem] = reorderedActivities.splice(result.source.index, 1);
    reorderedActivities.splice(result.destination.index, 0, movedItem);

    setActivities(reorderedActivities);
    
    // Save to backend
    try {
      const api = getAPI();
      await api.updateActivities(currentItineraryId, reorderedActivities);
      toast.success("🔄 Itinerary reordered and saved automatically");
    } catch (error) {
      console.error("Error saving itinerary:", error);
      toast.error("❌ Failed to save changes");
    }
  };

  // Add activity from recommendations
  const addActivity = async (recommendation) => {
    const newActivity = {
      id: Date.now().toString(),
      name: recommendation.name,
      position: recommendation.position,
      type: activeCategory,
      duration: 1, // default duration
      startTime: "",
      notes: ""
    };

    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    
    // Save to backend
    try {
      const api = getAPI();
      await api.updateActivities(currentItineraryId, updatedActivities);
      toast.success(`✅ "${recommendation.name}" added to itinerary`);
    } catch (error) {
      console.error("Error adding activity:", error);
      toast.error("❌ Failed to add activity");
    }
  };

  // Remove activity
  const removeActivity = async (id) => {
    const activityToRemove = activities.find(a => a.id === id);
    const updatedActivities = activities.filter(activity => activity.id !== id);
    setActivities(updatedActivities);
    
    if (selectedActivity && selectedActivity.id === id) {
      setSelectedActivity(null);
    }
    
    // Save to backend
    try {
      const api = getAPI();
      await api.updateActivities(currentItineraryId, updatedActivities);
      toast.info(`🗑️ "${activityToRemove.name}" removed from itinerary`);
    } catch (error) {
      console.error("Error removing activity:", error);
      toast.error("❌ Failed to remove activity");
    }
  };

  // Update activity details
  const updateActivity = async (id, updates) => {
    const updatedActivities = activities.map(activity => 
      activity.id === id ? { ...activity, ...updates } : activity
    );
    
    setActivities(updatedActivities);
    
    if (selectedActivity && selectedActivity.id === id) {
      setSelectedActivity({ ...selectedActivity, ...updates });
    }
    
    // Save to backend
    try {
      const api = getAPI();
      await api.updateActivities(currentItineraryId, updatedActivities);
      toast.info("✏️ Activity details updated");
    } catch (error) {
      console.error("Error updating activity:", error);
      toast.error("❌ Failed to update activity");
    }
  };

  // Generate AI recommendations
  const generateAIRecommendations = () => {
    setIsGeneratingAI(true);
    toast.info("🤖 Generating AI recommendations...");
    
    // Simulate API call
    setTimeout(() => {
      // Add some new recommendations based on destination
      const newRecommendations = {
        [ACTIVITY_TYPES.ATTRACTION]: [
          { name: `${destination.split(',')[0]} Historic District`, position: DESTINATIONS[destination].center },
          { name: `${destination.split(',')[0]} Museum of Art`, position: [
            DESTINATIONS[destination].center[0] + 0.005, 
            DESTINATIONS[destination].center[1] + 0.005
          ] }
        ],
        [ACTIVITY_TYPES.RESTAURANT]: [
          { name: `Traditional ${destination.split(',')[1] ? destination.split(',')[1].trim() : 'Local'} Cuisine`, position: [
            DESTINATIONS[destination].center[0] - 0.005, 
            DESTINATIONS[destination].center[1] - 0.005
          ] }
        ]
      };

      // In a real app, we would merge these with existing recommendations
      Object.keys(newRecommendations).forEach(key => {
        if (!DESTINATIONS[destination].recommendations[key]) {
          DESTINATIONS[destination].recommendations[key] = [];
        }
        DESTINATIONS[destination].recommendations[key] = [
          ...DESTINATIONS[destination].recommendations[key],
          ...newRecommendations[key]
        ];
      });

      setIsGeneratingAI(false);
      toast.success("✨ AI recommendations generated! Check the recommendations list.");
    }, 1500);
  };

  // Save itinerary
  const saveItinerary = async () => {
    setIsSaving(true);
    try {
      const api = getAPI();
      await api.updateActivities(currentItineraryId, activities);
      toast.success("💾 Itinerary saved successfully!");
    } catch (error) {
      console.error("Error saving itinerary:", error);
      toast.error("❌ Failed to save itinerary");
    } finally {
      setIsSaving(false);
    }
  };

  // Update itinerary title
  const updateItineraryTitle = async () => {
    setIsEditingTitle(false);
    // In a real app, you would make an API call to update the title
    toast.success("📝 Itinerary title updated");
  };

  // Generate shareable link
  const generateShareLink = async () => {
    setIsSharing(true);
    try {
      const api = getAPI();
      const itinerary = await api.generateShareLink(currentItineraryId);
      const link = `http://localhost:3000/share/${itinerary.shareToken}`;
      navigator.clipboard.writeText(link);
      toast.success(
        <div>
          <div>🔗 Shareable link copied to clipboard!</div>
          <div style={{ fontSize: '12px', marginTop: '5px' }}>
            Share this link: {link}
          </div>
        </div>,
        { autoClose: 5000 }
      );
    } catch (error) {
      console.error("Error generating share link:", error);
      toast.error("❌ Failed to generate share link");
    } finally {
      setIsSharing(false);
    }
  };

  // Calculate route for the map
  const calculateRoute = () => {
    return activities.map(activity => activity.position);
  };

  if (loading) {
    return (
      <div className="itinerary-planner">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="itinerary-planner">
      {usingDemoMode && (
        <div className="demo-mode-banner">
          ⚠️ Using Demo Mode - Data stored locally in browser
        </div>
      )}
      
      <div className="planner-header">
        <div className="destination-selector">
          <label>Select Destination: </label>
          <select 
            value={destination} 
            onChange={(e) => handleDestinationChange(e.target.value)}
          >
            {Object.keys(DESTINATIONS).map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
        
        <div className="itinerary-title">
          {isEditingTitle ? (
            <input
              type="text"
              value={itineraryTitle}
              onChange={(e) => setItineraryTitle(e.target.value)}
              onBlur={updateItineraryTitle}
              onKeyPress={(e) => e.key === 'Enter' && updateItineraryTitle()}
              autoFocus
            />
          ) : (
            <h1 onClick={() => setIsEditingTitle(true)}>{itineraryTitle}</h1>
          )}
        </div>
        
        <div className="action-buttons">
          <button 
            onClick={saveItinerary} 
            className="save-btn"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span className="spinner-small"></span>
                Saving...
              </>
            ) : (
              "💾 Save Itinerary"
            )}
          </button>
          <button 
            onClick={generateShareLink} 
            className="share-btn"
            disabled={isSharing}
          >
            {isSharing ? (
              <>
                <span className="spinner-small"></span>
                Generating...
              </>
            ) : (
              "🔗 Share Itinerary"
            )}
          </button>
        </div>
      </div>

      <div className="planner-container">
        {/* Recommendations Panel */}
        <div className="recommendations-panel">
          <h2>Recommendations for {destination}</h2>
          
          {/* Category tabs */}
          <div className="category-tabs">
            {recommendationCategories.map(category => (
              <button
                key={category.type}
                onClick={() => setActiveCategory(category.type)}
                className={`tab-btn ${activeCategory === category.type ? 'active' : ''}`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search recommendations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* AI Recommendations button */}
          <button
            onClick={generateAIRecommendations}
            disabled={isGeneratingAI}
            className="ai-recommendations-btn"
          >
            {isGeneratingAI ? (
              <>
                <span className="spinner-small"></span>
                Generating...
              </>
            ) : (
              "🤖 Get AI Recommendations"
            )}
          </button>

          {/* Recommendations list */}
          <div className="recommendations-list">
            {filteredRecommendations.length > 0 ? (
              <ul>
                {filteredRecommendations.map((rec, idx) => (
                  <li key={idx} onClick={() => addActivity(rec)}>
                    <span>{rec.name}</span>
                    <button className="add-btn">+ Add</button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">No recommendations found</div>
            )}
          </div>
        </div>

        {/* Itinerary Panel */}
        <div className="itinerary-panel">
          <h2>Your Itinerary for {destination}</h2>
          
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="activities">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="activities-list"
                >
                  {activities.length > 0 ? (
                    activities.map((activity, index) => (
                      <Draggable
                        key={activity.id}
                        draggableId={activity.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`activity-item ${selectedActivity?.id === activity.id ? 'selected' : ''}`}
                            onClick={() => setSelectedActivity(activity)}
                          >
                            <div className="activity-info">
                              <h3>{activity.name}</h3>
                              <div className="activity-meta">
                                <span className="activity-type">{activity.type}</span>
                                {activity.startTime && (
                                  <span className="activity-time">{activity.startTime}</span>
                                )}
                                <span className="activity-duration">{activity.duration} hr</span>
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeActivity(activity.id);
                              }}
                              className="remove-btn"
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))
                    ) : (
                      <div className="empty-state">
                        Drag activities here or add from recommendations
                      </div>
                    )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {/* Activity details */}
          {selectedActivity && (
            <div className="activity-details">
              <h3>Edit Activity</h3>
              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="time"
                  value={selectedActivity.startTime || ""}
                  onChange={(e) => updateActivity(selectedActivity.id, { startTime: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Duration (hours)</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={selectedActivity.duration}
                  onChange={(e) => updateActivity(selectedActivity.id, { duration: parseFloat(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={selectedActivity.notes || ""}
                  onChange={(e) => updateActivity(selectedActivity.id, { notes: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>

        {/* Map Panel */}
        <div className="map-panel">
          <h2>Map View - {destination}</h2>
          <div className="map-container">
            <MapContainer
              center={DESTINATIONS[destination]?.center || [0, 0]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {activities.map((activity, idx) => (
                <Marker 
                  key={idx} 
                  position={activity.position}
                  eventHandlers={{
                    click: () => setSelectedActivity(activity),
                  }}
                >
                  <Popup>
                    <h3>{activity.name}</h3>
                    <p>Type: {activity.type}</p>
                    {activity.startTime && <p>Time: {activity.startTime}</p>}
                    <p>Duration: {activity.duration} hour{activity.duration !== 1 ? 's' : ''}</p>
                  </Popup>
                </Marker>
              ))}
              <Polyline 
                positions={calculateRoute()} 
                color="blue" 
                weight={3}
                opacity={0.7}
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPlanner;