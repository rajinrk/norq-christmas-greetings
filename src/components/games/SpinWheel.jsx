import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SpinWheel.css';

/**
 * Spin-the-Wheel Game Component
 * Interactive spinning wheel with rewards
 */

// Toast Component

const SpinWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const finalRotationRef = useRef(0);

  const rewards = [
    'Tamam Mandhi',
    'Porotta Beef',
    'K.B Biriyani',
    'Bingooo',
    'Dark Chocolate',
    'Homely meals',
    'Kanjikadayile kanji',
    `Hiba's Bread Bujji`,
  ];

  const handleSpin = () => {
    if (spinning) return;

    setSpinning(true);

    const spins = 5 + Math.floor(Math.random() * 5);
    const randomAngle = Math.random() * 360;
    const extraRotation = spins * 360 + randomAngle;

    setRotation((prevRotation) => {
      const finalRotation = prevRotation + extraRotation - 90;
      finalRotationRef.current = finalRotation; // 🔐 single source of truth
      return finalRotation;
    });

    setTimeout(() => {
      setSpinning(false);

      const anglePerReward = 360 / rewards.length;

      // Normalize
      const normalized = ((finalRotationRef.current % 360) + 360) % 360;

      // Pointer is at top (0deg)
      const pointerAngle = (360 - normalized) % 360;

      // Nearest segment center
      const index = Math.round(pointerAngle / anglePerReward) % rewards.length;
    }, 3000);
  };

  return (
    <motion.div
      className="spin-wheel-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3>🎡 Spin the Wheel</h3>
      <p className="game-instruction">
        Win a prize and let Prashanth sir take care of the rest 🎉
      </p>
      <div className="wheel-wrapper">
        <motion.div
          className="wheel"
          animate={{
            rotate: rotation,
          }}
          transition={{
            duration: spinning ? 3 : 0,
            ease: [0.15, 0.85, 0.35, 1],
          }}
        >
          {rewards.map((reward, index) => {
            const angle = (360 / rewards.length) * index;
            const anglePerReward = 360 / rewards.length;

            return (
              <div
                key={index}
                className="wheel-segment"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <span
                  className="segment-text"
                  style={{
                    transform: `rotate(${anglePerReward}deg)`,
                  }}
                >
                  {reward}
                </span>
              </div>
            );
          })}
        </motion.div>
        <div className="wheel-pointer"></div>
      </div>
      <button className="spin-button" onClick={handleSpin} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin!'}
      </button>
      {/* <AnimatePresence>
        {showToast && (
          <Toast message={toastMessage} onClose={handleCloseToast} />
        )}
      </AnimatePresence> */}
    </motion.div>
  );
};

export default SpinWheel;
