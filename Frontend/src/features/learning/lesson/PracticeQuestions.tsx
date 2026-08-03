import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type QuestionView = "multiple-choice" | "written";

interface QuestionItem {
  id: number;
  type: QuestionView;
  question: string;
  options?: string[];
}

const questions: QuestionItem[] = [
  {
    id: 1,
    type: "multiple-choice",
    question:
      '"If you want to succeed in the meeting, you\'ll need to ________ your ideas clearly."',
    options: ["lay out", "set up", "put off", "call off"],
  },
  {
    id: 2,
    type: "written",
    question:
      '"How would you politely decline a coffee invitation while mentioning you have a meeting?"',
  },
  {
    id: 3,
    type: "multiple-choice",
    question:
      '"She decided to ________ the job offer because the salary was too low."',
    options: ["turn down", "take up", "look into", "bring about"],
  },
  {
    id: 4,
    type: "written",
    question:
      '"Describe your main career goals for the next five years in two sentences."',
  },
  {
    id: 5,
    type: "multiple-choice",
    question:
      '"We need to ________ a new strategy to increase our monthly active users."',
    options: ["come up with", "run out of", "look back on", "keep up with"],
  },
  {
    id: 6,
    type: "written",
    question:
      '"Write a professional greeting line for an email to a potential project partner."',
  },
  {
    id: 7,
    type: "multiple-choice",
    question:
      '"The manager asked us to ________ the report before the weekend deadline."',
    options: ["go over", "hand in", "break down", "set aside"],
  },
  {
    id: 8,
    type: "written",
    question:
      '"How would you explain a complex technical bug to a non-technical stakeholder?"',
  },
  {
    id: 9,
    type: "multiple-choice",
    question:
      '"I am really looking forward to ________ working with you on this campaign."',
    options: ["starting to", "get to", "proceeding", "begun"],
  },
  {
    id: 10,
    type: "written",
    question:
      '"Summarize what constructive feedback means to you in your own words."',
  },
];

export const PracticeQuestions: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [currentQuestionIndex],
  );

  const currentQuestionNumber = currentQuestionIndex + 1;
  const progressPercentage = (
    (currentQuestionNumber / questions.length) *
    100
  ).toFixed(0);

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handleSubmitAnswer = () => {
    const answer = answers[currentQuestion.id]?.trim();

    if (!answer) {
      showNotification(
        "error",
        "Please enter or select an answer before submitting.",
      );
      return;
    }

    console.log(currentQuestion.id, answer);

    showNotification("success", "Answer submitted successfully.");
  };

  const handleFinish = () => {
    const unanswered = questions.filter(
      (q) => !answers[q.id] || answers[q.id].trim() === "",
    );

    if (unanswered.length > 0) {
      showNotification(
        "error",
        `You still have ${unanswered.length} unanswered question(s).`,
      );
      return;
    }

    console.log("Submit all answers:", answers);

    showNotification("success", "Practice submitted successfully.");

    setTimeout(() => {
      navigate("/lessons/practice/result");
    }, 1200);
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      {notification && (
        <div className="fixed top-6 z-[9999] right-6 z-50 animate-fade-in">
          <div
            className={`min-w-[320px] rounded-xl px-5 py-4 shadow-lg border flex items-center gap-3
      ${
        notification.type === "success"
          ? "bg-green-50 border-green-300 text-green-700"
          : "bg-red-50 border-red-300 text-red-700"
      }`}
          >
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6">
        <div className="w-full max-w-3xl text-left">
          <p className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">
            Question {currentQuestionNumber} of {questions.length}
          </p>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[#4f6ef7] transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="w-full rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 pb-5">
            <span className="rounded-full bg-[#eaf2ff] px-3 py-1 text-sm font-semibold text-[#315dc7]">
              B2 Level
            </span>
            <span className="text-sm text-slate-500">•</span>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="font-medium">Question type</span>
            </div>
          </div>

          <div className="pt-6">
            {currentQuestion.type === "multiple-choice" ? (
              <div className="flex flex-col gap-6">
                <h2
                  className="text-2xl font-black leading-snug text-black opacity-100 sm:text-[1.75rem]"
                  style={{ color: "#000000", opacity: 1, fontWeight: 400 }}
                >
                  {currentQuestion.question}
                </h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {currentQuestion.options?.map((option) => {
                    const selected = answers[currentQuestion.id] === option;

                    return (
                      <label
                        key={option}
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentQuestion.id]: option,
                          }))
                        }
                        className={`flex cursor-pointer items-center justify-between rounded-2xl px-4 py-4 shadow-sm transition-all
      ${
        selected
          ? "border-blue-600 bg-blue-50"
          : "border-slate-200 bg-white hover:border-[#dfe7ff]"
      }`}
                      >
                        <span className="text-base font-medium text-slate-700">
                          {option}
                        </span>

                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2
        ${selected ? "border-blue-600 bg-blue-600" : "border-slate-300"}`}
                        >
                          {selected && (
                            <span className="h-2.5 w-2.5 rounded-full bg-white" />
                          )}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <h2
                  className="text-2xl font-black leading-snug text-black opacity-100 sm:text-[1.75rem]"
                  style={{ color: "#000000", opacity: 1, fontWeight: 400 }}
                >
                  {currentQuestion.question}
                </h2>

                <textarea
                  value={answers[currentQuestion.id] ?? ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id]: e.target.value,
                    }))
                  }
                  className="min-h-[220px] w-full rounded-2xl border border-slate-200 bg-[#f9fbff] px-4 py-4 text-base text-slate-700 outline-none ring-0 transition focus:border-[#4f6ef7] focus:bg-white"
                  placeholder="Type your answer here..."
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={handleSubmitAnswer}
                    className="rounded-2xl bg-[#4f6ef7] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(79,110,247,0.24)] transition hover:bg-[#3f5fe0]"
                  >
                    Submit Answer
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 stroke-current"
                      fill="none"
                      strokeWidth="1.8"
                    >
                      <path
                        d="M10 4.5a3 3 0 0 1 4.24 0l.88.88a3 3 0 0 1 .9 1.85l.07.36a2 2 0 0 0 1.4 1.53l.35.13a2 2 0 0 1 1.2 2.3l-.36 1.6a2 2 0 0 1-1.1 1.35l-.47.24a2 2 0 0 0-1.03 1.82v.74a1 1 0 0 1-1.62.78l-1.24-1.02a2 2 0 0 0-2.5 0l-1.24 1.02A1 1 0 0 1 8.5 18.4v-.74a2 2 0 0 0-1.03-1.82l-.47-.24a2 2 0 0 1-1.1-1.35l-.36-1.6a2 2 0 0 1 1.2-2.3l.35-.13a2 2 0 0 0 1.4-1.53l.07-.36a3 3 0 0 1 .9-1.85l.88-.88Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Get Hint
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous Question
              </button>
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(34,197,94,0.25)] transition hover:bg-green-700"
                >
                  Finish Practice
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-2xl bg-[#4f6ef7] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(79,110,247,0.24)] transition hover:bg-[#3f5fe0]"
                >
                  Next Question
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          {questions.map((question, index) => {
            const isActive = index === currentQuestionIndex;
            return (
              <button
                key={question.id}
                type="button"
                onClick={() => setCurrentQuestionIndex(index)}
                aria-label={`Go to question ${index + 1}`}
                className={`transition-all ${
                  isActive
                    ? "h-2.5 w-8 rounded-full bg-[#4f6ef7]"
                    : "h-2.5 w-2.5 rounded-full bg-[#cdd7f3] hover:bg-[#b8c8f6]"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PracticeQuestions;
