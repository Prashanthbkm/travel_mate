import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const API_BASE_URL = 'http://localhost:8080/api';

const FlightHotelSearch = ({ onBookingMade, onSearch }) => {
  const [searchType, setSearchType] = useState('flights');
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('');
  const [dates, setDates] = useState({
    start: null,
    end: null
  });
  const [passengers, setPassengers] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    // Validate inputs before searching
    if (!destination) {
      setError('Please enter a destination');
      return;
    }
    
    if (searchType === 'flights' && !origin) {
      setError('Please enter origin for flights');
      return;
    }
    
    if (!dates.start) {
      setError(`Please select ${searchType === 'flights' ? 'departure' : 'check-in'} date`);
      return;
    }
    
    if (searchType === 'hotels' && !dates.end) {
      setError('Please select check-out date');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // For now, let's use mock data since your backend might not have real search implemented
      // Later you can replace this with actual API calls
      
      setTimeout(() => {
        let mockResults = [];
        const formattedStartDate = dates.start.toISOString().split('T')[0];
        
        if (searchType === 'flights') {
          mockResults = [
            {
              id: 1,
              airline: 'SkyWings',
              flightNumber: 'SW123',
              price: 249,
              departure: `${origin} → ${destination}`,
              departureTime: '09:30',
              arrivalTime: '11:45',
              date: formattedStartDate,
              duration: '2h 15m',
              stops: 0
            },
            {
              id: 2,
              airline: 'AirExpress',
              flightNumber: 'AE456',
              price: 199,
              departure: `${origin} → ${destination}`,
              departureTime: '14:20',
              arrivalTime: '16:35',
              date: formattedStartDate,
              duration: '2h 15m',
              stops: 1
            }
          ];
        } else {
          const formattedEndDate = dates.end.toISOString().split('T')[0];
          mockResults = [
            {
              id: 1,
              name: 'Grand Plaza Hotel',
              price: 120,
              location: destination,
              checkIn: formattedStartDate,
              checkOut: formattedEndDate,
              rating: 4.5,
              amenities: ['WiFi', 'Pool', 'Spa'],
              rooms: passengers
            },
            {
              id: 2,
              name: 'Seaside Resort',
              price: 95,
              location: destination,
              checkIn: formattedStartDate,
              checkOut: formattedEndDate,
              rating: 4.2,
              amenities: ['Beach', 'Restaurant', 'Gym'],
              rooms: passengers
            }
          ];
        }
        
        setResults(mockResults);
        
        if (onSearch) {
          onSearch({
            destination,
            origin,
            dates,
            searchType,
            passengers
          });
        }
        
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      console.error('Search error:', err);
      setLoading(false);
    }
  };

  const handleBook = async (item) => {
    if (!onBookingMade) return;
    
    try {
      const booking = {
        id: `booking-${Date.now()}`,
        type: searchType,
        details: item,
        bookedAt: new Date().toISOString(),
        status: 'confirmed',
        passengerCount: searchType === 'flights' ? passengers : undefined,
        roomCount: searchType === 'hotels' ? passengers : undefined
      };
      
      onBookingMade(booking);
      alert(`Booking confirmed for ${searchType === 'flights' ? 'flight' : 'hotel'}!`);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="flight-hotel-search">
      <div className="search-type-toggle">
        <button
          className={searchType === 'flights' ? 'active' : ''}
          onClick={() => {
            setSearchType('flights');
            setResults([]); // Clear results when changing type
          }}
        >
          Flights
        </button>
        <button
          className={searchType === 'hotels' ? 'active' : ''}
          onClick={() => {
            setSearchType('hotels');
            setResults([]); // Clear results when changing type
          }}
        >
          Hotels
        </button>
      </div>

      <div className="search-form">
        {searchType === 'flights' && (
          <div className="form-group">
            <label>From</label>
            <input
              type="text"
              placeholder="City or Airport"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>{searchType === 'flights' ? 'To' : 'Location'}</label>
          <input
            type="text"
            placeholder={searchType === 'flights' ? 'Destination' : 'City, Hotel'}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>

        <div className="form-group date-group">
          <label>{searchType === 'flights' ? 'Departure' : 'Check-in'}</label>
          <DatePicker
            selected={dates.start}
            onChange={(date) => setDates({...dates, start: date})}
            minDate={new Date()}
            placeholderText="Select date"
            required
          />
        </div>

        {searchType === 'hotels' && (
          <div className="form-group date-group">
            <label>Check-out</label>
            <DatePicker
              selected={dates.end}
              onChange={(date) => setDates({...dates, end: date})}
              minDate={dates.start || new Date()}
              placeholderText="Select date"
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>{searchType === 'flights' ? 'Passengers' : 'Rooms'}</label>
          <select
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>
                {num} {searchType === 'flights' ? 
                  (num === 1 ? 'passenger' : 'passengers') : 
                  (num === 1 ? 'room' : 'rooms')}
              </option>
            ))}
          </select>
        </div>

        <button 
          className="search-button"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="search-results">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : results.length > 0 ? (
          <ul>
            {results.map((item) => (
              <li key={item.id} className="result-item">
                <div className="result-details">
                  <h4>{searchType === 'flights' ? `${item.airline} Flight` : item.name}</h4>
                  <p>{searchType === 'flights' ? item.departure : item.location}</p>
                  <p>{searchType === 'flights' ? item.date : `${item.checkIn} to ${item.checkOut}`}</p>
                  <p className="price">${item.price}</p>
                  {searchType === 'hotels' && <p>Rating: {item.rating}/5</p>}
                  {searchType === 'hotels' && <p>Amenities: {item.amenities.join(', ')}</p>}
                </div>
                <button 
                  className="book-button"
                  onClick={() => handleBook(item)}
                >
                  Book Now
                </button>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="no-results">No results found. Try a search.</p>
        )}
      </div>
    </div>
  );
};

export default FlightHotelSearch;