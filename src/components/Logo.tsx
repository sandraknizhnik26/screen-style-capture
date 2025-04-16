
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="h-10 w-10 relative mb-1">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 bg-cyan-500 rounded-full opacity-70"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Brain icon */}
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C7.58 2 4 5.58 4 10C4 12.03 4.76 13.87 6 15.28V16C6 17.1 6.9 18 8 18H9.28C9.67 19.16 10.75 20 12 20C13.25 20 14.33 19.16 14.72 18H16C17.1 18 18 17.1 18 16V15.28C19.24 13.87 20 12.03 20 10C20 5.58 16.42 2 12 2Z" stroke="#1A1F2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V12" stroke="#1A1F2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 9H15" stroke="#1A1F2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="text-center">
        <div className="text-xs font-bold text-cyan-600">Brain<span className="text-gray-800">Bridge</span></div>
      </div>
    </div>
  );
};

export default Logo;
