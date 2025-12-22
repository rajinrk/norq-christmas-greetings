import React from 'react';
import { motion } from 'framer-motion';
import './Santa.css';

/**
 * Santa Component
 * Displays animated Santa Claus with gentle floating motion
 * Uses royalty-free image from Unsplash
 */
const Santa = () => {
  // Royalty-free Santa image from Unsplash
  const santaImageUrl =
    'https://cdn.pixabay.com/animation/2024/10/16/09/27/09-27-15-148_512.gif';

  return (
    <motion.div
      className="santa-container"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <motion.div
        className="santa-image-wrapper"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ willChange: 'transform' }}
      >
        <img
          src={santaImageUrl}
          alt="Santa Claus"
          className="santa-image"
          width="200"
          height="200"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '🎅';
            e.target.parentElement.style.fontSize = '120px';
          }}
        />
        <div className="santa-glow"></div>
      </motion.div>
    </motion.div>
  );
};

export default Santa;
