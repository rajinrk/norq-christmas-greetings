import React from 'react';import { motion } from 'framer-motion';
import './Snowfall.css';

/**
 * Snowfall Component
 * Creates animated snowflakes falling across the screen
 * Each snowflake has random size, speed, and horizontal drift
 */
const Snowfall = () => {
  // Generate 50 snowflakes with random properties
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 10, // 5-15px
    left: Math.random() * 100, // 0-100%
    delay: Math.random() * 5, // 0-5s delay
    duration: Math.random() * 10 + 10, // 10-20s fall duration
    drift: (Math.random() - 0.5) * 100, // Horizontal drift
  }));

  return (
    <div className="snowfall-container">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            willChange: 'transform, opacity',
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: window.innerHeight + 100,
            x: flake.drift,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default Snowfall;
