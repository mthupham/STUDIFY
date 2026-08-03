import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../auth/store/useAuthStore";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface VocabItem {
  term: string;
  phonetic: string;
  definition: string;
  example_sentence: string;
}

interface VocabularyLesson {
  topic_id: string;
  topic_name: string;
  items: VocabItem[];
}

interface GrammarLesson {
  grammar_id: string;
  grammar_title: string;
  rule: string;
  explanation: string;
  examples: string[];
}

interface LessonDetailData {
  level: string;
  level_title: string;
  vocabulary_lessons: VocabularyLesson[];
  grammar_lessons: GrammarLesson[];
  isCompleted?: boolean;
}

export default function LessonDetail() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);

  const [data, setData] = useState<LessonDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completing, setCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!lessonId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<LessonDetailData | { success?: boolean; data?: LessonDetailData }>(
          `${API_BASE}/learning/lessons/${lessonId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const responseData = response?.data as
          | LessonDetailData
          | { data?: LessonDetailData }
          | undefined;

        const payload =
          responseData && typeof responseData === "object" && "data" in responseData && responseData.data
            ? responseData.data
            : (responseData as LessonDetailData | undefined);

        if (!cancelled) {
          const nextData = payload as LessonDetailData | undefined;
          setData(nextData ?? null);
          setIsCompleted(Boolean(nextData?.isCompleted ?? false));
        }
      } catch (err) {
        if (!cancelled) setError("Không thể tải nội dung bài học.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [lessonId, token]);

  const handleMarkComplete = async () => {
    if (!lessonId) return;

    const lessonType = data?.vocabulary_lessons.some((lesson) => lesson.topic_id === lessonId)
      ? "vocabulary"
      : data?.grammar_lessons.some((lesson) => lesson.grammar_id === lessonId)
        ? "grammar"
        : null;

    if (!lessonType) {
      setError("Không xác định được loại bài học để lưu tiến độ.");
      return;
    }

    setCompleting(true);
    setError(null);

    try {
      await axios.post(
        `${API_BASE}/progress/lesson/${lessonId}/complete`,
        null,
        {
          params: { type: lessonType },
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setIsCompleted(true);
      setData((prev) => (prev ? { ...prev, isCompleted: true } : prev));
      window.dispatchEvent(
        new CustomEvent("lesson-completed", {
          detail: { lessonId, lessonType },
        }),
      );
    } catch (err) {
      setError("Không thể đánh dấu hoàn thành. Vui lòng thử lại.");
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#faf8ff] flex items-center justify-center">
        <p className="text-slate-500 text-lg">Đang tải bài học...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full min-h-screen bg-[#faf8ff] flex items-center justify-center">
        <p className="text-rose-600 text-lg">
          {error || "Không tìm thấy bài học."}
        </p>
      </div>
    );
  }

  const vocabularyLessons = data.vocabulary_lessons ?? [];
  const grammarLessons = data.grammar_lessons ?? [];

  return (
    <div className="w-full min-h-screen p-4 md:p-8 flex flex-col gap-8 bg-[#faf8ff]">
      <div className="w-full flex justify-between items-center border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/lessons")}
            className="p-2 hover:bg-slate-200/60 rounded-lg text-slate-600 transition-colors cursor-pointer"
            type="button"
          >
            ← Back to Lessons
          </button>
          <h1 className="!text-slate-900 !text-3xl !font-bold !font-['Inter'] !text-sky-700">
            Theory
          </h1>
        </div>

        <button
          type="button"
          onClick={handleMarkComplete}
          disabled={completing || isCompleted}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
            isCompleted
              ? "bg-emerald-100 text-emerald-700 cursor-default"
              : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          }`}
        >
          {isCompleted ? "✓ Completed" : completing ? "Đang lưu..." : "Mark as Complete"}
        </button>
      </div>

      <div className="w-full bg-blue-600 rounded-3xl shadow-md p-8 md:p-12 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
        <div className="z-10 flex flex-col items-center gap-4">
          <span className="px-5 py-2 bg-emerald-800 rounded-full text-sm md:text-base font-semibold tracking-wide">
            LEVEL {data.level}
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-tight">
            {data.level_title}
          </h2>
        </div>
      </div>

      <div className="w-full flex flex-col gap-10">
        {vocabularyLessons.length > 0 && (
          <section className="flex flex-col gap-6">
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
                Vocabulary ({vocabularyLessons.length} topic)
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {vocabularyLessons.map((lesson) => (
                <div
                  key={lesson.topic_id}
                  className="w-full p-6 bg-white/80 border border-slate-200 rounded-3xl backdrop-blur-sm flex flex-col gap-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-slate-900 text-lg font-semibold">
                      {lesson.topic_name}
                    </h3>
                    <span className="text-sm text-slate-500">
                      {lesson.items.length} từ
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {lesson.items.map((item, idx) => (
                      <div
                        key={`${lesson.topic_id}-${idx}`}
                        className="p-4 bg-slate-50 rounded-2xl border border-slate-100"
                      >
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <p className="text-slate-900 text-sm font-semibold">
                            {item.term}
                          </p>
                          <span className="text-xs font-semibold text-violet-700 bg-violet-100 px-2.5 py-1 rounded-full">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="p-3 bg-white rounded-lg flex flex-col gap-1">
                            <span className="text-sky-700 text-xs font-bold uppercase">
                              Phonetic
                            </span>
                            <span className="text-slate-700 text-sm">
                              {item.phonetic}
                            </span>
                          </div>
                          <div className="p-3 bg-white rounded-lg flex flex-col gap-1">
                            <span className="text-sky-700 text-xs font-bold uppercase">
                              Definition
                            </span>
                            <span className="text-slate-700 text-sm">
                              {item.definition}
                            </span>
                          </div>
                          <div className="p-3 bg-white rounded-lg flex flex-col gap-1">
                            <span className="text-sky-700 text-xs font-bold uppercase">
                              Example
                            </span>
                            <span className="text-slate-700 text-sm">
                              {item.example_sentence}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {grammarLessons.length > 0 && (
          <section className="flex flex-col gap-4">
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

            <div className="flex flex-col gap-4">
              {grammarLessons.map((lesson) => (
                <div
                  key={lesson.grammar_id}
                  className="p-6 bg-indigo-50/60 border border-indigo-100 rounded-3xl flex flex-col gap-4"
                >
                  <div>
                    <h3 className="text-slate-900 text-lg font-semibold">
                      {lesson.grammar_title}
                    </h3>
                  </div>

                  {lesson.rule && (
                    <div>
                      <span className="text-sky-700 text-xs font-bold uppercase block mb-1">
                        Rule
                      </span>
                      <p className="text-slate-900 text-sm font-semibold">
                        {lesson.rule}
                      </p>
                    </div>
                  )}

                  {lesson.explanation && (
                    <div>
                      <span className="text-sky-700 text-xs font-bold uppercase block mb-1">
                        Explanation
                      </span>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {lesson.explanation}
                      </p>
                    </div>
                  )}

                  {lesson.examples && lesson.examples.length > 0 && (
                    <div>
                      <span className="text-sky-700 text-xs font-bold uppercase block mb-1">
                        Examples
                      </span>
                      <ul className="list-disc list-inside flex flex-col gap-1">
                        {lesson.examples.map((example, idx) => (
                          <li key={`${lesson.grammar_id}-${idx}`} className="text-slate-700 text-sm">
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
