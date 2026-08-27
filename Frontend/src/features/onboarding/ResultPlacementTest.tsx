import React from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/store/useAuthStore";

interface TestDetail {
  questionNumber: number;
  level: string;
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation?: string;
}

interface PlacementResult {
  status: string;
  assignedLevel: string;
  recommendation: string;

  meta: {
    totalQuestions: number;
    totalCorrect: number;
    percentage: number;
    userId: number;
  };

  feedback: {
    title: string;
    message: string;
  };

  testDetails: TestDetail[];
}

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result as PlacementResult;

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setAuthSession = useAuthStore((state) => state.setAuthSession);
  const markOnboardingCompleted = useAuthStore(
    (state) => state.markOnboardingCompleted,
  );

  if (!result) {
    return <Navigate to="/placement-test" replace />;
  }

  const incorrectQuestions = result.testDetails.filter(
    (question) => !question.isCorrect,
  );

  const avatarLetter = user?.name?.charAt(0).toUpperCase() ?? "U";

  console.log(result);
  console.log(result.testDetails);

  const handleStudyNow = () => {
    if (user) {
      const updatedUser = {
        ...user,
        currentLevel: result.assignedLevel,
        hasCompletedOnboarding: true,
      };
      setAuthSession(updatedUser, token || "");
    } else {
      markOnboardingCompleted();
    }
    navigate("/dashboard");
  };
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================= HEADER ================= */}
      <header className="border-b border-[#C2C6D6] bg-[#F9F9FF] shadow-sm">
        <div className="flex items-center justify-between px-12 py-4">
          <span className="text-[24px] font-bold leading-[32px] text-[#0058BE]">
            Studify
          </span>

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
      </header>

      <div className="flex">
        {/* ================= SIDEBAR ================= */}
        <aside className="w-64 border-r bg-indigo-50 p-4 lg:block">
          <nav className="space-y-2">
            <button className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-white shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9 18C6.7 18 4.69583 17.2375 2.9875 15.7125C1.27917 14.1875 0.3 12.2833 0.05 10H2.1C2.33333 11.7333 3.10417 13.1667 4.4125 14.3C5.72083 15.4333 7.25 16 9 16C10.95 16 12.6042 15.3208 13.9625 13.9625C15.3208 12.6042 16 10.95 16 9C16 7.05 15.3208 5.39583 13.9625 4.0375C12.6042 2.67917 10.95 2 9 2C7.85 2 6.775 2.26667 5.775 2.8C4.775 3.33333 3.93333 4.06667 3.25 5H6V7H0V1H2V3.35C2.85 2.28333 3.8875 1.45833 5.1125 0.875C6.3375 0.291667 7.63333 0 9 0C10.25 0 11.4208 0.2375 12.5125 0.7125C13.6042 1.1875 14.5542 1.82917 15.3625 2.6375C16.1708 3.44583 16.8125 4.39583 17.2875 5.4875C17.7625 6.57917 18 7.75 18 9C18 10.25 17.7625 11.4208 17.2875 12.5125C16.8125 13.6042 16.1708 14.5542 15.3625 15.3625C14.5542 16.1708 13.6042 16.8125 12.5125 17.2875C11.4208 17.7625 10.25 18 9 18ZM11.8 13.2L8 9.4V4H10V8.6L13.2 11.8L11.8 13.2Z"
                  fill="#FEFCFF"
                />
              </svg>

              <span className="text-sm font-semibold">Review</span>
            </button>

            {/* Study Now */}
            <button
              onClick={handleStudyNow}
              className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    border
                    border-[#C2C6D6]
                    bg-white
                    px-4
                    py-3
                    text-[#151C27]
                    shadow-sm
                    transition
                    hover:bg-[#F0F3FF]
                "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M0 8V0H8V8H0ZM0 18V10H8V18H0ZM10 8V0H18V8H10ZM10 18V10H18V18H10ZM2 6H6V2H2V6ZM12 6H16V2H12V6ZM12 16H16V12H12V16ZM2 16H6V12H2V16Z"
                  fill="#2170E4"
                />
              </svg>

              <span className="text-sm font-semibold">Study Now</span>
            </button>
          </nav>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 bg-[#F9F9FF]">
          <div className="mx-auto max-w-[1000px] p-6">
            {/* Result Summary */}
            <section
              className="
                        relative
                        overflow-hidden
                        rounded-xl
                        border
                        border-[#C2C6D6]
                        bg-white
                        p-12
                        shadow-sm
                        "
            >
              <div
                className="
                absolute
                -top-16
                right-0
                h-64
                w-64
                rounded-full
                bg-[#0058BE]/5
                blur-3xl
            "
              />
              <div className="flex flex-col gap-8 lg:flex-row">
                {/* Score */}
                {(() => {
                  const progress = result.meta.percentage ?? 0;
                  const radius = 52;
                  const circumference = 2 * Math.PI * radius;
                  const offset =
                    circumference - (progress / 100) * circumference;

                  return (
                    <div className="relative flex h-48 w-48 items-center justify-center">
                      <svg
                        className="absolute inset-0 h-full w-full"
                        viewBox="0 0 120 120"
                      >
                        <circle
                          cx="60"
                          cy="60"
                          r="52"
                          className="fill-none stroke-[#DCE2F3] stroke-[12]"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="52"
                          className="fill-none stroke-[#0058BE] stroke-[12]"
                          strokeLinecap="round"
                          style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: offset,
                            transform: "rotate(-90deg)",
                            transformOrigin: "center",
                          }}
                        />
                      </svg>

                      <div className="relative text-center">
                        <h2 className="text-5xl font-bold text-[#151C27]">
                          {result.meta.totalCorrect}/
                          {result.meta.totalQuestions}
                        </h2>
                        <p className="text-sm font-semibold text-[#424754]">
                          Correct
                        </p>
                        <p className="mt-2 text-lg font-bold text-sky-700">
                          {result.meta.percentage}%
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* User Level */}
                <div className="flex-1">
                  <span
                    className="
  inline-flex
  items-center
  rounded-full
  bg-[#0058BE]
  px-4
  py-1.5
  text-sm
  font-semibold
  text-white
"
                  >
                    {result.assignedLevel}
                  </span>

                  <h2
                    className="
    mt-4
    text-[32px]
    font-bold
    leading-10
    text-[#151C27]
  "
                  >
                    {result.feedback.title}
                  </h2>

                  <p className="mt-4 max-w-2xl text-gray-600">
                    {result.feedback.message}
                  </p>
                  <div
                    className="
    mt-6
    rounded-xl
    border
    border-[#A3670033]
    bg-[#A367001A]
    p-6
  "
                  >
                    <h4 className="mb-2 font-semibold text-[#151C27]">
                      Recommendation
                    </h4>

                    <p className="text-[#424754]">{result.recommendation}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ================= AREAS FOR GROWTH ================= */}
            <section className="mt-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Areas for Growth</h3>

                <span className="text-sm text-gray-500">
                  {incorrectQuestions.length} Incorrect Responses
                </span>
              </div>

              <div className="flex flex-col gap-6">
                {incorrectQuestions.map((item) => (
                  <QuestionCard key={item.questionNumber} question={item} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

interface QuestionCardProps {
  question: TestDetail;
}

/**
 * Hiển thị một câu trả lời sai cùng lời giải thích
 */
const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <div
      className="
    overflow-hidden
    rounded-xl
    border
    border-[#C2C6D6]
    bg-white
    shadow-sm
  "
    >
      {/* Header */}
      <div
        className="
    border-b
    border-[#C2C6D6]
    bg-[#F0F3FF4D]
    p-6
  "
      >
        <p
          className="
    text-xs
    font-medium
    uppercase
    tracking-[0.6px]
    text-[#0058BE]
  "
        >
          QUESTION {question.questionNumber} • {question.level}
        </p>

        <h4
          className="
    mt-2
    text-base
    font-semibold
    text-[#151C27]
  "
        >
          {question.questionText}
        </h4>
      </div>

      {/* Content */}
      <div className="space-y-4 p-6">
        <div className="flex flex-col gap-4">
          {/* User Answer */}
          <div
            className="
    rounded-lg
    border
    border-[#BA1A1A1A]
    bg-[#FFDAD633]
    p-4
  "
          >
            <p className="text-xs font-bold text-[#BA1A1A]">YOUR ANSWER</p>

            <p>{question.userAnswer}</p>
          </div>

          {/* Correct Answer */}
          <div
            className="
    rounded-lg
    border
    border-[#006C491A]
    bg-[#6CF8BB33]
    p-4
  "
          >
            <p className="text-xs font-bold text-[#006C49]">CORRECT ANSWER</p>

            <p>{question.correctAnswer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
