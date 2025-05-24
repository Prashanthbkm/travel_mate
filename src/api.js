import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Backend base URL
const DESTINATIONS_URL = `${API_BASE_URL}/api/destinations`;

// Axios instance to handle requests and add headers globally if needed
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Signup functionality
export const signup = async (userData) => {
  try {
    const response = await apiClient.post('/api/auth/signup', userData);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error.response?.data || error.message;
  }
};

// Login functionality
export const login = async (userData) => {
  try {
    const response = await apiClient.post('/api/auth/login', userData);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error.response?.data || error.message;
  }
};

// Fetch welcome message
export const fetchWelcomeMessage = async () => {
  try {
    const response = await apiClient.get('/api/welcome');
    return response.data?.message || "Welcome to TravelMate!";
  } catch (error) {
    console.error("Fetch Welcome Message Error:", error);
    throw error.response?.data || error.message;
  }
};

// Destinations API

// Fetch all destinations
export const getDestinations = async () => {
  try {
    const response = await apiClient.get('/api/destinations');
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error.response?.data || error.message;
  }
};

// Add a new destination
export const addDestination = async (destination) => {
  try {
    const response = await apiClient.post('/api/destinations', destination);
    return response.data;
  } catch (error) {
    console.error('Error adding destination:', error);
    throw error.response?.data || error.message;
  }
};

// Function to set authentication token globally
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};
