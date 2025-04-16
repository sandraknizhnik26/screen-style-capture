
import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <div className="flex items-center space-x-1">
      <Sun className="h-3 w-3 text-gray-600" />
      <button
        onClick={onToggle}
        className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
          isDarkMode ? 'bg-cyan-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
            isDarkMode ? 'translate-x-4' : 'translate-x-1'
          }`}
        />
      </button>
      <Moon className="h-3 w-3 text-gray-600" />
    </div>
  );
};

export default ThemeToggle;
