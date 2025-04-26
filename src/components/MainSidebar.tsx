
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import MoodSelector from './MoodSelector';

interface MainSidebarProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
}

const MainSidebar = ({ selectedMood, onMoodSelect }: MainSidebarProps) => {
  return (
    <Sidebar className="hidden md:flex">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>How am I feeling today?</SidebarGroupLabel>
          <SidebarGroupContent>
            <MoodSelector selectedMood={selectedMood} onMoodSelect={onMoodSelect} />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <button className="text-[10px] py-1 px-1.5 rounded mb-1 text-left bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
              View recommendations
            </button>
            <button className="text-[10px] py-1 px-1.5 rounded mb-1 text-left bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-200">
              Do a new assessment
            </button>
            <button className="text-[10px] py-1 px-1.5 rounded mb-1 text-left bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
              My assessments
            </button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default MainSidebar;
