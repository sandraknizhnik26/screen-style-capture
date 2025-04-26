
import React from 'react';
import Fireworks from './Fireworks';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="h-full w-6 bg-gray-200 rounded-full relative border border-gray-300">
      <div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-full transition-all duration-1000 ease-in-out"
        style={{ height: `${progress}%` }}
      >
      </div>
      {progress === 100 && <Fireworks />}
    </div>
  );
};

export default ProgressBar;
