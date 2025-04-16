
import React, { ReactNode } from 'react';

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'secondary' 
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-sm py-2 px-4 rounded-md mb-2 text-left ${
        variant === 'primary'
          ? 'bg-cyan-500 text-white hover:bg-cyan-600'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
