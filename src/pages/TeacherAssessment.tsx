
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

interface TeacherFormValues {
  studentName: string;
  date: string;
  class: string;
  taskCompletion: string;
  focusImprovement: string;
  organizationImprovement: string;
  energyLevel: string;
  alertness: string;
  seatingResponse: string;
  physicalEngagement: string;
  concentrationAfterActivity: string;
}

const TeacherAssessment = () => {
  const form = useForm<TeacherFormValues>({
    defaultValues: {
      studentName: "",
      date: "",
      class: "",
      taskCompletion: "",
      focusImprovement: "",
      organizationImprovement: "",
      energyLevel: "",
      alertness: "",
      seatingResponse: "",
      physicalEngagement: "",
      concentrationAfterActivity: "",
    },
  });

  const onSubmit = (data: TeacherFormValues) => {
    console.log(data);
    toast.success("שאלון נשלח בהצלחה!");
    // Here you would typically save the data to your backend
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link to="/recommendations" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            חזרה להמלצות
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">שאלון מורה למעקב התקדמות</h1>
        
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="studentName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>שם התלמיד/ה:</FormLabel>
                        <FormControl>
                          <Input placeholder="שם התלמיד/ה" {...field} />
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
                        <FormLabel>תאריך:</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>כיתה:</FormLabel>
                        <FormControl>
                          <Input placeholder="כיתה" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <h2 className="text-xl font-semibold pt-4">ביצועים אקדמיים</h2>
                
                {/* Task Completion */}
                <FormField
                  control={form.control}
                  name="taskCompletion"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>באיזו תדירות התלמיד/ה משלים/ה משימות בזמן הנתון?</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value} 
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="1" id="taskCompletion-1" />
                            <FormLabel htmlFor="taskCompletion-1" className="font-normal cursor-pointer">אף פעם</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="2" id="taskCompletion-2" />
                            <FormLabel htmlFor="taskCompletion-2" className="font-normal cursor-pointer">לעתים רחוקות</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="3" id="taskCompletion-3" />
                            <FormLabel htmlFor="taskCompletion-3" className="font-normal cursor-pointer">לפעמים</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="4" id="taskCompletion-4" />
                            <FormLabel htmlFor="taskCompletion-4" className="font-normal cursor-pointer">לעתים קרובות</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="5" id="taskCompletion-5" />
                            <FormLabel htmlFor="taskCompletion-5" className="font-normal cursor-pointer">תמיד</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Focus Improvement */}
                <FormField
                  control={form.control}
                  name="focusImprovement"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>יכולת התלמיד/ה לשמור על ריכוז במהלך השיעורים השתפרה:</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value} 
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="1" id="focusImprovement-1" />
                            <FormLabel htmlFor="focusImprovement-1" className="font-normal cursor-pointer">מאוד לא מסכים/ה</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="2" id="focusImprovement-2" />
                            <FormLabel htmlFor="focusImprovement-2" className="font-normal cursor-pointer">לא מסכים/ה</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="3" id="focusImprovement-3" />
                            <FormLabel htmlFor="focusImprovement-3" className="font-normal cursor-pointer">ניטרלי/ת</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="4" id="focusImprovement-4" />
                            <FormLabel htmlFor="focusImprovement-4" className="font-normal cursor-pointer">מסכים/ה</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="5" id="focusImprovement-5" />
                            <FormLabel htmlFor="focusImprovement-5" className="font-normal cursor-pointer">מסכים/ה מאוד</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Organization Improvement */}
                <FormField
                  control={form.control}
                  name="organizationImprovement"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>הארגון של חומרי הלימוד וסביבת העבודה של התלמיד/ה השתפר:</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value} 
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="1" id="organizationImprovement-1" />
                            <FormLabel htmlFor="organizationImprovement-1" className="font-normal cursor-pointer">מאוד לא מסכים/ה</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="2" id="organizationImprovement-2" />
                            <FormLabel htmlFor="organizationImprovement-2" className="font-normal cursor-pointer">לא מסכים/ה</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="3" id="organizationImprovement-3" />
                            <FormLabel htmlFor="organizationImprovement-3" className="font-normal cursor-pointer">ניטרלי/ת</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="4" id="organizationImprovement-4" />
                            <FormLabel htmlFor="organizationImprovement-4" className="font-normal cursor-pointer">מסכים/ה</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="5" id="organizationImprovement-5" />
                            <FormLabel htmlFor="organizationImprovement-5" className="font-normal cursor-pointer">מסכים/ה מאוד</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h2 className="text-xl font-semibold pt-4">תצפיות פיזיות</h2>
                
                {/* Energy Level */}
                <FormField
                  control={form.control}
                  name="energyLevel"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>רמת האנרגיה של התלמיד/ה מתאימה לפעילויות למידה:</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value} 
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="1" id="energyLevel-1" />
                            <FormLabel htmlFor="energyLevel-1" className="font-normal cursor-pointer">אף פעם</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="2" id="energyLevel-2" />
                            <FormLabel htmlFor="energyLevel-2" className="font-normal cursor-pointer">לעתים רחוקות</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="3" id="energyLevel-3" />
                            <FormLabel htmlFor="energyLevel-3" className="font-normal cursor-pointer">לפעמים</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="4" id="energyLevel-4" />
                            <FormLabel htmlFor="energyLevel-4" className="font-normal cursor-pointer">לעתים קרובות</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="5" id="energyLevel-5" />
                            <FormLabel htmlFor="energyLevel-5" className="font-normal cursor-pointer">תמיד</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Alertness */}
                <FormField
                  control={form.control}
                  name="alertness"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>התלמיד/ה נראה/ית ערני/ת ונח/ה:</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value} 
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="1" id="alertness-1" />
                            <FormLabel htmlFor="alertness-1" className="font-normal cursor-pointer">אף פעם</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="2" id="alertness-2" />
                            <FormLabel htmlFor="alertness-2" className="font-normal cursor-pointer">לעתים רחוקות</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="3" id="alertness-3" />
                            <FormLabel htmlFor="alertness-3" className="font-normal cursor-pointer">לפעמים</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="4" id="alertness-4" />
                            <FormLabel htmlFor="alertness-4" className="font-normal cursor-pointer">לעתים קרובות</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="5" id="alertness-5" />
                            <FormLabel htmlFor="alertness-5" className="font-normal cursor-pointer">תמיד</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Seating Response */}
                <FormField
                  control={form.control}
                  name="seatingResponse"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>כיצד התלמיד/ה הגיב/ה למיקום הישיבה הנוכחי בכיתה?</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value} 
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="1" id="seatingResponse-1" />
                            <FormLabel htmlFor="seatingResponse-1" className="font-normal cursor-pointer">משפיע לרעה על הריכוז</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="2" id="seatingResponse-2" />
                            <FormLabel htmlFor="seatingResponse-2" className="font-normal cursor-pointer">אין השפעה ניכרת</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="3" id="seatingResponse-3" />
                            <FormLabel htmlFor="seatingResponse-3" className="font-normal cursor-pointer">משפר מעט את הריכוז</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="4" id="seatingResponse-4" />
                            <FormLabel htmlFor="seatingResponse-4" className="font-normal cursor-pointer">משפר משמעותית את הריכוז</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h2 className="text-xl font-semibold pt-4">תגובה לפעילות גופנית</h2>
                
                {/* Physical Engagement */}
                <FormField
                  control={form.control}
                  name="physicalEngagement"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>מעורבות בפעילויות גופניות שהוקצו:</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value} 
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="1" id="physicalEngagement-1" />
                            <FormLabel htmlFor="physicalEngagement-1" className="font-normal cursor-pointer">מסרב/ת להשתתף</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="2" id="physicalEngagement-2" />
                            <FormLabel htmlFor="physicalEngagement-2" className="font-normal cursor-pointer">השתתפות מינימלית</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="3" id="physicalEngagement-3" />
                            <FormLabel htmlFor="physicalEngagement-3" className="font-normal cursor-pointer">השתתפות בינונית</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="4" id="physicalEngagement-4" />
                            <FormLabel htmlFor="physicalEngagement-4" className="font-normal cursor-pointer">השתתפות טובה</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="5" id="physicalEngagement-5" />
                            <FormLabel htmlFor="physicalEngagement-5" className="font-normal cursor-pointer">השתתפות מצוינת</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Concentration After Activity */}
                <FormField
                  control={form.control}
                  name="concentrationAfterActivity"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>האם התלמיד/ה הראה/תה שיפור בריכוז לאחר פעילות גופנית?</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value} 
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="1" id="concentrationAfterActivity-1" />
                            <FormLabel htmlFor="concentrationAfterActivity-1" className="font-normal cursor-pointer">ללא שיפור</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="2" id="concentrationAfterActivity-2" />
                            <FormLabel htmlFor="concentrationAfterActivity-2" className="font-normal cursor-pointer">שיפור קל</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="3" id="concentrationAfterActivity-3" />
                            <FormLabel htmlFor="concentrationAfterActivity-3" className="font-normal cursor-pointer">שיפור בינוני</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="4" id="concentrationAfterActivity-4" />
                            <FormLabel htmlFor="concentrationAfterActivity-4" className="font-normal cursor-pointer">שיפור משמעותי</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-6">
                  <Button type="submit" className="w-full">שלח שאלון</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherAssessment;
