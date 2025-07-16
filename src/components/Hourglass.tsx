
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

  const hourglassSize = isMobile ? "w-56 h-72" : "w-64 h-80";

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      {/* Current time with cheerful styling */}
      <div className="text-2xl font-bold mb-4 text-primary bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        {format(currentTime, 'HH:mm')}
      </div>
      
      <h2 className={`text-lg font-semibold mb-2 text-primary ${isRTL ? 'text-right w-full' : ''}`}>
        {t['currentTask']}
      </h2>
      <div className={`text-center text-sm mb-6 text-muted-foreground font-medium ${isRTL ? 'text-right w-full' : ''}`}>
        {currentTask ? (currentTask.title) : t['noTaskSelected']}
      </div>

      <div className={`relative ${hourglassSize} mb-6`}>
        {/* Decorative background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-orange-200/20 to-pink-200/30 rounded-full blur-xl animate-pulse"></div>
        
        <svg className="w-full h-full relative z-10" viewBox="0 0 240 320" fill="none">
          {/* Hourglass frame with gradient border */}
          <defs>
            <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(147, 51, 234)" />
              <stop offset="50%" stopColor="rgb(59, 130, 246)" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" />
            </linearGradient>
            <linearGradient id="sandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(251, 191, 36)" />
              <stop offset="50%" stopColor="rgb(245, 158, 11)" />
              <stop offset="100%" stopColor="rgb(217, 119, 6)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main hourglass shape */}
          <path 
            d="M60 30 L180 30 L180 50 L160 70 L160 130 L120 150 L160 170 L160 230 L180 250 L180 270 L60 270 L60 250 L80 230 L80 170 L120 150 L80 130 L80 70 L60 50 Z" 
            fill="none" 
            stroke="url(#frameGradient)"
            strokeWidth="4"
            filter="url(#glow)"
            className="drop-shadow-lg"
          />
          
          {/* Top sand chamber mask */}
          <defs>
            <mask id="topSand">
              <rect width="240" height="320" fill="black"/>
              <path 
                d="M65 35 L175 35 L175 45 L155 65 L155 125 L120 145 L85 125 L85 65 L65 45 Z" 
                fill="white"
              />
            </mask>
          </defs>
          
          {/* Top sand (remaining) with gradient */}
          <rect
            x="65"
            y="35"
            width="110"
            height={`${110 * (100 - progress) / 100}`}
            fill="url(#sandGradient)"
            mask="url(#topSand)"
            className="transition-all duration-1000 ease-linear drop-shadow-sm"
          />
          
          {/* Bottom sand chamber mask */}
          <defs>
            <mask id="bottomSand">
              <rect width="240" height="320" fill="black"/>
              <path 
                d="M85 175 L120 155 L155 175 L155 235 L175 255 L175 265 L65 265 L65 255 L85 235 Z" 
                fill="white"
              />
            </mask>
          </defs>
          
          {/* Bottom sand (completed) with gradient */}
          <rect
            x="65"
            y={265 - (110 * progress / 100)}
            width="110"
            height={`${110 * progress / 100}`}
            fill="url(#sandGradient)"
            mask="url(#bottomSand)"
            className="transition-all duration-1000 ease-linear drop-shadow-sm"
          />
          
          {/* Enhanced falling sand animation */}
          {isRunning && (
            <g>
              {/* Main sand stream */}
              <circle cx="120" cy="150" r="1.5" fill="url(#sandGradient)" className="opacity-80">
                <animate attributeName="cy" values="145;155;145" dur="0.6s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="0.6s" repeatCount="indefinite"/>
              </circle>
              
              {/* Secondary particles */}
              <circle cx="118" cy="150" r="1" fill="url(#sandGradient)" className="opacity-60">
                <animate attributeName="cy" values="147;153;147" dur="0.8s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite"/>
              </circle>
              <circle cx="122" cy="150" r="1" fill="url(#sandGradient)" className="opacity-60">
                <animate attributeName="cy" values="146;154;146" dur="1s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
              </circle>
              
              {/* Sparkle effects */}
              <circle cx="116" cy="150" r="0.5" fill="rgb(251, 191, 36)" className="opacity-40">
                <animate attributeName="cy" values="148;152;148" dur="1.2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;0.8;0" dur="1.2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="124" cy="150" r="0.5" fill="rgb(251, 191, 36)" className="opacity-40">
                <animate attributeName="cy" values="144;156;144" dur="0.9s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;0.8;0" dur="0.9s" repeatCount="indefinite"/>
              </circle>
            </g>
          )}
          
          {/* Decorative stars around the hourglass */}
          <g className="animate-pulse">
            <circle cx="40" cy="80" r="2" fill="rgb(251, 191, 36)" className="opacity-60" />
            <circle cx="200" cy="120" r="1.5" fill="rgb(147, 51, 234)" className="opacity-70" />
            <circle cx="50" cy="200" r="1" fill="rgb(59, 130, 246)" className="opacity-60" />
            <circle cx="190" cy="240" r="2" fill="rgb(16, 185, 129)" className="opacity-50" />
          </g>
        </svg>
        
        {/* Enhanced progress indicator with colorful dots */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-700 ${
                  i < Math.floor(progress / 20) 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg scale-110' 
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced control buttons */}
      <div className="flex gap-3 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePlayPause}
          className={`${isMobile ? "w-12 h-12" : "w-14 h-14"} ${
            isRunning 
              ? 'border-orange-300 hover:border-orange-400 shadow-lg shadow-orange-200/50' 
              : hasStarted && !isRunning 
                ? 'border-green-300 hover:border-green-400 shadow-lg shadow-green-200/50'
                : 'border-blue-300 hover:border-blue-400 shadow-lg shadow-blue-200/50'
          } transition-all duration-300`}
        >
          {isRunning ? (
            <Pause 
              className={`${isMobile ? "h-6 w-6" : "h-7 w-7"} text-orange-500`}
            />
          ) : (
            <Play 
              className={`${isMobile ? "h-6 w-6" : "h-7 w-7"} ${
                hasStarted && !isRunning ? 'text-green-500' : 'text-blue-500'
              }`} 
            />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleReset}
          className={`${isMobile ? "w-12 h-12" : "w-14 h-14"} border-purple-300 hover:border-purple-400 shadow-lg shadow-purple-200/50 transition-all duration-300`}
        >
          <RotateCcw className={`${isMobile ? "h-6 w-6" : "h-7 w-7"} text-purple-500`} />
        </Button>
      </div>

      {/* Motivational message */}
      {isRunning && (
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-primary animate-bounce">
            🌟 {language === 'he' ? 'מתקדמים יפה!' : 'Great progress!'} 🌟
          </p>
        </div>
      )}
    </div>
  );
};

export default Hourglass;
