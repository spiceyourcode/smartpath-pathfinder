import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import UploadReport from "./pages/UploadReport";
import ReportDetail from "./pages/ReportDetail";
import Performance from "./pages/Performance";
import PerformanceTrends from "./pages/PerformanceTrends";
import PerformancePredictions from "./pages/PerformancePredictions";
import Flashcards from "./pages/Flashcards";
import GenerateFlashcards from "./pages/GenerateFlashcards";
import FlashcardReview from "./pages/FlashcardReview";
import Career from "./pages/Career";
import CareerDetail from "./pages/CareerDetail";
import CareerQuiz from "./pages/CareerQuiz";
import StudyPlans from "./pages/StudyPlans";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/upload" element={<UploadReport />} />
          <Route path="/reports/:id" element={<ReportDetail />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/performance/trends" element={<PerformanceTrends />} />
          <Route path="/performance/predictions" element={<PerformancePredictions />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/flashcards/generate" element={<GenerateFlashcards />} />
          <Route path="/flashcards/review/:id" element={<FlashcardReview />} />
          <Route path="/career" element={<Career />} />
          <Route path="/career/quiz" element={<CareerQuiz />} />
          <Route path="/career/:id" element={<CareerDetail />} />
          <Route path="/study-plans" element={<StudyPlans />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
