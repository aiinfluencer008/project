import React, { useCallback } from "react";
import { Header } from "./Header";
import { QuestionCard } from "./QuestionCard";
import { OptionsGrid } from "./OptionsGrid";
import { Timer } from "./Timer";
import { SocialButtons } from "./SocialButtons";
import { useQuizTimer } from "../hooks/useQuizTimer";
import "../styles/animations.css";
import { useState, useEffect } from 'react';

export const QuizTemplate: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: [],
    answer: 0
  });

  const handleTimeUp = useCallback(() => {
    console.log("Time is up!");
  }, []);

  const { timer, showAnswer } = useQuizTimer({
    initialTime: 30,
    onTimeUp: handleTimeUp,
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      
      const newQuestion = await fetch("scripts/currentques.json").then((res) => res.json());
      setCurrentQuestion(newQuestion);
    };

    const intervalId = setInterval(fetchQuestion, 1000);

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div
      className="min-h-screen w-full p-8 flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/assets/ramji_photo_1.webp')` }}
    >
      <div className="absolute top-8 left-8">
        <img
          src="/assets/profile.jpg"
          alt="Logo"
          className="h-16 w-16 rounded-full border-4 border-white shadow-lg transition-transform duration-300 transform hover:scale-105"
        />
      </div>
      <Header />
      <QuestionCard question={currentQuestion.question} />
      <OptionsGrid
        options={currentQuestion.options}
        correctAnswer={currentQuestion.answer}
        showAnswer={showAnswer}
      />
      {!showAnswer && <Timer seconds={timer} />}
      {showAnswer && (
        <div className="mt-8 p-4 bg-yellow-100 rounded-lg shadow-md slide-in">
          <p className="text-lg text-gray-800">{currentQuestion.options[currentQuestion.answer]}</p>
        </div>        
      )}
      <SocialButtons />
    </div>
  );
};
