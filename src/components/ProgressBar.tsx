
import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="h-64 w-6 bg-gray-200 rounded-full relative border border-gray-300">
      <div 
        className="absolute bottom-0 left-0 right-0 bg-yellow-400 rounded-b-full transition-all duration-500"
        style={{ height: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
