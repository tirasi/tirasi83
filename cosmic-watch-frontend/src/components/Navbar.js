import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <motion.nav 
      className="navbar border-bits"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🌌</span>
          <span className="logo-text">COSMIC WATCH</span>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          {isLoggedIn && (
            <Link to="/watchlist" className="nav-link" onClick={() => setIsOpen(false)}>
              Watch List
            </Link>
          )}
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="nav-link nav-btn" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <button className="nav-link nav-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
