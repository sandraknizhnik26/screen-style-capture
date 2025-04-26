
import React from 'react';
import Fireworks from './Fireworks';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="h-64 w-6 bg-gray-200 rounded-full relative border border-gray-300">
      <div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-full transition-all duration-1000 ease-in-out"
        style={{ height: `${progress}%` }}
      >
        {/* Progress checkmarks at specific points */}
        {progress >= 25 && (
          <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[8px] text-white">✓</div>
        )}
        {progress >= 50 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[8px] text-white">✓</div>
        )}
        {progress >= 75 && (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[8px] text-white">✓</div>
        )}
      </div>
      {progress === 100 && <Fireworks />}
    </div>
  );
};

export default ProgressBar;
