import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Sparkles, Heart, Trophy, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Fireworks from '@/components/Fireworks';
import { useLanguage } from '@/contexts/LanguageContext';

const Celebration = () => {
  const [refreshCount, setRefreshCount] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const navigate = useNavigate();
  const { language, translations } = useLanguage();
  const t = translations[language as 'en' | 'he'];
  const isRTL = language === 'he';

  // Auto refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCount(prev => prev + 1);
      setShowMessage(false);
      setTimeout(() => setShowMessage(true), 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const celebrationMessages = {
    en: [
      "🌟 Amazing work! 🌟",
      "🎉 You're incredible! 🎉", 
      "✨ Keep shining! ✨",
      "🏆 You're a star! 🏆",
      "🎊 Fantastic job! 🎊",
      "💫 You're awesome! 💫",
      "🌈 Beautiful progress! 🌈",
      "🎯 Perfect focus! 🎯"
    ],
    he: [
      "🌟 עבודה מדהימה! 🌟",
      "🎉 אתם פשוט מעולים! 🎉",
      "✨ תמשיכו לזרוח! ✨", 
      "🏆 אתם כוכבים! 🏆",
      "🎊 עבודה פנטסטית! 🎊",
      "💫 אתם נפלאים! 💫",
      "🌈 התקדמות יפהפיה! 🌈",
      "🎯 ריכוז מושלם! 🎯"
    ]
  };

  const currentMessage = celebrationMessages[language as 'en' | 'he'][refreshCount % celebrationMessages[language as 'en' | 'he'].length];

  const FloatingIcon = ({ icon: Icon, delay, color }: { icon: any, delay: number, color: string }) => (
    <div 
      className={`absolute animate-bounce opacity-80`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '2s',
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 60 + 20}%`
      }}
    >
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
      {/* Fireworks background */}
      <Fireworks />
      
      {/* Floating icons */}
      <FloatingIcon icon={Star} delay={0} color="text-yellow-300" />
      <FloatingIcon icon={Sparkles} delay={0.5} color="text-blue-300" />
      <FloatingIcon icon={Heart} delay={1} color="text-pink-300" />
      <FloatingIcon icon={Trophy} delay={1.5} color="text-orange-300" />
      <FloatingIcon icon={Gift} delay={2} color="text-green-300" />
      <FloatingIcon icon={Star} delay={2.5} color="text-purple-300" />
      <FloatingIcon icon={Sparkles} delay={3} color="text-cyan-300" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Celebration message */}
        <div className={`text-center mb-8 transition-all duration-500 ${showMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl mb-4 animate-pulse">
            {currentMessage}
          </h1>
          
          <div className="text-2xl md:text-3xl text-white/90 font-semibold mb-8">
            {language === 'he' ? `חגיגה מספר ${refreshCount + 1}` : `Celebration #${refreshCount + 1}`}
          </div>
        </div>

        {/* Rotating celebration wheel */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-spin flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
              <Trophy className="w-12 h-12 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Progress celebration */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/30">
          <div className="flex items-center gap-4 justify-center">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className={`w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-bounce`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Button
            onClick={() => navigate('/')}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm text-lg px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
          >
            {language === 'he' ? '🏠 חזרה הביתה' : '🏠 Go Home'}
          </Button>
          
          <Button
            onClick={() => setRefreshCount(prev => prev + 1)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
          >
            {language === 'he' ? '🎉 עוד חגיגה!' : '🎉 More Celebration!'}
          </Button>
        </div>

        {/* Refresh indicator */}
        <div className="mt-8 text-white/70 text-sm text-center">
          {language === 'he' ? 'מתחדש כל 10 שניות' : 'Auto-refreshes every 10 seconds'}
        </div>
      </div>

      {/* Falling stars animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-gradient-to-b from-white to-transparent opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              animationName: 'fall',
              animationDuration: `${3 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 5}s`,
              animationIterationCount: 'infinite',
              transform: 'rotate(45deg)'
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fall {
          from {
            top: -50px;
            opacity: 1;
          }
          to {
            top: 100vh;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Celebration;