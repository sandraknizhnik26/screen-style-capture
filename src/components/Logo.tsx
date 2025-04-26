
import React from 'react';
import LogoIcon from './logo/LogoIcon';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full md:w-auto">
      <LogoIcon className="h-48 w-48 md:h-48 md:w-48 sm:h-64 sm:w-64" />
    </div>
  );
};

export default Logo;
