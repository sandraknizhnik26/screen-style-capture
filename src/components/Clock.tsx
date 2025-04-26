import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface ClockProps {
  timeLeft: number;
  totalTime: number;
}

const Clock: React.FC<ClockProps> = ({ timeLeft: initialTimeLeft, totalTime }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setTimeLeft(initialTimeLeft);
    setIsRunning(false); // Reset running state when new task is selected
    setHasStarted(false); // Reset the started state when a new task is selected
  }, [initialTimeLeft]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Only calculate progress when the timer has been started at least once
  const progress = hasStarted 
    ? Math.min(100, Math.max(0, (timeLeft / totalTime) * 100))
    : 0;
  
  // Adjust radius based on screen size
  const radius = isMobile ? 70 : 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - ((100 - progress) / 100) * circumference;
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
    if (!hasStarted) {
      setHasStarted(true); // Mark that the timer has been started at least once
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTimeLeft);
    setHasStarted(false); // Reset the started state on manual reset
  };

  // Calculate size classes based on screen size
  const clockSize = isMobile ? "w-52 h-52" : "w-64 h-64";
  const timeTextSize = isMobile ? "text-4xl" : "text-6xl";

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <div className="text-2xl font-medium mb-2">
        {format(currentTime, 'HH:mm')}
      </div>
      
      <div className={`relative ${clockSize}`}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          <circle 
            cx="100" 
            cy="100" 
            r={radius} 
            fill="none" 
            stroke="currentColor"
            strokeWidth="4"
            className="text-gray-200 opacity-30"
          />
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
            className="text-gray-500 transition-all duration-500"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-bold ${timeTextSize}`}>
            {timeDisplay}
          </span>
          <span className="text-sm opacity-60">
            minutes left
          </span>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePlayPause}
          className={isMobile ? "w-10 h-10" : "w-12 h-12"}
        >
          {isRunning ? (
            <Pause 
              className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} text-yellow-500`}
            />
          ) : (
            <Play 
              className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} ${hasStarted && !isRunning ? 'text-green-500' : ''}`} 
            />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleReset}
          className={isMobile ? "w-10 h-10" : "w-12 h-12"}
        >
          <RotateCcw className={isMobile ? "h-5 w-5" : "h-6 w-6"} />
        </Button>
      </div>
    </div>
  );
};

export default Clock;
