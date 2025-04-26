
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface ClockProps {
  timeLeft: number; // in seconds
  totalTime: number; // in seconds
}

const Clock: React.FC<ClockProps> = () => {
  return (
    <div className="relative w-28 h-28 mx-auto">
      <div className="w-full h-full">
        <DotLottieReact
          src="https://lottie.host/c4a2f9f8-7c5c-4c4c-93f4-6ad9c8e145c1/2uF7XeIxpb.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default Clock;
