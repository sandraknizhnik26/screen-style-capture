
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="h-10 w-10 relative mb-1">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 bg-transparent rounded-full"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* BrainBridge icon */}
          <img 
            src="/lovable-uploads/412115c6-52a0-40f1-b632-7e11d31436e2.png" 
            alt="BrainBridge Logo" 
            className="h-10 w-10 object-contain"
          />
        </div>
      </div>
      <div className="text-center">
        <div className="text-xs font-bold text-cyan-600">Brain<span className="text-gray-800">Bridge</span></div>
      </div>
    </div>
  );
};

export default Logo;
