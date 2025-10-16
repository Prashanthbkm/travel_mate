import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaBars, 
  FaMap, 
  FaGlobe, 
  FaPlane, 
  FaMoneyBillWave, 
  FaUsers,
  FaLeaf,
  FaEdit,
  FaChevronDown, 
  FaChevronUp,
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaUser,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaGithub,
  FaLinkedin,
  FaInstagram
} from "react-icons/fa";
import { getCurrentUser, isAuthenticated, logout } from '../api';
import './Header.css';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setDarkMode(false);
      document.body.classList.remove('dark-mode');
    } else {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }

    // Scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) {
      setSubMenuOpen({});
    }
  };

  const toggleSubMenu = (item) => {
    setSubMenuOpen((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setSidebarOpen(false);
    navigate('/');
  };

  const sidebarItems = [
    {
      icon: <FaGlobe size={18} />,
      label: 'Dashboard',
      link: '/dashboard',
    },
    {
      icon: <FaMap size={18} />,
      label: 'Explore Destinations',
      link: '/explore',
    },
    {
      icon: <FaPlane size={18} />,
      label: 'Trip Planning',
      subMenu: [
        { label: 'Itinerary Planner', link: '/itinerary' },
        { label: 'Booking', link: '/booking' },
        { label: 'Real-Time Features', link: '/realtime' }
      ]
    },
    {
      icon: <FaMoneyBillWave size={18} />,
      label: 'Expense Tracker',
      link: '/features/expense-tracker',
    },
    {
      icon: <FaUsers size={18} />,
      label: 'Travel Community',
      link: '/features/travel-community',
    },
    {
      icon: <FaLeaf size={18} />,
      label: 'Carbon Calculator',
      link: '/features/carbon-calculator',
    },
    {
      icon: <FaEdit size={18} />,
      label: 'Itinerary Editor',
      link: '/features/itinerary-editor',
    },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : 'light'}`}>
      {/* Left Navigation */}
      <nav className="nav-links">
        <div className="logo">
          <Link to="/" className="logo-link">
            <div className="logo-icon">✈️</div>
            <span className="logo-text">TravelMate</span>
          </Link>
        </div>
        
        <ul className="main-nav">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
            >
              <FaHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/explore" 
              className={`nav-link ${isActiveLink('/explore') ? 'active' : ''}`}
            >
              <FaMap className="nav-icon" />
              <span>Explore</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/features/expense-tracker" 
              className={`nav-link ${isActiveLink('/features/expense-tracker') ? 'active' : ''}`}
            >
              <FaMoneyBillWave className="nav-icon" />
              <span>Expenses</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/features/travel-community" 
              className={`nav-link ${isActiveLink('/features/travel-community') ? 'active' : ''}`}
            >
              <FaUsers className="nav-icon" />
              <span>Community</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right Controls */}
      <div className="header-controls">
        {/* Theme Toggle - ALWAYS VISIBLE */}
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Auth Links */}
        <div className="auth-section">
          {!isAuthenticated() ? (
            <div className="auth-buttons">
              <Link to="/login" className="auth-btn login-btn">
                <FaSignInAlt />
                <span>Login</span>
              </Link>
              <Link to="/signup" className="auth-btn signup-btn">
                <FaUserPlus />
                <span>Sign Up</span>
              </Link>
            </div>
          ) : (
            <div className="user-menu">
              <div className="user-avatar">
                <FaUser />
              </div>
              <span className="username">{currentUser?.username || 'User'}</span>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle - ALWAYS VISIBLE BUT HIDDEN ON DESKTOP */}
        <button
          className="menu-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''} ${darkMode ? 'dark' : 'light'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">✈️</div>
            <span className="logo-text">TravelMate</span>
          </div>
          <button 
            className="close-sidebar" 
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            &times;
          </button>
        </div>

        {/* User Info */}
        {isAuthenticated() && currentUser && (
          <div className="sidebar-user">
            <div className="user-avatar large">
              <FaUser />
            </div>
            <div className="user-info">
              <div className="user-name">{currentUser.username}</div>
              <div className="user-email">{currentUser.email}</div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul>
            {sidebarItems.map((item, index) => (
              <li key={index} className="nav-item">
                {item.link ? (
                  <Link
                    to={item.link}
                    className={`nav-link ${isActiveLink(item.link) ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div className="nav-icon-wrapper">
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <div className="nav-group">
                    <button 
                      className={`nav-header ${subMenuOpen[item.label] ? 'open' : ''}`}
                      onClick={() => toggleSubMenu(item.label)}
                    >
                      <div className="nav-icon-wrapper">
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                      <FaChevronDown className="chevron" />
                    </button>
                    {item.subMenu && (
                      <div className={`submenu ${subMenuOpen[item.label] ? 'open' : ''}`}>
                        {item.subMenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.link}
                            className="submenu-link"
                            onClick={() => setSidebarOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer in Sidebar */}
        <div className="sidebar-footer">
          {isAuthenticated() && (
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          )}
          <div className="social-links">
            <a href="https://github.com/Prashanthbkm" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/prashanth-b-k-m-914773211/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/rock_prashanth_09/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}
    </header>
  );
};

export default Header;