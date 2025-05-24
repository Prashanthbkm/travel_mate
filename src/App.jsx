import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import BookingIntegration from './components/Booking/BookingIntegration';
import Dashboard from './components/Dashboard/Dashboard';
import ExploreDestinations from './components/ExploreDestinations/ExploreDestinations';
import LeafletMap from './components/LeafletMap/LeafletMap';
import ItineraryPlanner from './components/ItineraryPlanner/ItineraryPlanner';
import RealTimeFeatures from './components/RealTimeFeatures/RealTimeFeatures';

import ExpenseTracker from './components/Features/ExpenseTracker';
import TravelCommunity from './components/Features/TravelCommunity';
import ItineraryEditor from './components/Features/ItineraryEditor';
import CarbonCalculator from './components/Features/CarbonCalculator';

import './App.css';
import { fetchWelcomeMessage } from './api';

const App = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("Loading...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const message = await fetchWelcomeMessage();
        setWelcomeMessage(message);
      } catch (err) {
        console.error("Error fetching welcome message:", err);
        setError("Failed to fetch welcome message.");
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="app-layout">
        <Header />

        <main className="min-h-screen p-8 bg-gray-100">
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center">
                  {error ? (
                    <h1 className="text-3xl font-bold text-red-600 mb-4">{error}</h1>
                  ) : (
                    <h1 className="text-3xl font-bold mb-4">{welcomeMessage}</h1>
                  )}
                  <p className="text-lg">Start planning your next adventure!</p>
                </div>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<ExploreDestinations />} />
            <Route path="/map" element={<LeafletMap />} />
            <Route path="/booking" element={<BookingIntegration />} />
            <Route path="/itinerary" element={<ItineraryPlanner />} />
            <Route path="/realtime" element={<RealTimeFeatures />} />

            {/* Features routes */}
            <Route path="/features/expense-tracker" element={<ExpenseTracker />} />
            <Route path="/features/travel-community" element={<TravelCommunity />} />
            <Route path="/features/itinerary-editor" element={<ItineraryEditor />} />
            <Route path="/features/carbon-calculator" element={<CarbonCalculator />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
