
import React from 'react';
import LogoIcon from './logo/LogoIcon';
import LogoText from './logo/LogoText';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <LogoIcon />
      <LogoText />
    </div>
  );
};

export default Logo;
