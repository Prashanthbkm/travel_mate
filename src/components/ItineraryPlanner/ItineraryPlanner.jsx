import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
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

// Initial activities
const initialActivities = [
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
  },
  {
    id: "3",
    name: "Notre Dame",
    position: [48.853, 2.3499],
    type: ACTIVITY_TYPES.ATTRACTION,
    duration: 1,
    startTime: "17:00"
  }
];

// Recommendation categories
const recommendationCategories = [
  { label: "Attractions", type: ACTIVITY_TYPES.ATTRACTION },
  { label: "Restaurants", type: ACTIVITY_TYPES.RESTAURANT },
  { label: "Hotels", type: ACTIVITY_TYPES.HOTEL },
  { label: "Events", type: ACTIVITY_TYPES.EVENT }
];

// Mock recommendations data
const mockRecommendations = {
  [ACTIVITY_TYPES.ATTRACTION]: [
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
};

const ItineraryPlanner = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [activeCategory, setActiveCategory] = useState(ACTIVITY_TYPES.ATTRACTION);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Filter recommendations based on search and category
  const filteredRecommendations = mockRecommendations[activeCategory].filter(rec =>
    rec.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle drag and drop
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedActivities = Array.from(activities);
    const [movedItem] = reorderedActivities.splice(result.source.index, 1);
    reorderedActivities.splice(result.destination.index, 0, movedItem);

    setActivities(reorderedActivities);
    toast.success("Itinerary reordered");
  };

  // Add activity from recommendations
  const addActivity = (recommendation) => {
    const newActivity = {
      id: Date.now().toString(),
      name: recommendation.name,
      position: recommendation.position,
      type: activeCategory,
      duration: 1, // default duration
      startTime: "",
      notes: ""
    };

    setActivities([...activities, newActivity]);
    toast.success(`${recommendation.name} added to itinerary`);
  };

  // Remove activity
  const removeActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
    if (selectedActivity && selectedActivity.id === id) {
      setSelectedActivity(null);
    }
    toast.info("Activity removed");
  };

  // Update activity details
  const updateActivity = (id, updates) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, ...updates } : activity
    ));
    
    if (selectedActivity && selectedActivity.id === id) {
      setSelectedActivity({ ...selectedActivity, ...updates });
    }
  };

  // Generate AI recommendations
  const generateAIRecommendations = () => {
    setIsGeneratingAI(true);
    // Simulate API call
    setTimeout(() => {
      const newRecommendations = {
        [ACTIVITY_TYPES.ATTRACTION]: [
          { name: "Montmartre", position: [48.8867, 2.3431] },
          { name: "Sainte-Chapelle", position: [48.8554, 2.3450] }
        ],
        [ACTIVITY_TYPES.RESTAURANT]: [
          { name: "Les Deux Magots", position: [48.8539, 2.3334] }
        ]
      };

      // In a real app, we would merge these with existing recommendations
      Object.keys(newRecommendations).forEach(key => {
        mockRecommendations[key] = [
          ...mockRecommendations[key],
          ...newRecommendations[key]
        ];
      });

      setIsGeneratingAI(false);
      toast.success("AI recommendations generated");
    }, 1500);
  };

  // Save itinerary
  const saveItinerary = () => {
    toast.success("Itinerary saved successfully");
    console.log("Saved itinerary:", activities);
  };

  // Generate shareable link
  const generateShareLink = () => {
    const link = `https://travelmate.com/itinerary/${btoa(JSON.stringify(activities))}`;
    navigator.clipboard.writeText(link);
    toast.info("Shareable link copied to clipboard");
  };

  // Calculate route for the map
  const calculateRoute = () => {
    return activities.map(activity => activity.position);
  };

  return (
    <div className="itinerary-planner">
      <div className="planner-header">
        <h1>Paris Adventure Itinerary</h1>
        <div className="action-buttons">
          <button onClick={saveItinerary} className="save-btn">
            Save Itinerary
          </button>
          <button onClick={generateShareLink} className="share-btn">
            Share Itinerary
          </button>
        </div>
      </div>

      <div className="planner-container">
        {/* Recommendations Panel */}
        <div className="recommendations-panel">
          <h2>Recommendations</h2>
          
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
            {isGeneratingAI ? "Generating..." : "Get AI Recommendations"}
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
          <h2>Your Itinerary</h2>
          
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
          <h2>Map View</h2>
          <div className="map-container">
            <MapContainer
              center={[48.8584, 2.2945]}
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