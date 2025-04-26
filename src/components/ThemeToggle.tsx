
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <div className="flex items-center space-x-1">
      <Sun className={`h-3 w-3 ${isDarkMode ? 'text-gray-500' : 'text-yellow-500'}`} />
      <Switch 
        checked={isDarkMode} 
        onCheckedChange={onToggle} 
        className="data-[state=checked]:bg-gray-700 data-[state=unchecked]:bg-gray-300"
        size="sm"
      />
      <Moon className={`h-3 w-3 ${isDarkMode ? 'text-blue-400' : 'text-gray-500'}`} />
    </div>
  );
};

export default ThemeToggle;
