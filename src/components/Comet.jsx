import React, { useState, useEffect, useRef } from 'react';import { motion } from 'framer-motion';
import './Comet.css';

const ChristmasComet = () => {
  const [comets, setComets] = useState([]);
  const cometIdRef = useRef(0);
  const animationFrameRef = useRef(null);
  const lastUpdateTimeRef = useRef(Date.now());

  // Christmas color palette
  const christmasColors = [
    'rgba(255, 0, 0, 0.7)', // Red
    'rgba(0, 255, 0, 0.7)', // Green
    'rgba(255, 255, 255, 0.7)', // White
    'rgba(255, 215, 0, 0.7)', // Gold
    'rgba(135, 206, 235, 0.7)', // Light Blue
  ];

  const christmasTailColors = [
    'linear-gradient(90deg, transparent 0%, rgba(255, 100, 100, 0.3) 40%, rgba(255, 0, 0, 0.6) 80%, transparent 100%)',
    'linear-gradient(90deg, transparent 0%, rgba(100, 255, 100, 0.3) 40%, rgba(0, 255, 0, 0.6) 80%, transparent 100%)',
    'linear-gradient(90deg, transparent 0%, rgba(200, 200, 255, 0.3) 40%, rgba(255, 255, 255, 0.6) 80%, transparent 100%)',
    'linear-gradient(90deg, transparent 0%, rgba(255, 235, 150, 0.3) 40%, rgba(255, 215, 0, 0.6) 80%, transparent 100%)',
    'linear-gradient(90deg, transparent 0%, rgba(175, 226, 255, 0.3) 40%, rgba(135, 206, 235, 0.6) 80%, transparent 100%)',
  ];

  const createComet = () => {
    const colorIndex = Math.floor(Math.random() * christmasColors.length);
    const isFast = Math.random() > 0.7;

    // Choose random edge to start from
    const startEdge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let startX, startY, angle;

    switch (startEdge) {
      case 0: // Top
        startX = Math.random() * window.innerWidth;
        startY = 0;
        angle = Math.PI / 4 + (Math.random() * Math.PI) / 2; // 45-135 degrees
        break;
      case 1: // Right
        startX = window.innerWidth;
        startY = Math.random() * window.innerHeight;
        angle = (3 * Math.PI) / 4 + (Math.random() * Math.PI) / 2; // 135-225 degrees
        break;
      case 2: // Bottom
        startX = Math.random() * window.innerWidth;
        startY = window.innerHeight;
        angle = (5 * Math.PI) / 4 + (Math.random() * Math.PI) / 2; // 225-315 degrees
        break;
      case 3: // Left
        startX = 0;
        startY = Math.random() * window.innerHeight;
        angle = (7 * Math.PI) / 4 + (Math.random() * Math.PI) / 2; // 315-405 degrees (45)
        break;
      default:
        startX = 0;
        startY = 0;
        angle = Math.PI / 4;
    }

    // Normalize angle
    angle = angle % (2 * Math.PI);

    return {
      id: cometIdRef.current++,
      startX,
      startY,
      angle,
      size: 2 + Math.random() * 3, // Smaller for better performance
      duration: isFast ? 1.5 + Math.random() * 1.5 : 4 + Math.random() * 3,
      color: christmasColors[colorIndex],
      tailColor: christmasTailColors[colorIndex],
      createdAt: Date.now(),
    };
  };

  // Optimized comet update function
  const updateComets = () => {
    const now = Date.now();
    const deltaTime = now - lastUpdateTimeRef.current;

    if (deltaTime < 16) return; // ~60fps

    lastUpdateTimeRef.current = now;

    setComets((prev) => {
      // Remove old comets that should have finished
      const filtered = prev.filter((comet) => {
        const elapsed = now - comet.createdAt;
        return elapsed < comet.duration * 1000 + 500; // Keep 500ms buffer
      });

      // Add new comet randomly (10% chance per frame)
      if (filtered.length < 6 && Math.random() > 0.9) {
        filtered.push(createComet());
      }

      return filtered;
    });

    animationFrameRef.current = requestAnimationFrame(updateComets);
  };

  useEffect(() => {
    // Create initial comets
    const initialComets = Array.from({ length: 3 }, createComet);
    setComets(initialComets);

    // Start the animation loop
    animationFrameRef.current = requestAnimationFrame(updateComets);

    // Handle window resize
    const handleResize = () => {
      // Clear all comets on resize to avoid position issues
      setComets([]);
      setTimeout(() => {
        const newComets = Array.from({ length: 2 }, createComet);
        setComets(newComets);
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Pre-calculate values outside map for better performance
  const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const containerHeight =
    typeof window !== 'undefined' ? window.innerHeight : 0;
  const maxDimension = Math.max(containerWidth, containerHeight);

  return (
    <div className="comet-container">
      {comets.map((comet) => {
        const distance = maxDimension * 1.5;
        const endX = comet.startX + Math.cos(comet.angle) * distance;
        const endY = comet.startY + Math.sin(comet.angle) * distance;

        // Calculate tail position (behind the comet)
        const tailLength = comet.size * 20; // Slightly shorter for performance
        const tailOffsetX = -Math.cos(comet.angle) * tailLength;
        const tailOffsetY = -Math.sin(comet.angle) * tailLength;

        const angleDegrees = (comet.angle * 180) / Math.PI;

        return (
          <motion.div
            key={comet.id}
            className="comet-tail christmas-tail"
            initial={{
              x: comet.startX + tailOffsetX,
              y: comet.startY + tailOffsetY,
              opacity: 0,
              scaleX: 0.3,
              rotate: angleDegrees,
            }}
            animate={{
              x: endX + tailOffsetX,
              y: endY + tailOffsetY,
              opacity: [0, 1, 1, 0],
              scaleX: [0.3, 1, 1, 0.1],
            }}
            transition={{
              x: { duration: comet.duration, ease: 'linear' },
              y: { duration: comet.duration, ease: 'linear' },
              opacity: {
                duration: comet.duration,
                times: [0, 0.1, 0.9, 1],
              },
              scaleX: {
                duration: comet.duration,
                times: [0, 0.1, 0.9, 1],
              },
            }}
            style={{
              background: comet.tailColor,
              width: `${tailLength}px`,
              height: `${comet.size}px`,
              transformOrigin: 'right center',
              position: 'absolute',
              borderRadius: '2px',
              filter: 'blur(0.8px)',
              willChange: 'transform, opacity',
            }}
          />
        );
      })}
    </div>
  );
};

export default ChristmasComet;
