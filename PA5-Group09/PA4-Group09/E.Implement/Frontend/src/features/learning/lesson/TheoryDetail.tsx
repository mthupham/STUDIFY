import React from "react";

interface TheoryDetailProps {
  onBack: () => void;
}

export const TheoryDetail: React.FC<TheoryDetailProps> = ({ onBack }) => {
  return (
    <div className="w-full min-h-screen p-4 md:p-8 flex flex-col gap-8 bg-[#faf8ff]">
      {/* Header Row */}
      <div className="w-full flex justify-between items-center border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-200/60 rounded-lg text-slate-600 transition-colors cursor-pointer"
            type="button"
          >
            ← Back to Lessons
          </button>
          <h1 className="text-slate-900 text-3xl font-bold font-['Inter']">
            Theory Detail
          </h1>
        </div>
      </div>

      {/* Hero Banner Area */}
      <div className="w-full bg-blue-600 rounded-3xl shadow-md p-8 md:p-12 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
        <div className="z-10 flex flex-col items-center gap-4">
          <span className="px-4 py-1 bg-emerald-800 rounded-full text-xs font-semibold tracking-wide">
            LEVEL A1
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            BREAKTHROUGH
          </h2>
          <p className="max-w-2xl text-sm md:text-base text-blue-100 opacity-90 leading-relaxed">
            Begin your journey into language mastery. Build a strong foundation
            with essential vocabulary and the building blocks of grammar.
          </p>
          <div className="px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm inline-flex items-center gap-2 mt-2">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium">15 minutes</span>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="w-full flex flex-col gap-10">
        {/* SECTION 1: VOCABULARY */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex justify-center items-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-none stroke-current stroke-2"
              >
                <path d="M4 6.5C4 5.7 4.7 5 5.5 5H10.5C11.3 5 12 5.7 12 6.5V18H5.5C4.7 18 4 17.3 4 16.5V6.5Z M12 6.5C12 5.7 12.7 5 13.5 5H18.5C19.3 5 20 5.7 20 6.5V16.5C20 17.3 19.3 18 18.5 18H12V6.5Z" />
              </svg>
            </div>
            <h2 className="text-slate-900 text-2xl font-semibold">
              Vocabulary
            </h2>
          </div>

          {/* Vocabulary List Cards */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="w-full p-6 bg-white/80 border border-slate-200 rounded-3xl backdrop-blur-sm flex flex-col gap-4 shadow-sm"
              >
                <div className="w-10 h-10 bg-violet-100 text-violet-700 rounded-xl flex justify-center items-center text-xs font-bold">
                  0{item}
                </div>
                <div className="text-slate-900 text-sm font-semibold">
                  Name of topic
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg flex flex-col gap-1">
                    <span className="text-sky-700 text-xs font-bold uppercase">
                      Term
                    </span>
                    <span className="text-slate-700 text-sm">
                      definition text here
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg flex flex-col gap-1">
                    <span className="text-sky-700 text-xs font-bold uppercase">
                      Phonetic
                    </span>
                    <span className="text-slate-700 text-sm">/definition/</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg flex flex-col gap-1">
                    <span className="text-sky-700 text-xs font-bold uppercase">
                      Example
                    </span>
                    <span className="text-slate-700 text-sm">
                      definition example sentence
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: GRAMMAR */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 text-orange-700 rounded-xl flex justify-center items-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-none stroke-current stroke-2"
              >
                <path
                  d="M4 16.5V20h3.5L18 9.5L14.5 6L4 16.5Z"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-slate-900 text-2xl font-semibold">Grammar</h2>
          </div>

          {/* Grammar Content Cards */}
          <div className="flex flex-col gap-4">
            <div className="p-6 bg-indigo-50/60 border border-indigo-100 rounded-3xl flex flex-col gap-2 relative overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-yellow-800 text-sm font-bold">01</span>
                <span className="text-slate-900 text-sm font-semibold">
                  The Verb "To Be"
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed max-w-2xl">
                The core of English sentence structure. Use 'am', 'is', and
                'are' to describe people, things, and states of being.
              </p>
            </div>

            <div className="p-6 bg-indigo-50/60 border border-indigo-100 rounded-3xl flex flex-col gap-2 relative overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-yellow-800 text-sm font-bold">02</span>
                <span className="text-slate-900 text-sm font-semibold">
                  Subject Pronouns
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed max-w-2xl">
                Replace names with pronouns to avoid repetition. Learn I, You,
                He, She, It, We, They.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TheoryCardProps {
  onReview: () => void; // Thêm prop nhận hành động click
}

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
        Vocabulary and Grammar lesson
      </h3>

      <footer className="mt-1.5 border-t border-slate-100 pt-4 flex items-center justify-between text-slate-500 text-xs font-semibold">
        <span>Time</span>
        <button
          onClick={onReview} // 🔴 Kích hoạt hàm chuyển trang khi click
          type="button"
          className="border-none bg-transparent text-blue-700 text-base cursor-pointer inline-flex items-center gap-1 hover:underline"
        >
          Review <span aria-hidden="true">›</span>
        </button>
      </footer>
    </article>
  );
};
