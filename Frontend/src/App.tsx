import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./features/landing page/LandingPage";
import LoginForm from "./features/auth/components/LoginForm";
import RegisterForm from "./features/auth/components/RegisterForm";
import ForgotPasswordForm from "./features/auth/components/ForgotPasswordForm";
import MainLayout from "./layouts/MainLayout.jsx";
import DashboardPage from "./features/learning/dashboard/DashboardPage.jsx";
import RoadmapPage from "./features/learning/roadmap/RoadmapPage.jsx";
import UserProfile from "./features/user-profile/profile.jsx";
import OnboardingApp from "./features/onboarding/OnboardingApp.jsx";
import Result from "./features/onboarding/ResultPlacementTest";
import { useAuthStore } from "./features/auth/store/useAuthStore";

import LessonDetail from "./features/learning/lesson/TheoryDetail";
import LessonPage from "./features/learning/lesson/LessonPage.tsx";
import PracticeQuestions from "./features/learning/lesson/PracticeQuestions";
import ResultPractice from "./features/learning/lesson/ResultPractice";

import StudyGroupHub from "./features/virtual-study-room/StudyGroup";
import JoinGroup from "./features/virtual-study-room/JoinGroup.tsx";
import NewGroup from "./features/virtual-study-room/CreateNewGroup.tsx";
import MemberWorkspace from "./features/virtual-study-room/Workspace_Member";
import LeaderWorkspace from "./features/virtual-study-room/Workspace_Leader";
import EditGroupInfo from "./features/virtual-study-room/EditGroupInfo.tsx";
import RepositoryUpload from "./features/virtual-study-room/RepositoryUpload.tsx";
import TaskAssignmentDashboard from "./features/virtual-study-room/TaskAssignment.tsx";

import Pomodoro from "./features/pomodoro/PomodoroTimer";
import { FloatingPomodoroWidget } from "./features/pomodoro/FloatingPomodoroWidget";

import FlashcardLibrary from "./features/flashcard/flashcard-decks";
import DeckDetailView from "./features/flashcard/flashcard-detail-view.tsx";

import GoogleSucessPage from "./features/auth/components/GoogleSucessPage.tsx";


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
      <FloatingPomodoroWidget />
      <Routes>

        <Route path="/auth/google/success" element={<GoogleSucessPage />} />
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
        {/* /lessons/practice phải khai báo TRƯỚC /lessons/:lessonId */}
        <Route
          path="/lessons/theory/:lessonId"
          element={
            <OnboardingGuard>
              <MainLayout>
                <LessonDetail />
              </MainLayout>
            </OnboardingGuard>
          }
        />
        <Route
          path="/lesson/:level/:lessonIndex"
          element={
            <OnboardingGuard>
              <MainLayout>
                <LessonDetail />
              </MainLayout>
            </OnboardingGuard>
          }
        />
        <Route
          path="/lessons/practice/reading/:lessonId"
          element={
            <OnboardingGuard>
              <MainLayout>
                <PracticeQuestions />
              </MainLayout>
            </OnboardingGuard>
          }
        />
        <Route
          path="/lessons/practice/writing/:lessonId"
          element={
            <OnboardingGuard>
              <MainLayout>
                <PracticeQuestions />
              </MainLayout>
            </OnboardingGuard>
          }
        />
        <Route
  path="/lessons/practice/result"
  element={
    <OnboardingGuard>
      <MainLayout>
        <ResultPractice />
      </MainLayout>
    </OnboardingGuard>
  }
/>
        <Route
          path="/lessons/practice/:lessonId"
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

        <Route
          path="/study-groups/workspace-leader"
          element={
            <OnboardingGuard>
              <MainLayout>
                <LeaderWorkspace />
              </MainLayout>
            </OnboardingGuard>
          }
        />

        <Route
          path="/study-groups/workspace-leader/edit-group"
          element={
            <OnboardingGuard>
              <MainLayout>
                <EditGroupInfo />
              </MainLayout>
            </OnboardingGuard>
          }
        />

        <Route
          path="/study-groups/workspace-leader/repository"
          element={
            <OnboardingGuard>
              <MainLayout>
                <RepositoryUpload />
              </MainLayout>
            </OnboardingGuard>
          }
        />
        <Route
          path="/study-groups/workspace-leader/task-assignment"
          element={
            <OnboardingGuard>
              <MainLayout>
                <TaskAssignmentDashboard />
              </MainLayout>
            </OnboardingGuard>
          }
        />
        <Route
          path="/dashboard/pomodoro"
          element={
            <OnboardingGuard>
              <MainLayout>
                <Pomodoro />
              </MainLayout>
            </OnboardingGuard>
          }
        />

        <Route
          path="/flashcard"
          element={
            <OnboardingGuard>
              <MainLayout>
                <FlashcardLibrary />
              </MainLayout>
            </OnboardingGuard>
          }
        />

        <Route
          path="/flashcard/:deckId"
          element={
            <OnboardingGuard>
              <MainLayout>
                <DeckDetailView />
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
