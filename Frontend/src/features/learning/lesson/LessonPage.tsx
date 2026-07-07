import { LessonCard } from "./LessonCard";
import type { LessonProps } from "./LessonCard";
import { TheoryCard } from "./TheoryCard";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TheoryDetail } from "./TheoryDetail";

// Dữ liệu giả lập
const skillSections = [
  {
    id: "reading",
    title: "Reading skill",
    completedText: "1/5 completed",
    icon: "book",
    lessons: [
      {
        id: "reading-1",
        title: "Lesson 1: Name",
        description: "Brief description",
        status: "completed",
        statusText: "COMPLETED",
      } as LessonProps,
      {
        id: "reading-2",
        title: "Lesson 2: Name",
        description: "Brief description",
        status: "ongoing",
        statusText: "ON GOING (40%)",
        progress: 40,
        highlight: true,
      } as LessonProps,
      {
        id: "reading-3",
        title: "Lesson 3: Name",
        description: "Brief description",
        status: "locked",
        statusText: "LOCKED",
      } as LessonProps,
    ],
  },
  {
    id: "writing",
    title: "Writing skill",
    completedText: "1/5 completed",
    icon: "pen",
    lessons: [
      {
        id: "writing-1",
        title: "Lesson 1: Name",
        description: "Brief description",
        status: "completed",
        statusText: "COMPLETED",
      } as LessonProps,
      {
        id: "writing-2",
        title: "Lesson 2: Name",
        description: "Brief description",
        status: "ongoing",
        statusText: "ON GOING (40%)",
        progress: 40,
        highlight: true,
      } as LessonProps,
      {
        id: "writing-3",
        title: "Lesson 3: Name",
        description: "Brief description",
        status: "locked",
        statusText: "LOCKED",
      } as LessonProps,
    ],
  },
];

export default function LessonPage() {
  const [viewMode, setViewMode] = useState<"list" | "theory-detail">("list");
  const navigate = useNavigate();

  // Nếu click Review, render giao diện chi tiết lý thuyết
  if (viewMode === "theory-detail") {
    return <TheoryDetail onBack={() => setViewMode("list")} />;
  }

  return (
    <div className="w-full min-h-screen bg-[#faf8ff] p-4 md:p-8">
      <section className="w-full max-w-6xl mx-auto flex flex-col gap-6">
        <h1 className="text-slate-900 text-3xl md:text-[42px] font-semibold leading-tight tracking-tight m-0">
          Lesson
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 items-start">
          {/* Cột trái: Danh sách kỹ năng và timeline */}
          <div className="flex flex-col gap-8">
            {skillSections.map((section) => (
              <section key={section.id} className="flex flex-col gap-4">
                <header className="flex items-center gap-3">
                  <span className="w-10 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    {/* SVG Icon tùy theo môn */}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-none stroke-current stroke-2"
                    >
                      {section.icon === "pen" ? (
                        <path
                          d="M4 16.5V20h3.5L18 9.5L14.5 6L4 16.5Z M13 7.5L16.5 11"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      ) : (
                        <path
                          d="M4 6.5C4 5.7 4.7 5 5.5 5H10.5C11.3 5 12 5.7 12 6.5V18H5.5C4.7 18 4 17.3 4 16.5V6.5Z M12 6.5C12 5.7 12.7 5 13.5 5H18.5C19.3 5 20 5.7 20 6.5V16.5C20 17.3 19.3 18 18.5 18H12V6.5Z M7 9H9 M15 9H17"
                          strokeLinecap="round"
                        />
                      )}
                    </svg>
                  </span>
                  <h2 className="text-slate-900 text-2xl md:text-[30px] font-semibold m-0">
                    {section.title}
                  </h2>
                  <span className="ml-auto rounded-full bg-blue-100 text-slate-600 text-xs font-semibold px-3 py-1">
                    {section.completedText}
                  </span>
                </header>

                <div className="relative flex flex-col gap-4 pl-0 md:pl-5">
                  {/* Đường Timeline dọc */}
                  <span className="hidden md:block absolute left-[18px] top-0 bottom-0 w-1 rounded-full bg-indigo-100" />

                  {/* Bài 1 */}
                  <div className="relative w-full">
                    <LessonCard
                      {...section.lessons[0]}
                      onClick={() => navigate("/lessons/practice")}
                    />
                  </div>

                  {/* Bài 2 (Kèm Marker Mũi tên) */}
                  <div className="relative w-full md:pl-14">
                    <LessonCard
                      {...section.lessons[1]}
                      onClick={() => navigate("/lessons/practice")}
                    />
                    <span className="hidden md:flex absolute -left-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 border-[#faf8ff] bg-blue-600 text-white z-20 items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M8 6L18 12L8 18V6Z" />
                      </svg>
                    </span>
                  </div>

                  {/* Bài 3 (Kèm Marker Ổ khóa) */}
                  <div className="relative w-full md:pl-14">
                    <LessonCard
                      {...section.lessons[2]}
                      onClick={() => navigate("/lessons/practice")}
                    />
                    <span className="hidden md:flex absolute -left-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 border-[#faf8ff] bg-slate-300 text-white z-20 items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 fill-none stroke-current stroke-2"
                      >
                        <rect x="5" y="11" width="14" height="9" rx="2" />
                        <path d="M8 11V8C8 5.8 9.8 4 12 4C14.2 4 16 5.8 16 8V11" />
                      </svg>
                    </span>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Cột phải: Theory Card */}
          <aside className="w-full xl:max-w-[420px]">
            <TheoryCard onReview={() => setViewMode("theory-detail")} />
          </aside>
        </div>
      </section>
    </div>
  );
}
