import React from 'react';
import { formatTime } from '../utils/timer';

interface TimerProps {
  seconds: number;
}

export const Timer: React.FC<TimerProps> = ({ seconds }) => {
  const isWarning = seconds <= 10;
  
  return (
    <div 
      className={`

        text-4xl font-bold mt-8 text-white bg-red-800 p-4 rounded-3xl animate-pulse
        ${isWarning ? 'text-white animate-pulse' : ''}
      `}
    >
      {formatTime(seconds)}
    </div>
  );
};