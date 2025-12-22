import React, { useState, useEffect } from 'react';import { motion } from 'framer-motion';
import './SnowClick.css';

/**
 * Snow Click Game Component
 * Click falling snowflakes to earn points
 */
const SnowClick = () => {
  const [score, setScore] = useState(0);
  const [snowflakes, setSnowflakes] = useState([]);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      const newFlake = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        delay: 0,
      };
      setSnowflakes((prev) => [...prev, newFlake]);
    }, 800);

    return () => clearInterval(interval);
  }, [gameActive]);

  const handleSnowflakeClick = (id) => {
    setScore((prev) => prev + 10);
    setSnowflakes((prev) => prev.filter((flake) => flake.id !== id));
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setSnowflakes([]);
    setTimeout(() => {
      setGameActive(false);
    }, 30000); // 30 seconds game
  };

  return (
    <motion.div
      className="snow-click-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3>❄️ Snow Click Game</h3>
      <div className="game-info">
        <div className="score">Score: {score}</div>
        <div className="timer">
          {gameActive ? '⏱️ Game Active!' : 'Click Start to Play'}
        </div>
      </div>
      <div className="game-area">
        {snowflakes.map((flake) => (
          <motion.div
            key={flake.id}
            className="clickable-snowflake"
            style={{ left: `${flake.left}%` }}
            initial={{ top: 0, opacity: 1 }}
            animate={{ top: '100%', opacity: 0 }}
            transition={{ duration: 3, ease: 'linear' }}
            onClick={() => handleSnowflakeClick(flake.id)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            ❄️
          </motion.div>
        ))}
      </div>
      <button
        className="start-button"
        onClick={startGame}
        disabled={gameActive}
      >
        {gameActive ? 'Playing...' : '🎮 Start Game (30s)'}
      </button>
      {!gameActive && score > 0 && (
        <motion.div
          className="final-score"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Final Score: {score} points! 🎉
        </motion.div>
      )}
    </motion.div>
  );
};

export default SnowClick;
