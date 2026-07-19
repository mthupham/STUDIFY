import { useState } from 'react';

interface PlacementTestProps {
  onComplete?: (result: { score: number; completed: boolean }) => void;
  selectedPace?: number | string | null;
}

export default function PlacementTest({ onComplete, selectedPace }: PlacementTestProps) {
  // State lưu trữ key của đáp án đang được chọn (ví dụ: 'A', 'B', 'C', 'D')
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  // Mảng danh sách các lựa chọn được render động
  const choices = [
    { key: 'A', text: 'on' },
    { key: 'B', text: 'in' },
    { key: 'C', text: 'at' },
    { key: 'D', text: 'for' }
  ];

  // Hàm xử lý khi người dùng nhấn nộp bài test
  const handleSubmit = () => {
    if (onComplete) {
      onComplete({ score: 80, completed: true }); // Mock dữ liệu kết quả trả về component cha
    }
  };

  const paceLabel = selectedPace == null ? 'No pace selected' : `${selectedPace} hours/week`;

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col font-['Inter'] selection:bg-indigo-100">
      
      {/* =========================================================================
          HEADER - TOP APP BAR
          ========================================================================= */}
      <header className="w-full bg-slate-50 border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          
          {/* Cụm Logo & Tiến độ tổng quan bên trái */}
          <div className="flex items-center gap-4">
            <span className="text-sky-700 text-2xl font-bold tracking-tight">Studify</span>
            <div className="w-px h-8 bg-slate-300 hidden sm:block" />
            
            {/* Tiến trình thời gian học tập */}
            <div className="hidden sm:flex flex-col justify-start">
              <span className="text-gray-900 text-sm font-semibold leading-5">14:52</span>
              <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden mt-1">
                <div className="w-[42%] h-full bg-sky-700 rounded-full" />
              </div>
            </div>
          </div>
          
          {/* Cụm Đếm ngược thời gian & Avatar bên phải */}
          <div className="flex items-center gap-6">
            {/* Bộ đếm ngược (Countdown Timer) */}
            <div className="bg-indigo-100 text-sky-700 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold leading-5">14:52</span>
            </div>
            
            {/* Hình đại diện thành viên */}
            <img 
              className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover" 
              src="https://placehold.co/40x40" 
              alt="User avatar" 
            />
          </div>

        </div>
      </header>

      {/* =========================================================================
          BODY CONTAINER (Gồm thanh điều hướng bên cạnh và vùng nội dung chính)
          ========================================================================= */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-1 relative">
        
        {/* ASIDE - SIDE NAVIGATION BAR */}
        <aside className="w-64 bg-indigo-50 border-r border-slate-200 p-4 hidden md:flex flex-col justify-between sticky top-[73px] h-[calc(100vh-73px)]">
          
          {/* Khối chức năng menu chính bên trên */}
          <div className="w-full space-y-6">
            <div className="px-4 py-2">
              <h2 className="text-sky-700 text-2xl font-bold leading-8">Placement Test</h2>
            </div>
            
            <nav className="w-full space-y-1">
              <a href="#map" className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-3 font-semibold text-sm transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>Question Map</span>
              </a>
            </nav>
          </div>

          {/* Khối cài đặt & nút nộp bài cố định bên dưới */}
          <div className="w-full pt-4 border-t border-slate-300 space-y-1">
            <a href="#settings" className="w-full px-4 py-3 text-gray-700 hover:bg-indigo-100/50 rounded-lg flex items-center gap-3 font-semibold text-sm transition-colors">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </a>
            <a href="#support" className="w-full px-4 py-3 text-gray-700 hover:bg-indigo-100/50 rounded-lg flex items-center gap-3 font-semibold text-sm transition-colors">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Support</span>
            </a>
            <div className="pt-2">
              <button 
                onClick={handleSubmit}
                className="w-full py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl text-base shadow-sm transition-colors"
              >
                Submit Test
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CANVAS - KHÔNG GIAN BÀI THI CHÍNH */}
        <main className="flex-1 p-6 lg:p-12 flex flex-col lg:flex-row justify-center items-start gap-8 overflow-y-auto">
          
          {/* CỘT BÊN TRÁI: KHU VỰC CÂU HỎI & ĐÁP ÁN TRẮC NGHIỆM */}
          <div className="w-full max-w-[896px] flex flex-col gap-6">
            <div className="w-full p-6 sm:p-8 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-6">
              
              {/* Vùng Meta câu hỏi */}
              <div className="w-full flex justify-between items-center border-b border-slate-100 pb-4">
                <div className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                  Question 5 of 10
                </div>
                <span className="text-gray-700 text-sm font-semibold">Multiple Choice</span>
              </div>
              
              {/* Nội dung đề bài */}
              <div className="w-full flex flex-col gap-3">
                <div className="text-xs text-slate-500 font-medium uppercase tracking-[0.24em]">
                  Your chosen pace: {paceLabel}
                </div>
                <h1 className="text-gray-900 text-xl sm:text-2xl font-semibold leading-relaxed">
                  Choose the correct preposition:<br />
                  <span className="text-sky-700">"She is interested ___ learning new languages."</span>
                </h1>
              </div>
              
              {/* Vòng lặp map danh sách đáp án động dựa trên state selectedChoice */}
              <div className="w-full flex flex-col gap-3">
                {choices.map((choice) => {
                  const isSelected = selectedChoice === choice.key;
                  return (
                    <label 
                      key={choice.key}
                      className={`w-full h-16 px-4 border rounded-xl flex items-center gap-4 cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-indigo-50 border-2 border-sky-700 shadow-sm' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="preposition" 
                        value={choice.key}
                        checked={isSelected}
                        onChange={() => setSelectedChoice(choice.key)}
                        className="w-5 h-5 text-sky-700 focus:ring-sky-500 border-slate-300"
                      />
                      <span className={`text-lg ${isSelected ? 'text-gray-900 font-semibold' : 'text-gray-900 font-normal'}`}>
                        {choice.key}) {choice.text}
                      </span>
                    </label>
                  );
                })}
              </div>

            </div>
          </div>

          {/* CỘT BÊN PHẢI: MAP CÂU HỎI & LIVE ACCURACY STATS */}
          <div className="w-full lg:w-80 flex flex-col gap-6 flex-shrink-0">
            
            {/* Hộp Bản Đồ Câu Hỏi (Question Map) */}
            <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
              <h3 className="text-gray-700 text-xs font-bold uppercase tracking-wider">Question Map</h3>
              
              {/* Grid câu số 1 -> 10 */}
              <div className="grid grid-cols-5 gap-2 w-full">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="h-9 bg-emerald-100 text-emerald-700 font-bold border border-emerald-600 rounded-lg flex justify-center items-center text-base">
                    {num}
                  </div>
                ))}
                <div className="h-9 bg-sky-700 text-white font-bold rounded-lg flex justify-center items-center text-base ring-4 ring-blue-100 shadow-md">
                  5
                </div>
                {[6, 7, 8, 9, 10].map((num) => (
                  <div key={num} className="h-9 bg-rose-100 text-rose-800 font-bold border border-rose-300 rounded-lg flex justify-center items-center text-base">
                    {num}
                  </div>
                ))}
              </div>

              {/* Chú giải ý nghĩa màu sắc */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 border-t border-slate-100 text-xs font-medium text-gray-600">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-emerald-100 border border-emerald-600 rounded-sm" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-sky-700 rounded-sm" />
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-rose-100 border border-rose-300 rounded-sm" />
                  <span>Pending</span>
                </div>
              </div>
            </div>

            {/* Hộp Thống Kê Độ Chính Xác Trực Tiếp (Live Accuracy) */}
            <div className="w-full p-6 bg-indigo-50 border border-indigo-200 rounded-2xl flex flex-col gap-3">
              <div className="flex items-center gap-2.5 text-gray-900 font-semibold text-sm">
                <svg className="w-4 h-4 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Live Accuracy</span>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="bg-emerald-200 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">ON TRACK</span>
                  <span className="text-emerald-800 text-xs font-bold">80%</span>
                </div>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div className="w-[80%] h-full bg-emerald-700" />
                </div>
              </div>
              <p className="text-gray-600 text-xs font-normal">Based on your previous 4 answers.</p>
            </div>

          </div>
        </main>
      </div>

      {/* =========================================================================
          FOOTER CONTROLS - THANH ĐIỀU HƯỚNG BÀI THI PHÍA DƯỚI
          ========================================================================= */}
      <footer className="w-full bg-slate-50 border-t border-slate-200 sticky bottom-0 z-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          
          <button className="px-5 py-2.5 border border-slate-300 hover:bg-slate-100 text-gray-700 font-bold rounded-xl text-sm flex items-center gap-2 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous Question</span>
          </button>
          
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-sm transition-all">
              <span>Next Question</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button 
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm shadow-sm transition-all"
            >
              Submit Test
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}