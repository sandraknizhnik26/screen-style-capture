
import React, { useEffect, useState } from 'react';
import { Circle } from 'lucide-react';
import { format } from 'date-fns';

interface ClockProps {
  timeLeft: number;
  totalTime: number;
}

const Clock: React.FC<ClockProps> = ({ timeLeft, totalTime }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate progress percentage (from 0 to 100)
  const progress = Math.min(100, Math.max(0, (timeLeft / totalTime) * 100));
  
  // Calculate the SVG path for the progress arc
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  // Convert timeLeft to minutes
  const minutes = Math.ceil(timeLeft / 60);

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      {/* Display current time in 24-hour format */}
      <div className="text-2xl font-medium mb-2">
        {format(currentTime, 'HH:mm')}
      </div>
      
      <div className="relative w-64 h-64">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          <circle 
            cx="100" 
            cy="100" 
            r={radius} 
            fill="none" 
            stroke={`currentColor`}
            strokeWidth="4"
            className="opacity-10"
          />
          {/* Progress circle */}
          <circle 
            cx="100" 
            cy="100" 
            r={radius} 
            fill="none" 
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 text-purple-500"
          />
        </svg>
        
        {/* Time display in the center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-bold">{minutes}</span>
          <span className="text-sm opacity-60">minutes left</span>
        </div>
      </div>
    </div>
  );
};

export default Clock;
