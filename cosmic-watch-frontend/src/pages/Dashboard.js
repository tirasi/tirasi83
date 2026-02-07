import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import OrbitView from '../components/OrbitView';
import ProximityView from '../components/ProximityView';
import { neoAPI } from '../api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);

  useEffect(() => {
    fetchAsteroids();
  }, []);

  const fetchAsteroids = async () => {
    setLoading(true);
    try {
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 7);
      
      const response = await neoAPI.getFeed({
        start_date: today.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0]
      });
      
      const neoData = [];
      Object.values(response.data.near_earth_objects).forEach(dateGroup => {
        dateGroup.forEach(neo => {
          neoData.push({
            id: neo.id,
            name: neo.name,
            diameter: Math.round(neo.estimated_diameter.meters.estimated_diameter_max),
            velocity: parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_second),
            missDistance: parseFloat(neo.close_approach_data[0].miss_distance.kilometers),
            isHazardous: neo.is_potentially_hazardous_asteroid,
            closeApproachDate: neo.close_approach_data[0].close_approach_date
          });
        });
      });
      
      setAsteroids(neoData);
    } catch (error) {
      console.error('Error fetching asteroids:', error);
      // Fallback to mock data
      const mockData = [
        {
          id: '2021001',
          name: 'Apophis',
          diameter: 370,
          velocity: 30.73,
          missDistance: 31000000,
          isHazardous: true,
          closeApproachDate: '2029-04-13'
        },
        {
          id: '2021002',
          name: 'Bennu',
          diameter: 490,
          velocity: 28.6,
          missDistance: 480000,
          isHazardous: true,
          closeApproachDate: '2024-09-25'
        },
        {
          id: '2021003',
          name: '2023 DW',
          diameter: 50,
          velocity: 25.1,
          missDistance: 1800000,
          isHazardous: false,
          closeApproachDate: '2024-02-14'
        },
        {
          id: '2021004',
          name: 'Ryugu',
          diameter: 900,
          velocity: 32.5,
          missDistance: 95000000,
          isHazardous: false,
          closeApproachDate: '2024-06-10'
        }
      ];
      setAsteroids(mockData);
    } finally {
      setLoading(false);
    }
  };

  const filteredAsteroids = asteroids.filter(asteroid => {
    const matchesFilter = filter === 'all' || 
      (filter === 'hazardous' && asteroid.isHazardous) ||
      (filter === 'safe' && !asteroid.isHazardous);
    const matchesSearch = asteroid.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="dashboard-page container">
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>WATCHINGTON</h1>
        <p>Real-time monitoring of Near-Earth Objects, a website that transforms a website to a learning city </p>
      </motion.div>

      <motion.div 
        className="dashboard-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="stat-card border-bits">
          <div className="stat-icon">🌍</div>
          <div className="stat-info">
            <h3>{asteroids.length}</h3>
            <p>Total Tracked</p>
          </div>
        </div>
        <div className="stat-card border-bits hazard-stat">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <h3>{asteroids.filter(a => a.isHazardous).length}</h3>
            <p>Hazardous</p>
          </div>
        </div>
        <div className="stat-card border-bits">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{asteroids.filter(a => !a.isHazardous).length}</h3>
            <p>Safe</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="dashboard-controls"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Search asteroids..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input border-bits"
        />
        
        <div className="filter-buttons">
          <button 
            className={`filter-btn border-bits ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn border-bits ${filter === 'hazardous' ? 'active' : ''}`}
            onClick={() => setFilter('hazardous')}
          >
            Hazardous
          </button>
          <button 
            className={`filter-btn border-bits ${filter === 'safe' ? 'active' : ''}`}
            onClick={() => setFilter('safe')}
          >
            Safe
          </button>
        </div>
      </motion.div>

      <OrbitView asteroids={filteredAsteroids} />

      {loading ? (
        <div className="loading-container">
          <div className="loading"></div>
          <p>Loading asteroid data...</p>
        </div>
      ) : (
        <motion.div 
          className="asteroids-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {filteredAsteroids.map((asteroid, index) => (
            <motion.div
              key={asteroid.id}
              className="asteroid-card border-bits card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="asteroid-header">
                <h3>{asteroid.name}</h3>
                <span className={`hazard-badge ${asteroid.isHazardous ? 'hazard-true' : 'hazard-false'}`}>
                  {asteroid.isHazardous ? 'HAZARDOUS' : 'SAFE'}
                </span>
              </div>

              <div className="asteroid-details">
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
                <div className="detail-row">
                  <span className="detail-label">Close Approach:</span>
                  <span className="detail-value">{asteroid.closeApproachDate}</span>
                </div>
              </div>

              <div className="asteroid-actions">
                <Link to={`/asteroid/${asteroid.id}`} className="btn-link">
                  View Details
                </Link>
                <button className="btn-watch" onClick={() => setSelectedAsteroid(asteroid)}>
                  <span>👁️</span> Watch
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {selectedAsteroid && (
        <ProximityView 
          asteroid={selectedAsteroid} 
          onClose={() => setSelectedAsteroid(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;
