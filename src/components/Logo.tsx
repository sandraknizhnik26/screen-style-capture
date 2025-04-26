
import React from 'react';
import LogoIcon from './logo/LogoIcon';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full md:w-auto">
      <LogoIcon className="h-40 w-40 md:h-32 md:w-32" />
    </div>
  );
};

export default Logo;
