
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (language: 'en' | 'he') => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLanguage, onLanguageChange }) => {
  // Handle language change and update document direction
  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === 'en' ? 'he' : 'en';
    onLanguageChange(newLanguage);
    document.documentElement.dir = newLanguage === 'he' ? 'rtl' : 'ltr';
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLanguageChange}
      className="flex items-center space-x-1"
    >
      <Globe className="h-3 w-3" />
      <span className="text-xs">{currentLanguage === 'en' ? 'EN' : 'עב'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
