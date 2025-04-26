
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Fireworks = () => {
  return (
    <div className="absolute -left-20 -right-20 -top-32 bottom-0 pointer-events-none flex items-center justify-center">
      <div className="w-[300px] h-[300px]">
        <DotLottieReact
          src="https://lottie.host/0a798e85-6b5d-4e30-80e7-a15ac8d1c147/HeI8cF0kbn.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default Fireworks;
