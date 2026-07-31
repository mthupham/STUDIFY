import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../auth/store/useAuthStore";
import { useNavigate } from "react-router-dom";

interface PlacementTestProps {
  selectedPace?: number | string | null;
  onComplete?: (result: any) => void;
}

interface Question {
  questionNumber: number;
  level: string;
  question: string;
  options: Record<string, string>; // { A: "...", B: "...", C: "...", D: "..." }
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export default function PlacementTest({ selectedPace }: PlacementTestProps) {
  const token = useAuthStore((s) => s.token);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  // answers keyed by questionNumber, value là chữ cái đáp án ('A' | 'B' | 'C' | 'D')
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const TEST_DURATION = 15 * 60; // 15 phút = 900 giây
  const [timeRemaining, setTimeRemaining] = useState(TEST_DURATION);

  const { user } = useAuthStore();
  const avatarLetter = user?.name?.charAt(0).toUpperCase() ?? "U";

  // Tải câu hỏi thật từ backend khi component mount
  useEffect(() => {
    let cancelled = false;

    async function loadQuestions() {
      setLoadingQuestions(true);
      setLoadError(null);
      try {
        const { data } = await axios.get(
          `${API_BASE}/placement-test/questions`,
        );
        if (!cancelled) {
          setQuestions(data.questions || []);
        }
      } catch {
        if (!cancelled) {
          setLoadError("Không thể tải đề thi. Vui lòng thử lại.");
        }
      } finally {
        if (!cancelled) {
          setLoadingQuestions(false);
        }
      }
    }

    loadQuestions();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      handleSubmit(true);
    }
  }, [timeRemaining]);

  const currentQuestion = questions[currentIndex];
  const selectedChoice = currentQuestion
    ? (answers[currentQuestion.questionNumber] ?? null)
    : null;

