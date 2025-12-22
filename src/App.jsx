import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Snowfall from './components/Snowfall';
import Stars from './components/Stars';
import Santa from './components/Santa';
import ChristmasTree from './components/ChristmasTree';
import Countdown from './components/Countdown';
import ChristmasDay from './components/ChristmasDay';
import confetti from 'canvas-confetti';
import './App.css';
import { defaultValues } from './constants';
import Comet from './components/comet';
import crackersSound from './assets/firework.mp3';

/**
 * Main App Component
 * Determines if it's Christmas Day and renders appropriate content
 * Before Christmas: Shows countdown with festive scene
 * On Christmas Day: Shows celebration with games
 */
const App = () => {
  const [isChristmasDay, setIsChristmasDay] = useState(false);
  const [celebrationTriggered, setCelebrationTriggered] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const [showCelebrationOverlay, setShowCelebrationOverlay] = useState(false);
  const [showChristmasContent, setShowChristmasContent] = useState(false);
  const [hasReachedTarget, setHasReachedTarget] = useState(false);

  const intervalRef = useRef(null);
  const celebrationAudioRef = useRef(null);

  useEffect(() => {
    celebrationAudioRef.current = new Audio(crackersSound);
    celebrationAudioRef.current.loop = true;

    return () => {
      celebrationAudioRef.current?.pause();
      celebrationAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isTestMode) {
      const checkChristmasDay = () => {
        const now = new Date();
        const year = defaultValues.year;
        const month = defaultValues.month;
        const day = defaultValues.day;
        const hour = defaultValues.hour;
        const minute = defaultValues.minute;
        const second = defaultValues.seconds;

        const targetDateTime = new Date(year, month, day, hour, minute, second);

        // Check if current time is exactly at or after the target time
        const isSpecificDateTime = now.getTime() >= targetDateTime.getTime();

        // Original Christmas day check
        const isChristmasDay = now.getMonth() === year && now.getDate() === day;

        setIsChristmasDay(isChristmasDay);

        // Trigger celebration for either condition
        if ((isChristmasDay || isSpecificDateTime) && !celebrationTriggered) {
          // startChristmasSequence();
          // setCelebrationTriggered(true);
        }
      };

      checkChristmasDay();
      // Check more frequently for precise timing (every second instead of every minute)
      const interval = setInterval(checkChristmasDay, 1000);
      intervalRef.current = interval;

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (celebrationTriggered) {
          confetti.reset();
        }
      };
    }
  }, [celebrationTriggered, isTestMode]);

  const startCelebrationAudio = () => {
    if (celebrationAudioRef.current) {
      celebrationAudioRef.current.currentTime = 0;
      celebrationAudioRef.current.play().catch(() => {});
    }
  };

  const pauseCelebrationAudio = () => {
    fadeOutAudio(800);
  };

  const startChristmasSequence = () => {
    // Step 1: Show celebration overlay and trigger confetti
    setShowCelebrationOverlay(true);
    triggerChristmasCelebration();

    startCelebrationAudio();

    // Step 2: After celebration finishes, show Christmas content
    setTimeout(() => {
      setShowCelebrationOverlay(false);
      setShowChristmasContent(true);
      pauseCelebrationAudio();
    }, 8000); // Wait 8 seconds for celebration to finish
  };

  const fadeOutAudio = (duration = 1000) => {
    if (!celebrationAudioRef.current) return;

    const audio = celebrationAudioRef.current;
    const startVolume = audio.volume;
    const step = startVolume / (duration / 50);

    const fadeInterval = setInterval(() => {
      if (audio.volume > step) {
        audio.volume -= step;
      } else {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = startVolume; // reset for next time
        clearInterval(fadeInterval);
      }
    }, 50);
  };

  const triggerChristmasCelebration = () => {
    // Stop countdown interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Reset confetti
    confetti.reset();

    // 1. Initial Big Bang + START AUDIO
    setTimeout(() => {
      confetti({
        particleCount: 300,
        spread: 360,
        origin: { y: 0.5 },
        colors: ['#ff0000', '#00ff00', '#ffffff', '#ffd700'],
        scalar: 1.2,
      });
    }, 100);

    // 2. Side Cannons
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.5 },
        colors: ['#ff0000', '#00ff00'],
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.5 },
        colors: ['#ffffff', '#ffd700'],
      });
    }, 500);

    // 3. Multiple Bursts
    setTimeout(() => {
      const end = Date.now() + 3000;
      const colors = ['#ff0000', '#00ff00', '#ffffff', '#ffd700', '#ff69b4'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
          scalar: 0.8,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
          scalar: 0.8,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }, 1000);

    // 4. Christmas-themed Burst
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#ffffff'],
        shapes: ['circle', 'star'],
        scalar: 1.5,
      });
    }, 2000);

    // 5. Gentle snowfall
    setTimeout(() => {
      const duration = 5000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const snowfall = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          clearInterval(snowfall);
          return;
        }

        const particleCount = 30 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#ff0000', '#00ff00'],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#ffffff', '#ffd700'],
        });
      }, 250);
    }, 3000);

    // 6. Final Grand Finale
    setTimeout(() => {
      confetti({
        particleCount: 500,
        spread: 200,
        origin: { y: 0.3 },
        colors: [
          '#ff0000',
          '#00ff00',
          '#ffffff',
          '#ffd700',
          '#ff69b4',
          '#00ffff',
        ],
        shapes: ['circle', 'star'],
        scalar: 2,
      });
    }, 4000);

    // 🔊 Fade out audio near end of visuals
  };

  // Manual trigger for testing
  const testCelebration = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Enter test mode
    setIsTestMode(true);
    setIsChristmasDay(true);
    setCelebrationTriggered(true);

    // Start the sequence
    startChristmasSequence();
  };

  // Exit test mode and go back to countdown
  const exitTestMode = () => {
    setIsTestMode(false);
    setIsChristmasDay(false);
    setCelebrationTriggered(false);
    setShowCelebrationOverlay(false);
    setShowChristmasContent(false);
    confetti.reset();
  };

  // Skip celebration and go directly to Christmas content (for testing)
  const skipToChristmasContent = () => {
    setShowCelebrationOverlay(false);
    setShowChristmasContent(true);
  };

  return (
    <div className="app">
      {/* Background Scene - Always visible */}
      <div className="background-scene">
        {/* Night sky gradient */}
        <div className="night-sky"></div>

        {/* Animated elements */}
        <Stars intensity={isChristmasDay ? 2 : 1} />
        <Snowfall intensity={isChristmasDay ? 3 : 1} />

        {/* Decorative elements */}
        {!isChristmasDay && !showCelebrationOverlay && (
          <>
            <Santa />
            <ChristmasTree />
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Countdown Screen (Before Christmas) */}
        {!isChristmasDay && !showChristmasContent && (
          <motion.div
            className="countdown-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {!showCelebrationOverlay && (
              <>
                <motion.span className="company-text">
                  Norq Technology Solutions Pvt Ltd
                </motion.span>

                <motion.h1
                  className="main-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {['Merry Christmas'].map((word, index) => (
                    <motion.span
                      key={index}
                      className="title-word"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2,
                        ease: 'easeOut',
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>

                <motion.p
                  className="subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <motion.span
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {hasReachedTarget
                      ? 'The Celebration Begins Today! 🎉'
                      : `The magic unfolds on December 23rd! 🎁✨`}
                    <br />
                    <motion.span
                      style={{
                        fontSize: '0.9em',
                        opacity: 0.9,
                        display: 'block',
                        marginTop: '0.5rem',
                        fontFamily: 'italic',
                      }}
                      animate={{
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {hasReachedTarget
                        ? `"The wait is almost over — festive surprises are ready to be unwrapped!"`
                        : `"Come back to unwrap festive surprises and heartfelt
                      moments!"`}
                    </motion.span>
                  </motion.span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                >
                  <Countdown
                    onCountdownEnd={testCelebration}
                    startChristmasSequence={startChristmasSequence}
                    hasReachedTarget={hasReachedTarget}
                    setHasReachedTarget={setHasReachedTarget}
                  />
                </motion.div>

                {/* <motion.button
                  className="test-celebration-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 2 }}
                  whileHover={{
                    opacity: 1,
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
                  }}
                  onClick={testCelebration}
                >
                  🎉 Test Christmas Celebration
                </motion.button> */}
              </>
            )}
          </motion.div>
        )}

        {/* Celebration Overlay - Shows during confetti blast */}
        <AnimatePresence>
          {showCelebrationOverlay && (
            <motion.div
              className="celebration-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="celebration-message"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 10,
                  delay: 0.5,
                }}
              >
                <motion.h1
                  className="celebration-title"
                  animate={{
                    scale: [1, 1.1, 1],
                    textShadow: [
                      '0 0 20px rgba(255, 0, 0, 0.7)',
                      '0 0 40px rgba(0, 255, 0, 0.7)',
                      '0 0 20px rgba(255, 0, 0, 0.7)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  🎄 Merry Christmas! 🎄
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  {isTestMode
                    ? 'Test Mode - Enjoy the celebration!'
                    : 'The wait is over! Let the celebrations begin!'}
                </motion.p>

                {/* Skip button for testing */}
                {isTestMode && (
                  <motion.div className="celebration-controls">
                    <motion.button
                      className="skip-btn"
                      onClick={skipToChristmasContent}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Skip to Christmas Content
                    </motion.button>
                    <motion.button
                      className="exit-btn"
                      onClick={exitTestMode}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Exit Test Mode
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Christmas Day Content - Shows after celebration */}
        {showChristmasContent && (
          <motion.div
            className="christmas-content-wrapper"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Exit test mode button (only in test mode) */}
            {isTestMode && (
              <motion.button
                className="floating-exit-btn"
                onClick={exitTestMode}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back to Countdown
              </motion.button>
            )}

            <ChristmasDay />
          </motion.div>
        )}
      </div>
      {/* <Comet /> */}
    </div>
  );
};

export default App;
