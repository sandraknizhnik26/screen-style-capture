import React, { useState } from 'react';
import { Settings, LogOut, QrCode, FileText } from 'lucide-react';

import Logo from '@/components/Logo';
import Clock from '@/components/Clock';
import TaskItem from '@/components/TaskItem';
import MoodSelector from '@/components/MoodSelector';
import ProgressBar from '@/components/ProgressBar';
import ThemeToggle from '@/components/ThemeToggle';

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

const Index = () => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [totalTime] = useState(1800);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: "1", 
      title: "math homework (1,2,3,4,5,6 problems)", 
      timeEstimation: "(45 minutes)", 
      completed: false, 
      category: 'red',
      stars: 1,
      starValue: 10,
      timeInSeconds: 2700
    },
    { 
      id: "2", 
      title: "Read & summarize a chapter from the book you are reading", 
      timeEstimation: "(20 minutes)", 
      completed: true, 
      category: 'green',
      stars: 2,
      starValue: 15,
      timeInSeconds: 1200
    },
    { 
      id: "3", 
      title: "Draw or paint a picture of your favorite scene from the book you are reading", 
      timeEstimation: "", 
      completed: false, 
      category: 'orange',
      stars: 2,
      starValue: 15,
      timeInSeconds: 1800
    },
    { 
      id: "4", 
      title: "Enjoy a healthy snack and hydrate", 
      timeEstimation: "(10 minutes)", 
      completed: false, 
      category: 'orange',
      stars: 1,
      starValue: 10,
      timeInSeconds: 600
    },
    { 
      id: "5", 
      title: "Watch a fun educational video related to this week's science topic", 
      timeEstimation: "(15 minutes)", 
      completed: false, 
      category: 'yellow',
      stars: 3,
      starValue: 20,
      timeInSeconds: 900
    },
    { 
      id: "6", 
      title: "Write down three interesting facts you learned", 
      timeEstimation: "(10 minutes)", 
      completed: false, 
      category: 'purple',
      stars: 4,
      starValue: 30,
      timeInSeconds: 600
    },
  ]);

  const handleTaskSelect = (task: Task) => {
    setCurrentTask(task);
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
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="max-w-5xl mx-auto my-4 min-h-[calc(100vh-2rem)] flex bg-gray-50 border border-gray-300 rounded-md overflow-hidden">
      <div className="w-32 bg-slate-50 p-3 border-r border-gray-200 flex flex-col">
        <div className="mb-6">
          <Logo />
        </div>
        
        <div className="flex-1 space-y-6">
          <MoodSelector selectedMood={selectedMood} onMoodSelect={setSelectedMood} />
          
          <div className="space-y-2">
            <button className="w-full text-[10px] py-1 px-1.5 rounded mb-1 text-left bg-gray-100 text-gray-700 hover:bg-gray-200">
              View recommendations
            </button>
            <button className="w-full text-[10px] py-1 px-1.5 rounded mb-1 text-left bg-cyan-500 text-white hover:bg-cyan-600">
              Do a new assessment
            </button>
            <button className="w-full text-[10px] py-1 px-1.5 rounded mb-1 text-left bg-gray-100 text-gray-700 hover:bg-gray-200">
              My assessments
            </button>
          </div>
        </div>
        
        <div className="mt-auto pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-gray-600">Help/ support</span>
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
          </div>
          <div className="flex justify-between">
            <button className="p-1 border border-gray-300 rounded-sm">
              <QrCode className="h-3 w-3 text-gray-600" />
            </button>
            <button className="p-1 border border-gray-300 rounded-sm">
              <FileText className="h-3 w-3 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Good morning, Roni</h1>
          <div className="flex items-center bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
            <button className="flex items-center text-gray-600 hover:bg-gray-50 px-3 py-1 text-xs">
              <Settings className="h-3 w-3 mr-1" />
              Settings
            </button>
            <div className="h-4 border-r border-gray-200"></div>
            <button className="flex items-center text-gray-600 hover:bg-gray-50 px-3 py-1 text-xs">
              <LogOut className="h-3 w-3 mr-1" />
              Log out
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
            <h2 className="text-sm font-medium mb-2">Current Task</h2>
            <div className="text-center text-xs mb-2">
              {currentTask ? currentTask.title : "No task selected"}
            </div>
            <Clock timeLeft={timeLeft || 0} totalTime={totalTime} />
          </div>
          
          <div className="col-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-medium">Task</h2>
              <span className="text-xs text-gray-600">today</span>
            </div>
            <div className="space-y-1.5 flex-1">
              {tasks.map(task => (
                <TaskItem
                  key={task.id}
                  {...task}
                  onToggleComplete={toggleTaskCompletion}
                  onSelect={() => handleTaskSelect(task)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-10 flex items-center justify-center px-2 py-8 border-l border-gray-200">
        <ProgressBar progress={calculateProgress()} />
      </div>
    </div>
  );
};

export default Index;
