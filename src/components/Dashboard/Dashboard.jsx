// Dashboard.js
import React, { useEffect, useState } from 'react';
import WelcomeBanner from './WelcomeBanner';
import ProfileCard from './ProfileCard';
import ChartSection from './ChartSection';
import Globe from './Globe';
import RecentActivity from './RecentActivity';
import TaskList from './TaskList';
import { 
  getDashboardData, 
  getCurrentUser, 
  getUserStats, 
  getRecentActivities,
  getTravelTasks,
  getTravelChartData 
} from '../../api';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [travelTasks, setTravelTasks] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const user = getCurrentUser();
        setCurrentUser(user);

        if (!user) {
          setError('Please log in to view dashboard');
          setLoading(false);
          return;
        }

        // Fetch all dashboard data
        const dashboardResponse = await getDashboardData();
        setDashboardData(dashboardResponse);
        
        // Set data from dashboard response
        setUserStats(dashboardResponse.userStats);
        setRecentActivities(dashboardResponse.recentActivities || []);
        setTravelTasks(dashboardResponse.travelTasks || []);
        setChartData(dashboardResponse.chartData || []);

      } catch (err) {
        console.error('Dashboard error:', err);
        // If there's an error, getDashboardData will return mock data
        const mockData = await getDashboardData();
        setDashboardData(mockData);
        setUserStats(mockData.userStats);
        setRecentActivities(mockData.recentActivities || []);
        setTravelTasks(mockData.travelTasks || []);
        setChartData(mockData.chartData || []);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Function to refresh dashboard data
  const refreshDashboard = async () => {
    try {
      setLoading(true);
      const dashboardResponse = await getDashboardData();
      setDashboardData(dashboardResponse);
      setUserStats(dashboardResponse.userStats);
      setRecentActivities(dashboardResponse.recentActivities || []);
      setTravelTasks(dashboardResponse.travelTasks || []);
      setChartData(dashboardResponse.chartData || []);
    } catch (err) {
      console.error('Error refreshing dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your travel dashboard...</p>
      </div>
    );
  }

  if (error && !dashboardData) {
    return (
      <div className="dashboard-error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="dashboard-error">
        <h2>Welcome to TravelMate!</h2>
        <p>Please log in to view your personalized dashboard</p>
        <button 
          onClick={() => window.location.href = '/login'} 
          className="btn btn-primary"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <WelcomeBanner 
        user={currentUser} 
        nextTrip={dashboardData?.nextTrip}
        countriesVisited={userStats?.countriesVisited}
        totalTrips={userStats?.tripsCount}
      />
      
      <div className="dashboard-grid">
        <div className="grid-main">
          <div className="stats-row">
            <ProfileCard 
              user={currentUser}
              userStats={userStats}
            />
            <ChartSection 
              chartData={chartData}
              upcomingTrips={dashboardData?.upcomingTrips}
              savedDestinations={userStats?.savedDestinations}
            />
            <Globe 
              visitedCountries={userStats?.visitedCountries}
              countriesCount={userStats?.countriesVisited}
            />
          </div>
          
          <div className="content-row">
            <RecentActivity 
              activities={recentActivities}
            />
            <TaskList 
              tasks={travelTasks}
              upcomingTrips={dashboardData?.upcomingTripsList}
              onTaskUpdate={refreshDashboard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;