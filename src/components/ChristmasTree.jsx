import React from 'react';import { motion } from 'framer-motion';
import './ChristmasTree.css';

/**
 * Christmas Tree Component
 * Displays animated Christmas tree with subtle glow and light-blink effect
 * Uses royalty-free image from Unsplash
 */
const ChristmasTree = () => {
  // Royalty-free Christmas tree image from Unsplash

  const treeImageUrl =
    'https://cdn.pixabay.com/animation/2023/03/12/13/46/13-46-48-414_512.gif';

  return (
    <motion.div
      className="tree-container"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
    >
      <motion.div
        className="tree-image-wrapper"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ willChange: 'transform' }}
      >
        <img
          src={treeImageUrl}
          alt="Christmas Tree"
          className="tree-image"
          width="250"
          height="300"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '🎄';
            e.target.parentElement.style.fontSize = '150px';
          }}
        />

        <div className="tree-glow"></div>
      </motion.div>
    </motion.div>
  );
};

export default ChristmasTree;
