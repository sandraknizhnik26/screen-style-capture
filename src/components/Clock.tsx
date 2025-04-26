
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface ClockProps {
  timeLeft: number;
  totalTime: number;
}

const Clock: React.FC<ClockProps> = ({ timeLeft }) => {
  // Format the time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-4xl font-bold text-gray-800">
        {timeString}
      </div>
      <div className="relative w-72 h-72 mx-auto">
        <div className="w-full h-full">
          <DotLottieReact
            src="https://lottie.host/c4a2f9f8-7c5c-4c4c-93f4-6ad9c8e145c1/2uF7XeIxpb.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
};

export default Clock;
