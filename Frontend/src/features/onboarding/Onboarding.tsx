import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlacementTest from './PlacementTest'; 

export default function OnboardingGoalSetting() {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [selectedPace, setSelectedPace] = useState<number | string | null>(null);
  const [showActualTest, setShowActualTest] = useState(false);

  // Xử lý chọn mục tiêu thời gian ở Bước 1
  const handleSelectPace = (hours: number | string) => {
    setSelectedPace(hours);
    setStep(2); 
  };

  // Khởi chạy bài kiểm tra thật sự (Khi nhấn "No, I want to take a placement test")
  const handleStartTest = () => {
    setShowActualTest(true);
  };

  // Hoàn thành thủ công hoặc hoàn thành bài test
  const handleCompleteOnboarding = (levelData: any) => {
    console.log("Onboarding completed:", { selectedPace, levelData });
    navigate('/dashboard'); 
  };

  // Nếu người dùng chọn làm bài kiểm tra thật, nhường toàn bộ giao diện cho component PlacementTest
  if (showActualTest) {
    return <PlacementTest onComplete={handleCompleteOnboarding} selectedPace={selectedPace} />;
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
            style={{ width: step === 1 ? '50%' : '100%' }} 
          />
        </div>
        
        {/* Nhãn trạng thái các bước */}
        <div className="w-full px-1 flex justify-between text-sm sm:text-base font-normal leading-6">
          <span className={`transition-all duration-300 ${step === 1 ? 'text-sky-700 font-semibold' : 'text-gray-400'}`}>
            Commitment
          </span>
          <span className={`transition-all duration-300 ${step === 2 ? 'text-sky-700 font-semibold' : 'text-gray-400'}`}>
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
              <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold tracking-tight">
                Set your pace
              </h1>
              <p className="text-gray-600 text-base sm:text-lg font-normal leading-relaxed max-w-[540px] mx-auto">
                To help you reach your goals, how much time can you realistically dedicate to Studify each week?
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
                  <div className="w-5 h-5 bg-sky-800 rounded-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 text-base sm:text-lg font-semibold truncate">2 hours/week</h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-normal truncate">Casual learner • 15 mins a day</p>
                </div>
              </button>

              {/* Tùy chọn 2: 4 giờ */}
              <button 
                onClick={() => handleSelectPace(4)}
                className="w-full p-4 sm:p-5 bg-white hover:bg-slate-50 active:bg-slate-100 transition-all rounded-xl border border-slate-200 flex items-center text-left focus:outline-none focus:ring-2 focus:ring-sky-700 shadow-sm group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <div className="w-4 h-5 bg-sky-800 rounded-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 text-base sm:text-lg font-semibold truncate">4 hours/week</h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-normal truncate">Steady progress • 35 mins a day</p>
                </div>
              </button>

              {/* Tùy chọn 3: 6 giờ */}
              <button 
                onClick={() => handleSelectPace(6)}
                className="w-full p-4 sm:p-5 bg-white hover:bg-slate-50 active:bg-slate-100 transition-all rounded-xl border border-slate-200 flex items-center text-left focus:outline-none focus:ring-2 focus:ring-sky-700 shadow-sm group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <div className="w-5 h-3 bg-sky-800 rounded-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 text-base sm:text-lg font-semibold truncate">6 hours/week</h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-normal truncate">Serious study • 50 mins a day</p>
                </div>
              </button>

              {/* Tùy chọn 4: 8+ giờ */}
              <button 
                onClick={() => handleSelectPace('8+')}
                className="w-full p-4 sm:p-5 bg-white hover:bg-slate-50 active:bg-slate-100 transition-all rounded-xl border border-slate-200 flex items-center text-left focus:outline-none focus:ring-2 focus:ring-sky-700 shadow-sm group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <div className="w-4 h-5 bg-sky-800 rounded-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 text-base sm:text-lg font-semibold truncate">8+ hours/week</h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-normal truncate">Immersive path • 1+ hour a day</p>
                </div>
              </button>

            </div>

            <blockquote className="text-center text-gray-500 text-sm font-normal italic max-w-[480px] pt-4">
              "Success is the sum of small efforts, repeated day in and day out."
            </blockquote>
          </div>
        ) : (
          /* -------------------------------------------------------------------------
             MÀN HÌNH BƯỚC 2: CHOOSE ENGLISH LEVEL
             ------------------------------------------------------------------------- */
          <div className="w-full p-6 sm:p-10 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-8 animate-fadeIn">
            
            {/* Headline & Description */}
            <div className="w-full text-center space-y-2">
              <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold leading-tight">
                Do you know your current English<br />level?
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We&apos;ll tailor your learning path based on where you are today.
              </p>
            </div>

            {/* Option Buttons Container */}
            <div className="w-full flex flex-col gap-4">
              
              {/* Option: Yes (Chọn thủ công) */}
              <button 
                onClick={() => handleCompleteOnboarding({ manualSelect: true })}
                className="w-full p-5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl flex items-center gap-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-sky-700 group"
              >
                {/* Icon Wrapper (Blue theme) */}
                <div className="w-12 h-12 bg-blue-600/10 text-sky-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                {/* Text content */}
                <div className="flex-grow">
                  <h3 className="text-gray-900 text-sm font-semibold leading-5">Yes, I know my level</h3>
                  <p className="text-gray-500 text-xs font-medium leading-4">I want to manually select my starting point (A1–C2).</p>
                </div>
                {/* Chevron arrow icon */}
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Option: No (Kích hoạt chạy làm test bài xếp lớp) */}
              <button 
                onClick={handleStartTest}
                className="w-full p-5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl flex items-center gap-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-sky-700 group"
              >
                {/* Icon Wrapper (Emerald theme) */}
                <div className="w-12 h-12 bg-emerald-600/10 text-emerald-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                {/* Text content */}
                <div className="flex-grow">
                  <h3 className="text-gray-900 text-sm font-semibold leading-5">No, I want to take a placement test</h3>
                  <p className="text-gray-500 text-xs font-medium leading-4">Recommended. Takes ~15 minutes to find your perfect fit.</p>
                </div>
                {/* Chevron arrow icon */}
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Step {step} of 2 • Your progress is saved automatically</span>
        </div>
      </footer>

    </div>
  );
}