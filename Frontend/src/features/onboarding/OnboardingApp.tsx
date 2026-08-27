import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PlacementTest from "./PlacementTest";
import { useAuthStore } from "../auth/store/useAuthStore";
import SelectLevel from './SelectLevel';

export default function OnboardingGoalSetting() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedPace, setSelectedPace] = useState<number | string | null>(
    null,
  );
  const [showActualTest, setShowActualTest] = useState(false);
  const token = useAuthStore((s) => s.token);
  const [showSelectLevel, setShowSelectLevel] = useState(false);
  const [savingPace, setSavingPace] = useState(false);
  const [paceError, setPaceError] = useState<string | null>(null);

  // Xử lý chọn mục tiêu thời gian ở Bước 1
  const handleSelectPace = async (hours: number | string) => {
    setSelectedPace(hours);
    setPaceError(null);

    const numericHours = typeof hours === "string" ? parseInt(hours, 10) : hours;
    const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

    if (!token || !numericHours) {
      setStep(2);
      return;
    }

    setSavingPace(true);
    try {
      await axios.patch(
        `${API_BASE}/user/onboarding`,
        { weeklyStudyHours: numericHours },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setStep(2);
    } catch (err) {
      setPaceError("Không thể lưu lựa chọn. Vui lòng thử lại.");
    } finally {
      setSavingPace(false);
    }
  };

  // Khởi chạy bài kiểm tra thật sự (Khi nhấn "No, I want to take a placement test")
  const handleStartTest = () => {
    setShowActualTest(true);
  };

  const handleManualSelect = () => {
    setShowSelectLevel(true);
  };

  // Hoàn thành thủ công hoặc hoàn thành bài test
  const handleCompleteOnboarding = (levelData: any) => {
    console.log("Onboarding completed:", { selectedPace, levelData });
    navigate("/dashboard");
  };

  // Nếu người dùng chọn làm bài kiểm tra thật, nhường toàn bộ giao diện cho component PlacementTest
  if (showSelectLevel) {
    return <SelectLevel />;
  }

  if (showActualTest) {
    return (
      <PlacementTest
        onComplete={handleCompleteOnboarding}
        selectedPace={selectedPace}
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-between items-center font-['Inter'] px-4 sm:px-6">
      {/* =========================================================================
          HEADER & PROGRESS BAR (Dùng chung cho cả 2 bước để không bị giật lag giao diện)
          ========================================================================= */}
      <header className="w-full max-w-[672px] pt-8 sm:pt-12 pb-6 sm:pb-8 flex flex-col items-center">
        {/* Thanh tiến trình đồng bộ theo State `step` */}
        <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-sky-700 transition-all duration-500 ease-in-out"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>

        {/* Nhãn trạng thái các bước */}
        <div className="w-full px-1 flex justify-between text-sm sm:text-base font-normal leading-6">
          <span
            className={`transition-all duration-300 ${step === 1 ? "text-sky-700 font-semibold" : "text-gray-400"}`}
          >
            Commitment
          </span>
          <span
            className={`transition-all duration-300 ${step === 2 ? "text-sky-700 font-semibold" : "text-gray-400"}`}
          >
            Proficiency
          </span>
        </div>
      </header>

      {/* =========================================================================
          MAIN CONTENT AREA (Thay đổi ruột tùy theo Step)
          ========================================================================= */}
      <main className="w-full max-w-[672px] pb-12 sm:pb-16 flex-1 flex flex-col justify-center items-center">
        {step === 1 ? (
          /* -------------------------------------------------------------------------
             MÀN HÌNH BƯỚC 1: SET YOUR PACE
             ------------------------------------------------------------------------- */
          <div className="w-full flex flex-col items-center space-y-8 animate-fadeIn">
            {/* Tiêu đề chính */}
            <div className="text-center space-y-2 sm:space-y-3">
              <h1 className="!text-sky-700 !text-4xl !font-bold !tracking-tight">
                Set your pace
              </h1>
              <p className="text-gray-600 text-base sm:text-lg font-normal leading-relaxed max-w-[540px] mx-auto">
                To help you reach your goals, how much time can you
                realistically dedicate to Studify each week?
              </p>
            </div>

            {/* Danh sách các tùy chọn cam kết thời gian */}
            <div className="w-full flex flex-col gap-3 sm:gap-4">
              {/* Tùy chọn 1: 2 giờ */}
              <button
                onClick={() => handleSelectPace(2)}
                className="w-full p-4 sm:p-5 bg-white hover:bg-slate-50 active:bg-slate-100 transition-all rounded-xl border border-slate-200 flex items-center text-left focus:outline-none focus:ring-2 focus:ring-sky-700 shadow-sm group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M13.3 14.7L14.7 13.3L11 9.6V5H9V10.4L13.3 14.7ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2167 18 14.1042 17.2208 15.6625 15.6625C17.2208 14.1042 18 12.2167 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18Z"
                      fill="#004395"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 text-base sm:text-lg font-semibold truncate">
                    2 hours/week
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-normal truncate">
                    Casual learner • 15 mins a day
                  </p>
                </div>
              </button>

              {/* Tùy chọn 2: 4 giờ */}
              <button
                onClick={() => handleSelectPace(4)}
                className="w-full p-4 sm:p-5 bg-white hover:bg-slate-50 active:bg-slate-100 transition-all rounded-xl border border-slate-200 flex items-center text-left focus:outline-none focus:ring-2 focus:ring-sky-700 shadow-sm group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                  >
                    <path
                      d="M6.55 16.2L11.725 10H7.725L8.45 4.325L3.825 11H7.3L6.55 16.2ZM4 20L5 13H0L9 0H11L10 8H16L6 20H4Z"
                      fill="#004395"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 text-base sm:text-lg font-semibold truncate">
                    4 hours/week
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-normal truncate">
                    Steady progress • 35 mins a day
                  </p>
                </div>
              </button>

              {/* Tùy chọn 3: 6 giờ */}
              <button
                onClick={() => handleSelectPace(6)}
                className="w-full p-4 sm:p-5 bg-white hover:bg-slate-50 active:bg-slate-100 transition-all rounded-xl border border-slate-200 flex items-center text-left focus:outline-none focus:ring-2 focus:ring-sky-700 shadow-sm group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="12"
                    viewBox="0 0 20 12"
                    fill="none"
                  >
                    <path
                      d="M1.4 12L0 10.6L7.4 3.15L11.4 7.15L16.6 2H14V0H20V6H18V3.4L11.4 10L7.4 6L1.4 12Z"
                      fill="#004395"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 text-base sm:text-lg font-semibold truncate">
                    6 hours/week
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-normal truncate">
                    Serious study • 50 mins a day
                  </p>
                </div>
              </button>

              {/* Tùy chọn 4: 8+ giờ */}
              <button
                onClick={() => handleSelectPace("8+")}
                className="w-full p-4 sm:p-5 bg-white hover:bg-slate-50 active:bg-slate-100 transition-all rounded-xl border border-slate-200 flex items-center text-left focus:outline-none focus:ring-2 focus:ring-sky-700 shadow-sm group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="21"
                    viewBox="0 0 16 21"
                    fill="none"
                  >
                    <path
                      d="M5.675 11.7L6.55 8.85L4.25 7H7.1L8 4.2L8.9 7H11.75L9.425 8.85L10.3 11.7L8 9.925L5.675 11.7ZM2 21V13.275C1.36667 12.575 0.875 11.775 0.525 10.875C0.175 9.975 0 9.01667 0 8C0 5.76667 0.775 3.875 2.325 2.325C3.875 0.775 5.76667 0 8 0C10.2333 0 12.125 0.775 13.675 2.325C15.225 3.875 16 5.76667 16 8C16 9.01667 15.825 9.975 15.475 10.875C15.125 11.775 14.6333 12.575 14 13.275V21L8 19L2 21ZM8 14C9.66667 14 11.0833 13.4167 12.25 12.25C13.4167 11.0833 14 9.66667 14 8C14 6.33333 13.4167 4.91667 12.25 3.75C11.0833 2.58333 9.66667 2 8 2C6.33333 2 4.91667 2.58333 3.75 3.75C2.58333 4.91667 2 6.33333 2 8C2 9.66667 2.58333 11.0833 3.75 12.25C4.91667 13.4167 6.33333 14 8 14ZM4 18.025L8 17L12 18.025V14.925C11.4167 15.2583 10.7875 15.5208 10.1125 15.7125C9.4375 15.9042 8.73333 16 8 16C7.26667 16 6.5625 15.9042 5.8875 15.7125C5.2125 15.5208 4.58333 15.2583 4 14.925V18.025Z"
                      fill="#004395"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 text-base sm:text-lg font-semibold truncate">
                    8+ hours/week
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-normal truncate">
                    Immersive path • 1+ hour a day
                  </p>
                </div>
              </button>
            </div>

            <blockquote className="text-center text-gray-500 text-sm font-normal italic max-w-[480px] pt-4">
              "Success is the sum of small efforts, repeated day in and day
              out."
            </blockquote>
          </div>
        ) : (
          /* -------------------------------------------------------------------------
             MÀN HÌNH BƯỚC 2: CHOOSE ENGLISH LEVEL
             ------------------------------------------------------------------------- */
          <div className="w-full p-6 sm:p-10 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-8 animate-fadeIn">
            {/* Headline & Description */}
            <div className="w-full text-center space-y-2">
              <h1 className="!text-sky-700 !text-4xl !sm:text-3xl !font-bold !leading-tight">
                Do you know your current English level?
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We&apos;ll tailor your learning path based on where you are
                today.
              </p>
            </div>

            {/* Option Buttons Container */}
            <div className="w-full flex flex-col gap-4">
              {/* Option: Yes (Chọn thủ công) */}
              <button
                onClick={handleManualSelect}
                className="w-full p-5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl flex items-center gap-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-sky-700 group"
              >
                {/* Icon Wrapper (Blue theme) */}
                <div className="w-12 h-12 bg-blue-600/10 text-sky-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                {/* Text content */}
                <div className="flex-grow">
                  <h3 className="text-gray-900 text-sm font-semibold leading-5">
                    Yes, I know my level
                  </h3>
                  <p className="text-gray-500 text-xs font-medium leading-4">
                    I want to manually select my starting point (A1–C2).
                  </p>
                </div>
                {/* Chevron arrow icon */}
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Option: No (Kích hoạt chạy làm test bài xếp lớp) */}
              <button
                onClick={handleStartTest}
                className="w-full p-5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl flex items-center gap-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-sky-700 group"
              >
                {/* Icon Wrapper (Emerald theme) */}
                <div className="w-12 h-12 bg-emerald-600/10 text-emerald-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                {/* Text content */}
                <div className="flex-grow">
                  <h3 className="text-gray-900 text-sm font-semibold leading-5">
                    No, I want to take a placement test
                  </h3>
                  <p className="text-gray-500 text-xs font-medium leading-4">
                    Recommended. Takes ~15 minutes to find your perfect fit.
                  </p>
                </div>
                {/* Chevron arrow icon */}
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          FOOTER (Đồng bộ nhãn thông tin chung)
          ========================================================================= */}
      <footer className="w-full max-w-[672px] py-8 border-t border-slate-200/60 flex justify-center items-center text-gray-500 text-xs font-medium">
        <div className="flex items-center gap-2 opacity-70">
          <svg
            className="w-3.5 h-3.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span>Step {step} of 2 • Your progress is saved automatically</span>
        </div>
      </footer>
    </div>
  );
}
