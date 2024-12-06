import React from 'react';

interface QuestionCardProps {
  question: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <div className="bg-red-500 rounded-lg p-6 w-3/4 mb-8 shadow-lg transform hover:scale-105 transition-transform duration-200">
      <h2 className="text-3xl text-white">{question}</h2>
    </div>
  );
};