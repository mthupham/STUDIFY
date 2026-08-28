import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/store/useAuthStore";

interface LevelInfo {
  id: string;
  name: string;
  description: string;
  badgeColor: string;
}

const LEVELS: LevelInfo[] = [
  {
    id: "A1",
    name: "Beginner",
    description: "Starting out with basic vocabulary and simple sentence structures",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "A2",
    name: "Elementary",
    description: "Basic communication for everyday conversations and routine tasks",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    id: "B1",
    name: "Intermediate",
    description: "Expressing opinions confidently and handling daily work scenarios",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    id: "B2",
    name: "Upper Intermediate",
    description: "Fluently conversing and understanding complex technical topics",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    id: "C1",
    name: "Advanced",
    description: "Using language flexibly and naturally for academic or professional settings",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    id: "C2",
    name: "Proficient",
    description: "Mastering English effortlessly with near-native precision",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

export default function SelectLevel() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const setAuthSession = useAuthStore((s) => s.setAuthSession);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

  const handleChoose = async (level: string) => {
    if (!user) return navigate("/onboarding", { replace: true });

    // Nếu không có token, vẫn cập nhật local session để luồng tiếp tục (trường hợp hiếm, token bị mất)
    if (!token) {
      const updatedUser = { ...user, currentLevel: level, hasCompletedOnboarding: true };
      setAuthSession(updatedUser, "");
      navigate("/dashboard", { replace: true });
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.patch(
        `${API_BASE}/user/select-level`,
        { level },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const updatedUser = data?.data || { ...user, currentLevel: level, hasCompletedOnboarding: true };
      setAuthSession(updatedUser, token);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      const msg = axios.isAxiosError(err) ? err.response?.data?.message : null;
      setError(Array.isArray(msg) ? msg.join(", ") : msg || "Không thể lưu level. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50/60 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
        <div className="absolute -top-32 left-10 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Personalized Learning Path
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Select Your English Level
          </h1>
          <p className="text-slate-500 max-w-md mx-auto text-sm sm:text-base">
            Choose the level that best matches your current ability. Studify will tailor your lessons accordingly.
          </p>
        </div>

        {/* Level Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {LEVELS.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => handleChoose(lvl.id)}
              disabled={loading}
              className="group relative text-left p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-500 transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {lvl.id}
                  </span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${lvl.badgeColor}`}>
                    {lvl.name}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 group-hover:text-slate-600 transition-colors leading-relaxed">
                  {lvl.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                <span>Select this level</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </button>
          ))}
        </div>
        {error && (
          <div className="mt-4 text-sm text-rose-700 font-medium">{error}</div>
        )}
      </div>
    </div>
  );
}