import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import confetti from 'canvas-confetti';
import quizEmote from '../../../assets/quiz-emote.png';

const QuizForm = () => {
  const questions = [
    {
      question: "What is the biggest source of pollution in the world's oceans?",
      options: ["Industrial Waste", "Plastic Pollution", "Oil Spills", "Sewage Disposal"],
      correctAnswer: "Plastic Pollution"
    },
    {
      question: "Which of the following is a renewable energy source?",
      options: ["Coal", "Natural Gas", "Solar Power", "Nuclear Power"],
      correctAnswer: "Solar Power"
    },
    {
      question: "What is the primary cause of deforestation?",
      options: ["Urbanization", "Agriculture", "Logging", "Mining"],
      correctAnswer: "Agriculture"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(new Array(questions.length).fill(''));
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);

  useEffect(() => {
    if (showResult && score === questions.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [showResult, score]);

  const handleOptionSelect = (option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestion] = option;
    setSelectedOptions(updatedSelectedOptions);
    setAnswerStatus(null);
  };

  const handleNextQuestion = () => {
    if (!selectedOptions[currentQuestion]) {
      toast.error('Please choose an option to continue', { position: "top-center" });
      return;
    }

    const isCorrect = selectedOptions[currentQuestion] === questions[currentQuestion].correctAnswer;
    setAnswerStatus(isCorrect);

    if (isCorrect) {
      setScore(score + 1);
      toast.success('Correct answer!', { position: "top-center" });
    } else {
      toast.error('Incorrect answer. Try again!', { position: "top-center" });
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswerStatus(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
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

  return (
    <div className="py-24 w-full">
        <h2 className="text-3xl font-['helvetica'] font-bold mb-8">Earth Conservation Quiz</h2>
       
        <div className="h-[500px] mx-auto p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl shadow-2xl">
          <Toaster />
          <AnimatePresence mode="wait">
            {showResult ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center text-white"
              >
                <h2 className="text-3xl font-bold mb-4">Quiz Result</h2>
                <p className="text-xl mb-4">You scored {score} out of {questions.length}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetQuiz}
                  className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-yellow-300 transition duration-300"
                >
                  Retry Quiz
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="text-white"
              >
                <h2 className="text-3xl font-bold mb-4">Question {currentQuestion + 1}</h2>
                <p className="text-xl mb-8">{questions[currentQuestion].question}</p>
                <div className='flex items-center justify-between'>
                  <div className="space-y-4 sm:w-[75%] w-full">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <label className="flex items-center space-x-3 p-3 bg-white bg-opacity-20 rounded-lg cursor-pointer hover:bg-opacity-30 transition duration-300">
                          <input
                            type="radio"
                            className="form-radio h-5 w-5 text-yellow-400"
                            name="option"
                            value={option}
                            checked={selectedOptions[currentQuestion] === option}
                            onChange={() => handleOptionSelect(option)}
                          />
                          <span className="text-lg font-medium">{option}</span>
                        </label>
                      </motion.div>
                    ))}
                  </div>
                  <img src={quizEmote} alt='Quiz Emote' className='size-[250px] sm:block hidden' />
                </div>
                <div className="flex justify-between mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePreviousQuestion}
                    className="flex items-center space-x-2 bg-white bg-opacity-20 text-white px-4 py-2 rounded-full"
                    disabled={currentQuestion === 0}
                  >
                    <ArrowLeft size={20} />
                    <span>Previous</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextQuestion}
                    className="flex items-center space-x-2 bg-yellow-400 text-gray-800 px-4 py-2 rounded-full font-semibold"
                  >
                    <span>{currentQuestion === questions.length - 1 ? "Finish" : "Next"}</span>
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
                {answerStatus !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex justify-center"
                  >
                    {answerStatus ? (
                      <CheckCircle className="text-green-400" size={40} />
                    ) : (
                      <XCircle className="text-red-400" size={40} />
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
    </div>
  );
};

export default QuizForm;