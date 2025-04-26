
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (language: 'en' | 'he') => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onLanguageChange(currentLanguage === 'en' ? 'he' : 'en')}
      className="flex items-center space-x-1"
    >
      <Globe className="h-3 w-3" />
      <span className="text-xs">{currentLanguage === 'en' ? 'EN' : 'עב'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
