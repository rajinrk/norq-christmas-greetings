import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChristmasQuiz.css';

/**
 * Christmas Quiz Component
 * Fun interactive quiz with Christmas-themed questions
 */
const ChristmasQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationKey, setCelebrationKey] = useState(0);

  // const questions = [
  //   {
  //     question: 'What is the traditional Christmas plant?',
  //     options: ['Rose', 'Mistletoe', 'Tulip', 'Sunflower'],
  //     correct: 1,
  //   },
  //   {
  //     question: "How many reindeer pull Santa's sleigh?",
  //     options: ['6', '8', '9', '10'],
  //     correct: 2,
  //   },
  //   {
  //     question: 'What do people traditionally put on top of a Christmas tree?',
  //     options: ['Star', 'Angel', 'Both', 'Snowflake'],
  //     correct: 2,
  //   },
  //   {
  //     question:
  //       'In which country did the tradition of Christmas trees originate?',
  //     options: ['USA', 'Germany', 'UK', 'France'],
  //     correct: 1,
  //   },
  //   {
  //     question: "What is the name of the Grinch's dog?",
  //     options: ['Max', 'Buddy', 'Rex', 'Charlie'],
  //     correct: 0,
  //   },
  // ];

  const questions = [
    {
      question: 'Christmas at Norq is all about?',
      options: [
        'Celebration',
        'Appreciation',
        'Togetherness',
        'All of the above',
      ],
      correct: 3,
    },
    {
      question: 'Norq Technology Solutions works primarily in which field?',
      options: [
        'Software & Technology Solutions',
        'Food & Catering',
        'Construction',
        'Event Management',
      ],
      correct: 0,
    },
    {
      question: 'Which quality best represents the Norq team culture?',
      options: [
        'Innovation',
        'Teamwork',
        'Problem Solving',
        'All of the above',
      ],
      correct: 3,
    },
    {
      question: 'What makes Norq Technology Solutions stand out?',
      options: [
        'Customer-focused solutions',
        'Strong technical expertise',
        'Passionate team',
        'All of the above',
      ],
      correct: 3,
    },
    {
      question: 'Which value is most important at Norq?',
      options: [
        'Collaboration',
        'Continuous learning',
        'Quality delivery',
        'All of the above',
      ],
      correct: 3,
    },
  ];

  const handleAnswer = (selectedIndex) => {
    const isCorrect = selectedIndex === questions[currentQuestion].correct;

    if (isCorrect) {
      setScore(score + 1);

      // Trigger a short celebration animation for each correct answer
      setCelebrationKey((prev) => prev + 1);
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 1200);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        className="quiz-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h3>🎄 Quiz Results 🎄</h3>
        <motion.div
          className="result-display"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="score-display">
            You scored {score} out of {questions.length}!
          </div>
          <div className="percentage">{percentage}%</div>
          <div className="result-message">
            {percentage === 100
              ? "🎉 Perfect! You're a Christmas expert!"
              : percentage >= 70
              ? '🌟 Great job! You know your Christmas!'
              : percentage >= 50
              ? '🎁 Good effort! Keep learning!'
              : '🎄 Nice try! Better luck next time!'}
          </div>
          <button className="reset-button" onClick={resetQuiz}>
            🔄 Play Again
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="quiz-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3>🎄 Christmas Quiz 🎄</h3>
      <div className="quiz-progress">
        Question {currentQuestion + 1} of {questions.length}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          className="question-card"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {/* Celebration overlay on correct answer */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                key={celebrationKey}
                className="quiz-celebration-overlay"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <motion.div
                  className="quiz-celebration-message"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  🎉 Great job! Correct answer! 🎉
                </motion.div>

                {/* Simple confetti / popper effect */}
                {Array.from({ length: 14 }).map((_, i) => (
                  <motion.span
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    className="quiz-confetti-piece"
                    style={{
                      left: `${10 + (i * 80) / 14}%`,
                    }}
                    initial={{
                      y: 0,
                      opacity: 1,
                      scale: 0.8,
                      rotate: 0,
                    }}
                    animate={{
                      y: [0, -40 - Math.random() * 40],
                      opacity: [1, 0],
                      rotate: [0, 180 + Math.random() * 180],
                    }}
                    transition={{
                      duration: 1 + Math.random() * 0.5,
                      ease: 'ease-out',
                    }}
                  >
                    {i % 3 === 0 ? '🎊' : i % 3 === 1 ? '🎉' : '✨'}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <h4 className="question-text">
            {questions[currentQuestion].question}
          </h4>
          <div className="options-grid">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                className="option-button"
                onClick={() => handleAnswer(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ChristmasQuiz;
