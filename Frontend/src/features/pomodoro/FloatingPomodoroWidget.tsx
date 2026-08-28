import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePomodoroStore } from "./usePomodoroStore";

export const FloatingPomodoroWidget: React.FC = () => {
  const { isRunning, formattedTime, mode, toggleTimer } = usePomodoroStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra xem user có đang đứng ở trang Pomodoro hay không
  const isPomodoroPage = location.pathname === "/dashboard/pomodoro";

  // Nếu Timer KHÔNG chạy hoặc User ĐANG ở trang Pomodoro -> Bật chế độ ẩn Widget
  if (!isRunning || isPomodoroPage) return null;

  return (
    <div
      onClick={() => navigate("/dashboard/pomodoro")}
      className="fixed bottom-6 right-6 bg-slate-900/90 text-white p-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-4 cursor-pointer hover:scale-105 transition-all z-[9999] border border-slate-700/50"
    >
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
          {mode === "focus" ? "Focusing" : "Break Time"}
        </span>
        <span className="text-xl font-extrabold font-mono tracking-tight">
          {formattedTime}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation(); // Tránh bị click nhầm sang sự kiện nhảy trang
          toggleTimer();
        }}
        className="w-9 h-9 rounded-full bg-sky-600 hover:bg-sky-500 flex items-center justify-center font-bold transition shadow-md"
      >
        ⏸
      </button>
    </div>
  );
};