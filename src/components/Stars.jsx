import React from 'react';import { motion } from 'framer-motion';
import './Stars.css';

/**
 * Stars Component
 * Creates blinking stars in the night sky
 * Stars twinkle with varying opacity and scale
 */
const Stars = () => {
  // Generate 100 stars with random positions
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    top: Math.random() * 50, // Top 50% of screen (sky area)
    left: Math.random() * 100,
    size: Math.random() * 3 + 1, // 1-4px
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2, // 2-5s blink duration
  }));

  return (
    <div className="stars-container">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            willChange: 'opacity, transform',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default Stars;
