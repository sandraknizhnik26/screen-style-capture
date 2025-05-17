
import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';

interface Task {
  id: string;
  title: string;
  timeEstimation: string;
  completed: boolean;
  category: 'red' | 'green' | 'orange' | 'blue' | 'yellow' | 'purple';
  stars: number;
  starValue: number;
  timeInSeconds?: number;
}

interface ClockProps {
  timeLeft: number;
  totalTime: number;
  currentTask: Task | null;
}

const Clock: React.FC<ClockProps> = ({ timeLeft: initialTimeLeft, totalTime, currentTask }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { language, translations } = useLanguage();
  const t = translations[language as 'en' | 'he'];
  const isRTL = language === 'he';
  
  // Reset clock state when task changes
  useEffect(() => {
    // Check if task has changed by comparing IDs
    if (currentTask?.id !== currentTaskId) {
      setTimeLeft(initialTimeLeft);
      setIsRunning(false);
      setHasStarted(false);
      setCurrentTaskId(currentTask?.id || null);
    }
  }, [initialTimeLeft, currentTask, currentTaskId]);

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

  const progress = hasStarted 
    ? Math.min(100, Math.max(0, (timeLeft / totalTime) * 100))
    : 0;
  
  const radius = isMobile ? 70 : 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - ((100 - progress) / 100) * circumference;
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
    if (!hasStarted) {
      setHasStarted(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTimeLeft);
    setHasStarted(false);
  };

  const clockSize = isMobile ? "w-52 h-52" : "w-52 h-52";
  const timeTextSize = isMobile ? "text-4xl" : "text-5xl";

  return (
    <div className="flex flex-col items-center justify-center w-full p-2">
      <div className="text-xl font-medium mb-2">
        {format(currentTime, 'HH:mm')}
      </div>
      
      <h2 className={`text-sm font-medium mb-1 ${isRTL ? 'text-right w-full' : ''}`}>{t['currentTask']}</h2>
      <div className={`text-center text-xs mb-2 ${isRTL ? 'text-right w-full' : ''}`}>
        {currentTask ? (currentTask.title) : t['noTaskSelected']}
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
          <span className="text-xs opacity-60">
            {t['minutesLeft']}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
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
