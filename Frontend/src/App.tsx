import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./features/landing page/LandingPage";
import LoginForm from "./features/auth/components/LoginForm";
import RegisterForm from "./features/auth/components/RegisterForm";
import ForgotPasswordForm from "./features/auth/components/ForgotPasswordForm";
import MainLayout from "./layouts/MainLayout.jsx";
import DashboardPage from "./features/learning/dashboard/DashboardPage.jsx";
import RoadmapPage from "./features/learning/roadmap/RoadmapPage.jsx";
import UserProfile from "./features/user-profile/profile.jsx";
import LessonPage from "./features/learning/lesson/LessonPage.tsx";
import PracticeQuestions from "./features/learning/lesson/PracticeQuestions";
import OnboardingApp from "./features/onboarding/OnboardingApp.jsx";
import { useAuthStore } from "./features/auth/store/useAuthStore";

// Chặn vào Dashboard/Roadmap/... nếu chưa hoàn thành Onboarding
function OnboardingGuard({ children }) {
  const user = useAuthStore((state) => state.user);

  if (user && !user.hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />

        <Route path="/onboarding" element={<OnboardingApp />} />

        <Route
          path="/dashboard"
          element={
            <OnboardingGuard>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            </OnboardingGuard>
          }
        />
        <Route
          path="/roadmap"
          element={
            <OnboardingGuard>
              <MainLayout>
                <RoadmapPage />
              </MainLayout>
            </OnboardingGuard>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout>
              <UserProfile />
            </MainLayout>
          }
        />
        <Route
          path="/lessons"
          element={
            <OnboardingGuard>
              <MainLayout>
                <LessonPage />
              </MainLayout>
            </OnboardingGuard>
          }
        />
        <Route
          path="/lessons/practice"
          element={
            <OnboardingGuard>
              <MainLayout>
                <PracticeQuestions />
              </MainLayout>
            </OnboardingGuard>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;