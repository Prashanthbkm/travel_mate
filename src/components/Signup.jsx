import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPlane } from 'react-icons/fa';
import { signup } from '../api';  // ✅ CORRECT PATH
import './Auth.css';

// ... rest of your Signup component code
const Signup = () => {
  const [form, setForm] = useState({ 
    username: '', 
    email: '', 
    password: '',
    confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    try {
      const data = await signup({
        username: form.username,
        email: form.email,
        password: form.password
      });
      
      if (data.message === 'User registered successfully') {
        // Show success message and redirect
        setTimeout(() => {
          navigate('/login', { 
            state: { message: 'Signup successful! Please login.' }
          });
        }, 1500);
      } else {
        setError('Signup failed. Please try again.');
      }
      
    } catch (err) {
      setError(err || 'Signup failed. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      {/* Animated Background */}
      <div className="auth-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="auth-card"
      >
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">
            <FaPlane className="logo-icon" />
            <span className="logo-text">TravelMate</span>
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Start your journey with us today</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Username Field */}
          <div className="form-group">
            <div className="input-container">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className="auth-input"
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="form-group">
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="auth-input"
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <div className="input-container">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="auth-input"
                disabled={loading}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <div className="input-container">
              <FaLock className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="auth-input"
                disabled={loading}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="error-message"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="auth-button primary"
          >
            {loading ? (
              <div className="button-loading">
                <div className="spinner"></div>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </motion.button>

          {/* Divider */}
          <div className="auth-divider">
            <span>Or continue with</span>
          </div>

          {/* Social Login (Optional) */}
          <div className="social-buttons">
            <button type="button" className="social-button google">
              <span>Google</span>
            </button>
            <button type="button" className="social-button github">
              <span>GitHub</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;