
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Recommendations from "./pages/Recommendations";
import TeacherAssessment from "./pages/TeacherAssessment";
import ParentAssessment from "./pages/ParentAssessment"; 
import ChildAssessment from "./pages/ChildAssessment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/assessment/teacher" element={<TeacherAssessment />} />
          <Route path="/assessment/parent" element={<ParentAssessment />} />
          <Route path="/assessment/child" element={<ChildAssessment />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
