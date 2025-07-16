
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

interface HourglassProps {
  timeLeft: number;
  totalTime: number;
  currentTask: Task | null;
}

const Hourglass: React.FC<HourglassProps> = ({ timeLeft: initialTimeLeft, totalTime, currentTask }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { language, translations } = useLanguage();
  const t = translations[language as 'en' | 'he'];
  const isRTL = language === 'he';
  
  // Reset hourglass state when task changes
  useEffect(() => {
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

  // Calculate sand progress (how much sand has fallen)
  const progress = hasStarted 
    ? Math.min(100, Math.max(0, ((currentTask?.timeInSeconds || totalTime) - timeLeft) / (currentTask?.timeInSeconds || totalTime) * 100))
    : 0;

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

  const hourglassSize = isMobile ? "w-48 h-64" : "w-52 h-72";

  return (
    <div className="flex flex-col items-center justify-center w-full p-2">
      <div className="text-xl font-medium mb-2">
        {format(currentTime, 'HH:mm')}
      </div>
      
      <h2 className={`text-sm font-medium mb-1 ${isRTL ? 'text-right w-full' : ''}`}>{t['currentTask']}</h2>
      <div className={`text-center text-xs mb-4 ${isRTL ? 'text-right w-full' : ''}`}>
        {currentTask ? (currentTask.title) : t['noTaskSelected']}
      </div>

      <div className={`relative ${hourglassSize} mb-4`}>
        <svg className="w-full h-full" viewBox="0 0 200 280" fill="none">
          {/* Hourglass frame */}
          <path 
            d="M40 20 L160 20 L160 40 L140 60 L140 120 L100 140 L140 160 L140 220 L160 240 L160 260 L40 260 L40 240 L60 220 L60 160 L100 140 L60 120 L60 60 L40 40 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
            className="text-gray-400"
          />
          
          {/* Top sand (remaining) */}
          <defs>
            <mask id="topSand">
              <rect width="200" height="280" fill="black"/>
              <path 
                d="M45 25 L155 25 L155 35 L135 55 L135 115 L100 135 L65 115 L65 55 L45 35 Z" 
                fill="white"
              />
            </mask>
          </defs>
          
          <rect
            x="45"
            y="25"
            width="110"
            height={`${115 * (100 - progress) / 100}`}
            fill="currentColor"
            className="text-yellow-400 transition-all duration-1000 ease-linear"
            mask="url(#topSand)"
          />
          
          {/* Bottom sand (completed) */}
          <defs>
            <mask id="bottomSand">
              <rect width="200" height="280" fill="black"/>
              <path 
                d="M65 165 L100 145 L135 165 L135 225 L155 245 L155 255 L45 255 L45 245 L65 225 Z" 
                fill="white"
              />
            </mask>
          </defs>
          
          <rect
            x="45"
            y={255 - (110 * progress / 100)}
            width="110"
            height={`${110 * progress / 100}`}
            fill="currentColor"
            className="text-yellow-400 transition-all duration-1000 ease-linear"
            mask="url(#bottomSand)"
          />
          
          {/* Falling sand animation when running */}
          {isRunning && (
            <g className="animate-pulse">
              <circle cx="100" cy="140" r="1" fill="currentColor" className="text-yellow-400 opacity-70">
                <animate attributeName="cy" values="135;145;135" dur="0.8s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite"/>
              </circle>
              <circle cx="98" cy="140" r="0.5" fill="currentColor" className="text-yellow-400 opacity-50">
                <animate attributeName="cy" values="137;143;137" dur="1s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
              </circle>
              <circle cx="102" cy="140" r="0.5" fill="currentColor" className="text-yellow-400 opacity-50">
                <animate attributeName="cy" values="136;144;136" dur="1.2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite"/>
              </circle>
            </g>
          )}
        </svg>
        
        {/* Gentle progress indicator */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  i < Math.floor(progress / 20) 
                    ? 'bg-yellow-400' 
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
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

export default Hourglass;
