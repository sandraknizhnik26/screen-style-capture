
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const AppHeader: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const isAssessmentPage = location.pathname.includes('/assessment');
  const isRTL = language === 'he';
  
  return (
    <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
        {isAssessmentPage && (
          <Link to="/recommendations" className={`flex items-center text-sm text-muted-foreground hover:text-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
            <ArrowLeft className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
            <span>{isRTL ? 'חזרה להמלצות' : 'Back to Recommendations'}</span>
          </Link>
        )}
        {!isAssessmentPage && (
          <>
            <img 
              src="/lovable-uploads/412115c6-52a0-40f1-b632-7e11d31436e2.png" 
              alt="BrainBridge Logo" 
              className="h-12 w-auto"
            />
            <div className="text-sm text-muted-foreground">
              {isRTL ? '> צפה בהמלצות > המלצות' : '> View recommendations > Recommendations'}
            </div>
          </>
        )}
      </div>
      <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
        <LanguageSwitcher currentLanguage={language} onLanguageChange={(lang) => {}} />
        <ThemeToggle isDarkMode={false} onToggle={() => {}} />
        <span className="text-sm text-muted-foreground">
          Tuesday, Jan 21th, 2025
        </span>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://images.unsplash.com/photo-1501286353178-1ec881214838" />
          <AvatarFallback>SP</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default AppHeader;
