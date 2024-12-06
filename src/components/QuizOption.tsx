import React from 'react';

interface QuizOptionProps {
  option: string;
  index: number;
  isCorrect: boolean;
  showAnswer: boolean;
}

export const QuizOption: React.FC<QuizOptionProps> = ({ 
  option, 
  index, 
  isCorrect, 
  showAnswer 
}) => {
  return (
    <div
      className={`
        bg-red-500 rounded-lg p-4 shadow-md
        transform transition-all duration-200
        hover:scale-105 hover:shadow-lg
        ${showAnswer && isCorrect ? 'bg-green-500' : ''}
        ${showAnswer && !isCorrect ? 'opacity-50' : ''}
      `}
    >
      <p className="text-3xl text-white flex items-center justify-between">
        {option}
        {showAnswer && isCorrect && (
          <span className="text-3xl animate-bounce">✓</span>
        )}
      </p>
    </div>
  );
};