import React from 'react';
import { QuizOption } from './QuizOption';

interface OptionsGridProps {
  options: string[];
  correctAnswer: number;
  showAnswer: boolean;
}

export const OptionsGrid: React.FC<OptionsGridProps> = ({
  options,
  correctAnswer,
  showAnswer
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-3/4">
      {options.map((option, index) => (
        <QuizOption
          key={index}
          option={option}
          index={index}
          isCorrect={index === correctAnswer}
          showAnswer={showAnswer}
        />
      ))}
    </div>
  );
};