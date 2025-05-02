
import React from 'react';
import { Activity, Nut, Recycle, ClipboardCheck } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AppHeader from '@/components/AppHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';

const Recommendations = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isRTL = language === 'he';
  
  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/412115c6-52a0-40f1-b632-7e11d31436e2.png" 
              alt="BrainBridge Logo" 
              className="h-12 w-auto"
            />
            <div className="text-sm text-muted-foreground">
              {isRTL ? '> צפה בהמלצות > המלצות' : '> View recommendations > Recommendations'}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher 
              currentLanguage={language} 
              onLanguageChange={(lang) => setLanguage(lang)} 
            />
            <ThemeToggle 
              isDarkMode={theme === 'dark'} 
              onToggle={toggleTheme} 
            />
            <span className="text-sm text-muted-foreground">
              Tuesday, Jan 21th, 2025
            </span>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1501286353178-1ec881214838" />
              <AvatarFallback>SP</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-center mb-12">
          {isRTL ? 'בוקר טוב, שרה' : 'Good morning, Sara'}
        </h1>
        
        <h2 className="text-2xl font-medium text-center mb-8">
          {isRTL ? 'המלצות' : 'Recommendations'}
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden">
            <CardContent className="p-6 bg-gradient-to-br from-emerald-100 to-teal-50">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-full bg-white/80 backdrop-blur-sm">
                  <Nut className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-800">
                  {isRTL ? 'עצות תזונתיות' : 'Nutritional Advice'}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden">
            <CardContent className="p-6 bg-gradient-to-br from-blue-100 to-cyan-50">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-full bg-white/80 backdrop-blur-sm">
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-800">
                  {isRTL ? 'הצעות לפעילות גופנית' : 'Physical Activity Suggestions'}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden">
            <CardContent className="p-6 bg-gradient-to-br from-purple-100 to-indigo-50">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-full bg-white/80 backdrop-blur-sm">
                  <Recycle className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-800">
                  {isRTL ? 'שינויים סביבתיים' : 'Environmental Modifications'}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assessment Cards */}
        <h2 className="text-2xl font-medium text-center mb-8">
          {isRTL ? 'הערכות' : 'Assessments'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to="/assessment/teacher" className="block">
            <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden h-full">
              <CardContent className="p-6 bg-gradient-to-br from-amber-100 to-yellow-50">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 rounded-full bg-white/80 backdrop-blur-sm">
                    <ClipboardCheck className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800">
                    {isRTL ? 'הערכת מורה' : 'Teacher Assessment'}
                  </h3>
                  <p className="text-sm text-center text-gray-600">
                    {isRTL ? 'מעקב התקדמות למורים להערכת ביצועים בכיתה' : 'Progress monitoring for teachers to evaluate classroom performance'}
                  </p>
                  <Button variant="outline" className="mt-2">
                    {isRTL ? 'התחל הערכה' : 'Start Assessment'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/assessment/parent" className="block">
            <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden h-full">
              <CardContent className="p-6 bg-gradient-to-br from-green-100 to-emerald-50">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 rounded-full bg-white/80 backdrop-blur-sm">
                    <ClipboardCheck className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800">
                    {isRTL ? 'הערכת הורה' : 'Parent Assessment'}
                  </h3>
                  <p className="text-sm text-center text-gray-600">
                    {isRTL ? 'תצפיות ומעקב התקדמות ביתי להורים' : 'Home-based observations and progress tracking for parents'}
                  </p>
                  <Button variant="outline" className="mt-2">
                    {isRTL ? 'התחל הערכה' : 'Start Assessment'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/assessment/child" className="block">
            <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden h-full">
              <CardContent className="p-6 bg-gradient-to-br from-blue-100 to-sky-50">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 rounded-full bg-white/80 backdrop-blur-sm">
                    <ClipboardCheck className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800">
                    {isRTL ? 'הערכת ילד' : 'Child Assessment'}
                  </h3>
                  <p className="text-sm text-center text-gray-600">
                    {isRTL ? 'רגשות ותצפיות מדווחות עצמית מהילד' : 'Self-reported feelings and observations from the child'}
                  </p>
                  <Button variant="outline" className="mt-2">
                    {isRTL ? 'התחל הערכה' : 'Start Assessment'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Formal Recommendations Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-medium mb-4">
            {isRTL ? 'קובץ המלצות פורמלי:' : 'Formal recommendatins file:'}
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 border dark:bg-gray-700 dark:border-gray-600">
            <div className="text-center py-12">
              <h4 className="text-xl font-medium mb-2">CHAPTER 1</h4>
              <p className="text-gray-600 uppercase dark:text-gray-300">SUMMARY OF FINDINGS, CONCLUSION, AND</p>
              <p className="text-gray-600 uppercase dark:text-gray-300">RECOMMENDATIONS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
