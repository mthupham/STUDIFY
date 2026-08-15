import React, { useState } from 'react';

// ==========================================
// 1. SVG ICONS (Đã chuyển thành Component SVG)
// ==========================================

const BriefcaseIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const SunIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const UserGroupIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const LightBulbIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const MicIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const StopIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
);

const AlertCircleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckSparkleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// ==========================================
// 2. INTERFACES (TypeScript Types)
// ==========================================

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ScoreCardProps {
  label: string;
  score: number;
  colorClass: string;
  progressBgClass: string;
}

interface MistakeItemProps {
  errorText: string;
  explanation: string;
}

interface BetterExampleProps {
  title: string;
  sentence: string;
  note?: string;
}

// ==========================================
// 3. MAIN COMPONENT
// ==========================================

export const VoiceLearningDashboard: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('business');

  // Danh sách kịch bản học
  const scenarios: Scenario[] = [
    {
      id: 'business',
      title: 'Business English',
      description: 'Master meetings, negotiations, and corporate presentations.',
      icon: <BriefcaseIcon />,
    },
    {
      id: 'daily',
      title: 'Daily Life',
      description: 'Practice casual conversations, shopping, and travel situations.',
      icon: <SunIcon />,
    },
    {
      id: 'interviews',
      title: 'Interviews',
      description: 'Prepare for common interview questions and career talk.',
      icon: <UserGroupIcon />,
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 text-slate-800 font-sans flex justify-center items-center">
      {/* Bố cục Canvas chính dạng Grid responsive (12 cột) */}
      <main className="w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================
            PANEL TRÁI: Chọn Kịch bản & Mẹo (3 Cột)
        ======================================================== */}
        <aside className="lg:col-span-3 flex flex-col gap-6">
          {/* Card Danh Sách Kịch Bản */}
          <div className="p-5 bg-slate-50 rounded-xl shadow-sm border border-slate-300 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Scenarios</h2>
            
            <div className="flex flex-col gap-3">
              {scenarios.map((item) => {
                const isActive = selectedScenario === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedScenario(item.id)}
                    className={`p-4 rounded-xl text-left transition-all flex flex-col gap-2 ${
                      isActive
                        ? 'bg-indigo-50 border-2 border-sky-700 shadow-sm'
                        : 'bg-white border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={isActive ? 'text-sky-700' : 'text-gray-500'}>
                        {item.icon}
                      </div>
                      <span className={`text-sm font-semibold ${isActive ? 'text-sky-700' : 'text-gray-900'}`}>
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card Mẹo Mẹo Nâng Cao (Pro Tip) */}
          <div className="p-5 bg-blue-600 rounded-xl shadow-sm text-white flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <LightBulbIcon className="w-5 h-5 text-yellow-300" />
              <h3 className="text-sm font-semibold">Pro Tip</h3>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed">
              Try using 'Industry Specific' terminology to boost your relevance score by up to 15%.
            </p>
          </div>
        </aside>

        {/* ========================================================
            PANEL GIỮA: Màn hình tương tác giọng nói & Điểm số (5 Cột)
        ======================================================== */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          {/* Màn hình tương tác giọng nói (AI Voice Area) */}
          <div className="relative p-6 bg-slate-50 rounded-xl shadow-sm border border-slate-300 flex flex-col items-center justify-between min-h-[460px] overflow-hidden">
            {/* Pattern Trang trí Nền */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600 via-transparent to-transparent" />

            {/* Avatar AI & Sóng Âm Trạng Thái */}
            <div className="relative z-10 flex flex-col items-center gap-4 mt-4">
              {/* Vòng Tròn Mic / Avatar */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-36 h-36 bg-blue-100 rounded-full animate-pulse" />
                <div className="relative w-28 h-28 bg-sky-700 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white">
                  <MicIcon className="w-12 h-12" />
                </div>
              </div>

              {/* Câu Hỏi Luyện Tập Hiện Tại */}
              <h2 className="text-2xl font-bold text-center text-gray-900 mt-2 px-4">
                "Describe your role at your current company."
              </h2>
              
              <p className="text-sm text-gray-600 text-center">
                I'm listening... Speak clearly for the best transcription.
              </p>

              {/* Waveform Visualizer (Mô phỏng sóng âm) */}
              <div className="flex items-end gap-1 h-8 mt-2">
                {[24, 12, 16, 12, 36, 24, 24, 24, 20, 32, 16].map((height, idx) => (
                  <span
                    key={idx}
                    className="w-1 bg-sky-700 rounded-full transition-all duration-300 animate-pulse"
                    style={{ height: `${height}px`, animationDelay: `${idx * 100}ms` }}
                  />
                ))}
              </div>
            </div>

            {/* Cụm Nút Đột Phá Hành Động (Action Buttons) */}
            <div className="relative z-10 flex gap-4 mt-6 w-full justify-center">
              <button className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-medium text-sm rounded-full transition-colors flex items-center gap-2 shadow-sm">
                <StopIcon />
                <span>Stop Practice</span>
              </button>
              <button className="px-6 py-3 bg-sky-700 hover:bg-sky-800 text-white font-medium text-sm rounded-full transition-colors flex items-center gap-2 shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Listening...</span>
              </button>
            </div>
          </div>

          {/* Khu vực Bảng Điểm Bento (Bento-style Result Summary) */}
          <div className="grid grid-cols-3 gap-3">
            <ScoreCard label="Grammar" score={88} colorClass="text-sky-700" progressBgClass="bg-sky-700" />
            <ScoreCard label="Vocabulary" score={80} colorClass="text-emerald-700" progressBgClass="bg-emerald-700" />
            <ScoreCard label="Relevance" score={92} colorClass="text-amber-700" progressBgClass="bg-amber-700" />
          </div>
        </section>

        {/* ========================================================
            PANEL PHẢI: Hội thoại Thời gian thực & Phản hồi (4 Cột)
        ======================================================== */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Màn hình Transcript Trực tiếp */}
          <div className="bg-slate-50 rounded-xl shadow-sm border border-slate-300 overflow-hidden flex flex-col h-[320px]">
            {/* Header Màn hình Transcript */}
            <div className="p-4 bg-indigo-50/50 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-900">Real-time Transcript</h3>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded uppercase">
                Active
              </span>
            </div>

            {/* Nội dung Hội thoại Chat */}
            <div className="p-4 overflow-y-auto flex flex-col gap-4 text-xs">
              {/* Tin nhắn AI */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-sky-700 tracking-wider">AI TUTOR</span>
                <div className="p-3 bg-indigo-50 text-gray-800 rounded-lg max-w-[90%] leading-relaxed">
                  Tell me about your typical workday. What are your main responsibilities?
                </div>
              </div>

              {/* Tin nhắn User (Có đánh dấu lỗi sai) */}
              <div className="flex flex-col gap-1 items-end">
                <span className="text-[10px] font-bold text-gray-500 tracking-wider">YOU</span>
                <div className="p-3 bg-white border border-slate-200 text-gray-800 rounded-lg max-w-[95%] leading-relaxed shadow-sm">
                  Well, I usually{' '}
                  <mark className="bg-rose-200 text-red-900 px-1 py-0.5 rounded font-medium">
                    starting
                  </mark>{' '}
                  my day at 9 AM. I am responsible for manage the team...
                </div>
              </div>

              {/* Tin nhắn AI Phản hồi tiếp */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-sky-700 tracking-wider">AI TUTOR</span>
                <div className="p-3 bg-indigo-50 text-gray-800 rounded-lg max-w-[90%] leading-relaxed">
                  That sounds interesting. How do you handle conflicts within your team?
                </div>
              </div>
            </div>
          </div>

          {/* Phản hồi & Sửa Lỗi Chi Tiết (Feedback Section) */}
          <div className="p-5 bg-slate-50 rounded-xl shadow-sm border border-slate-300 flex flex-col gap-4">
            {/* Danh sách lỗi phát hiện được */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-red-700 font-semibold text-sm">
                <AlertCircleIcon />
                <span>Mistakes Detected</span>
              </div>

              <MistakeCard
                errorText='"I starting my day..."'
                explanation='Use present simple for habits: "I start my day."'
              />
              <MistakeCard
                errorText='"responsible for manage..."'
                explanation='After "for", use gerund: "...responsible for managing."'
              />
            </div>

            <hr className="border-slate-200 my-1" />

            {/* Gợi ý câu tốt hơn (Better Examples) */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                <CheckSparkleIcon />
                <span>Better Examples</span>
              </div>

              <BetterExampleCard
                title="Alternative 1"
                sentence='"My workday typically commences at 9 AM."'
                note="(More formal)"
              />
              <BetterExampleCard
                title="Alternative 2"
                sentence='"I oversee a team and ensure operations run smoothly."'
              />
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

// ==========================================
// 4. SUB-COMPONENTS GIAO DIỆN
// ==========================================

// Card hiển thị điểm số bento
const ScoreCard: React.FC<ScoreCardProps> = ({ label, score, colorClass, progressBgClass }) => {
  return (
    <div className="p-3 bg-slate-50 rounded-xl border border-slate-300 flex flex-col items-center gap-2">
      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">{label}</span>
      <div className="flex items-baseline gap-0.5">
        <span className={`text-2xl font-bold ${colorClass}`}>{score}</span>
        <span className="text-xs text-gray-400">/100</span>
      </div>
      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div className={`h-full ${progressBgClass} rounded-full`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
};

// Card hiển thị chi tiết lỗi sai
const MistakeCard: React.FC<MistakeItemProps> = ({ errorText, explanation }) => {
  return (
    <div className="p-3 bg-rose-50/60 border-l-4 border-red-600 rounded flex flex-col gap-1 text-xs">
      <span className="font-bold text-red-700">{errorText}</span>
      <p className="text-gray-700 leading-normal">{explanation}</p>
    </div>
  );
};

// Card hiển thị câu gợi ý chuẩn hơn
const BetterExampleCard: React.FC<BetterExampleProps> = ({ title, sentence, note }) => {
  return (
    <div className="p-3 bg-emerald-50/60 border-l-4 border-emerald-600 rounded flex flex-col gap-1 text-xs">
      <span className="font-bold text-emerald-800">{title}</span>
      <p className="text-gray-800 italic leading-normal">
        {sentence} {note && <span className="not-italic text-gray-500">{note}</span>}
      </p>
    </div>
  );
};

export default VoiceLearningDashboard;