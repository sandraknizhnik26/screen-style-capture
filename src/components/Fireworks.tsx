
import React from 'react';

const Fireworks = () => {
  return (
    <div className="fireworks-container absolute -left-20 -right-20 -top-20 bottom-0 pointer-events-none">
      {/* Center burst */}
      <div className="firework animate-[explosion_1.5s_ease-out_infinite] bg-gradient-to-r from-yellow-400 to-orange-500 absolute w-3 h-3 rounded-full" style={{ left: '50%', top: '60%' }} />
      
      {/* Large outer bursts */}
      <div className="firework animate-[explosion_2s_ease-out_infinite_0.2s] bg-gradient-to-r from-pink-400 to-purple-500 absolute w-4 h-4 rounded-full" style={{ left: '40%', top: '70%', '--x': '-80px', '--y': '-120px' } as React.CSSProperties} />
      <div className="firework animate-[explosion_1.8s_ease-out_infinite_0.4s] bg-gradient-to-r from-blue-400 to-cyan-500 absolute w-4 h-4 rounded-full" style={{ left: '60%', top: '65%', '--x': '80px', '--y': '-110px' } as React.CSSProperties} />
      
      {/* Small sparkles */}
      <div className="firework animate-[explosion_1.3s_ease-out_infinite_0.1s] bg-gradient-to-r from-green-400 to-emerald-500 absolute w-2 h-2 rounded-full" style={{ left: '45%', top: '62%', '--x': '-40px', '--y': '-90px' } as React.CSSProperties} />
      <div className="firework animate-[explosion_1.4s_ease-out_infinite_0.3s] bg-gradient-to-r from-red-400 to-rose-500 absolute w-2 h-2 rounded-full" style={{ left: '55%', top: '68%', '--x': '40px', '--y': '-80px' } as React.CSSProperties} />
      <div className="firework animate-[explosion_1.6s_ease-out_infinite_0.5s] bg-gradient-to-r from-violet-400 to-purple-500 absolute w-2 h-2 rounded-full" style={{ left: '48%', top: '65%', '--x': '-60px', '--y': '-100px' } as React.CSSProperties} />
      <div className="firework animate-[explosion_1.7s_ease-out_infinite_0.6s] bg-gradient-to-r from-amber-400 to-yellow-500 absolute w-2 h-2 rounded-full" style={{ left: '52%', top: '63%', '--x': '60px', '--y': '-95px' } as React.CSSProperties} />
    </div>
  );
};

export default Fireworks;
