
import React from 'react';

interface LogoIconProps {
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ className = "h-32 w-32" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-transparent rounded-full w-full h-full"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src="/lovable-uploads/412115c6-52a0-40f1-b632-7e11d31436e2.png" 
          alt="BrainBridge Logo" 
          className="w-full h-full object-contain" 
        />
      </div>
    </div>
  );
};

export default LogoIcon;
