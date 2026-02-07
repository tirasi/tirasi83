import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/WatchList.css';

const WatchList = () => {
  const [watchedAsteroids, setWatchedAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWatchList();
  }, []);

  const fetchWatchList = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockData = [
        {
          id: '2021001',
          name: 'Apophis',
          diameter: 370,
          velocity: 30.73,
          missDistance: 31000000,
          isHazardous: true,
          closeApproachDate: '2029-04-13',
          alertEnabled: true,
          daysUntilApproach: 1825
        },
        {
          id: '2021002',
          name: 'Bennu',
          diameter: 490,
          velocity: 28.6,
          missDistance: 480000,
          isHazardous: true,
          closeApproachDate: '2024-09-25',
          alertEnabled: false,
          daysUntilApproach: 245
        }
      ];

      setTimeout(() => {
        setWatchedAsteroids(mockData);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching watch list:', error);
      setLoading(false);
    }
  };

  const removeFromWatchList = (id) => {
    setWatchedAsteroids(watchedAsteroids.filter(a => a.id !== id));
  };

  const toggleAlert = (id) => {
    setWatchedAsteroids(watchedAsteroids.map(a => 
      a.id === id ? { ...a, alertEnabled: !a.alertEnabled } : a
    ));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
        <p>Loading watch list...</p>
      </div>
    );
  }

  return (
    <div className="watchlist-page container">
      <motion.div 
        className="watchlist-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>My Watch List</h1>
        <p>Track your selected Near-Earth Objects</p>
      </motion.div>

      {watchedAsteroids.length === 0 ? (
        <motion.div 
          className="empty-state border-bits"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="empty-icon">👁️</div>
          <h2>No Asteroids in Watch List</h2>
          <p>Start tracking asteroids from the dashboard</p>
          <Link to="/dashboard" className="btn btn-primary">
            <span>Go to Dashboard</span>
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          className="watchlist-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {watchedAsteroids.map((asteroid, index) => (
            <motion.div
              key={asteroid.id}
              className="watchlist-card border-bits card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="watchlist-header-section">
                <div>
                  <h3>{asteroid.name}</h3>
                  <span className={`hazard-badge ${asteroid.isHazardous ? 'hazard-true' : 'hazard-false'}`}>
                    {asteroid.isHazardous ? 'HAZARDOUS' : 'SAFE'}
                  </span>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromWatchList(asteroid.id)}
                  title="Remove from watch list"
                >
                  ✕
                </button>
              </div>

              <div className="approach-countdown">
                <div className="countdown-circle">
                  <span className="countdown-number">{asteroid.daysUntilApproach}</span>
                  <span className="countdown-label">days</span>
                </div>
                <div className="countdown-info">
                  <p>Until Close Approach</p>
                  <p className="approach-date">{asteroid.closeApproachDate}</p>
                </div>
              </div>

              <div className="watchlist-details">
                <div className="detail-row">
                  <span className="detail-label">Diameter:</span>
                  <span className="detail-value">{asteroid.diameter}m</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Velocity:</span>
                  <span className="detail-value">{asteroid.velocity} km/s</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Miss Distance:</span>
                  <span className="detail-value">{(asteroid.missDistance / 1000000).toFixed(2)}M km</span>
                </div>
              </div>

              <div className="watchlist-actions">
                <button 
                  className={`alert-toggle ${asteroid.alertEnabled ? 'active' : ''}`}
                  onClick={() => toggleAlert(asteroid.id)}
                >
                  <span>{asteroid.alertEnabled ? '🔔' : '🔕'}</span>
                  {asteroid.alertEnabled ? 'Alert ON' : 'Alert OFF'}
                </button>
                <Link to={`/asteroid/${asteroid.id}`} className="view-details-btn">
                  View Details →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default WatchList;
