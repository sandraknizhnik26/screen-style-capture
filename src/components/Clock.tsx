
import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { format } from 'date-fns';

interface ClockProps {
  timeLeft: number;
  totalTime: number;
}

const Clock: React.FC<ClockProps> = ({ timeLeft }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format the countdown time in seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
      <div className="text-2xl font-medium text-gray-600">
        {format(currentTime, 'h:mm a')}
      </div>
      <div className="text-4xl font-bold text-gray-800">
        {timeString}
      </div>
      <div className="relative w-72 h-72 flex items-center justify-center">
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
