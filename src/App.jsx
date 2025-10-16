import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import BookingIntegration from './components/Booking/BookingIntegration';
import BookingManagement from './components/Booking/BookingManagement'; // Your existing component
import Dashboard from './components/Dashboard/Dashboard';
import ExploreDestinations from './components/ExploreDestinations/ExploreDestinations';
import LeafletMap from './components/LeafletMap/LeafletMap';
import ItineraryPlanner from './components/ItineraryPlanner/ItineraryPlanner';
import RealTimeFeatures from './components/RealTimeFeatures/RealTimeFeatures';
import DestinationDetail from './components/DestinationDetail'; 

import ExpenseTracker from './components/Features/ExpenseTracker';
import TravelCommunity from './components/Features/TravelCommunity';
import ItineraryEditor from './components/Features/ItineraryEditor';
import CarbonCalculator from './components/Features/CarbonCalculator';

import ProtectedRoute from './components/ProtectedRoute';
import TravelChatbot from './components/Chatbot/TravelChatbot';
import HomePage from './components/HomePage/HomePage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-layout">
        <Header />

        <main className="main-content">
          <Routes>
            {/* New Beautiful Homepage */}
            <Route path="/" element={<HomePage />} />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/explore" element={
              <ProtectedRoute>
                <ExploreDestinations />
              </ProtectedRoute>
            } />

            <Route path="/map" element={
              <ProtectedRoute>
                <LeafletMap />
              </ProtectedRoute>
            } />

            {/* Booking Routes - Use your existing components */}
            <Route path="/booking" element={
              <ProtectedRoute>
                <BookingIntegration />
              </ProtectedRoute>
            } />

            <Route path="/bookings" element={
              <ProtectedRoute>
                <BookingManagement />
              </ProtectedRoute>
            } />

            {/* Itinerary Routes */}
            <Route path="/itinerary/:id?" element={
              <ProtectedRoute>
                <ItineraryPlanner />
              </ProtectedRoute>
            } />

            <Route path="/itinerary/create" element={
              <ProtectedRoute>
                <ItineraryPlanner />
              </ProtectedRoute>
            } />

            {/* Real-time Features */}
            <Route path="/realtime" element={
              <ProtectedRoute>
                <RealTimeFeatures />
              </ProtectedRoute>
            } />

            <Route path="/destination/:id" element={
              <ProtectedRoute>
                <DestinationDetail />
              </ProtectedRoute>
            } />

            {/* Features Routes */}
            <Route path="/features/expense-tracker" element={
              <ProtectedRoute>
                <ExpenseTracker />
              </ProtectedRoute>
            } />

            <Route path="/features/travel-community" element={
              <ProtectedRoute>
                <TravelCommunity />
              </ProtectedRoute>
            } />

            <Route path="/features/itinerary-editor" element={
              <ProtectedRoute>
                <ItineraryEditor />
              </ProtectedRoute>
            } />

            <Route path="/features/carbon-calculator" element={
              <ProtectedRoute>
                <CarbonCalculator />
              </ProtectedRoute>
            } />
          </Routes>
        </main>

        <Footer />
        
        {/* AI Chatbot - Floating Assistant */}
        <TravelChatbot />
      </div>
    </Router>
  );
};

export default App;