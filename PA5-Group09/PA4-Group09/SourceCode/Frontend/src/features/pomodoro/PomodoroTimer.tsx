import React from 'react';
import { usePomodoroStore } from './usePomodoroStore';

// --- SVG ICON SUB-COMPONENTS ---
const BrainIcon = () => (
  <svg className="w-5 h-5 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 13.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 13.5M14.25 3.104c.251.023.501.05.75.082M19 13.5a3.75 3.75 0 01-3.75 3.75h-6.5A3.75 3.75 0 015 13.5" />
  </svg>
);

const CoffeeIcon = () => (
  <svg className="w-5 h-5 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const MinusIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-5 h-5 text-white fill-white ml-0.5" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg className="w-5 h-5 text-white fill-white" viewBox="0 0 24 24">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const ResetIcon = () => (
  <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const QuoteIcon = () => (
  <svg className="w-6 h-4 text-indigo-400 opacity-60" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

// --- MAIN UI COMPONENT ---
export const PomodoroTimerCoreSection: React.FC = () => {
  const {
    focusTime,
    breakTime,
    mode,
    formattedTime,
    isRunning,
    completedSessions,
    dailyGoal,
    radius,
    circumference,
    strokeDashoffset,
    toggleTimer,
    resetTimer,
    adjustFocus,
    adjustBreak,
  } = usePomodoroStore();

  return (
    <div className="w-full max-w-[896px] mx-auto flex flex-col justify-start items-center gap-10 font-['Inter',sans-serif]">
      
      {/* ---------------- BENTO GRID CONTAINER ---------------- */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: SETTINGS CARDS & STATS */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          
          {/* Focus Time Card */}
          <div className="p-6 bg-white/70 rounded-3xl shadow-sm outline outline-1 outline-offset-[-1px] outline-white/40 backdrop-blur-md flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-xs font-semibold uppercase tracking-wider">
                FOCUS TIME
              </span>
              <BrainIcon />
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => adjustFocus(-5)}
                disabled={isRunning}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-50 flex justify-center items-center transition"
              >
                <MinusIcon />
              </button>
              <span className="text-sky-700 text-3xl font-bold leading-none">
                {focusTime}m
              </span>
              <button
                onClick={() => adjustFocus(5)}
                disabled={isRunning}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-50 flex justify-center items-center transition"
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          {/* Break Time Card */}
          <div className="p-6 bg-white/70 rounded-3xl shadow-sm outline outline-1 outline-offset-[-1px] outline-white/40 backdrop-blur-md flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-xs font-semibold uppercase tracking-wider">
                BREAK TIME
              </span>
              <CoffeeIcon />
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => adjustBreak(-1)}
                disabled={isRunning}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-50 flex justify-center items-center transition"
              >
                <MinusIcon />
              </button>
              <span className="text-emerald-800 text-3xl font-bold leading-none">
                {breakTime}m
              </span>
              <button
                onClick={() => adjustBreak(1)}
                disabled={isRunning}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-50 flex justify-center items-center transition"
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          {/* Statistics / Progress Card */}
          <div className="p-6 bg-white/70 rounded-3xl shadow-sm outline outline-1 outline-offset-[-1px] outline-white/40 backdrop-blur-md flex flex-col gap-3">
            <span className="text-gray-700 text-xs font-semibold">
              Daily Goal: {dailyGoal} Sessions
            </span>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: dailyGoal }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-3 flex-1 rounded-full transition-all duration-300 ${
                    idx < completedSessions ? 'bg-sky-700' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>

            <span className="text-gray-600 text-xs font-medium mt-1">
              {completedSessions}/{dailyGoal} Pomodoros completed today
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN: CIRCULAR TIMER CONTAINER */}
        <div className="lg:col-span-7 p-8 md:p-12 bg-white/70 rounded-[40px] outline outline-1 outline-offset-[-1px] outline-white/40 backdrop-blur-md flex flex-col justify-center items-center shadow-sm relative overflow-hidden">
          
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 300 300">
              <circle
                cx="150"
                cy="150"
                r={radius}
                className="text-slate-200"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="150"
                cy="150"
                r={radius}
                className={`transition-all duration-500 ease-linear ${
                  mode === 'focus' ? 'text-sky-700' : 'text-emerald-700'
                }`}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight font-mono">
                {formattedTime}
              </span>
              <span className="mt-2 text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-widest">
                {mode === 'focus' ? 'FOCUS SESSION' : 'BREAK TIME'}
              </span>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-5">
            <button
              onClick={resetTimer}
              title="Reset Timer"
              className="w-12 h-12 rounded-full border-2 border-slate-300 hover:border-slate-400 bg-white flex justify-center items-center transition shadow-sm"
            >
              <ResetIcon />
            </button>

            <button
              onClick={toggleTimer}
              className={`h-16 px-8 rounded-full flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 ${
                mode === 'focus'
                  ? 'bg-sky-700 hover:bg-sky-800 shadow-sky-700/30'
                  : 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-700/30'
              }`}
            >
              {isRunning ? <PauseIcon /> : <PlayIcon />}
              <span className="text-white text-xl font-semibold">
                {isRunning ? 'Pause' : 'Start'}
              </span>
            </button>
          </div>

        </div>

      </div>

      {/* ---------------- BOTTOM QUOTE SECTION ---------------- */}
      <div className="w-full max-w-[672px] pb-6 flex flex-col items-center text-center gap-3">
        <QuoteIcon />
        <blockquote className="text-gray-700 text-lg md:text-xl font-semibold leading-relaxed">
          &quot;Language is the road map of a culture. It tells you where its people come from and where they are going.&quot;
        </blockquote>
        <cite className="text-sky-700 text-sm font-semibold not-italic">
          — Rita Mae Brown
        </cite>
      </div>

    </div>
  );
};

export default PomodoroTimerCoreSection;