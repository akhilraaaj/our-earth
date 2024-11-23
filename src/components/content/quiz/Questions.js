// Question.js
import React from 'react';

const Question = ({ question, options, selected, handleChange }) => {
  return (
    <div className="mb-4">
      <h2 className="font-bold mb-2">{question}</h2>
      <div className="flex flex-col">
        {options.map((option, index) => (
          <label key={index} className="inline-flex items-center mt-2">
            <input
              type="radio"
              value={option}
              checked={selected === option}
              onChange={handleChange}
              className="form-radio h-5 w-5 text-green-600"
            />
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;
