
import React from 'react';
import { Link } from 'react-router-dom';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter,
} from "@/components/ui/sidebar";
import MoodSelector from './MoodSelector';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

interface MainSidebarProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
  headerContent?: React.ReactNode;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  currentLanguage: string;
  onLanguageChange: (language: 'en' | 'he') => void;
}

const MainSidebar = ({ 
  selectedMood, 
  onMoodSelect, 
  headerContent,
  isDarkMode,
  onToggleTheme,
  currentLanguage,
  onLanguageChange
}: MainSidebarProps) => {
  const { translations } = useLanguage();
  const t = translations[currentLanguage as 'en' | 'he'];
  const isRTL = currentLanguage === 'he';
  
  return (
    <div className="hidden md:block h-full w-80">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col items-center py-4">
            <Logo />
            {headerContent && (
              <div className="mt-4 w-full">
                {headerContent}
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className={`text-center w-full justify-center flex text-sm font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
            {t['howFeeling']}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <MoodSelector selectedMood={selectedMood} onMoodSelect={onMoodSelect} />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2 items-center">
            <Link to="/recommendations" className={`text-[10px] py-1 px-1.5 rounded mb-1 text-center bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 w-48 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t['viewRecommendations']}
            </Link>
            <button className={`text-[10px] py-1 px-1.5 rounded mb-1 text-center bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-200 w-48 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t['newAssessment']}
            </button>
            <button className={`text-[10px] py-1 px-1.5 rounded mb-1 text-center bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 w-48 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t['myAssessments']}
            </button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <LanguageSwitcher currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
          <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
        </div>
      </SidebarFooter>
    </div>
  );
};

export default MainSidebar;
