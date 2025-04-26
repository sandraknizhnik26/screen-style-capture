
import React from 'react';

const LogoIcon: React.FC = () => {
  return (
    <div className="h-32 w-32 relative"> {/* Increased size from h-20 w-20 to h-32 w-32 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-32 w-32 bg-transparent rounded-full"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src="/lovable-uploads/412115c6-52a0-40f1-b632-7e11d31436e2.png" 
          alt="BrainBridge Logo" 
          className="h-32 w-32 object-contain" 
        />
      </div>
    </div>
  );
};

export default LogoIcon;
