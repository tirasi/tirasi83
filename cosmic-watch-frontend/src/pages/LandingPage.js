import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="hero-title">
            <span className="title-line">COSMIC</span>
            <span className="title-line glow-text">WATCH</span>
          </h1>
          <p className="hero-subtitle">
            Real-Time Near-Earth Object Monitoring Platform
          </p>
          <p className="hero-description">
            Track thousands of asteroids, analyze potential risks, and stay informed about celestial objects passing near Earth.
          </p>
          <div className="hero-buttons">
            <Link to="/dashboard" className="btn btn-primary border-bits">
              <span>Explore Dashboard</span>
            </Link>
            <Link to="/register" className="btn btn-secondary border-bits">
              <span>Get Started</span>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="planet-container">
            <div className="planet"></div>
            <div className="orbit orbit-1">
              <div className="asteroid asteroid-1"></div>
            </div>
            <div className="orbit orbit-2">
              <div className="asteroid asteroid-2"></div>
            </div>
            <div className="orbit orbit-3">
              <div className="asteroid asteroid-3"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="features-section container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Platform Features</h2>
        <div className="features-grid">
          <motion.div 
            className="feature-card border-bits card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="feature-icon">🔴</div>
            <h3>Real-Time Tracking</h3>
            <p>Live data feed from NASA NeoWs API showing current asteroids and their trajectories</p>
          </motion.div>

          <motion.div 
            className="feature-card border-bits card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="feature-icon">⚠️</div>
            <h3>Risk Analysis</h3>
            <p>Advanced algorithms categorize asteroids by hazard status, size, and proximity</p>
          </motion.div>

          <motion.div 
            className="feature-card border-bits card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="feature-icon">🔔</div>
            <h3>Alert System</h3>
            <p>Custom notifications for close approach events of watched asteroids</p>
          </motion.div>

          <motion.div 
            className="feature-card border-bits card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="feature-icon">👁️</div>
            <h3>Watch List</h3>
            <p>Save and monitor specific asteroids with personalized tracking parameters</p>
          </motion.div>

          <motion.div 
            className="feature-card border-bits card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="feature-icon">🎨</div>
            <h3>3D Visualization</h3>
            <p>Interactive orbital paths showing asteroid trajectories relative to Earth</p>
          </motion.div>

          <motion.div 
            className="feature-card border-bits card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="feature-icon">💬</div>
            <h3>Community Chat</h3>
            <p>Real-time discussions with researchers and enthusiasts about specific objects</p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="cta-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="cta-content border-bits">
          <h2>Start Monitoring Space Today</h2>
          <p>Join researchers and enthusiasts tracking Near-Earth Objects</p>
          <Link to="/register" className="btn btn-primary">
            <span>Create Account</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
