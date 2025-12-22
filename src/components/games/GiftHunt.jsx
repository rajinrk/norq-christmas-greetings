import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './GiftHunt.css';
import vishnuIcon from '../../assets/vishnu.png';
import hibaIcon from '../../assets/hiba.png';
import abinIcon from '../../assets/abin.png';
import abiramIcon from '../../assets/abhiram.png';
import zoninIcon from '../../assets/zonin.png';
import akhilIcon from '../../assets/akhil.png';
import sebaIcon from '../../assets/seba.png';
import navasIcon from '../../assets/navas.png';
import abhinavIcon from '../../assets/abhinav.png';
import midhilajIcon from '../../assets/midhilaj.png';
import minuIcon from '../../assets/minu.png';
import bhavanaIcon from '../../assets/bhavana.png';
import eshaIcon from '../../assets/esha.png';
import abhinandIcon from '../../assets/abhinand.png';
import ijasIcon from '../../assets/ijas.png';
import namithaIcon from '../../assets/namitha.png';
import razikIcon from '../../assets/razik.png';
import deepIcon from '../../assets/deep.png';
import tonyIcon from '../../assets/tony.png';
import santaIcon from '../../assets/santa.png';
import GiftModal from '../popupModal';
import clockTick3s from '../../assets/clock_tick_fast_3s.wav';
import crackersSound from '../../assets/firework.mp3';

/**
 * Gift Hunt Game Component
 * Clickable presents that reveal rewards
 */
