/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

const QuizForm = () => {

  const questions = [
    {
      question: "What is the biggest source of pollution in the world's oceans?",
      options: ["Industrial Waste", "Plastic Pollution", "Oil Spills", "Sewage Disposal"],
      correctAnswer: "Plastic Pollution",
    },
    {
      question: "Which of the following is a renewable energy source?",
      options: ["Coal", "Natural Gas", "Solar Power", "Nuclear Power"],
      correctAnswer: "Solar Power",
    },
    {
      question: "What is the primary cause of deforestation?",
      options: ["Urbanization", "Agriculture", "Logging", "Mining"],
      correctAnswer: "Agriculture",
    },
    {
      question: "Which gas is most responsible for global warming?",
      options: ["Methane", "Nitrogen", "Carbon Dioxide", "Oxygen"],
      correctAnswer: "Carbon Dioxide",
    },
    {
      question: "What is the main goal of conservation efforts?",
      options: ["Preserving natural resources", "Increasing industrial production", "Maximizing agricultural land", "Expanding urban areas"],
      correctAnswer: "Preserving natural resources",
    },
    {
      question: "Which of these animals is critically endangered due to deforestation?",
      options: ["Polar Bear", "Orangutan", "Penguin", "Dolphin"],
      correctAnswer: "Orangutan",
    },
    {
      question: "What is one major consequence of ocean acidification?",
      options: ["Increased ocean temperature", "Coral bleaching", "More oxygen in the water", "Increased fish populations"],
      correctAnswer: "Coral bleaching",
    },
    {
      question: "What practice can reduce soil erosion in farming?",
      options: ["Overgrazing", "Crop rotation", "Pesticide use", "Deforestation"],
      correctAnswer: "Crop rotation",
    },
    {
      question: "Which of the following helps in reducing carbon footprint?",
      options: ["Using public transportation", "Using single-use plastic", "Leaving lights on", "Using fossil fuels"],
      correctAnswer: "Using public transportation",
    },
    {
      question: "Which action can best support biodiversity conservation?",
      options: ["Creating more wildlife reserves", "Clearing forests for farmland", "Building more factories", "Draining wetlands"],
      correctAnswer: "Creating more wildlife reserves",
    }
  ];


  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(new Array(questions.length).fill(''));
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleOptionSelect = (option) => {
    if (isAnimating) return;
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestion] = option;
    setSelectedOptions(updatedSelectedOptions);
    setAnswerStatus(null);
  };

  const handleNextQuestion = () => {
    if (isAnimating) return;
    if (!selectedOptions[currentQuestion]) return;

    setIsAnimating(true);
    const isCorrect = selectedOptions[currentQuestion] === questions[currentQuestion].correctAnswer;
    setAnswerStatus(isCorrect);

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswerStatus(null);
      } else {
        setShowResult(true);
        if (score + (isCorrect ? 1 : 0) > 2) {
          setTimeout(triggerConfetti, 500);
        }
      }
      setIsAnimating(false);
    }, 1000);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0 && !isAnimating) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswerStatus(null);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOptions(new Array(questions.length).fill(''));
    setScore(0);
    setShowResult(false);
    setAnswerStatus(null);
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
      <div className={`w-full mx-auto bg-white py-12 mt-20 sm:px-0 px-4 transition-all duration-700`}>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="inline-block px-3 py-2 text-sm font-semibold text-white rounded-lg text-cn bg-blue-900 hover:cursor-pointer hover:bg-opacity-90">
              Conservation Trivia
            </div>
            <motion.h1
              className="text-5xl font-bold text-center mt-4 mb-8 text-green-800"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Test your knowledge
            </motion.h1>
            <motion.p
              className="text-2xl text-center text-green-700 font-semibold"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Think Green: Take the Quiz to Discover Your Conservation IQ!
            </motion.p>
          </div>
          
        </motion.div>

        <div className="bg-[#00704A] backdrop-blur-lg rounded-2xl p-8 h-[748.8px] shadow-xl">
          <AnimatePresence mode="wait">
            {showResult ? (
              <div className='flex flex-col items-center justify-center w-full h-full'>
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-8"
                >
                  <Award className="w-24 h-24 mx-auto text-yellow-400" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-6">Quiz Complete!</h2>
                <div className="text-xl text-white mb-8">
                  You scored <span className="text-emerald-400 font-bold">{score}</span> out of {questions.length}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetQuiz}
                  className="bg-gradient-to-r from-emerald-400 to-green-400 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Try Again
                </motion.button>
              </motion.div>
              </div>
            ) : (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 rounded-xl overflow-hidden"
                >
                  <img
                    src="https://optimise2.assets-servd.host/nice-serious/production/images/ikea-marvellous-middle-10.png?w=1280&q=100&auto=format&fit=crop&dm=1659446362&s=85ce5df0d755711d8a5e16ee05cc38cd"
                    alt="Question illustration"
                    className="w-full h-80 object-cover object-center -mb-32"
                  />
                  
                </motion.div>
                <div className="w-full bg-white/10 rounded-full h-2 mb-8">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sky-400 to-blue-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-6">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOptionSelect(option)}
                        className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                          selectedOptions[currentQuestion] === option
                            ? 'bg-white/20 border-2 border-green-400'
                            : 'bg-white/10 border-2 border-transparent'
                        } hover:bg-white/20`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedOptions[currentQuestion] === option
                              ? 'border-green-400'
                              : 'border-white/50'
                          }`}>
                            {selectedOptions[currentQuestion] === option && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 bg-green-400 rounded-full"
                              />
                            )}
                          </div>
                          <span className="text-white text-lg">{option}</span>
                        </div>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-full ${
                      currentQuestion === 0
                        ? 'bg-white/10 text-white/50 cursor-not-allowed'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Previous</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextQuestion}
                    disabled={!selectedOptions[currentQuestion]}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-full ${
                      !selectedOptions[currentQuestion]
                        ? 'bg-white/10 text-white/50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-emerald-400 to-green-400 text-white'
                    }`}
                  >
                    <span>{currentQuestion === questions.length - 1 ? "Finish" : "Next"}</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
  );
};

export default QuizForm;