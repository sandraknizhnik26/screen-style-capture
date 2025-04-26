
import React, { useEffect, useState } from 'react';
import { Play, Timer } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface ClockProps {
  timeLeft: number;
  totalTime: number;
}

const Clock: React.FC<ClockProps> = ({ timeLeft: initialTimeLeft, totalTime }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    setTimeLeft(initialTimeLeft);
  }, [initialTimeLeft]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Timer countdown effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Calculate progress percentage (from 0 to 100)
  const progress = Math.min(100, Math.max(0, (timeLeft / totalTime) * 100));
  
  // Calculate the SVG path for the progress arc
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  // Convert timeLeft to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTimeLeft);
  };

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
          <span className="text-6xl font-bold">
            {timeDisplay}
          </span>
          <span className="text-sm opacity-60">
            minutes left
          </span>
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex gap-2 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePlayPause}
          className="w-12 h-12"
        >
          <Play className={`h-6 w-6 ${isRunning ? 'text-green-500' : ''}`} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleReset}
          className="w-12 h-12"
        >
          <Timer className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Clock;

