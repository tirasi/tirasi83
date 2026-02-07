import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../styles/ProximityView.css';

const ProximityView = ({ asteroid, onClose }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(650, 350);
    renderer.setClearColor(0x000000, 0.9);
    mountRef.current.appendChild(renderer.domElement);

    // Earth
    const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
    const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x2233ff });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Earth glow
    const glowGeometry = new THREE.SphereGeometry(2.2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x4488ff, 
      transparent: true, 
      opacity: 0.3 
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Calculate asteroid distance (scale down for visualization)
    const distance = 5 + (asteroid.missDistance / 10000000);
    const asteroidSize = 0.2 + (asteroid.diameter / 500);

    // Asteroid
    const asteroidGeometry = new THREE.SphereGeometry(asteroidSize, 16, 16);
    const asteroidMaterial = new THREE.MeshBasicMaterial({ 
      color: asteroid.isHazardous ? 0xff4444 : 0xff6b35 
    });
    const asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
    asteroidMesh.position.set(distance, 0, 0);
    scene.add(asteroidMesh);

    // Distance line
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(2, 0, 0),
      new THREE.Vector3(distance, 0, 0)
    ]);
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.5 
    });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    camera.position.z = 15;
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);

    let angle = 0;
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      earth.rotation.y += 0.005;
      glow.rotation.y += 0.005;
      
      angle += 0.01;
      camera.position.x = Math.sin(angle) * 15;
      camera.position.z = Math.cos(angle) * 15;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [asteroid]);

  return (
    <div className="proximity-modal" onClick={onClose}>
      <div className="proximity-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>{asteroid.name} Proximity</h2>
        <div ref={mountRef} className="proximity-canvas" />
        <div className="proximity-info">
          <div className="info-item">
            <span>Distance from Earth:</span>
            <strong>{(asteroid.missDistance / 1000000).toFixed(2)} M km</strong>
          </div>
          <div className="info-item">
            <span>Diameter:</span>
            <strong>{asteroid.diameter} meters</strong>
          </div>
          <div className="info-item">
            <span>Velocity:</span>
            <strong>{asteroid.velocity} km/s</strong>
          </div>
          <div className="info-item">
            <span>Status:</span>
            <strong className={asteroid.isHazardous ? 'hazard' : 'safe'}>
              {asteroid.isHazardous ? 'HAZARDOUS' : 'SAFE'}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProximityView;
