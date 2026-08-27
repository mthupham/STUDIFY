import React from "react";

// 1. Phải có giao diện (interface) định nghĩa kiểu cho onReview
interface TheoryCardProps {
  onReview: () => void;
}

// 2. Phải truyền <TheoryCardProps> vào React.FC và bóc tách { onReview } ra
export const TheoryCard: React.FC<TheoryCardProps> = ({ onReview }) => {
  return (
    <article className="bg-white border border-slate-300 rounded-2xl shadow-sm p-6 flex flex-col gap-3">
      <header className="flex justify-between items-center">
        <span className="bg-blue-50 text-blue-700 rounded px-2.5 py-1 text-[10px] leading-tight font-bold tracking-wide">
          THEORY
        </span>
        <span className="text-blue-700 w-5 h-5">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="currentColor" />
            <path
              d="M8 12L11 15L16 9.5"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </header>

      <h3 className="text-slate-900 text-base font-medium m-0">
        Reading and Writing lesson
      </h3>

      <footer className="mt-1.5 border-t border-slate-100 pt-4 flex items-center justify-between text-slate-500 text-xs font-semibold">
        <button
          onClick={onReview}
          type="button"
          className="border-none bg-transparent text-blue-700 text-base cursor-pointer inline-flex items-center gap-1 hover:underline"
        >
          Review <span aria-hidden="true">›</span>
        </button>
      </footer>
    </article>
  );
};
