import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../auth/store/useAuthStore";
import ProgressBar from "../../../components/ProgressBar";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const [roadmap, setRoadmap] = useState(null); // { assignedLevel, levelTitle, chapters }
  const [loadingRoadmap, setLoadingRoadmap] = useState(true);
  const [roadmapError, setRoadmapError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRoadmap() {
      setLoadingRoadmap(true);
      setRoadmapError(null);
      try {
        const { data } = await axios.get(`${API_BASE}/placement-test/my-roadmap`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!cancelled) {
          setRoadmap(data.data);
        }
      } catch (err) {
        if (!cancelled) {
          setRoadmapError("Không thể tải lộ trình học.");
        }
      } finally {
        if (!cancelled) {
          setLoadingRoadmap(false);
        }
      }
    }

    if (token) {
      loadRoadmap();
    }
    return () => {
      cancelled = true;
    };
  }, [token]);

  // Lấy danh sách bài học thật từ chương đầu tiên của lộ trình để thay cho mock "tasks"
  const firstChapter = roadmap?.chapters?.[0];
  const realTasks = firstChapter?.lessons ?? [];

  return (
    /* MAIN CONTENT CANVAS: Toàn bộ vùng hiển thị chính của Dashboard */
    <div className="inline-flex min-h-[1088px] w-full max-w-[1536px] flex-col items-start justify-start gap-8 px-8 pb-32 pt-8 font-['Inter',_sans-serif]">
      {/* WELCOME SECTION: Banner chào mừng người dùng lấy từ AuthStore */}
      <div className="relative flex w-full flex-col items-start justify-start overflow-hidden rounded-2xl bg-gradient-to-r from-sky-700 to-blue-600 p-8 shadow-lg">
        <div className="absolute right-4 top-2 pointer-events-none opacity-25">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="180"
            height="180"
            viewBox="0 0 300 300"
            fill="none"
          >
            <path
              d="M225 93L209.375 58.625L175 43L209.375 27.375L225 -7L240.625 27.375L275 43L240.625 58.625L225 93ZM225 268L209.375 233.625L175 218L209.375 202.375L225 168L240.625 202.375L275 218L240.625 233.625L225 268ZM100 230.5L68.75 161.75L0 130.5L68.75 99.25L100 30.5L131.25 99.25L200 130.5L131.25 161.75L100 230.5ZM100 169.875L112.5 143L139.375 130.5L112.5 118L100 91.125L87.5 118L60.625 130.5L87.5 143L100 169.875Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="relative z-10 flex w-full max-w-[672px] flex-col items-start justify-start gap-2">
          <h2
            className="text-3xl font-bold leading-10"
            style={{ color: "#FFFFFF" }}
          >
            Welcome back,{" "}
            <span className="font-bold">{user?.name || "Student"}</span>! 👋
          </h2>
          <p className="text-lg font-normal leading-7 text-white opacity-90">
            You're making incredible progress. Your consistency is paying off,
            keep up the momentum!
          </p>
        </div>
      </div>

      {/* BENTO GRID LAYOUT */}
      <div className="grid w-full grid-cols-1 gap-6 items-start lg:grid-cols-12">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6 lg:col-span-8">
          {/* MASTERY PROGRESS CARD */}
          <div className="flex flex-col gap-8 rounded-2xl border border-slate-300 bg-slate-50 p-8 shadow-sm">
            <div className="flex w-full items-start justify-between">
              <div>
                <span className="text-xs font-bold tracking-wide text-gray-700 uppercase">
                  CURRENT STANDING
                </span>
                <h3 className="mt-1 text-2xl font-semibold text-gray-900">
                  Mastery Progress
                </h3>
              </div>
              {/* Badge level giờ lấy từ kết quả placement test thật, không còn hardcode B2 */}
              <span className="rounded-full bg-sky-700 px-4 py-1.5 text-sm font-bold text-white">
                {loadingRoadmap
                  ? "..."
                  : roadmap?.assignedLevel
                  ? `${roadmap.assignedLevel} LEVEL`
                  : "N/A"}
              </span>
            </div>

            <div className="flex flex-col gap-6 md:flex-row items-center justify-between">
              <div className="flex w-full flex-col gap-4 md:w-2/3">
                <div className="flex items-center gap-4 rounded-xl border border-slate-300 bg-indigo-50/50 p-4">
                  <div className="rounded-lg bg-emerald-300 p-2 text-emerald-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16" fill="none">
                      <path d="M13 5.9V4.2C13.55 3.96667 14.1125 3.79167 14.6875 3.675C15.2625 3.55833 15.8667 3.5 16.5 3.5C16.9333 3.5 17.3583 3.53333 17.775 3.6C18.1917 3.66667 18.6 3.75 19 3.85V5.45C18.6 5.3 18.1958 5.1875 17.7875 5.1125C17.3792 5.0375 16.95 5 16.5 5C15.8667 5 15.2583 5.07917 14.675 5.2375C14.0917 5.39583 13.5333 5.61667 13 5.9ZM13 11.4V9.7C13.55 9.46667 14.1125 9.29167 14.6875 9.175C15.2625 9.05833 15.8667 9 16.5 9C16.9333 9 17.3583 9.03333 17.775 9.1C18.1917 9.16667 18.6 9.25 19 9.35V10.95C18.6 10.8 18.1958 10.6875 17.7875 10.6125C17.3792 10.5375 16.95 10.5 16.5 10.5C15.8667 10.5 15.2583 10.575 14.675 10.725C14.0917 10.875 13.5333 11.1 13 11.4ZM13 8.65V6.95C13.55 6.71667 14.1125 6.54167 14.6875 6.425C15.2625 6.30833 15.8667 6.25 16.5 6.25C16.9333 6.25 17.3583 6.28333 17.775 6.35C18.1917 6.41667 18.6 6.5 19 6.6V8.2C18.6 8.05 18.1958 7.9375 17.7875 7.8625C17.3792 7.7875 16.95 7.75 16.5 7.75C15.8667 7.75 15.2583 7.82917 14.675 7.9875C14.0917 8.14583 13.5333 8.36667 13 8.65ZM5.5 12C6.28333 12 7.04583 12.0875 7.7875 12.2625C8.52917 12.4375 9.26667 12.7 10 13.05V3.2C9.31667 2.8 8.59167 2.5 7.825 2.3C7.05833 2.1 6.28333 2 5.5 2C4.9 2 4.30417 2.05833 3.7125 2.175C3.12083 2.29167 2.55 2.46667 2 2.7V12.6C2.58333 12.4 3.1625 12.25 3.7375 12.15C4.3125 12.05 4.9 12 5.5 12ZM12 13.05C12.7333 12.7 13.4708 12.4375 14.2125 12.2625C14.9542 12.0875 15.7167 12 16.5 12C17.1 12 17.6875 12.05 18.2625 12.15C18.8375 12.25 19.4167 12.4 20 12.6V2.7C19.45 2.46667 18.8792 2.29167 18.2875 2.175C17.6958 2.05833 17.1 2 16.5 2C15.7167 2 14.9417 2.1 14.175 2.3C13.4083 2.5 12.6833 2.8 12 3.2V13.05ZM11 16C10.2 15.3667 9.33333 14.875 8.4 14.525C7.46667 14.175 6.5 14 5.5 14C4.8 14 4.1125 14.0917 3.4375 14.275C2.7625 14.4583 2.11667 14.7167 1.5 15.05C1.15 15.2333 0.8125 15.225 0.4875 15.025C0.1625 14.825 0 14.5333 0 14.15V2.1C0 1.91667 0.0458333 1.74167 0.1375 1.575C0.229167 1.40833 0.366667 1.28333 0.55 1.2C1.31667 0.8 2.11667 0.5 2.95 0.3C3.78333 0.1 4.63333 0 5.5 0C6.46667 0 7.4125 0.125 8.3375 0.375C9.2625 0.625 10.15 1 11 1.5C11.85 1 12.7375 0.625 13.6625 0.375C14.5875 0.125 15.5333 0 16.5 0C17.3667 0 18.2167 0.1 19.05 0.3C19.8833 0.5 20.6833 0.8 21.45 1.2C21.6333 1.28333 21.7708 1.40833 21.8625 1.575C21.9542 1.74167 22 1.91667 22 2.1V14.15C22 14.5333 21.8375 14.825 21.5125 15.025C21.1875 15.225 20.85 15.2333 20.5 15.05C19.8833 14.7167 19.2375 14.4583 18.5625 14.275C17.8875 14.0917 17.2 14 16.5 14C15.5 14 14.5333 14.175 13.6 14.525C12.6667 14.875 11.8 15.3667 11 16Z" fill="#00714D" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-gray-700 block">Active Lesson</span>
                    <span className="text-base font-medium text-gray-900">
                      {firstChapter?.chapterTitle || "—"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-slate-300 bg-indigo-50/50 p-4">
                  <div className="rounded-lg bg-amber-500 p-2 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
                      <path d="M2 11C2 11.8667 2.175 12.6875 2.525 13.4625C2.875 14.2375 3.375 14.9167 4.025 15.5C4.00833 15.4167 4 15.3417 4 15.275C4 15.2083 4 15.1333 4 15.05C4 14.5167 4.1 14.0167 4.3 13.55C4.5 13.0833 4.79167 12.6583 5.175 12.275L8 9.5L10.825 12.275C11.2083 12.6583 11.5 13.0833 11.7 13.55C11.9 14.0167 12 14.5167 12 15.05C12 15.1333 12 15.2083 12 15.275C12 15.3417 11.9917 15.4167 11.975 15.5C12.625 14.9167 13.125 14.2375 13.475 13.4625C13.825 12.6875 14 11.8667 14 11C14 10.1667 13.8458 9.37917 13.5375 8.6375C13.2292 7.89583 12.7833 7.23333 12.2 6.65C11.8667 6.86667 11.5167 7.02917 11.15 7.1375C10.7833 7.24583 10.4083 7.3 10.025 7.3C8.99167 7.3 8.09583 6.95833 7.3375 6.275C6.57917 5.59167 6.14167 4.75 6.025 3.75C5.375 4.3 4.8 4.87083 4.3 5.4625C3.8 6.05417 3.37917 6.65417 3.0375 7.2625C2.69583 7.87083 2.4375 8.49167 2.2625 9.125C2.0875 9.75833 2 10.3833 2 11ZM8 12.3L6.575 13.7C6.39167 13.8833 6.25 14.0917 6.15 14.325C6.05 14.5583 6 14.8 6 15.05C6 15.5833 6.19583 16.0417 6.5875 16.425C6.97917 16.8083 7.45 17 8 17C8.55 17 9.02083 16.8083 9.4125 16.425C9.80417 16.0417 10 15.5833 10 15.05C10 14.7833 9.95 14.5375 9.85 14.3125C9.75 14.0875 9.60833 13.8833 9.425 13.7L8 12.3ZM8 0V3.3C8 3.86667 8.19583 4.34167 8.5875 4.725C8.97917 5.10833 9.45833 5.3 10.025 5.3C10.325 5.3 10.6042 5.2375 10.8625 5.1125C11.1208 4.9875 11.35 4.8 11.55 4.55L12 4C13.2333 4.7 14.2083 5.675 14.925 6.925C15.6417 8.175 16 9.53333 16 11C16 13.2333 15.225 15.125 13.675 16.675C12.125 18.225 10.2333 19 8 19C5.76667 19 3.875 18.225 2.325 16.675C0.775 15.125 0 13.2333 0 11C0 8.85 0.720833 6.80833 2.1625 4.875C3.60417 2.94167 5.55 1.31667 8 0Z" fill="#FFFBFF" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-gray-700 block">Level Title</span>
                    <span className="text-base font-medium text-gray-900">
                      {roadmap?.levelTitle || "—"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative flex h-36 w-36 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" className="text-slate-200" stroke="currentColor" strokeWidth="3" />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="text-sky-700 transition-all duration-500 ease-out"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${firstChapter?.lessons?.[0]?.progress ?? 0} 100.5`}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold tracking-tight text-gray-900">
                    {firstChapter?.lessons?.[0]?.progress ?? 0}%
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase leading-none mt-0.5">
                    COURSE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TODAY'S STUDY PLAN: giờ hiển thị bài học thật từ chương đầu tiên trong lộ trình */}
          <div className="flex flex-col gap-6 rounded-2xl border border-slate-300 bg-slate-50 p-8 shadow-sm">
            <div className="flex w-full items-center justify-between">
              <h3 className="text-2xl font-semibold text-gray-900">
                Today's Study Plan
              </h3>
              <button className="flex items-center gap-2 font-medium text-sky-700 transition hover:text-sky-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13" fill="none">
                  <path d="M3.5 1.16667V0H7V1.16667H3.5ZM4.66667 7.58333H5.83333V4.08333H4.66667V7.58333ZM5.25 12.25C4.53056 12.25 3.85243 12.1115 3.21563 11.8344C2.57882 11.5573 2.02222 11.1806 1.54583 10.7042C1.06944 10.2278 0.692708 9.67118 0.415625 9.03438C0.138542 8.39757 0 7.71944 0 7C0 6.28056 0.138542 5.60243 0.415625 4.96562C0.692708 4.32882 1.06944 3.77222 1.54583 3.29583C2.02222 2.81944 2.57882 2.44271 3.21563 2.16563C3.85243 1.88854 4.53056 1.75 5.25 1.75C5.85278 1.75 6.43125 1.84722 6.98542 2.04167C7.53958 2.23611 8.05972 2.51806 8.54583 2.8875L9.3625 2.07083L10.1792 2.8875L9.3625 3.70417C9.73195 4.19028 10.0139 4.71042 10.2083 5.26458C10.4028 5.81875 10.5 6.39722 10.5 7C10.5 7.71944 10.3615 8.39757 10.0844 9.03438C9.80729 9.67118 9.43056 10.2278 8.95417 10.7042C8.47778 11.1806 7.92118 11.5573 7.28438 11.8344C6.64757 12.1115 5.96944 12.25 5.25 12.25ZM5.25 11.0833C6.37778 11.0833 7.34028 10.6847 8.1375 9.8875C8.93472 9.09028 9.33333 8.12778 9.33333 7C9.33333 5.87222 8.93472 4.90972 8.1375 4.1125C7.34028 3.31528 6.37778 2.91667 5.25 2.91667C4.12222 2.91667 3.15972 3.31528 2.3625 4.1125C1.56528 4.90972 1.16667 5.87222 1.16667 7C1.16667 8.12778 1.56528 9.09028 2.3625 9.8875C3.15972 10.6847 4.12222 11.0833 5.25 11.0833Z" fill="#0058BE" />
                </svg>
                <span className="text-sm">Start Pomodoro</span>
              </button>
            </div>

            <div className="flex flex-col gap-3 w-full">
              {loadingRoadmap && (
                <p className="text-sm text-gray-500">Đang tải lộ trình học...</p>
              )}
              {roadmapError && (
                <p className="text-sm text-rose-700">{roadmapError}</p>
              )}
              {!loadingRoadmap && !roadmapError && realTasks.length === 0 && (
                <p className="text-sm text-gray-500">Chưa có bài học nào.</p>
              )}
              {realTasks.map((lesson) => (
                <div
                  key={lesson.lessonId}
                  className={`flex items-center justify-between rounded-xl border border-slate-300 bg-white p-4 shadow-sm transition ${
                    lesson.status === "LOCKED" ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        lesson.type === "VOCABULARY" ? "bg-blue-100" : "bg-emerald-100"
                      }`}
                    >
                      <span className="text-xs font-bold">
                        {lesson.type === "VOCABULARY" ? "V" : "G"}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900">
                        {lesson.title}
                      </h4>
                      <span className="text-xs text-gray-700">
                        {lesson.status} • {lesson.itemLabel}
                      </span>
                    </div>
                  </div>

                  <button className="rounded-full p-2 text-gray-400 hover:bg-slate-100 hover:text-gray-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: giữ nguyên mock, chưa có API thật cho phần này */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          <div className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-300 bg-slate-50 p-6 shadow-sm">
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-emerald-300/10"></div>
            <div className="flex items-center gap-2">
              <div className="text-emerald-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                  <path d="M14 20V18H18V8H4V12H2V4C2 3.45 2.19583 2.97917 2.5875 2.5875C2.97917 2.19583 3.45 2 4 2H5V0H7V2H15V0H17V2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H14ZM7 22L5.6 20.6L8.175 18H0V16H8.175L5.6 13.4L7 12L12 17L7 22ZM4 6H18V4H4V6ZM4 6V4V6Z" fill="#006C49" />
                </svg>
              </div>
              <h3 className="text-sm font-bold tracking-wide text-gray-700 uppercase">
                GROUP DEADLINES
              </h3>
            </div>

            <div className="flex flex-col gap-2 rounded-xl border border-emerald-800/10 bg-emerald-300/20 p-4">
              <h4 className="text-base font-bold text-emerald-900">
                Peer Review Session
              </h4>
              <p className="text-sm text-emerald-900/80 leading-5">
                Critique the 'Annual Report' drafts with your cohort.
              </p>

              <div className="mt-2 flex items-center justify-between border-t border-emerald-800/10 pt-3">
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M6.65 7.35L7.35 6.65L5.5 4.8V2.5H4.5V5.2L6.65 7.35ZM5 10C4.30833 10 3.65833 9.86875 3.05 9.60625C2.44167 9.34375 1.9125 8.9875 1.4625 8.5375C1.0125 8.0875 0.65625 7.55833 0.39375 6.95C0.13125 6.34167 0 5.69167 0 5C0 4.30833 0.13125 3.65833 0.39375 3.05C0.65625 2.44167 1.0125 1.9125 1.4625 1.4625C1.9125 1.0125 2.44167 0.65625 3.05 0.39375C3.65833 0.13125 4.30833 0 5 0C5.69167 0 6.34167 0.13125 6.95 0.39375C7.55833 0.65625 8.0875 1.0125 8.5375 1.4625C8.9875 1.9125 9.34375 2.44167 9.60625 3.05C9.86875 3.65833 10 4.30833 10 5C10 5.69167 9.86875 6.34167 9.60625 6.95C9.34375 7.55833 8.9875 8.0875 8.5375 8.5375C8.0875 8.9875 7.55833 9.34375 6.95 9.60625C6.34167 9.86875 5.69167 10 5 10ZM5 9C6.10833 9 7.05208 8.61042 7.83125 7.83125C8.61042 7.05208 9 6.10833 9 5C9 3.89167 8.61042 2.94792 7.83125 2.16875C7.05208 1.38958 6.10833 1 5 1C3.89167 1 2.94792 1.38958 2.16875 2.16875C1.38958 2.94792 1 3.89167 1 5C1 6.10833 1.38958 7.05208 2.16875 7.83125C2.94792 8.61042 3.89167 9 5 9Z" fill="#006C49" />
                  </svg>
                  <span>Today, 4:00 PM</span>
                </div>
                <span className="rounded bg-emerald-800 px-2 py-0.5 text-xs font-bold text-white">
                  Urgent
                </span>
              </div>
            </div>
          </div>

          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white shadow-sm">
            <span className="text-sm italic text-gray-400">
              Motivation Content Placeholder
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}