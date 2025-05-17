
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, Record<string, string>>;
}

// Initial translations
const translations = {
  en: {
    // Common
    'goodMorning': 'Good morning',
    'settings': 'Settings',
    'logout': 'Log out',
    'viewRecommendations': 'View recommendations',
    'newAssessment': 'Do a new assessment',
    'myAssessments': 'My assessments',
    'howFeeling': 'How am I feeling today?',
    'task': 'Task',
    'today': 'today',
    
    // Clock component
    'currentTask': 'Current Task',
    'noTaskSelected': 'No task selected',
    'minutesLeft': 'minutes left',
    'timeDisplay': '{minutes}:{seconds}',
    
    // Task items
    'mathHomework': 'math homework (1,2,3,4,5,6 problems)',
    'readSummarize': 'Read & summarize a chapter from the book you are reading',
    'drawPaint': 'Draw or paint a picture of your favorite scene from the book you are reading',
    'watchVideo': 'Watch a fun educational video related to this week\'s science topic',
    'writeInterestingFacts': 'Write down three interesting facts you learned',
    
    // Time estimations
    'minutes': 'minutes',
    
    // Assessment common
    'submit': 'Submit',
    'back': 'Back to Recommendations',
    'date': 'Date',
    'name': 'Name',
    'class': 'Class',
    
    // Teacher assessment
    'teacher.title': 'Teacher Assessment',
    'teacher.academicPerformance': 'Academic Performance',
    'teacher.completesTasks': 'How often does the student complete assigned tasks within the given time?',
    'teacher.focus': 'The student\'s ability to maintain focus during lessons has improved:',
    'teacher.organization': 'The student\'s organization of materials and workspace has improved:',
    'teacher.physicalObservations': 'Physical Observations',
    'teacher.energyLevel': 'The student\'s energy level seems appropriate for learning activities:',
    'teacher.alertness': 'The student appears alert and well-rested:',
    'teacher.seating': 'How has the student responded to their current classroom seating placement?',
    'teacher.physicalActivity': 'Physical Activity Response',
    'teacher.engagement': 'Engagement in assigned physical activities:',
    'teacher.concentration': 'Has the student shown improved concentration after physical activity sessions?',
    
    // Parent assessment
    'parent.title': 'Parent Assessment',
    'parent.dailyRoutine': 'Daily Routine Observations',
    'parent.morningRoutine': 'Morning routine completion:',
    'parent.diet': 'Adherence to recommended diet plan:',
    'parent.physicalActivity': 'Physical Activity Engagement',
    'parent.participation': 'Participation in recommended activities:',
    'parent.activityLevel': 'How would you describe your child\'s current physical activity level?',
    'parent.improvement': 'Have you noticed an improvement in your child\'s ability to focus after physical activity?',
    'parent.nutrition': 'Nutritional Plan Adherence',
    'parent.mealSchedule': 'Following recommended meal schedule:',
    'parent.eatingHabits': 'My child\'s eating habits have improved:',
    'parent.homeBehavior': 'Home Behavior',
    'parent.homework': 'How often does your child complete homework without constant reminders?',
    'parent.sleep': 'My child\'s sleep schedule has improved:',
    'parent.energy': 'How would you rate your child\'s overall energy levels throughout the day?',
    
    // Child assessment
    'child.title': 'Child Assessment',
    'child.howIFeel': 'How I Feel',
    'child.focus': 'I can focus better in class:',
    'child.tired': 'I feel less tired during the day:',
    'child.seat': 'Do you feel your classroom seat helps you focus?',
    'child.food': 'How do you feel about the foods you eat now?',
    'child.physicalActivity': 'Do you think physical activity helps you focus better?'
  },
  he: {
    // Common
    'goodMorning': 'בוקר טוב',
    'settings': 'הגדרות',
    'logout': 'התנתק',
    'viewRecommendations': 'צפה בהמלצות',
    'newAssessment': 'עשה הערכה חדשה',
    'myAssessments': 'ההערכות שלי',
    'howFeeling': 'איך אני מרגיש/ה היום?',
    'task': 'משימה',
    'today': 'היום',
    
    // Clock component
    'currentTask': 'משימה נוכחית',
    'noTaskSelected': 'לא נבחרה משימה',
    'minutesLeft': 'דקות נותרו',
    'timeDisplay': '{minutes}:{seconds}',
    
    // Task items
    'mathHomework': 'שיעורי בית במתמטיקה (בעיות 1,2,3,4,5,6)',
    'readSummarize': 'קרא וסכם פרק מהספר שאתה קורא',
    'drawPaint': 'צייר או צבע תמונה של הסצנה האהובה עליך מהספר שאתה קורא',
    'watchVideo': 'צפה בסרטון חינוכי מהנה הקשור לנושא המדע של השבוע',
    'writeInterestingFacts': 'כתוב שלוש עובדות מעניינות שלמדת',
    
    // Time estimations
    'minutes': 'דקות',
    
    // Assessment common
    'submit': 'שלח',
    'back': 'חזרה להמלצות',
    'date': 'תאריך',
    'name': 'שם',
    'class': 'כיתה',
    
    // Teacher assessment
    'teacher.title': 'שאלון למורה',
    'teacher.academicPerformance': 'ביצועים אקדמיים',
    'teacher.completesTasks': 'באיזו תדירות התלמיד משלים משימות בזמן הנתון?',
    'teacher.focus': 'יכולת התלמיד לשמור על ריכוז במהלך השיעורים השתפרה:',
    'teacher.organization': 'ארגון החומרים ומרחב העבודה של התלמיד השתפר:',
    'teacher.physicalObservations': 'תצפיות פיזיות',
    'teacher.energyLevel': 'רמת האנרגיה של התלמיד מתאימה לפעילויות למידה:',
    'teacher.alertness': 'התלמיד נראה ערני ונח:',
    'teacher.seating': 'כיצד התלמיד הגיב למיקום הישיבה הנוכחי שלו בכיתה?',
    'teacher.physicalActivity': 'תגובה לפעילות גופנית',
    'teacher.engagement': 'מעורבות בפעילויות גופניות:',
    'teacher.concentration': 'האם התלמיד הראה ריכוז משופר לאחר פעילות גופנית?',
    
    // Parent assessment
    'parent.title': 'שאלון להורה',
    'parent.dailyRoutine': 'תצפיות על שגרה יומית',
    'parent.morningRoutine': 'השלמת שגרת בוקר:',
    'parent.diet': 'עמידה בתוכנית תזונה מומלצת:',
    'parent.physicalActivity': 'מעורבות בפעילות גופנית',
    'parent.participation': 'השתתפות בפעילויות מומלצות:',
    'parent.activityLevel': 'כיצד היית מתאר את רמת הפעילות הגופנית הנוכחית של ילדך?',
    'parent.improvement': 'האם הבחנת בשיפור ביכולת הריכוז של ילדך לאחר פעילות גופנית?',
    'parent.nutrition': 'עמידה בתוכנית תזונה',
    'parent.mealSchedule': 'עקיבה אחר לוח זמני ארוחות מומלץ:',
    'parent.eatingHabits': 'הרגלי האכילה של ילדי השתפרו:',
    'parent.homeBehavior': 'התנהגות בבית',
    'parent.homework': 'באיזו תדירות ילדך משלים שיעורי בית ללא תזכורות מתמידות?',
    'parent.sleep': 'לוח הזמנים של השינה של ילדי השתפר:',
    'parent.energy': 'כיצד היית מדרג את רמת האנרגיה הכללית של ילדך במהלך היום?',
    
    // Child assessment
    'child.title': 'שאלון לילד/ה',
    'child.howIFeel': 'איך אני מרגיש/ה',
    'child.focus': 'אני יכול/ה להתרכז טוב יותר בכיתה:',
    'child.tired': 'אני מרגיש/ה פחות עייף/ה במהלך היום:',
    'child.seat': 'האם אתה/ה מרגיש/ה שהמקום שלך בכיתה עוזר לך להתרכז?',
    'child.food': 'איך אתה/ה מרגיש/ה לגבי המזון שאתה/ה אוכל/ת עכשיו?',
    'child.physicalActivity': 'האם אתה/ה חושב/ת שפעילות גופנית עוזרת לך להתרכז טוב יותר?'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  translations,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    translations,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
