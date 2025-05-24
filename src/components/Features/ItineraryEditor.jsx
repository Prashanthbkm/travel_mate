import React, { useState } from 'react';
import '../styles/itineraryEditor.css';

const ItineraryEditor = () => {
  const [itinerary, setItinerary] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (!newItem.trim()) return;
    setItinerary([...itinerary, { task: newItem, id: Date.now() }]);
    setNewItem('');
  };

  const removeItem = (id) => {
    setItinerary(itinerary.filter((item) => item.id !== id));
  };

  return (
    <div className="itinerary-editor">
      <h2>📅 Collaborative Itinerary</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Add task or plan..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>Add</button>
      </div>
      <ul>
        {itinerary.length === 0 && <li>No itinerary items added.</li>}
        {itinerary.map((item) => (
          <li key={item.id}>
            {item.task} <button onClick={() => removeItem(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryEditor;
