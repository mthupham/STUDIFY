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
import Result from "./features/onboarding/ResultPlacementTest.jsx";
import { useAuthStore } from "./features/auth/store/useAuthStore";
import LessonDetail from "./features/learning/lesson/TheoryDetail";

import StudyGroupHub from "./features/virtual-study-room/StudyGroup";
import JoinGroup from "./features/virtual-study-room/JoinGroup";
import NewGroup from "./features/virtual-study-room/CreateNewGroup";
import MemberWorkspace from "./features/virtual-study-room/Workspace_Member";

// Chặn vào Dashboard/Roadmap/... nếu chưa hoàn thành Onboarding
function OnboardingGuard({ children }) {
  const user = useAuthStore((state) => state.user);

  console.log("Guard user:", user);

  if (user && !user.hasCompletedOnboarding) {
    console.log("Redirecting to onboarding");
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
        <Route path="/placement-result" element={<Result />} />
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
          path="/lessons/:lessonId"
          element={
            <OnboardingGuard>
              <MainLayout>
                <LessonDetail />
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
        <Route
          path="/study-groups"
          element={
            <OnboardingGuard>
              <MainLayout>
                <StudyGroupHub />
              </MainLayout>
            </OnboardingGuard>
          }
        />
        <Route
          path="/study-groups/join-group"
          element={
            <OnboardingGuard>
              <MainLayout>
                <JoinGroup />
              </MainLayout>
            </OnboardingGuard>
          }
        />
        <Route
          path="/study-groups/new-group"
          element={
            <OnboardingGuard>
              <MainLayout>
                <NewGroup />
              </MainLayout>
            </OnboardingGuard>
          }
        />

        <Route
          path="/study-groups/workspace-member"
          element={
            <OnboardingGuard>
              <MainLayout>
                <MemberWorkspace />
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
