import React from 'react';
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
          <SidebarGroupLabel className="text-center">How am I feeling today?</SidebarGroupLabel>
          <SidebarGroupContent>
            <MoodSelector selectedMood={selectedMood} onMoodSelect={onMoodSelect} />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2 items-center">
            <button className="text-[10px] py-1 px-1.5 rounded mb-1 text-center bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 w-48">
              View recommendations
            </button>
            <button className="text-[10px] py-1 px-1.5 rounded mb-1 text-center bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-200 w-48">
              Do a new assessment
            </button>
            <button className="text-[10px] py-1 px-1.5 rounded mb-1 text-center bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 w-48">
              My assessments
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
