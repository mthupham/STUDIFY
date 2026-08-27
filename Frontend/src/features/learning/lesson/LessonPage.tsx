import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LessonCard } from "./LessonCard";
import { TheoryCard } from "./TheoryCard";
import type { LessonProps, LessonStatus } from "./LessonCard";
import { useAuthStore } from "../../auth/store/useAuthStore";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface ApiLesson {
  lessonId: string;
  title: string;
  type: "VOCABULARY" | "GRAMMAR";
  totalItems: number;
  isCompleted: boolean;
}

interface SkillSection {
  id: string;
  title: string;
  completedText: string;
  icon: "book" | "pen";
  lessons: LessonProps[];
}

function buildSections(
  apiLessons: ApiLesson[],
  completedPracticeIds: string[]
): SkillSection[] {
  const vocab = apiLessons.filter((l) => l.type === "VOCABULARY");

  const toLessonProps = (
    list: ApiLesson[],
    skill: "reading" | "writing"
  ): LessonProps[] => {
    let unlockedOne = false;
    return list.map((lesson) => {
      let status: LessonStatus = "locked";
      let statusText = "LOCKED";

      const skillLessonId = `${lesson.lessonId}_${skill}`;
      const isPracticeCompleted = completedPracticeIds.includes(skillLessonId);

      if (isPracticeCompleted) {
        status = "completed";
        statusText = "COMPLETED";
      } else if (!unlockedOne) {
        status = "ongoing";
        statusText = "ON GOING";
        unlockedOne = true;
      }

      return {
        id: lesson.lessonId,
        title: lesson.title,
        description:
          lesson.type === "VOCABULARY"
            ? `${lesson.totalItems} từ vựng`
            : `${lesson.totalItems} cấu trúc ngữ pháp`,
        status,
        statusText,
      };
    });
  };

  const readingProps = toLessonProps(vocab, "reading");
  const writingProps = toLessonProps(vocab, "writing");
  const countDone = (list: LessonProps[]) =>
    list.filter((l) => l.status === "completed").length;

  return [
    {
      id: "reading",
      title: "Reading skill",
      completedText: `${countDone(readingProps)}/${readingProps.length} completed`,
      icon: "book",
      lessons: readingProps,
    },
    {
      id: "writing",
      title: "Writing skill",
      completedText: `${countDone(writingProps)}/${writingProps.length} completed`,
      icon: "pen",
      lessons: writingProps,
    },
  ];
}

export default function LessonPage() {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const setAuthSession = useAuthStore((s) => s.setAuthSession);

  const [sections, setSections] = useState<SkillSection[]>([]);
  const [level, setLevel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const { data: roadmap } = await axios.get(`${API_BASE}/roadmap`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const assignedLevel = roadmap.assignedLevel || "A1";

        const { data: lessonRes } = await axios.get(
          `${API_BASE}/learning/lessons`,
          {
            params: { level: assignedLevel },
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        // Fetch vocabulary progress to identify completed practices (e.g. A1_T1_reading, A1_T1_writing)
        const { data: progressRes } = await axios.get(
          `${API_BASE}/progress/level/${assignedLevel}/lessons`,
          {
            params: { type: "vocabulary" },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const completedPracticeIds = (progressRes || [])
          .filter((p: any) => p.isCompleted)
          .map((p: any) => p.lessonId);

        if (!cancelled) {
          setLevel(assignedLevel);
          setSections(buildSections(lessonRes.data || [], completedPracticeIds));
        }
      } catch (err) {
        if (!cancelled) setError("Không thể tải danh sách bài học.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    const handleLessonCompleted = () => {
      if (token) {
        void load();
      }
    };

    if (token) load();
    window.addEventListener("lesson-completed", handleLessonCompleted);
    return () => {
      cancelled = true;
      window.removeEventListener("lesson-completed", handleLessonCompleted);
    };
  }, [token]);

  const handleLessonClick = (lessonId?: string, skill?: string) => {
    if (!lessonId) return;

    navigate(`/lessons/practice/${lessonId}?skill=${skill ?? "reading"}`);
  };

  const handleTheoryReview = () => {
    if (level) {
      navigate(`/lesson/${level}/1`);
      return;
    }
    navigate("/lessons");
  };

  const handleNextLevel = async () => {
    if (!level || !token) return;
    const currentIndex = LEVELS.indexOf(level.toUpperCase());
    if (currentIndex === -1 || currentIndex >= LEVELS.length - 1) {
      navigate("/roadmap");
      return;
    }
    const nextLevel = LEVELS[currentIndex + 1];

    try {
      const { data } = await axios.patch(
        `${API_BASE}/user/select-level`,
        { level: nextLevel },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedUser = data?.data || { ...user, currentLevel: nextLevel };
      setAuthSession(updatedUser, token);
      navigate("/roadmap");
    } catch (err) {
      console.error("Failed to select next level:", err);
      navigate("/roadmap");
    }
  };

  // Điều kiện: Kiểm tra tất cả các bài học trong mọi kỹ năng đều đã ở trạng thái "completed"
  const isAllCompleted =
    sections.length > 0 &&
    sections.every(
      (sec) =>
        sec.lessons.length > 0 &&
        sec.lessons.every((l) => l.status === "completed"),
    );

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#faf8ff] p-8 flex items-center justify-center">
        <p className="text-slate-500 text-lg">Loading lessons...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-[#faf8ff] p-8 flex items-center justify-center">
        <p className="text-rose-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-8">
      <div className="mx-auto max-w-7xl rounded-3xl bg-[#faf8ff] border border-slate-200 shadow-sm p-8">
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="!text-slate-900 !text-3xl !md:text-[42px] !font-semibold !leading-tight !tracking-tight !m-0">
              Lesson
            </h1>

            <div className="flex items-center gap-3">
              {/* Nút chỉ hiển thị khi VÀ CHỈ KHI hoàn thành tất cả các bài học */}
              {isAllCompleted && (
                <button
                  type="button"
                  onClick={handleNextLevel}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Level Completed! Continue to next level here</span>
                </button>
              )}

              {level && (
                <span className="rounded-full bg-blue-100 text-blue-700 text-sm font-bold px-4 py-1.5">
                  Level {level}
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-8">
              {sections.map((section) => (
                <section key={section.id} className="flex flex-col gap-4">
                  <header className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
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
                    <span className="hidden md:block absolute left-5 top-0 bottom-0 w-1 rounded-full bg-indigo-100" />

                    {section.lessons.length === 0 && (
                      <p className="text-slate-500 text-sm">
                        Haven't got any lesson yet.
                      </p>
                    )}

                    {section.lessons.map((lesson) => (
                      <div key={lesson.id} className="relative w-full md:pl-16">
                        {lesson.status === "ongoing" && (
                          <span className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 border-[#faf8ff] bg-blue-600 text-white z-20 items-center justify-center">
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4 fill-current"
                            >
                              <path d="M8 6L18 12L8 18V6Z" />
                            </svg>
                          </span>
                        )}
                        {lesson.status === "locked" && (
                          <span className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 border-[#faf8ff] bg-slate-300 text-white z-20 items-center justify-center">
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4 fill-none stroke-current stroke-2"
                            >
                              <rect x="5" y="11" width="14" height="9" rx="2" />
                              <path d="M8 11V8C8 5.8 9.8 4 12 4C14.2 4 16 5.8 16 8V11" />
                            </svg>
                          </span>
                        )}
                        <LessonCard
                          {...lesson}
                          onClick={() => handleLessonClick(lesson.id, section.id)}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <aside className="hidden xl:block">
              <TheoryCard onReview={handleTheoryReview} />
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}