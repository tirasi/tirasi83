import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import '../styles/OrbitView.css';

const OrbitView = ({ asteroids }) => {
  const mountRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible || !mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Earth
    const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
    const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x2233ff, wireframe: false });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Earth glow
    const glowGeometry = new THREE.SphereGeometry(1.1, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0.3 });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Asteroids
    const asteroidMeshes = [];
    asteroids.slice(0, 10).forEach((asteroid, index) => {
      const distance = 3 + index * 0.5;
      const size = 0.1 + (asteroid.diameter / 1000) * 0.2;
      
      // Orbit line
      const orbitGeometry = new THREE.BufferGeometry();
      const orbitPoints = [];
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        orbitPoints.push(
          Math.cos(angle) * distance,
          Math.sin(angle * 0.3) * 0.5,
          Math.sin(angle) * distance
        );
      }
      orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitPoints, 3));
      const orbitMaterial = new THREE.LineBasicMaterial({ 
        color: asteroid.isHazardous ? 0xff4444 : 0xff6b35,
        transparent: true,
        opacity: 0.5
      });
      const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
      scene.add(orbit);

      // Asteroid
      const asteroidGeometry = new THREE.SphereGeometry(size, 16, 16);
      const asteroidMaterial = new THREE.MeshBasicMaterial({ 
        color: asteroid.isHazardous ? 0xff4444 : 0xff6b35
      });
      const asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
      scene.add(asteroidMesh);
      
      asteroidMeshes.push({ mesh: asteroidMesh, distance, speed: 0.001 + index * 0.0002, angle: index * 0.5 });
    });

    camera.position.z = 8;
    camera.position.y = 3;
    camera.lookAt(0, 0, 0);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      earth.rotation.y += 0.002;
      glow.rotation.y += 0.002;

      asteroidMeshes.forEach(({ mesh, distance, speed, angle }, index) => {
        asteroidMeshes[index].angle += speed;
        const currentAngle = asteroidMeshes[index].angle;
        mesh.position.x = Math.cos(currentAngle) * distance;
        mesh.position.z = Math.sin(currentAngle) * distance;
        mesh.position.y = Math.sin(currentAngle * 0.3) * 0.5;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isVisible, asteroids]);

  return (
    <div className="orbit-view-container">
      <button 
        className="orbit-toggle-btn btn"
        onClick={() => setIsVisible(!isVisible)}
      >
        <span>{isVisible ? '🌐 Hide' : '🌐 Show'} 3D Orbit View</span>
      </button>
      
      {isVisible && (
        <div className="orbit-view-wrapper">
          <div ref={mountRef} className="orbit-canvas" />
          <div className="orbit-legend">
            <div className="legend-item">
              <span className="legend-color" style={{ background: '#2233ff' }}></span>
              <span>Earth</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ background: '#ff6b35' }}></span>
              <span>Safe Asteroid</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ background: '#ff4444' }}></span>
              <span>Hazardous Asteroid</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrbitView;
