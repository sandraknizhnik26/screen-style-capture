
import React, { useState, useEffect } from 'react';

interface ClockProps {
  timeLeft: number; // in seconds
  totalTime: number; // in seconds
}

const Clock: React.FC<ClockProps> = ({ timeLeft, totalTime }) => {
  const [minutes, setMinutes] = useState(Math.floor(timeLeft / 60));
  const [seconds, setSeconds] = useState(timeLeft % 60);
  
  useEffect(() => {
    setMinutes(Math.floor(timeLeft / 60));
    setSeconds(timeLeft % 60);
  }, [timeLeft]);

  // Calculate angle for hour hand (360 degrees / total seconds * seconds left)
  const hourHandAngle = 120; // Fixed to match the image (pointing to 4)
  
  // Calculate the percentage of time completed for the background fill
  const completedPercentage = 35; // Fixed to match the image

  return (
    <div className="relative w-28 h-28 mx-auto">
      {/* Clock background with progress */}
      <div className="absolute inset-0 rounded-full border border-gray-200 bg-white overflow-hidden">
        <div 
          className="absolute top-0 right-0 bottom-0 bg-red-100 opacity-60" 
          style={{ width: `${completedPercentage}%` }}
        ></div>
      </div>
      
      {/* Clock face */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border border-gray-200 bg-white relative">
          {/* Clock center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
          </div>
          
          {/* Clock numbers - minimalist dots with numbers at key positions */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * (Math.PI / 180);
            const x = 11 * Math.sin(angle);
            const y = -11 * Math.cos(angle);
            const isKeyNumber = i === 0 || i === 3 || i === 6 || i === 9;
            
            return (
              <div 
                key={i} 
                className={`absolute flex items-center justify-center ${isKeyNumber ? 'text-[9px] font-medium text-gray-700' : ''}`}
                style={{ 
                  left: `calc(50% + ${x}px)`, 
                  top: `calc(50% + ${y}px)`,
                  width: isKeyNumber ? '12px' : '2px',
                  height: isKeyNumber ? '12px' : '2px',
                  backgroundColor: isKeyNumber ? 'transparent' : '#d1d5db',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {isKeyNumber && (i === 0 ? '12' : i === 3 ? '3' : i === 6 ? '6' : '9')}
              </div>
            );
          })}
          
          {/* Hour hand */}
          <div 
            className="absolute w-0.5 bg-gray-700 rounded-full origin-bottom transform -translate-x-1/2"
            style={{ 
              height: '35%', 
              left: '50%',
              bottom: '50%',
              transform: `translateX(-50%) rotate(${hourHandAngle}deg)`
            }}
          ></div>
        </div>
      </div>
      
      {/* Digital time */}
      <div className="absolute -bottom-5 left-0 right-0 text-center">
        <div className="text-xs font-medium">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default Clock;
