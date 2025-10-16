import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Axios instance to handle requests
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API calls
export const signup = async (userData) => {
  try {
    const response = await apiClient.post('/api/auth/signup', userData);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error.response?.data?.error || error.response?.data || error.message;
  }
};

export const login = async (userData) => {
  try {
    const response = await apiClient.post('/api/auth/login', userData);
    
    // Store user data in localStorage upon successful login
    if (response.data.userId) {
      localStorage.setItem('user', JSON.stringify({
        userId: response.data.userId,
        username: response.data.username,
        email: response.data.email
      }));
    }
    
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error.response?.data?.error || error.response?.data || error.message;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return !!user;
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Logout
export const logout = () => {
  localStorage.removeItem('user');
};

// Fetch welcome message
export const fetchWelcomeMessage = async () => {
  try {
    const response = await apiClient.get('/api/welcome');
    return response.data?.message || "Welcome to TravelMate!";
  } catch (error) {
    console.error("Fetch Welcome Message Error:", error);
    return "Welcome to TravelMate!";
  }
};

// Destinations API
export const getDestinations = async () => {
  try {
    const response = await apiClient.get('/api/destinations');
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error.response?.data || error.message;
  }
};

export const addDestination = async (destination) => {
  try {
    const response = await apiClient.post('/api/destinations', destination);
    return response.data;
  } catch (error) {
    console.error('Error adding destination:', error);
    throw error.response?.data || error.message;
  }
};

// Set auth token globally
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// ============================================================================
// NEW FEATURE APIS - ADD THESE TO YOUR EXISTING FILE
// ============================================================================

// Expense Tracker API
export const expenseAPI = {
  getAll: () => apiClient.get('/api/expenses'),
  create: (expense) => apiClient.post('/api/expenses', expense),
  delete: (id) => apiClient.delete(`/api/expenses/${id}`),
  getTotal: () => apiClient.get('/api/expenses/total')
};

// Community Forum API
export const communityAPI = {
  getAll: () => apiClient.get('/api/posts'),
  create: (post) => apiClient.post('/api/posts', post),
  delete: (id) => apiClient.delete(`/api/posts/${id}`)
};

// Carbon Calculator API
export const carbonAPI = {
  calculate: (distance, transportMode = 'car') => 
    apiClient.post(`/api/carbon/calculate?distance=${distance}&transportMode=${transportMode}`),
  getFactors: () => apiClient.get('/api/carbon/factors')
};

// Itinerary API (for the simple ItineraryEditor)
export const itineraryAPI = {
  getAll: () => apiClient.get('/api/itineraries'),
  getById: (id) => apiClient.get(`/api/itineraries/${id}`),
  create: (itinerary) => apiClient.post('/api/itineraries', itinerary),
  updateActivities: (id, activities) => apiClient.put(`/api/itineraries/${id}/activities`, activities),
  generateShareLink: (id) => apiClient.post(`/api/itineraries/${id}/share`)
};

// ============================================================================
// DASHBOARD APIS - NEWLY ADDED
// ============================================================================

// Dashboard API calls
export const getDashboardData = async () => {
  try {
    const response = await apiClient.get('/api/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // Return mock data for development if backend is not ready
    return getMockDashboardData();
  }
};

export const getUserStats = async () => {
  try {
    const response = await apiClient.get('/api/user/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error.response?.data || error.message;
  }
};

export const getRecentActivities = async () => {
  try {
    const response = await apiClient.get('/api/activities/recent');
    return response.data;
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    throw error.response?.data || error.message;
  }
};

export const getTravelTasks = async () => {
  try {
    const response = await apiClient.get('/api/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching travel tasks:', error);
    throw error.response?.data || error.message;
  }
};

export const getTravelChartData = async () => {
  try {
    const response = await apiClient.get('/api/analytics/travel-chart');
    return response.data;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    throw error.response?.data || error.message;
  }
};

// Mock data for development (remove when backend is ready)
const getMockDashboardData = () => {
  const currentUser = getCurrentUser();
  
  return {
    userStats: {
      tripsCount: 12,
      citiesVisited: 24,
      wishlistCount: 8,
      countriesVisited: 15
    },
    nextTrip: {
      destination: "Paris, France",
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString()
    },
    upcomingTrips: 3,
    savedDestinations: 12,
    chartData: [
      { name: "Jan", trips: 2, destinations: 3 },
      { name: "Feb", trips: 3, destinations: 5 },
      { name: "Mar", trips: 1, destinations: 2 },
      { name: "Apr", trips: 4, destinations: 6 },
      { name: "May", trips: 2, destinations: 4 },
      { name: "Jun", trips: 3, destinations: 5 }
    ],
    recentActivities: [
      { 
        id: 1, 
        description: "Booked flight to Paris", 
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), 
        type: "flight" 
      },
      { 
        id: 2, 
        description: "Added Bali to wishlist", 
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), 
        type: "wishlist" 
      },
      { 
        id: 3, 
        description: "Created Italy itinerary", 
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), 
        type: "itinerary" 
      },
      { 
        id: 4, 
        description: "Tracked Paris trip expenses", 
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), 
        type: "expense" 
      }
    ],
    travelTasks: [
      { 
        id: 1, 
        title: "Pack luggage for Paris trip", 
        completed: false, 
        trip: "Paris",
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      { 
        id: 2, 
        title: "Book Tokyo city tour", 
        completed: true, 
        trip: "Tokyo",
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      { 
        id: 3, 
        title: "Renew passport", 
        completed: false, 
        trip: "General",
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
      },
      { 
        id: 4, 
        title: "Buy travel adapter", 
        completed: false, 
        trip: "General",
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    upcomingTripsList: [
      {
        destination: "Paris, France",
        date: "Jun 15-22, 2024"
      },
      {
        destination: "Tokyo, Japan", 
        date: "Sep 5-12, 2024"
      },
      {
        destination: "Bali, Indonesia",
        date: "Dec 10-20, 2024"
      }
    ]
  };
};

export default apiClient;