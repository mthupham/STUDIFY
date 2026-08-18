import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export default function GoogleSuccessPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const setAuthSession = useAuthStore((state) => state.setAuthSession);

  useEffect(() => {
    const token = params.get('token');

    async function completeLogin() {
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Lấy đầy đủ thông tin user thật (bao gồm hasCompletedOnboarding) thay vì chỉ có id
        const { data } = await axios.get(`${API_BASE}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAuthSession(data, token);

        if (!data.hasCompletedOnboarding) {
          navigate('/onboarding');
        } else {
          navigate('/dashboard');
        }
      } catch (err) {
        navigate('/login');
      }
    }

    completeLogin();
  }, []);

  return <div>Đang xử lý đăng nhập...</div>;
}