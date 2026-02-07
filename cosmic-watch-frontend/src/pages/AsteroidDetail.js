import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/AsteroidDetail.css';

const AsteroidDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asteroid, setAsteroid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAsteroidDetail();
  }, [id]);

  const fetchAsteroidDetail = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockData = {
        id: id,
        name: 'Apophis',
        diameter: { min: 340, max: 370 },
        velocity: 30.73,
        missDistance: 31000000,
        isHazardous: true,
        closeApproachDate: '2029-04-13',
        absoluteMagnitude: 19.7,
        estimatedDiameter: 370,
        relativeVelocity: 30.73,
        orbitalData: {
          eccentricity: 0.191,
          semiMajorAxis: 0.922,
          inclination: 3.331,
          ascendingNode: 204.446,
          perihelion: 126.401
        },
        riskScore: 8.5
      };

      setTimeout(() => {
        setAsteroid(mockData);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching asteroid details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
        <p>Loading asteroid details...</p>
      </div>
    );
  }

  if (!asteroid) {
    return (
      <div className="error-container">
        <h2>Asteroid not found</h2>
        <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="asteroid-detail-page container">
      <motion.button 
        className="back-btn border-bits"
        onClick={() => navigate('/dashboard')}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        ← Back to Dashboard
      </motion.button>

      <motion.div 
        className="detail-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1>{asteroid.name}</h1>
          <p className="asteroid-id">ID: {asteroid.id}</p>
        </div>
        <span className={`hazard-badge ${asteroid.isHazardous ? 'hazard-true' : 'hazard-false'}`}>
          {asteroid.isHazardous ? 'HAZARDOUS' : 'SAFE'}
        </span>
      </motion.div>

      <motion.div 
        className="risk-score-card border-bits card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2>Risk Assessment</h2>
        <div className="risk-meter">
          <div className="risk-bar">
            <motion.div 
              className="risk-fill"
              initial={{ width: 0 }}
              animate={{ width: `${asteroid.riskScore * 10}%` }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ 
                background: asteroid.riskScore > 7 ? 'var(--danger)' : 
                           asteroid.riskScore > 4 ? 'var(--secondary-orange)' : 
                           'var(--success)' 
              }}
            />
          </div>
          <div className="risk-value">{asteroid.riskScore}/10</div>
        </div>
      </motion.div>

      <div className="detail-grid">
        <motion.div 
          className="detail-section border-bits card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2>Physical Characteristics</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Estimated Diameter</span>
              <span className="info-value">{asteroid.estimatedDiameter}m</span>
            </div>
            <div className="info-item">
              <span className="info-label">Diameter Range</span>
              <span className="info-value">{asteroid.diameter.min}m - {asteroid.diameter.max}m</span>
            </div>
            <div className="info-item">
              <span className="info-label">Absolute Magnitude</span>
              <span className="info-value">{asteroid.absoluteMagnitude}</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="detail-section border-bits card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2>Approach Data</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Close Approach Date</span>
              <span className="info-value">{asteroid.closeApproachDate}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Relative Velocity</span>
              <span className="info-value">{asteroid.relativeVelocity} km/s</span>
            </div>
            <div className="info-item">
              <span className="info-label">Miss Distance</span>
              <span className="info-value">{(asteroid.missDistance / 1000000).toFixed(2)}M km</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="detail-section border-bits card orbital-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2>Orbital Elements</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Eccentricity</span>
              <span className="info-value">{asteroid.orbitalData.eccentricity}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Semi-Major Axis</span>
              <span className="info-value">{asteroid.orbitalData.semiMajorAxis} AU</span>
            </div>
            <div className="info-item">
              <span className="info-label">Inclination</span>
              <span className="info-value">{asteroid.orbitalData.inclination}°</span>
            </div>
            <div className="info-item">
              <span className="info-label">Ascending Node</span>
              <span className="info-value">{asteroid.orbitalData.ascendingNode}°</span>
            </div>
            <div className="info-item">
              <span className="info-label">Perihelion</span>
              <span className="info-value">{asteroid.orbitalData.perihelion}°</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="action-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <button className="btn btn-primary border-bits">
          <span>Add to Watch List</span>
        </button>
        <button className="btn btn-secondary border-bits">
          <span>Set Alert</span>
        </button>
        <button className="btn btn-secondary border-bits">
          <span>View 3D Orbit</span>
        </button>
      </motion.div>
    </div>
  );
};

export default AsteroidDetail;
