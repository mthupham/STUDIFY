import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../auth/store/useAuthStore";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const VALID_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

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

interface PairedLesson {
  lessonIndex: number;
  vocabulary: VocabularyLesson;
  grammar: GrammarLesson;
  isCompleted: boolean;
}

interface LessonDetailData {
  level: string;
  level_title: string;
  pairedLessons: PairedLesson[];
}

// ----------------------------------------------------
// Reusable Component: VocabularySection
// ----------------------------------------------------
const VocabularySection: React.FC<{ vocabulary: VocabularyLesson }> = ({
  vocabulary,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 text-emerald-600 dark:text-emerald-400 rounded-xl flex justify-center items-center shadow-sm border border-emerald-100/50">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-none stroke-current stroke-2"
            >
              <path d="M4 6.5C4 5.7 4.7 5 5.5 5H10.5C11.3 5 12 5.7 12 6.5V18H5.5C4.7 18 4 17.3 4 16.5V6.5Z M12 6.5C12 5.7 12.7 5 13.5 5H18.5C19.3 5 20 5.7 20 6.5V16.5C20 17.3 19.3 18 18.5 18H12V6.5Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-slate-900 font-bold text-lg leading-snug">
              Vocabulary Topic
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              {vocabulary.topic_name}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {vocabulary.items.map((item, idx) => (
          <div
            key={idx}
            className="p-5 bg-white/70 border border-slate-200/60 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md group"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="text-slate-900 text-base font-bold group-hover:text-blue-600 transition-colors">
                {item.term}
              </p>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl flex flex-col gap-1 border border-slate-100">
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">
                  Phonetic
                </span>
                <span className="text-slate-700 font-mono text-sm font-semibold">
                  {item.phonetic}
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl flex flex-col gap-1 border border-slate-100">
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">
                  Definition
                </span>
                <span className="text-slate-700 text-sm">
                  {item.definition}
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl flex flex-col gap-1 border border-slate-100">
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">
                  Example
                </span>
                <span className="text-slate-600 text-sm italic">
                  "{item.example_sentence}"
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// Reusable Component: GrammarSection
// ----------------------------------------------------
const GrammarSection: React.FC<{ grammar: GrammarLesson }> = ({ grammar }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 mt-6 pt-6 border-t border-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 text-orange-600 dark:text-orange-400 rounded-xl flex justify-center items-center shadow-sm border border-orange-100/50">
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
          <div>
            <h3 className="text-slate-900 font-bold text-lg leading-snug">
              Grammar Topic
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              {grammar.grammar_title}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-50/40 to-violet-50/20 border border-indigo-100/50 rounded-2xl p-5 md:p-6 flex flex-col gap-5 shadow-sm">
        {grammar.rule && (
          <div className="border-l-4 border-indigo-500 pl-4 py-1">
            <span className="text-indigo-600 text-[10px] font-black uppercase tracking-wider block mb-1">
              Rule
            </span>
            <p className="text-slate-900 text-base font-bold font-mono">
              {grammar.rule}
            </p>
          </div>
        )}

        {grammar.explanation && (
          <div>
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider block mb-1">
              Explanation
            </span>
            <p className="text-slate-700 text-sm leading-relaxed">
              {grammar.explanation}
            </p>
          </div>
        )}

        {grammar.examples && grammar.examples.length > 0 && (
          <div>
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider block mb-2">
              Examples
            </span>
            <ul className="grid grid-cols-1 gap-2">
              {grammar.examples.map((example, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 bg-white/60 p-3 rounded-xl border border-indigo-50/20 text-slate-700 text-sm"
                >
                  <span className="w-5 h-5 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-medium pt-0.5">{example}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// Reusable Component: LessonSection
// ----------------------------------------------------
const LessonSection: React.FC<{
  lesson: PairedLesson;
  isCurrent: boolean;
  onNavigateToLesson: (index: number) => void;
}> = ({ lesson, isCurrent, onNavigateToLesson }) => {
  const navigate = useNavigate();
  return (
    <section
      id={`lesson-section-${lesson.lessonIndex}`}
      onClick={() => {
        if (!isCurrent) onNavigateToLesson(lesson.lessonIndex);
      }}
      className={`w-full p-6 md:p-8 rounded-3xl border transition-all duration-500 flex flex-col gap-6 relative ${
        isCurrent
          ? "bg-white border-blue-500 shadow-[0_20px_50px_rgba(59,130,246,0.12)] ring-1 ring-blue-500/50 scale-[1.01]"
          : "bg-white/50 border-slate-200/80 hover:border-slate-300 shadow-sm opacity-60 hover:opacity-90 scale-100 cursor-pointer"
      }`}
    >
      {isCurrent && (
        <span className="absolute -top-3 left-6 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-md">
          Current Lesson Topic
        </span>
      )}

      <header className="flex justify-between items-center pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <span className="text-xl md:text-2xl font-black text-slate-800">
            Lesson {lesson.lessonIndex}
          </span>
          {lesson.isCompleted && (
            <span className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
              ✓ Completed
            </span>
          )}
        </div>
      </header>

      <VocabularySection vocabulary={lesson.vocabulary} />
      <GrammarSection grammar={lesson.grammar} />
      <button
        type="button"
        onClick={() => navigate(`/lessons/practice/writing/${lesson.lessonIndex}`)}
        className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl text-xs font-bold transition-all border border-orange-200/50 flex items-center gap-1.5 cursor-pointer shadow-sm"
      >
        Practice Writing Exercises
        <span aria-hidden="true">→</span>
      </button>
      <button
        type="button"
        onClick={() => navigate(`/lessons/practice/reading/${lesson.lessonIndex}`)}
        className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl text-xs font-bold transition-all border border-orange-200/50 flex items-center gap-1.5 cursor-pointer shadow-sm"
      >
        Practice Reading Exercises
        <span aria-hidden="true">→</span>
      </button>
    </section>
  );
};

// ----------------------------------------------------
// Main Controller Component: LessonDetail (TheoryPage)
// ----------------------------------------------------
export default function LessonDetail() {
  const { lessonId, level, lessonIndex } = useParams<{
    lessonId?: string;
    level?: string;
    lessonIndex?: string;
  }>();

  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);

  const [data, setData] = useState<LessonDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completing, setCompleting] = useState(false);

  // 1. Redirect if using legacy route pattern '/lessons/theory/:lessonId'
  useEffect(() => {
    if (lessonId) {
      const parts = lessonId.split("_");
      if (parts.length === 2) {
        const lvl = parts[0].toUpperCase();
        const indexMatch = parts[1].match(/\d+/);
        if (indexMatch) {
          const idx = parseInt(indexMatch[0], 10);
          navigate(`/lesson/${lvl}/${idx}`, { replace: true });
          return;
        }
      }
      navigate("/roadmap", { replace: true });
    }
  }, [lessonId, navigate]);

  // 2. Fetch the level lessons from the backend
  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!level || lessonId) return;
      if (!VALID_LEVELS.includes(level.toUpperCase())) {
        setError(`Level ${level} does not exist.`);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<{
          success?: boolean;
          data?: LessonDetailData;
        }>(`${API_BASE}/learning/lessons/${level}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!cancelled) {
          const fetchedData = response?.data?.data;
          if (fetchedData) {
            setData(fetchedData);
          } else {
            setError("Cannot load lessons for this level.");
          }
        }
      } catch (err) {
        if (!cancelled) setError("Could not load lessons for this level.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [level, lessonId, token]);

  // 3. Handle invalid index redirect
  useEffect(() => {
    if (!loading && data && level && lessonIndex) {
      const idx = parseInt(lessonIndex, 10);
      const length = data.pairedLessons.length;
      if (length > 0 && (isNaN(idx) || idx <= 0 || idx > length)) {
        navigate(`/lesson/${level}/1`, { replace: true });
      }
    }
  }, [lessonIndex, data, loading, level, navigate]);

  // 4. Scroll to current lesson
  useEffect(() => {
    if (!loading && data && lessonIndex) {
      const idx = parseInt(lessonIndex, 10);
      if (!isNaN(idx)) {
        // Run scroll in timeout to ensureDOM nodes are drawn
        const timer = setTimeout(() => {
          const element = document.getElementById(`lesson-section-${idx}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [lessonIndex, loading, data]);

  // 5. Handle mark paired lesson as completed
  const handleMarkComplete = async () => {
    if (!level || !lessonIndex || !data) return;
    const idx = parseInt(lessonIndex, 10);
    const currentLesson = data.pairedLessons[idx - 1];
    if (!currentLesson) return;

    setCompleting(true);
    setError(null);

    const vocabId = currentLesson.vocabulary.topic_id;
    const grammarId = currentLesson.grammar.grammar_id;

    try {
      // Execute completion for both components in parallel
      await Promise.all([
        axios.post(`${API_BASE}/progress/lesson/${vocabId}/complete`, null, {
          params: { type: "vocabulary" },
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.post(`${API_BASE}/progress/lesson/${grammarId}/complete`, null, {
          params: { type: "grammar" },
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      // Instantly update local state to render updated complete status
      setData((prev) => {
        if (!prev) return prev;
        const nextPaired = prev.pairedLessons.map((l) =>
          l.lessonIndex === idx ? { ...l, isCompleted: true } : l,
        );
        return { ...prev, pairedLessons: nextPaired };
      });

      // Dispatch event to synchronize state with sidebar and roadmap
      window.dispatchEvent(
        new CustomEvent("lesson-completed", {
          detail: { lessonId: vocabId, lessonType: "vocabulary" },
        }),
      );
      window.dispatchEvent(
        new CustomEvent("lesson-completed", {
          detail: { lessonId: grammarId, lessonType: "grammar" },
        }),
      );
    } catch (err) {
      setError("Failed to mark lesson complete. Please try again.");
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#faf8ff] flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
          <p className="text-slate-500 text-base font-semibold">
            Loading lessons...
          </p>
        </div>
      </div>
    );
  }

  const normalizedLevel = level?.toUpperCase() || "";
  const isInvalidLevel = !VALID_LEVELS.includes(normalizedLevel);

  if (error || !data || isInvalidLevel) {
    return (
      <div className="w-full min-h-screen bg-[#faf8ff] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center flex flex-col items-center gap-5">
          <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex justify-center items-center shadow-inner">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 fill-none stroke-current stroke-2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h2 className="text-slate-900 text-xl font-bold mb-1">
              Level Not Found
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              {error || `Level "${level}" could not be found or is invalid.`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/roadmap")}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md transition-all cursor-pointer"
          >
            Go to Roadmap
          </button>
        </div>
      </div>
    );
  }

  const { pairedLessons } = data;
  const numLessons = pairedLessons.length;

  if (numLessons === 0) {
    return (
      <div className="w-full min-h-screen bg-[#faf8ff] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center flex flex-col items-center gap-5">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex justify-center items-center shadow-inner">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 fill-none stroke-current stroke-2"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V5A2.5 2.5 0 0 1 6.5 2.5H20V17" />
            </svg>
          </div>
          <div>
            <h2 className="text-slate-900 text-xl font-bold mb-1">
              No Lessons
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              No paired lessons are available in this level currently.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/roadmap")}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md transition-all cursor-pointer"
          >
            Go to Roadmap
          </button>
        </div>
      </div>
    );
  }

  const currentIdx = parseInt(lessonIndex ?? "1", 10);
  const activeLesson = pairedLessons[currentIdx - 1] || pairedLessons[0];
  const isFirstLesson = currentIdx <= 1;
  const isLastLesson = currentIdx >= numLessons;

  const navigateToLesson = (newIndex: number) => {
    if (newIndex >= 1 && newIndex <= numLessons) {
      navigate(`/lesson/${level}/${newIndex}`);
    }
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto pb-28">
      {/* 1. Sticky Navigation Bar */}
      <div className="sticky top-4 z-[9999] bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/roadmap")}
            className="px-3 py-2 hover:bg-slate-100 rounded-xl text-slate-600 font-semibold text-sm transition-colors flex items-center gap-1 cursor-pointer"
            type="button"
          >
            ← Roadmap
          </button>
          <span className="h-4 w-px bg-slate-200" />
          <h1 className="!text-slate-900 !text-lg !font-bold">Theory Review</h1>
        </div>

        {/* Mid Navigation Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={isFirstLesson}
            onClick={() => navigateToLesson(currentIdx - 1)}
            className="p-2 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg text-slate-600 transition-colors cursor-pointer"
            aria-label="Previous Lesson"
          >
            ◀
          </button>
          <span className="text-slate-700 font-bold text-sm tracking-wide bg-slate-100 px-3 py-1.5 rounded-xl">
            Lesson {currentIdx} / {numLessons}
          </span>
          <button
            type="button"
            disabled={isLastLesson}
            onClick={() => navigateToLesson(currentIdx + 1)}
            className="p-2 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg text-slate-600 transition-colors cursor-pointer"
            aria-label="Next Lesson"
          >
            ▶
          </button>
        </div>

        {/* Header Mark Complete Button */}
        <button
          type="button"
          onClick={handleMarkComplete}
          disabled={completing || activeLesson.isCompleted}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
            activeLesson.isCompleted
              ? "bg-emerald-50 border border-emerald-200 text-emerald-700 cursor-default"
              : "bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
          }`}
        >
          {activeLesson.isCompleted
            ? "✓ Completed"
            : completing
              ? "Saving..."
              : "Mark as Complete"}
        </button>
      </div>

      {/* 2. Banner Header */}
      <div className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 rounded-3xl shadow-lg p-6 md:p-10 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
        <div className="z-10 flex flex-col items-center gap-3">
          <span className="px-4 py-1.5 bg-emerald-800/80 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-700/30">
            Level {data.level}
          </span>
          <h2 className="!text-slate-900 !text-lg !font-bold !text-white">
            {data.level_title}
          </h2>
        </div>
      </div>

      {/* 3. Paired Lessons Sequence List */}
      <div className="w-full flex flex-col gap-8">
        {pairedLessons.map((lesson) => (
          <LessonSection
            key={lesson.lessonIndex}
            lesson={lesson}
            isCurrent={lesson.lessonIndex === currentIdx}
            onNavigateToLesson={navigateToLesson}
          />
        ))}
      </div>
    </div>
  );
}
