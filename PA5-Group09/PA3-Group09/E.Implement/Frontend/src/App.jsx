import React from 'react';
import RoadmapPage from './features/learning/roadmap';
import DashboardPage from './features/learning/dashboard';
import OnboardingApp from './features/onboarding/OnboardingApp';
import MainLayout from './layouts/MainLayout';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    
    <MainLayout>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </MainLayout>
    
   
  );
}

export default App;
