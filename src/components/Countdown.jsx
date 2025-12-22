import React, { useState, useEffect } from 'react';import { motion, AnimatePresence } from 'framer-motion';
import './Countdown.css';
import { defaultValues } from '../constants';

import norqLogo from '../assets/norq-logo.jpg';

/**
 * Countdown Component
 * Real-time countdown to specific target time with smooth number transitions
 * Counts down to December 19, 2025 at 8:53 PM
 */
const Countdown = ({
  startChristmasSequence,
  hasReachedTarget,
  setHasReachedTarget,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const year = defaultValues.year;
      const month = defaultValues.month;
      const day = defaultValues.day;
      const hour = defaultValues.hour;
      const minute = defaultValues.minute;
      const second = defaultValues.seconds;

      const targetTime = new Date(year, month, day, hour, minute, second);

      const difference = targetTime - now;

      // Check if target time has been reached
      if (difference <= 0) {
        // Time's up!
        if (!hasReachedTarget) {
          setHasReachedTarget(true);
        }
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Calculate time components
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();

    // Only continue the interval if we haven't reached the target time
    if (!hasReachedTarget) {
      const interval = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(interval);
    }

    // Cleanup function - runs when component unmounts
    return () => {};
  }, [hasReachedTarget]);

  const NumberDisplay = ({ value, label }) => (
    <motion.div className="countdown-item">
      <motion.div
        className="countdown-number"
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div className="countdown-label">{label}</div>
    </motion.div>
  );

  // Message to show when target time is reached
  if (hasReachedTarget) {
    return (
      <motion.div
        className="countdown-container-home"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: 1,
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            marginBottom: '20px',
          }}
        >
          <img src={norqLogo} className="norq-logo" />
        </motion.div>

        <h2 className="countdown-title-home" onClick={startChristmasSequence}>
          🎉 Start the Celebration 🎉
        </h2>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="countdown-container-home"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
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
          🎄 Countdown to Christmas Celebration 🎄
        </motion.div>
      </div>

      <div className="countdown-grid">
        <AnimatePresence mode="wait">
          <NumberDisplay
            key={`days-${timeLeft.days}`}
            value={timeLeft.days}
            label="Days"
          />
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <NumberDisplay
            key={`hours-${timeLeft.hours}`}
            value={timeLeft.hours}
            label="Hours"
          />
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <NumberDisplay
            key={`minutes-${timeLeft.minutes}`}
            value={timeLeft.minutes}
            label="Minutes"
          />
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <NumberDisplay
            key={`seconds-${timeLeft.seconds}`}
            value={timeLeft.seconds}
            label="Seconds"
          />
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Countdown;
