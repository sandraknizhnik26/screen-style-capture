
import React from 'react';
import LogoIcon from './logo/LogoIcon';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full md:w-auto">
      <LogoIcon className="h-32 w-32 md:h-48 md:w-48" />
    </div>
  );
};

export default Logo;