const GiftHunt = ({ openedGifts, setOpenedGifts }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [timer, setTimer] = useState(5);
  const [isRevealed, setIsRevealed] = useState(false);
  const timerIntervalRef = useRef(null);
  const clockAudioRef = useRef(0);
  const celebrationAudioRef = useRef(null);

  const gifts = [
    { icon: hibaIcon, name: 'Hiba' },
    { icon: vishnuIcon, name: 'Vishnu' },
    { icon: abiramIcon, name: 'Abhiram' },
    { icon: zoninIcon, name: 'Zonin' },
    { icon: sebaIcon, name: 'Seba' },
    { icon: eshaIcon, name: 'Esha' },
    { icon: abinIcon, name: 'Abin' },
    { icon: navasIcon, name: 'Navas' },
    { icon: midhilajIcon, name: 'Midhilaj' },
    { icon: akhilIcon, name: 'Akhil' },
    { icon: bhavanaIcon, name: 'Bhavana' },
    { icon: minuIcon, name: 'Minu ❤️ Prashanth' },
    { icon: abhinandIcon, name: 'Abhinand' },
    { icon: ijasIcon, name: 'Ijas' },
    { icon: namithaIcon, name: 'Namitha' },
    { icon: abhinavIcon, name: 'Abhinav' },
    { icon: razikIcon, name: 'Razik' },
    { icon: deepIcon, name: 'Deep' },
    { icon: tonyIcon, name: 'Tony' },
    { icon: santaIcon, name: 'Santa Clause' },
  ];

  const triggerConfetti = () => {
    // Multiple confetti bursts for celebration

    confetti({
      particleCount: 1200,
      spread: 1260,
      origin: { y: 0.5 },
      colors: ['#ff0000', '#00ff00', '#ffffff', '#ffd700'],
      scalar: 1.2,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#00ff00', '#ffffff', '#ffd700'],
      });
    }, 250);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#00ff00', '#ffffff', '#ffd700'],
      });
    }, 400);
  };

  const stopClockSound = () => {
    if (clockAudioRef.current) {
      clockAudioRef.current.pause();
      clockAudioRef.current.currentTime = 0;
    }
  };

  const handleGiftClick = (gift) => {
    const revealed = openedGifts.has(gift.name);
    if (showModal) return;

    // Set selected gift and start timer
    setSelectedGift(gift);
    setShowModal(true);
    setIsRevealed(revealed);
    pauseCelebrationAudio();
    // Start countdown timer

    if (!revealed) {
      setTimer(3);
      if (clockAudioRef.current) {
        clockAudioRef.current.currentTime = 0;
        clockAudioRef.current.play().catch(() => {});
      }

      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            // Trigger confetti when timer ends
            stopClockSound();
            triggerConfetti();
            startCelebrationAudio();

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setTimer(0);
    }
  };

  const handleReveal = () => {
    setIsRevealed(true);
    // Mark gift as opened
    setOpenedGifts(new Set([...openedGifts, selectedGift.name]));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGift(null);
    handleReveal();
    setTimer(3);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    stopClockSound();
  };

  const startCelebrationAudio = () => {
    if (!celebrationAudioRef.current) return;

    const audio = celebrationAudioRef.current;

    // Reset & play
    // audio.volume = 0.7;
    audio.currentTime = 0;
    audio.play().catch(() => {});

    // ⏱ Auto fade after 3 seconds
    setTimeout(() => {
      fadeOutAudio(600); // smooth fade
    }, 3000);
  };

  const pauseCelebrationAudio = () => {
    fadeOutAudio(300);
  };

  const fadeOutAudio = (duration = 1000) => {
    if (!celebrationAudioRef.current) return;

    const audio = celebrationAudioRef.current;
    const startVolume = audio.volume;
    const intervalTime = 50;
    const steps = duration / intervalTime;
    const stepAmount = startVolume / steps;

    const fadeInterval = setInterval(() => {
      if (audio.volume > stepAmount) {
        audio.volume = Math.max(audio.volume - stepAmount, 0);
      } else {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = startVolume; // reset for next time
        clearInterval(fadeInterval);
      }
    }, intervalTime);
  };

  useEffect(() => {
    clockAudioRef.current = new Audio(clockTick3s);
    clockAudioRef.current.loop = false;

    celebrationAudioRef.current = new Audio(crackersSound);
    celebrationAudioRef.current.loop = false;

    return () => {
      clockAudioRef.current?.pause();
      clockAudioRef.current = null;

      celebrationAudioRef.current?.pause();
      celebrationAudioRef.current = null;
    };
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className={`gift-hunt-container ${showModal ? 'blurred' : ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3>🎁 Gift Hunt</h3>
      <p className="game-instruction">
        Click on the presents to reveal clues. Each gift holds a hint about a
        person — can you find them all? ❤️
      </p>
      <div className="gifts-grid">
        {gifts.map((gift) => (
          <motion.div
            key={gift.name}
            className={`gift-box ${
              openedGifts.has(gift.name) ? 'opened' : ''
            } ${showModal ? 'blurred' : ''}`}
            whileTap={{
              rotateY: openedGifts.has(gift.name) ? 0 : -180,
              duration: 2,
              animationDelay: 2,
            }}
            transition={{ duration: 2 }}
            onClick={() => handleGiftClick(gift)}
            style={{
              cursor: 'pointer',
            }}
          >
            {openedGifts.has(gift.name) ? (
              <motion.div
                className="gift-reward"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
              >
                <img
                  src={gift.icon}
                  alt={gift.name}
                  width={100}
                  height={100}
                  className="gift-image"
                />
              </motion.div>
            ) : (
              <div className="gift-unwrapped">
                <motion.div
                  className="gift-icon"
                  animate={{
                    scale: [1, 1.6, 1],
                    rotate: [0, 8, -8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                    transition: { duration: 0.3 },
                  }}
                >
                  🎁
                </motion.div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Modal for Gift Reveal */}
      <AnimatePresence>
        <GiftModal open={!!showModal && !!selectedGift}>
          {timer > 0 ? (
            <div className="timer-display">
              <motion.div
                className="timer-number"
                key={timer}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {timer}
              </motion.div>
              <p className="timer-text">Who could this be…?</p>
            </div>
          ) : (
            <div className="modal-content">
              <motion.div
                className="gift-image-container"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <img
                  src={selectedGift.icon}
                  alt={selectedGift.name}
                  className="modal-gift-image"
                />
              </motion.div>

              <div className="modal-buttons-container">
                <button
                  className="reveal-button"
                  onClick={handleReveal}
                  disabled={isRevealed}
                >
                  {isRevealed ? selectedGift.name : 'Reveal'}
                </button>

                <button
                  className="close-modal-button"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </GiftModal>
      </AnimatePresence>
    </motion.div>
  );
};

export default GiftHunt;
