import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
type QuestionType = "multiple-choice" | "written";
type ResultStatus = "correct" | "incorrect" | "review";

interface QuestionResultItem {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  userAnswer: string;
  correctAnswer?: string; // Dành cho Trắc nghiệm
  sampleAnswer?: string;  // Dành cho Tự luận
  status: ResultStatus;
}



export const ResultPractice: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "correct" | "incorrect" | "written">("all");

const location = useLocation();
const navigate = useNavigate();

const result = location.state?.result;
const practiceResults: QuestionResultItem[] = useMemo(() => {
  if (!result?.testDetails) {
    return [];
  }

  return result.testDetails.map((item: any, index: number) => ({
    id: index + 1,
    type: item.type,
    question: item.questionText,
    options: item.options || [],
    userAnswer: item.userAnswer || "",
    correctAnswer: item.correctAnswer,
    sampleAnswer: item.sampleAnswer,
    status: item.status,
  }));
}, [result]);
  // Tính toán thống kê điểm số
  const stats = useMemo(() => {
    const total = practiceResults.length;
    const correct = practiceResults.filter((q) => q.status === "correct").length;
    const incorrect = practiceResults.filter((q) => q.status === "incorrect").length;
    const written = practiceResults.filter((q) => q.type === "written").length;
    const mcTotal = total - written;
    const accuracy = mcTotal > 0 ? Math.round((correct / mcTotal) * 100) : 0;

    return { total, correct, incorrect, written, accuracy };
  }, [practiceResults]);

  // Lọc câu hỏi theo tab đang chọn
  const filteredQuestions = useMemo(() => {
    if (filter === "correct") return practiceResults.filter((q) => q.status === "correct");
    if (filter === "incorrect") return practiceResults.filter((q) => q.status === "incorrect");
    if (filter === "written") return practiceResults.filter((q) => q.type === "written");
    return practiceResults;
  }, [filter, practiceResults]);
if (!result) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="mb-4 text-lg font-semibold">
          Không tìm thấy kết quả bài làm.
        </p>

        <button
          type="button"
          onClick={() => navigate("/lessons")}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white"
        >
          Back to Lessons
        </button>
      </div>
    </div>
  );
}
  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        
        {/* ================= TOP BACK BUTTON ================= */}
        <div>
          <button
            type="button"
            onClick={() => navigate('/lessons')}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Lessons
          </button>
        </div>

        {/* ================= HEADER & SCORE SUMMARY ================= */}
        <div className="w-full rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="rounded-full bg-[#eaf2ff] px-3.5 py-1 text-xs font-bold text-[#315dc7] uppercase tracking-wider">
                Practice Finished
              </span>
              <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Practice Quiz Results
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Review your answers, correct options, and sample responses below.
              </p>
            </div>

            {/* Score Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-col items-center rounded-2xl bg-emerald-50 px-5 py-3 border border-emerald-100">
                <span className="text-2xl font-black text-emerald-600">
                  {stats.correct}
                </span>
                <span className="text-xs font-semibold text-emerald-700">Correct</span>
              </div>

              <div className="flex flex-col items-center rounded-2xl bg-rose-50 px-5 py-3 border border-rose-100">
                <span className="text-2xl font-black text-rose-600">
                  {stats.incorrect}
                </span>
                <span className="text-xs font-semibold text-rose-700">Incorrect</span>
              </div>

              <div className="flex flex-col items-center rounded-2xl bg-amber-50 px-5 py-3 border border-amber-100">
                <span className="text-2xl font-black text-amber-600">
                  {stats.written}
                </span>
                <span className="text-xs font-semibold text-amber-700">Self-Review</span>
              </div>

              <div className="flex flex-col items-center rounded-2xl bg-[#4f6ef7] px-6 py-3 text-white shadow-[0_10px_24px_rgba(79,110,247,0.24)]">
                <span className="text-2xl font-black">{stats.accuracy}%</span>
                <span className="text-xs font-medium opacity-90">MC Accuracy</span>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
            {(
              [
                { id: "all", label: `All Questions (${stats.total})` },
                { id: "correct", label: `Correct (${stats.correct})` },
                { id: "incorrect", label: `Incorrect (${stats.incorrect})` },
                { id: "written", label: `Written (${stats.written})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  filter === tab.id
                    ? "bg-[#4f6ef7] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ================= QUESTION LIST DETAILED REVIEW ================= */}
        <div className="flex flex-col gap-6">
          {filteredQuestions.map((item) => {
            const isMultipleChoice = item.type === "multiple-choice";

  return (
              <div
                key={item.id}
                className="w-full rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8"
              >
                {/* Header Card */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                      {item.id}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {isMultipleChoice ? "Multiple Choice" : "Written Response"}
                    </span>
                  </div>

                  {/* Status Badge */}
                  {item.status === "correct" && (
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Correct
                    </span>
                  )}

                  {item.status === "incorrect" && (
                    <span className="flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Incorrect
                    </span>
                  )}

                  {item.status === "review" && (
                    <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Needs Self-Review
                    </span>
                  )}
                </div>

                {/* Question Content */}
                <div className="pt-5">
                  <h3 className="text-lg font-medium text-slate-900 sm:text-xl">
                    {item.question}
                  </h3>

                  {/* MULTIPLE CHOICE DISPLAY */}
                  {isMultipleChoice && item.options && (
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {item.options.map((option) => {
                        const isSelected = item.userAnswer === option;
                        const isCorrectOption = item.correctAnswer === option;

                        let style = "border-slate-200 bg-white text-slate-700";
                        let badgeText = null;

                        if (isCorrectOption) {
                          style = "border-emerald-500 bg-emerald-50/60 text-emerald-900 font-semibold ring-1 ring-emerald-500";
                          badgeText = "Correct Answer";
                        } else if (isSelected && !isCorrectOption) {
                          style = "border-rose-400 bg-rose-50/60 text-rose-900 font-medium";
                          badgeText = "Your Answer";
                        }

                        return (
                          <div
                            key={option}
                            className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 transition-all ${style}`}
                          >
                            <span className="text-sm sm:text-base">{option}</span>
                            {badgeText && (
                              <span
                                className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
                                  isCorrectOption
                                    ? "bg-emerald-600 text-white"
                                    : "bg-rose-600 text-white"
                                }`}
                              >
                                {badgeText}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* WRITTEN RESPONSE DISPLAY */}
                  {!isMultipleChoice && (
                    <div className="mt-5 flex flex-col gap-4">
                      {/* User's Written Answer */}
                      <div className="rounded-2xl border border-slate-200 bg-[#f9fbff] p-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Your Answer
                        </span>
                        <p className="mt-1.5 text-sm font-medium text-slate-800 leading-relaxed">
                          "{item.userAnswer}"
                        </p>
                      </div>

                      {/* Correct / Sample Answer */}
                      <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                          Sample / Ideal Answer
                        </span>
                        <p className="mt-1.5 text-sm font-semibold text-emerald-950 leading-relaxed">
                          {item.sampleAnswer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center pt-4">
          <button
            type="button"
            onClick={() => navigate('/lessons')}
            className="rounded-2xl bg-[#4f6ef7] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(79,110,247,0.24)] transition hover:bg-[#3f5fe0]"
          >
            Return to Lesson
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResultPractice;
