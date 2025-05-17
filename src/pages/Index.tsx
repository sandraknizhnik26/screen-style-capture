import React, { useState, useEffect } from 'react';
import { Settings, LogOut } from 'lucide-react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import Logo from '@/components/Logo';
import Clock from '@/components/Clock';
import TaskItem from '@/components/TaskItem';
import MoodSelector from '@/components/MoodSelector';
import ProgressBar from '@/components/ProgressBar';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import MainSidebar from '@/components/MainSidebar';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

interface Task {
  id: string;
  title: string;
  timeEstimation: string;
  completed: boolean;
  category: 'red' | 'green' | 'orange' | 'blue' | 'yellow' | 'purple';
  stars: number;
  starValue: number;
  timeInSeconds?: number;
}

// Store task completion state separately from the tasks themselves
interface TaskCompletionState {
  [taskId: string]: boolean;
}

const Index = () => {
  const { language, setLanguage, translations } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const isRTL = language === 'he';
  const t = translations[language as 'en' | 'he'];
  
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [totalTime] = useState(1800);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Store task completion state separately
  const [taskCompletionState, setTaskCompletionState] = useState<TaskCompletionState>({
    "2": true // Task 2 is initially completed
  });

  const getTasks = () => {
    const taskList = [
      { 
        id: "1", 
        title: t['mathHomework'],
        timeEstimation: `(45 ${t['minutes']})`, 
        category: 'red' as const,
        stars: 1,
        starValue: 10,
        timeInSeconds: 2700
      },
      { 
        id: "2", 
        title: t['readSummarize'],
        timeEstimation: `(20 ${t['minutes']})`, 
        category: 'green' as const,
        stars: 2,
        starValue: 15,
        timeInSeconds: 1200
      },
      { 
        id: "3", 
        title: t['drawPaint'],
        timeEstimation: "", 
        category: 'orange' as const,
        stars: 2,
        starValue: 15,
        timeInSeconds: 1800
      },
      { 
        id: "5", 
        title: t['watchVideo'],
        timeEstimation: `(15 ${t['minutes']})`, 
        category: 'yellow' as const,
        stars: 3,
        starValue: 20,
        timeInSeconds: 900
      },
      { 
        id: "6", 
        title: t['writeInterestingFacts'],
        timeEstimation: `(10 ${t['minutes']})`, 
        category: 'purple' as const,
        stars: 4,
        starValue: 30,
        timeInSeconds: 600
      },
    ];

    // Apply the completion state to tasks
    return taskList.map(task => ({
      ...task,
      completed: !!taskCompletionState[task.id]
    }));
  };

  const [tasks, setTasks] = useState<Task[]>(getTasks());
  
  // Derive current task from tasks and currentTaskId
  const currentTask = currentTaskId ? tasks.find(task => task.id === currentTaskId) || null : null;

  // Update tasks when language changes, but keep completion state
  useEffect(() => {
    setTasks(getTasks());
  }, [language, taskCompletionState]);

  useEffect(() => {
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  const handleTaskSelect = (task: Task) => {
    setCurrentTaskId(task.id);
    setTimeLeft(task.timeInSeconds || null);
  };

  const calculateProgress = () => {
    const totalStarValue = tasks.reduce((sum, task) => sum + task.starValue, 0);
    const completedStarValue = tasks
      .filter(task => task.completed)
      .reduce((sum, task) => sum + task.starValue, 0);
    
    return Math.floor((completedStarValue / totalStarValue) * 100);
  };

  const toggleTaskCompletion = (taskId: string) => {
    // Update the task completion state
    setTaskCompletionState(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleLanguageChange = (newLanguage: 'en' | 'he') => {
    setLanguage(newLanguage);
    document.documentElement.dir = newLanguage === 'he' ? 'rtl' : 'ltr';
  };

  const SidebarHeader = null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className={`hidden md:flex flex-col items-center w-80 bg-background border-r ${isRTL ? 'border-r-0 border-l' : ''}`}>
          <MainSidebar 
            selectedMood={selectedMood} 
            onMoodSelect={setSelectedMood} 
            headerContent={SidebarHeader}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
            currentLanguage={language}
            onLanguageChange={handleLanguageChange}
          />
        </div>
        
        <div className="flex-1 max-w-5xl mx-auto p-4 w-full">
          <div className="hidden md:flex justify-end mb-4">
            <div className={`flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'} rounded-lg border shadow-sm overflow-hidden transition-colors duration-200`}>
              <Avatar className={`h-7 w-7 ${isRTL ? 'mr-2 ml-0' : 'ml-2 mr-0'}`}>
                <AvatarImage src="https://images.unsplash.com/photo-1501286353178-1ec871214838" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
              <button className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-50'} px-3 py-1 text-xs transition-colors duration-200`}>
                <Settings className={`h-3 w-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                {t['settings']}
              </button>
              <div className={`h-4 border-r ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} transition-colors duration-200`}></div>
              <button className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-50'} px-3 py-1 text-xs transition-colors duration-200`}>
                <LogOut className={`h-3 w-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                {t['logout']}
              </button>
            </div>
          </div>

          <div className="md:hidden flex flex-col items-center py-4">
            <Logo />
            <div className={`flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'} rounded-lg border shadow-sm overflow-hidden mt-4 transition-colors duration-200`}>
              <Avatar className={`h-7 w-7 ${isRTL ? 'mr-2 ml-0' : 'ml-2 mr-0'}`}>
                <AvatarImage src="https://images.unsplash.com/photo-1501286353178-1ec871214838" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
              <button className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-50'} px-3 py-1 text-xs transition-colors duration-200`}>
                <Settings className={`h-3 w-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                {t['settings']}
              </button>
              <div className={`h-4 border-r ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} transition-colors duration-200`}></div>
              <button className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-50'} px-3 py-1 text-xs transition-colors duration-200`}>
                <LogOut className={`h-3 w-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                {t['logout']}
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col h-full">
            <h1 className={`text-xl font-semibold text-center mb-6 ${isRTL ? 'text-right w-full' : 'text-left'}`}>{t['goodMorning']}, Roni</h1>

            <div className="mb-6 md:hidden">
              <div className={`text-center mb-2 text-sm font-medium flex justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>{t['howFeeling']}</div>
              <MoodSelector selectedMood={selectedMood} onMoodSelect={setSelectedMood} />
            </div>

            <div className={`flex justify-center gap-2 mb-6 md:hidden ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link to="/recommendations" className={`text-[10px] py-1 px-1.5 rounded mb-1 text-left ${isRTL ? 'text-right' : 'text-left'} ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors duration-200`}>
                {t['viewRecommendations']}
              </Link>
              <button className={`text-[10px] py-1 px-1.5 rounded mb-1 ${isRTL ? 'text-right' : 'text-left'} bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-200`}>
                {t['newAssessment']}
              </button>
              <button className={`text-[10px] py-1 px-1.5 rounded mb-1 ${isRTL ? 'text-right' : 'text-left'} ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors duration-200`}>
                {t['myAssessments']}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 h-full">
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} p-3 shadow-sm transition-colors duration-200`}>
                <Clock 
                  timeLeft={timeLeft || 0} 
                  totalTime={totalTime} 
                  currentTask={currentTask}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:hidden w-full h-6">
                  <ProgressBar progress={calculateProgress()} />
                </div>

                <div className="flex-1">
                  <div className={`flex justify-between items-center mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h2 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : ''} transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}>{t['task']}</h2>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-200`}>{t['today']}</span>
                  </div>
                  <div className="space-y-1.5 flex-1">
                    {tasks.map(task => (
                      <TaskItem
                        key={task.id}
                        {...task}
                        onToggleComplete={toggleTaskCompletion}
                        onSelect={() => handleTaskSelect(task)}
                        isSelected={currentTaskId === task.id}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="hidden md:block h-full">
                  <ProgressBar progress={calculateProgress()} />
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 md:hidden">
            <div className={`flex items-center justify-between p-4 border-t ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} transition-colors duration-200`}>
              <div className="flex items-center gap-4">
                <LanguageSwitcher currentLanguage={language} onLanguageChange={handleLanguageChange} />
                <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
