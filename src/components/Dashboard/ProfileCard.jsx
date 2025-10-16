import React from 'react';
import { FaUser, FaMapMarkerAlt, FaPlane, FaHeart, FaGlobe } from 'react-icons/fa';
import { getCurrentUser } from '../../api';

const ProfileCard = ({ user, userStats }) => {
  const currentUser = user || getCurrentUser();

  if (!currentUser) {
    return (
      <div className="profile-card">
        <div className="profile-avatar">
          <FaUser />
        </div>
        <h2 className="profile-name">Guest Traveler</h2>
        <p className="profile-bio">Sign in to view your profile</p>
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-number">0</div>
            <div className="stat-label">Trips</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">0</div>
            <div className="stat-label">Cities</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">0</div>
            <div className="stat-label">Wishlist</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <div className="profile-avatar">
        {currentUser.profilePicture ? (
          <img 
            src={currentUser.profilePicture} 
            alt={`${currentUser.username}'s profile`}
            className="avatar-image"
          />
        ) : (
          <div className="avatar-fallback">
            {currentUser.username?.charAt(0).toUpperCase() || <FaUser />}
          </div>
        )}
      </div>

      <h2 className="profile-name">{currentUser.username || 'Traveler'}</h2>
      <p className="profile-email">{currentUser.email}</p>
      
      <p className="profile-bio">
        {currentUser.bio || 'Passionate traveler exploring the world 🌍'}
      </p>

      <div className="profile-stats">
        <div className="stat-item">
          <div className="stat-icon">
            <FaPlane />
          </div>
          <div className="stat-content">
            <div className="stat-number">{userStats?.tripsCount || 0}</div>
            <div className="stat-label">Trips</div>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon">
            <FaMapMarkerAlt />
          </div>
          <div className="stat-content">
            <div className="stat-number">{userStats?.citiesVisited || 0}</div>
            <div className="stat-label">Cities</div>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon">
            <FaHeart />
          </div>
          <div className="stat-content">
            <div className="stat-number">{userStats?.wishlistCount || 0}</div>
            <div className="stat-label">Wishlist</div>
          </div>
        </div>
      </div>

      <div className="member-since">
        <FaGlobe className="member-icon" />
        <span>TravelMate member</span>
      </div>
    </div>
  );
};

export default ProfileCard;