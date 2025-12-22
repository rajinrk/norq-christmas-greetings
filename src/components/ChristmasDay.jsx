import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SpinWheel from './games/SpinWheel';
import GiftHunt from './games/GiftHunt';
import SnowClick from './games/SnowClick';
import ChristmasQuiz from './games/ChristmasQuiz';
import './ChristmasDay.css';

/**
 * Christmas Day Celebration Component
 * Shows appreciation message and interactive games on Christmas Day
 */
const ChristmasDay = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [openedGifts, setOpenedGifts] = useState(new Set());

  const games = [
    // { id: 'quiz', name: '🎄 Christmas Quiz', component: ChristmasQuiz },
    { id: 'gifts', name: '🎁 Gift Hunt', component: GiftHunt },
    { id: 'wheel', name: '🎡 Spin the Wheel', component: SpinWheel },
    { id: 'snow', name: '❄️ Snow Click', component: SnowClick },
  ];

  const GameComponent = activeGame
    ? games.find((g) => g.id === activeGame)?.component
    : null;

  return (
    <motion.div
      className="christmas-day-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="main-title"
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.h1
          className="main-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {['Merry Christmas'].map((word, index) => (
            <motion.span
              key={index}
              className="title-word"
              initial={{ y: 50, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.8 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <div className="countdown-title-container">
          <motion.div
            className="countdown-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 2 }}
            whileHover={{
              opacity: 1,
              scale: 1.05,
              boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
            }}
          >
            Thank you for being the magic behind Norq's success!
          </motion.div>
        </div>

        <p className="sub-message " style={{ fontFamily: 'italic' }}>
          “Your dedication, creativity, and hard work make everything possible.
          <br />
          Enjoy these festive games and have a wonderful celebration! 🎉”
        </p>
      </motion.div>

      <div className="games-section">
        <h2 className="games-title">Festive Games</h2>
        <div className="games-menu">
          {games.map((game) => (
            <motion.button
              key={game.id}
              className={`game-button ${
                activeGame === game.id ? 'active' : ''
              }`}
              onClick={() =>
                setActiveGame(activeGame === game.id ? null : game.id)
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {game.name}
            </motion.button>
          ))}
        </div>

        {GameComponent && (
          <motion.div
            className="game-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GameComponent
              openedGifts={openedGifts}
              setOpenedGifts={setOpenedGifts}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ChristmasDay;
