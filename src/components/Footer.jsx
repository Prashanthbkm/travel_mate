import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaHeart, FaSun, FaMoon } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import './Footer.css';

const Footer = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <footer className={`footer ${darkMode ? 'dark' : 'light'}`}>
      <div className="footer-container">
        
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-brand">
            <div className="brand-logo">
              <div className="logo-icon">✈️</div>
              <span className="brand-name">TravelMate</span>
            </div>
            <p className="brand-tagline">
              Your ultimate travel companion for seamless journey planning and exploration
            </p>
            <div className="theme-toggle-footer">
              <button 
                className="theme-btn"
                onClick={toggleTheme}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4>Features</h4>
              <a href="/features/expense-tracker">Expense Tracker</a>
              <a href="/features/travel-community">Travel Community</a>
              <a href="/features/carbon-calculator">Carbon Calculator</a>
              <a href="/features/itinerary-editor">Itinerary Editor</a>
            </div>
            
            <div className="link-group">
              <h4>Company</h4>
              <a href="/about">About Us</a>
              <a href="/contact">Contact</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
            
            <div className="link-group">
              <h4>Support</h4>
              <a href="/help">Help Center</a>
              <a href="/faq">FAQ</a>
              <a href="/feedback">Feedback</a>
              <a href="/community">Community</a>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="footer-bottom">
          <div className="social-section">
            <div className="creator-info">
              <p className="made-with-love">
                Made with <FaHeart className="heart-icon" /> by <span className="creator-name">Prashanth</span>
              </p>
            </div>
            
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/prashanth-b-k-m-914773211/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/Prashanthbkm"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com/rock_prashanth_09/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="mailto:prashanthbkm09@gmail.com"
                className="social-link"
                aria-label="Email"
              >
                <MdEmail />
              </a>
            </div>
          </div>
          
          <div className="copyright-section">
            <p className="copyright">
              © {currentYear} TravelMate. All rights reserved.
            </p>
            <p className="build-info">
              Built with React & Spring Boot
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;