
import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { format } from 'date-fns';

/**
 * Interface defining the props for the Clock component
 * @property timeLeft - Remaining time in seconds for the current task
 * @property totalTime - Total allocated time for the task in seconds
 */
interface ClockProps {
  timeLeft: number;
  totalTime: number;
}

/**
 * Clock Component
 * Displays the current time and a countdown timer for tasks
 * Also includes a decorative Lottie animation
 * 
 * @param timeLeft - Time remaining for current task (in seconds)
 * @param totalTime - Total time allocated for the task (in seconds)
 */
const Clock: React.FC<ClockProps> = ({ timeLeft }) => {
  // State to track the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Effect to update the current time every second
  useEffect(() => {
    // Create an interval that updates currentTime every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(timer);
  }, []);

  // Calculate minutes from timeLeft (in seconds)
  // We use Math.ceil to round up - e.g., 59 seconds will show as 1 minute
  const minutes = Math.ceil(timeLeft / 60);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
      {/* Display current time in 12-hour format (e.g., 3:45 PM) */}
      <div className="text-2xl font-medium text-gray-600">
        {format(currentTime, 'h:mm a')}
      </div>

      {/* Display remaining minutes for the current task */}
      <div className="text-5xl font-bold text-gray-800">
        {minutes}
      </div>

      {/* Decorative clock animation using Lottie */}
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

