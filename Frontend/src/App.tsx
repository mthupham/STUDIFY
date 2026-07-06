import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './features/auth/components/LoginForm';
import RegisterForm from './features/auth/components/RegisterForm';
import MainLayout from './layouts/MainLayout.jsx';
import DashboardPage from './features/learning/dashboard/DashboardPage.jsx';
import RoadmapPage from './features/learning/roadmap/RoadmapPage.jsx';
import LessonPage from './features/learning/lesson/LessonPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Nếu người dùng vào đường dẫn gốc (localhost:5173), tự động đá sang /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Cấu hình các đường dẫn tương ứng với giao diện bạn vừa làm */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          }
        />
        <Route
          path="/roadmap"
          element={
            <MainLayout>
              <RoadmapPage />
            </MainLayout>
          }
        />
        <Route
          path="/lessons"
          element={
            <MainLayout>
              <LessonPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;