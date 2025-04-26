import React, { useState, useEffect } from 'react';

interface ClockProps {
  timeLeft: number; // in seconds
  totalTime: number; // in seconds
}

const Clock: React.FC<ClockProps> = ({ timeLeft, totalTime }) => {
  const [minutes, setMinutes] = useState(Math.floor(timeLeft / 60));
  const [seconds, setSeconds] = useState(timeLeft % 60);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    setMinutes(Math.floor(timeLeft / 60));
    setSeconds(timeLeft % 60);
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsRunning(false);
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, minutes, seconds]);

  return (
    <div className="relative w-28 h-28 mx-auto">
      <div className="absolute inset-0 rounded-full border-2 border-gray-800">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="54"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="2"
            className="w-full h-full"
          />
          <circle
            cx="56"
            cy="56"
            r="54"
            fill="none"
            stroke="#1a1f2c"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 54}`}
            strokeDashoffset={`${2 * Math.PI * 54 * (1 - timeLeft / totalTime)}`}
            className="transition-all duration-1000"
          />
        </svg>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-xl font-medium text-gray-800">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default Clock;