  const handleSelectChoice = (key: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.questionNumber]: key }));
  };

  const goToQuestion = (index: number) => {
    if (index < 0 || index > questions.length - 1) return;
    setCurrentIndex(index);
  };

  const handleSubmit = async (force = false) => {
    if (!token) {
      setSubmitError("Please login again.");
      return;
    }
    const unansweredCount = questions.length - Object.keys(answers).length;

    if (!force && unansweredCount > 0) {
      setSubmitError(
        `You still have ${unansweredCount} unanswered question${
          unansweredCount > 1 ? "s" : ""
        }.`,
      );
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      if (!token) {
        setSubmitError("Please login again.");
        return;
      }
      console.log("Selected pace:", selectedPace);
      const { data } = await axios.post(
        `${API_BASE}/placement-test/submit`,
        {
          answers,
          weeklyStudyHours: Number(selectedPace),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Placement Test Result:", data);
      navigate("/placement-result", {
        state: {
          result: data,
          selectedPace,
        },
      });
    } catch {
      setSubmitError("Cannot submit test. Please try again");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingQuestions) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg font-medium">Đang tải đề thi...</p>
      </div>
    );
  }

  if (loadError || questions.length === 0) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-rose-700 text-lg font-medium">
          {loadError || "Không có câu hỏi nào."}
        </p>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col font-inter selection:bg-indigo-100">
      {/* HEADER */}
      <header className="w-full bg-slate-50 border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sky-700 text-2xl font-bold tracking-tight">
              Studify
            </span>
            <div className="w-px h-8 bg-slate-300 hidden sm:block" />
            <div className="hidden sm:flex flex-col justify-start">
              <span className="text-gray-900 text-sm font-semibold leading-5">
                {answeredCount}/{questions.length} answered
              </span>
              <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-sky-700 rounded-full"
                  style={{
                    width: `${
                      questions.length
                        ? (answeredCount / questions.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`px-3 py-1.5 rounded-lg flex items-center gap-2 ${
                timeRemaining <= 60
                  ? "bg-red-100 text-red-700"
                  : "bg-indigo-100 text-sky-700"
              }`}
            >
              <span className="font-semibold text-sm">
                {formatTime(timeRemaining)}
              </span>
            </div>

            <div
              className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        border-[#2170E4]
                        bg-[#EAF2FF]
                        text-sm
                        font-bold
                        text-[#0058BE]
                    "
            >
              {avatarLetter}
            </div>
          </div>
        </div>
      </header>

      <div className="w-full max-w-[1440px] mx-auto flex flex-1 relative">
        {/* MAIN CANVAS */}
        <main className="flex-1 p-6 lg:p-12 flex flex-col lg:flex-row justify-center items-start gap-8 overflow-y-auto">
          <div className="w-full max-w-[896px] flex flex-col gap-6">
            <div className="w-full p-6 sm:p-8 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-6">
              <div className="w-full flex justify-between items-center border-b border-slate-100 pb-4">
                <div className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                  Question {currentIndex + 1} of {questions.length}
                </div>
              </div>

              <div className="w-full flex flex-col gap-3">
                <h1
                  className="text-1xl sm:text-2xl font-semibold leading-relaxed"
                  style={{ color: "#1e293b" }}
                >
                  {currentQuestion.question}
                </h1>
              </div>

              <div className="w-full flex flex-col gap-3">
                {Object.entries(currentQuestion.options).map(([key, text]) => {
                  const isSelected = selectedChoice === key;

                  return (
                    <label
                      key={key}
                      className={`w-full min-h-16 p-4 rounded-xl inline-flex items-center cursor-pointer transition-all ${
                        isSelected
                          ? "bg-indigo-50 border-2 border-sky-700 shadow-sm"
                          : "border border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.questionNumber}`}
                        value={key}
                        checked={isSelected}
                        onChange={() => handleSelectChoice(key)}
                        className="hidden"
                      />

                      {/* Radio custom */}
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex justify-center items-center flex-shrink-0 ${
                          isSelected ? "border-sky-700" : "border-slate-300"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full transition-all ${
                            isSelected ? "bg-sky-700 opacity-100" : "opacity-0"
                          }`}
                        />
                      </div>

                      <div className="pl-4">
                        <span
                          className={`text-lg leading-7 ${
                            isSelected
                              ? "text-gray-900 font-semibold"
                              : "text-gray-900 font-normal"
                          }`}
                        >
                          {key}) {text}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* QUESTION MAP */}
          <div className="w-full lg:w-80 flex flex-col gap-6 flex-shrink-0">
            <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
              <h3 className="text-gray-700 text-xs font-bold uppercase tracking-wider">
                Question Map
              </h3>

              <div className="grid grid-cols-5 gap-2 w-full">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = answers[q.questionNumber] !== undefined;
                  let classes =
                    "border border-rose-300 bg-rose-100 text-rose-800"; // pending
                  if (isCurrent) {
                    classes =
                      "bg-sky-700 text-white ring-4 ring-blue-100 shadow-md";
                  } else if (isAnswered) {
                    classes =
                      "bg-emerald-100 text-emerald-700 border border-emerald-600";
                  }
                  return (
                    <button
                      key={q.questionNumber}
                      type="button"
                      onClick={() => goToQuestion(idx)}
                      className={`h-9 font-bold rounded-lg flex justify-center items-center text-base ${classes}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

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
            {submitError && (
              <div className="px-0 md:px-4 pb-4">
                <div className="max-w-[1440px] mx-auto">
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {submitError}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* FOOTER CONTROLS */}

      <footer className="w-full bg-slate-50 border-t border-slate-200 sticky bottom-0 z-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <button
            onClick={() => goToQuestion(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="px-5 py-2.5 border border-slate-300 hover:bg-slate-100 disabled:opacity-50 text-gray-700 font-bold rounded-xl text-sm flex items-center gap-2 transition-all"
          >
            <span>Previous Question</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => goToQuestion(currentIndex + 1)}
              disabled={currentIndex === questions.length - 1}
              className="px-6 py-2.5 bg-sky-700 hover:bg-sky-800 disabled:opacity-50 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-sm transition-all"
            >
              <span>Next Question</span>
            </button>
            <button
              onClick={() => handleSubmit()}
              disabled={submitting}
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-60 text-white font-bold rounded-xl text-sm shadow-sm transition-all"
            >
              {submitting ? "Submitting..." : "Submit Test"}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
