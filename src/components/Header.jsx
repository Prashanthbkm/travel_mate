import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBars, 
  FaMap, 
  FaListAlt, 
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
  FaUserPlus
} from "react-icons/fa";
import './Header.css';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState({});

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

  return (
    <header className="header">
      {/* Left Navigation Links */}
      <nav className="nav-links">
        <ul>
          <li>
            <Link to="/" className="nav-link">
              <FaHome className="nav-icon" /> Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-link">
              <FaSignInAlt className="nav-icon" /> Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="nav-link">
              <FaUserPlus className="nav-icon" /> Signup
            </Link>
          </li>
        </ul>
      </nav>

      {/* Centered Logo */}
      <div className="logo">
        <Link to="/" className="logo-link">
          <h1>TravelMate 🌍</h1>
        </Link>
      </div>

      {/* Right Sidebar Toggle */}
      <div className="sidebar-toggle">
        <button
          className="menu-button"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          aria-expanded={sidebarOpen}
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div 
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        aria-hidden={!sidebarOpen}
      >
        <div className="sidebar-header">
          <h2 className="sidebar-title">TravelMate 🌍</h2>
          <button 
            className="close-sidebar" 
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            &times;
          </button>
        </div>
        <nav aria-label="Main navigation">
          <ul className="sidebar-main-menu">
            {sidebarItems.map((item, index) => (
              <li key={index} className={`sidebar-item ${subMenuOpen[item.label] ? 'active' : ''}`}>
                {item.link ? (
                  <Link
                    to={item.link}
                    className="sidebar-link"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div className="sidebar-item-content">
                      {item.icon}
                      <span className="sidebar-label">{item.label}</span>
                    </div>
                  </Link>
                ) : (
                  <>
                    <div
                      className="sidebar-item-header clickable"
                      onClick={() => toggleSubMenu(item.label)}
                      role="button"
                      aria-expanded={!!subMenuOpen[item.label]}
                      tabIndex={0}
                    >
                      <div className="sidebar-item-content">
                        {item.icon}
                        <span className="sidebar-label">{item.label}</span>
                      </div>
                      <span className="submenu-arrow">
                        {subMenuOpen[item.label] ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </div>
                    {item.subMenu && (
                      <ul 
                        className={`sidebar-submenu ${subMenuOpen[item.label] ? 'open' : ''}`}
                        aria-hidden={!subMenuOpen[item.label]}
                      >
                        {item.subMenu.map((subItem, subIndex) => (
                          <li key={subIndex} className="sidebar-submenu-item">
                            <Link 
                              to={subItem.link} 
                              onClick={() => setSidebarOpen(false)}
                              className="submenu-link"
                            >
                              <span className="submenu-label">{subItem.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={toggleSidebar}
          role="button"
          aria-label="Close sidebar"
          tabIndex={0}
        ></div>
      )}
    </header>
  );
};

export default Header;