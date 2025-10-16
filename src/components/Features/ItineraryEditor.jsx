import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/itineraryEditor.css';

const ItineraryEditor = () => {
  const [itinerary, setItinerary] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentItineraryId, setCurrentItineraryId] = useState(null);

  const API_BASE_URL = "http://localhost:8080/api";

  // Load or create a simple itinerary on component mount
  useEffect(() => {
    loadOrCreateItinerary();
  }, []);

  const loadOrCreateItinerary = async () => {
    try {
      setLoading(true);
      
      // Try to get existing itineraries first
      const response = await axios.get(`${API_BASE_URL}/itineraries`);
      const itineraries = response.data;

      // Find a simple itinerary or create one
      let simpleItinerary = itineraries.find(it => 
        it.title === "Simple Collaborative Itinerary"
      );

      if (!simpleItinerary) {
        // Create a new simple itinerary
        const newItinerary = {
          title: "Simple Collaborative Itinerary",
          description: "Basic task list for quick planning",
          isPublic: true,
          activities: []
        };
        
        const createResponse = await axios.post(`${API_BASE_URL}/itineraries`, newItinerary);
        simpleItinerary = createResponse.data;
      }

      setCurrentItineraryId(simpleItinerary.id);
      
      // Convert activities to simple tasks for this component
      const tasks = simpleItinerary.activities?.map(activity => ({
        id: activity.id || Date.now(),
        task: activity.name
      })) || [];

      setItinerary(tasks);
      
    } catch (error) {
      console.error("Error loading itinerary:", error);
      // Fallback to local state if backend is unavailable
      console.log("Using local state as fallback");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    if (!newItem.trim()) return;

    try {
      const newTask = { task: newItem, id: Date.now() };
      const updatedItinerary = [...itinerary, newTask];
      setItinerary(updatedItinerary);
      setNewItem('');

      // Convert to activity format and save to backend
      if (currentItineraryId) {
        const activities = updatedItinerary.map((item, index) => ({
          name: item.task,
          type: "task",
          duration: 1,
          orderIndex: index
        }));

        await axios.put(
          `${API_BASE_URL}/itineraries/${currentItineraryId}/activities`,
          activities
        );
      }
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      const updatedItinerary = itinerary.filter((item) => item.id !== id);
      setItinerary(updatedItinerary);

      // Update backend
      if (currentItineraryId) {
        const activities = updatedItinerary.map((item, index) => ({
          name: item.task,
          type: "task",
          duration: 1,
          orderIndex: index
        }));

        await axios.put(
          `${API_BASE_URL}/itineraries/${currentItineraryId}/activities`,
          activities
        );
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (loading) {
    return (
      <div className="itinerary-editor">
        <div className="loading">Loading your itinerary...</div>
      </div>
    );
  }

  return (
    <div className="itinerary-editor">
      <h2>📅 Collaborative Itinerary</h2>
      <p className="subtitle">Simple task list - automatically saved to your travel plans</p>
      
      <div className="form">
        <input
          type="text"
          placeholder="Add task or plan..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <button onClick={addItem}>Add</button>
      </div>
      
      <ul>
        {itinerary.length === 0 && (
          <li className="empty-state">No itinerary items added. Start by adding your first task!</li>
        )}
        {itinerary.map((item) => (
          <li key={item.id}>
            <span>{item.task}</span>
            <button onClick={() => removeItem(item.id)}>❌</button>
          </li>
        ))}
      </ul>
      
      <div className="backend-status">
        {currentItineraryId ? (
          <span className="connected">✅ Connected to backend</span>
        ) : (
          <span className="disconnected">⚠️ Using local storage</span>
        )}
      </div>
    </div>
  );
};

export default ItineraryEditor;