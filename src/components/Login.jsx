import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaPlane, FaGoogle, FaGithub } from 'react-icons/fa';
import { login } from '../api';  // ✅ CORRECT PATH
import './Auth.css';

// ... rest of your Login component code

const Login = () => {
  const [form, setForm] = useState({ 
    username: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for success message from signup
  const successMessage = location.state?.message;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    
    if (!form.username || !form.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      const data = await login(form);
      
      if (data.message === 'Login successful') {
        // Show success and redirect
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setError('Login failed. Please try again.');
      }
      
    } catch (err) {
      setError(err || 'Login failed. Please check your credentials.');
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
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue your journey</p>
        </div>

        {/* Success Message from Signup */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="success-message"
          >
            {successMessage}
          </motion.div>
        )}

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
                placeholder="Enter your username"
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
                placeholder="Enter your password"
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

          {/* Remember Me & Forgot Password */}
          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
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
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </motion.button>

          {/* Divider */}
          <div className="auth-divider">
            <span>Or continue with</span>
          </div>

          {/* Social Login */}
          <div className="social-buttons">
            <motion.button 
              type="button" 
              className="social-button google"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGoogle className="social-icon" />
              <span>Google</span>
            </motion.button>
            <motion.button 
              type="button" 
              className="social-button github"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="social-icon" />
              <span>GitHub</span>
            </motion.button>
          </div>

          {/* Signup Link */}
          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">
                Create one
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;