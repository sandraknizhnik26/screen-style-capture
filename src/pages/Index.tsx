
import React, { useState, useEffect } from 'react';
import MainSidebar from '@/components/MainSidebar';
import Clock from '@/components/Clock';
import { SidebarProvider } from "@/components/ui/sidebar"
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';

export default function Index() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'he'>('en');
  
  // Add state for Clock component props
  const [timeLeft, setTimeLeft] = useState(1500); // Default to 25 minutes in seconds
  const [totalTime, setTotalTime] = useState(1500);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedDarkMode = localStorage.getItem('darkMode') === 'true';
      setIsDarkMode(storedDarkMode);
      document.body.classList.toggle('dark', storedDarkMode);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', newDarkMode.toString());
    }

    document.body.classList.toggle('dark', newDarkMode);
  };

  const handleLanguageChange = (newLanguage: 'en' | 'he') => {
    setLanguage(newLanguage);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative" dir={language === 'he' ? 'rtl' : 'ltr'}>
        <div className={`hidden md:flex flex-col items-center w-80 bg-background border-r ${language === 'he' ? 'border-r-0 border-l' : ''}`}>
          <MainSidebar 
            selectedMood={selectedMood} 
            onMoodSelect={setSelectedMood}
            isDarkMode={isDarkMode}
            onThemeToggle={toggleDarkMode}
            currentLanguage={language}
            onLanguageChange={handleLanguageChange}
            headerContent={
              <div className="w-full px-2">
                <Clock 
                  timeLeft={timeLeft}
                  totalTime={totalTime}
                  currentTask={currentTask}
                />
              </div>
            }
          />
        </div>

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="md:hidden flex justify-between items-center p-4 bg-background border-b">
            <LanguageSwitcher currentLanguage={language} onLanguageChange={handleLanguageChange} />
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
          </header>

          <main className="flex-1 p-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
              <p>Welcome to your dashboard. You can customize this page with widgets and other content.</p>
              {selectedMood && (
                <div className="mt-4">
                  <p>Selected Mood: {selectedMood}</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
