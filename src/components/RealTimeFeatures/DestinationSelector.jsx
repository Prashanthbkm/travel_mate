import React, { useState } from 'react';
import '../styles/DestinationSelector.css';

const popularDestinations = [
  'New York', 'London', 'Paris', 'Tokyo', 
  'Sydney', 'Dubai', 'Barcelona', 'Rome',
  'Singapore', 'Bangkok', 'Istanbul', 'Rio de Janeiro'
];

const DestinationSelector = ({ selectedDestination, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredDestinations = popularDestinations.filter(dest => 
    dest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (destination) => {
    onSelect(destination);
    setSearchQuery('');
    setIsFocused(false);
  };

  return (
    <div className="destination-selector">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        {isFocused && searchQuery && (
          <div className="suggestions-dropdown">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map(destination => (
                <div
                  key={destination}
                  className="suggestion-item"
                  onClick={() => handleSelect(destination)}
                >
                  {destination}
                </div>
              ))
            ) : (
              <div className="no-results">No destinations found</div>
            )}
          </div>
        )}
      </div>
      
      <div className="selected-destination">
        {selectedDestination ? (
          <span>
            Currently showing: <strong>{selectedDestination}</strong>
          </span>
        ) : (
          <span>Select a destination to see real-time information</span>
        )}
      </div>
      
      <div className="popular-destinations">
        <p>Popular destinations:</p>
        <div className="destination-tags">
          {popularDestinations.map(destination => (
            <button
              key={destination}
              className={`tag ${selectedDestination === destination ? 'active' : ''}`}
              onClick={() => handleSelect(destination)}
            >
              {destination}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationSelector;