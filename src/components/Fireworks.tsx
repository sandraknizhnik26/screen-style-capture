
import React from 'react';

const Fireworks = () => {
  return (
    <div className="fireworks-container absolute -left-20 -right-20 -top-20 bottom-0 pointer-events-none">
      <div className="firework animate-[explosion_1.5s_ease-out_infinite] bg-yellow-400 absolute w-2 h-2 rounded-full" style={{ left: '50%', top: '60%' }} />
      <div className="firework animate-[explosion_1.8s_ease-out_infinite_0.3s] bg-pink-400 absolute w-2 h-2 rounded-full" style={{ left: '40%', top: '70%' }} />
      <div className="firework animate-[explosion_1.6s_ease-out_infinite_0.7s] bg-blue-400 absolute w-2 h-2 rounded-full" style={{ left: '60%', top: '65%' }} />
    </div>
  );
};

export default Fireworks;
