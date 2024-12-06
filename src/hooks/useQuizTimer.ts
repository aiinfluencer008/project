import { useState, useEffect, useCallback } from 'react';

interface QuizTimerOptions {
  initialTime?: number;
  onTimeUp?: () => void;
}

export const useQuizTimer = ({ 
  initialTime = 30, 
  onTimeUp 
}: QuizTimerOptions = {}) => {
  const [timer, setTimer] = useState(initialTime);
  const [showAnswer, setShowAnswer] = useState(false);

  const resetTimer = useCallback(() => {
    setTimer(initialTime);
    setShowAnswer(false);
  }, [initialTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setShowAnswer(true);
          onTimeUp?.();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]);

  return {
    timer,
    showAnswer,
    setShowAnswer,
    resetTimer
  };
};