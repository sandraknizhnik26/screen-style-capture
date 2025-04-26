
import React from 'react';
import Fireworks from './Fireworks';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'w-full h-6' : 'w-6 h-full'} bg-gray-200 rounded-full relative border border-gray-300`}>
      <div 
        className={`absolute ${isMobile ? 'left-0 top-0 bottom-0 bg-gradient-to-r' : 'bottom-0 left-0 right-0 bg-gradient-to-t'} from-yellow-400 to-yellow-300 rounded-full transition-all duration-1000 ease-in-out`}
        style={isMobile ? { width: `${progress}%` } : { height: `${progress}%` }}
      >
      </div>
      {progress === 100 && <Fireworks />}
    </div>
  );
};

export default ProgressBar;
