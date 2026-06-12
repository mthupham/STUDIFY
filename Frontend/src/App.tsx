import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './features/auth/components/LoginForm';
import RegisterForm from './features/auth/components/RegisterForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Nếu người dùng vào đường dẫn gốc (localhost:5173), tự động đá sang /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Cấu hình các đường dẫn tương ứng với giao diện bạn vừa làm */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        
        {/* Tạm thời để một trang Dashboard trống để lát test chức năng đăng nhập */}
        <Route path="/dashboard" element={<div className="p-10 text-2xl font-bold">Chào mừng Phước đến với Dashboard Studify!</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;