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
  const [customDestinations, setCustomDestinations] = useState([]);

  // Combine popular destinations with custom searched destinations
  const allDestinations = [...new Set([...popularDestinations, ...customDestinations])];
  
  const filteredDestinations = allDestinations.filter(dest => 
    dest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (destination) => {
    // Add to custom destinations if it's not in popular ones
    if (!popularDestinations.includes(destination) && !customDestinations.includes(destination)) {
      setCustomDestinations(prev => [...prev, destination]);
    }
    
    onSelect(destination);
    setSearchQuery('');
    setIsFocused(false);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() && !allDestinations.includes(searchQuery)) {
      // If user typed a new city, add it and select it
      const newCity = searchQuery.trim();
      setCustomDestinations(prev => [...prev, newCity]);
      handleSelect(newCity);
    } else if (allDestinations.includes(searchQuery)) {
      // If it's already in the list, just select it
      handleSelect(searchQuery);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="destination-selector">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search any city worldwide..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="search-submit-btn"
          onClick={handleSearchSubmit}
        >
          Search
        </button>
        
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
                  {!popularDestinations.includes(destination) && (
                    <span className="custom-badge">New</span>
                  )}
                </div>
              ))
            ) : (
              <div 
                className="suggestion-item add-new"
                onClick={() => handleSearchSubmit()}
              >
                <span>Search for "{searchQuery}"</span>
                <span className="search-badge">Click to search</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="selected-destination">
        {selectedDestination ? (
          <span>
            Currently showing: <strong>{selectedDestination}</strong>
            {!popularDestinations.includes(selectedDestination) && (
              <span className="custom-indicator"> (Searched City)</span>
            )}
          </span>
        ) : (
          <span>Search any city to see real-time information</span>
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

      {customDestinations.length > 0 && (
        <div className="recent-searches">
          <p>Recently searched:</p>
          <div className="destination-tags">
            {customDestinations.map(destination => (
              <button
                key={destination}
                className={`tag recent ${selectedDestination === destination ? 'active' : ''}`}
                onClick={() => handleSelect(destination)}
              >
                {destination}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationSelector;