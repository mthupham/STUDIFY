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

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
          {/* Logo / Icon */}
          <div className="mx-auto mb-5 w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6 text-blue-600"
            >
              <path
                d="M4 6.5C4 5.7 4.7 5 5.5 5H10.5C11.3 5 12 5.7 12 6.5V18H5.5C4.7 18 4 17.3 4 16.5V6.5Z"
                className="fill-current"
              />
              <path
                d="M12 6.5C12 5.7 12.7 5 13.5 5H18.5C19.3 5 20 5.7 20 6.5V16.5C20 17.3 19.3 18 18.5 18H12V6.5Z"
                className="fill-current"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="!text-lg !font-bold !text-slate-900">
            Welcome to Studify
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Setting up your learning experience...
          </p>

          {/* Loading */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-slate-200 border-t-blue-600 animate-spin" />
            <span className="text-xs font-medium text-slate-400">
              Signing you in
            </span>
          </div>

          {/* Progress dots */}
          <div className="mt-5 flex justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span
              className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}