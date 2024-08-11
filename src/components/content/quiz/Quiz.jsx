import React, { useState } from 'react';
import toast from 'react-hot-toast';

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

  const handleOptionSelect = (option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestion] = option;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleNextQuestion = () => {
    if (!selectedOptions[currentQuestion]) {
      toast.error('Please choose an option to continue', { position: "top-right" });
      return;
    }

    if (selectedOptions[currentQuestion] === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOptions(new Array(questions.length).fill(''));
    setScore(0);
    setShowResult(false);
  };

  return (
    <div>
      {showResult ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Quiz Result</h2>
          <p className="mb-2">You scored {score} out of {questions.length}</p>
          <button onClick={resetQuiz} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Retry Quiz</button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Question {currentQuestion + 1}</h2>
          <p className="text-start mb-4">{questions[currentQuestion].question}</p>
          <div className='flex flex-col items-start justify-start'>
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="mb-2">
                <input
                  type="radio"
                  id={`option${index}`}
                  name="option"
                  value={option}
                  checked={selectedOptions[currentQuestion] === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <label htmlFor={`option${index}`} className="ml-2">{option}</label>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button onClick={handlePreviousQuestion} className="bg-gray-300 text-gray-700 px-4 py-2 rounded" disabled={currentQuestion === 0}>Previous</button>
            <button onClick={handleNextQuestion} className="bg-blue-500 text-white px-4 py-2 rounded">{currentQuestion === questions.length - 1 ? "Finish" : "Next"}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizForm;
