
import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import AppHeader from '@/components/AppHeader';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';

interface ChildFormValues {
  name: string;
  date: string;
  focusInClass: string;
  feelingLessTired: string;
  seatHelpsWithFocus: string;
  feelingAboutFood: string;
  physicalActivityHelps: string;
}

const ChildAssessment = () => {
  const { language, setLanguage, translations } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isRTL = language === 'he';
  const t = translations[language];
  
  const form = useForm<ChildFormValues>({
    defaultValues: {
      name: "",
      date: "",
      focusInClass: "",
      feelingLessTired: "",
      seatHelpsWithFocus: "",
      feelingAboutFood: "",
      physicalActivityHelps: "",
    },
  });

  const onSubmit = (data: ChildFormValues) => {
    console.log(data);
    toast.success(isRTL ? "שאלון נשלח בהצלחה!" : "Questionnaire submitted successfully!");
    // Here you would typically save the data to your backend
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link to="/recommendations" className={`flex items-center text-sm text-muted-foreground hover:text-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
            <ArrowLeft className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
            {t['back']}
          </Link>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher 
              currentLanguage={language} 
              onLanguageChange={setLanguage} 
            />
            <ThemeToggle 
              isDarkMode={theme === 'dark'} 
              onToggle={toggleTheme} 
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">{t['child.title']}</h1>
        
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t['name']}:</FormLabel>
                        <FormControl>
                          <Input placeholder={isRTL ? "השם שלך" : "Your name"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t['date']}:</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <h2 className="text-xl font-semibold pt-4">{t['child.howIFeel']}</h2>
                
                {/* Focus in Class */}
                <FormField
                  control={form.control}
                  name="focusInClass"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>{t['child.focus']}</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="1" id="focusInClass-1" />
                            <FormLabel htmlFor="focusInClass-1" className="font-normal cursor-pointer">
                              {isRTL ? 'בכלל לא' : 'Not at all'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="2" id="focusInClass-2" />
                            <FormLabel htmlFor="focusInClass-2" className="font-normal cursor-pointer">
                              {isRTL ? 'קצת' : 'A little bit'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="3" id="focusInClass-3" />
                            <FormLabel htmlFor="focusInClass-3" className="font-normal cursor-pointer">
                              {isRTL ? 'לפעמים' : 'Sometimes'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="4" id="focusInClass-4" />
                            <FormLabel htmlFor="focusInClass-4" className="font-normal cursor-pointer">
                              {isRTL ? 'רוב הזמן' : 'Most of the time'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="5" id="focusInClass-5" />
                            <FormLabel htmlFor="focusInClass-5" className="font-normal cursor-pointer">
                              {isRTL ? 'כל הזמן' : 'All the time'}
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Feeling Less Tired */}
                <FormField
                  control={form.control}
                  name="feelingLessTired"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>{t['child.tired']}</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="1" id="feelingLessTired-1" />
                            <FormLabel htmlFor="feelingLessTired-1" className="font-normal cursor-pointer">
                              {isRTL ? 'בכלל לא' : 'Not at all'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="2" id="feelingLessTired-2" />
                            <FormLabel htmlFor="feelingLessTired-2" className="font-normal cursor-pointer">
                              {isRTL ? 'קצת' : 'A little bit'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="3" id="feelingLessTired-3" />
                            <FormLabel htmlFor="feelingLessTired-3" className="font-normal cursor-pointer">
                              {isRTL ? 'לפעמים' : 'Sometimes'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="4" id="feelingLessTired-4" />
                            <FormLabel htmlFor="feelingLessTired-4" className="font-normal cursor-pointer">
                              {isRTL ? 'רוב הזמן' : 'Most of the time'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="5" id="feelingLessTired-5" />
                            <FormLabel htmlFor="feelingLessTired-5" className="font-normal cursor-pointer">
                              {isRTL ? 'כל הזמן' : 'All the time'}
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Seat Helps With Focus */}
                <FormField
                  control={form.control}
                  name="seatHelpsWithFocus"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>{t['child.seat']}</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="1" id="seatHelpsWithFocus-1" />
                            <FormLabel htmlFor="seatHelpsWithFocus-1" className="font-normal cursor-pointer">
                              {isRTL ? 'לא, אני מוסח/ת יותר' : 'No, I get distracted more'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="2" id="seatHelpsWithFocus-2" />
                            <FormLabel htmlFor="seatHelpsWithFocus-2" className="font-normal cursor-pointer">
                              {isRTL ? 'זה לא משנה' : 'It makes no difference'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="3" id="seatHelpsWithFocus-3" />
                            <FormLabel htmlFor="seatHelpsWithFocus-3" className="font-normal cursor-pointer">
                              {isRTL ? 'זה עוזר קצת' : 'It helps a little'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="4" id="seatHelpsWithFocus-4" />
                            <FormLabel htmlFor="seatHelpsWithFocus-4" className="font-normal cursor-pointer">
                              {isRTL ? 'זה עוזר הרבה' : 'It helps a lot'}
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Feeling About Food */}
                <FormField
                  control={form.control}
                  name="feelingAboutFood"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>{t['child.food']}</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="1" id="feelingAboutFood-1" />
                            <FormLabel htmlFor="feelingAboutFood-1" className="font-normal cursor-pointer">
                              {isRTL ? 'אני לא אוהב/ת אותם בכלל' : 'I don\'t like them at all'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="2" id="feelingAboutFood-2" />
                            <FormLabel htmlFor="feelingAboutFood-2" className="font-normal cursor-pointer">
                              {isRTL ? 'אני אוהב/ת חלק מהם' : 'I like some of them'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="3" id="feelingAboutFood-3" />
                            <FormLabel htmlFor="feelingAboutFood-3" className="font-normal cursor-pointer">
                              {isRTL ? 'אני אוהב/ת את רובם' : 'I like most of them'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="4" id="feelingAboutFood-4" />
                            <FormLabel htmlFor="feelingAboutFood-4" className="font-normal cursor-pointer">
                              {isRTL ? 'אני נהנה/ית מהם מאוד' : 'I enjoy them a lot'}
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Physical Activity Helps */}
                <FormField
                  control={form.control}
                  name="physicalActivityHelps"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>{t['child.physicalActivity']}</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="1" id="physicalActivityHelps-1" />
                            <FormLabel htmlFor="physicalActivityHelps-1" className="font-normal cursor-pointer">
                              {isRTL ? 'בכלל לא' : 'Not at all'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="2" id="physicalActivityHelps-2" />
                            <FormLabel htmlFor="physicalActivityHelps-2" className="font-normal cursor-pointer">
                              {isRTL ? 'קצת' : 'A little bit'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="3" id="physicalActivityHelps-3" />
                            <FormLabel htmlFor="physicalActivityHelps-3" className="font-normal cursor-pointer">
                              {isRTL ? 'לפעמים' : 'Sometimes'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="4" id="physicalActivityHelps-4" />
                            <FormLabel htmlFor="physicalActivityHelps-4" className="font-normal cursor-pointer">
                              {isRTL ? 'רוב הזמן' : 'Most of the time'}
                            </FormLabel>
                          </div>
                          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                            <RadioGroupItem value="5" id="physicalActivityHelps-5" />
                            <FormLabel htmlFor="physicalActivityHelps-5" className="font-normal cursor-pointer">
                              {isRTL ? 'תמיד' : 'Always'}
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-6">
                  <Button type="submit" className="w-full">{t['submit']}</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChildAssessment;
