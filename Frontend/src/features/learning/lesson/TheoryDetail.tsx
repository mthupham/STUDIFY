import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../auth/store/useAuthStore";

// ----------------------------------------------------------------------
// Constants & TypeScript Interfaces
// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------
// Sub-component: VocabularySection
// Minimalist white & blue layout for vocabulary items
// ----------------------------------------------------------------------
const VocabularySection: React.FC<{ vocabulary: VocabularyLesson }> = ({
  vocabulary,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Topic Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-md border border-blue-200 flex justify-center items-center text-blue-600 bg-blue-50/50">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-none stroke-current stroke-2"
          >
            <path d="M4 6.5C4 5.7 4.7 5 5.5 5H10.5C11.3 5 12 5.7 12 6.5V18H5.5C4.7 18 4 17.3 4 16.5V6.5Z M12 6.5C12 5.7 12.7 5 13.5 5H18.5C19.3 5 20 5.7 20 6.5V16.5C20 17.3 19.3 18 18.5 18H12V6.5Z" />
          </svg>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider block">
            Vocabulary Topic
          </span>
          <h3 className="text-slate-900 font-bold text-base leading-tight">
            {vocabulary.topic_name}
          </h3>
        </div>
      </div>

      {/* Vocabulary Items Grid */}
      <div className="grid grid-cols-1 gap-3">
        {vocabulary.items.map((item, idx) => (
          <div
            key={idx}
            className="p-4 border border-slate-200 rounded-xl transition-all hover:border-blue-300 bg-white"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-slate-900 font-bold text-sm">
                {item.term}
              </span>
              <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-medium">
                #{String(idx + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="text-slate-400 font-bold uppercase text-[9px] block mb-0.5">
                  Phonetic
                </span>
                <span className="text-slate-700 font-mono">{item.phonetic}</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="text-slate-400 font-bold uppercase text-[9px] block mb-0.5">
                  Definition
                </span>
                <span className="text-slate-700 leading-snug">
                  {item.definition}
                </span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="text-slate-400 font-bold uppercase text-[9px] block mb-0.5">
                  Example
                </span>
                <span className="text-slate-600 italic leading-snug">
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

// ----------------------------------------------------------------------
// Sub-component: GrammarSection
// Clean rule structure with blue accent line
// ----------------------------------------------------------------------
const GrammarSection: React.FC<{ grammar: GrammarLesson }> = ({ grammar }) => {
  return (
    <div className="flex flex-col gap-4 mt-2 pt-6 border-t border-slate-100">
      {/* Section Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-md border border-blue-200 flex justify-center items-center text-blue-600 bg-blue-50/50">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-none stroke-current stroke-2"
          >
            <path
              d="M4 16.5V20h3.5L18 9.5L14.5 6L4 16.5Z"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider block">
            Grammar Topic
          </span>
          <h3 className="text-slate-900 font-bold text-base leading-tight">
            {grammar.grammar_title}
          </h3>
        </div>
      </div>

      {/* Grammar Card */}
      <div className="border border-slate-200 rounded-xl p-4 flex flex-col gap-4 bg-white">
        {grammar.rule && (
          <div className="border-l-2 border-blue-600 pl-3 py-0.5">
            <span className="text-blue-600 text-[10px] font-bold uppercase tracking-wider block mb-0.5">
              Rule Formula
            </span>
            <p className="text-slate-900 text-sm font-mono font-semibold">
              {grammar.rule}
            </p>
          </div>
        )}

        {grammar.explanation && (
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-1">
              Explanation
            </span>
            <p className="text-slate-700 text-xs leading-relaxed">
              {grammar.explanation}
            </p>
          </div>
        )}

        {grammar.examples && grammar.examples.length > 0 && (
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-2">
              Key Examples
            </span>
            <ul className="flex flex-col gap-1.5">
              {grammar.examples.map((example, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg border border-slate-100 text-slate-700 text-xs bg-slate-50/50"
                >
                  <span className="w-4 h-4 text-blue-600 font-bold text-[10px] flex items-center justify-center border border-blue-200 rounded bg-white">
                    {idx + 1}
                  </span>
                  <span className="font-medium">{example}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Sub-component: LessonSection
// Lesson container featuring practice route handlers
// ----------------------------------------------------------------------
interface LessonSectionProps {
  lesson: PairedLesson;
  level: string;
  isCurrent: boolean;
  onNavigateToLesson: (index: number) => void;
}

const LessonSection: React.FC<LessonSectionProps> = ({
  lesson,
  level,
  isCurrent,
  onNavigateToLesson,
}) => {
  const navigate = useNavigate();

  // Practice route pattern: /lessons/practice/{LEVEL}_T{INDEX}?skill={skill}
  const formattedTargetId = `${level.toUpperCase()}_T${lesson.lessonIndex}`;

  const handlePracticeNavigation = (skill: "writing" | "reading") => {
    navigate(`/lessons/practice/${formattedTargetId}?skill=${skill}`);
  };

  return (
    <section
      id={`lesson-section-${lesson.lessonIndex}`}
      onClick={() => {
        if (!isCurrent) onNavigateToLesson(lesson.lessonIndex);
      }}
      className={`w-full p-6 rounded-2xl border transition-all duration-300 flex flex-col gap-6 relative ${
        isCurrent
          ? "border-blue-600 ring-1 ring-blue-600/20 bg-white shadow-sm"
          : "border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300 bg-white cursor-pointer"
      }`}
    >
      {/* Active Indicator Badge */}
      {isCurrent && (
        <span className="absolute -top-3 left-6 px-3 py-0.5 bg-blue-600 text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
          Active Lesson
        </span>
      )}

      {/* Header */}
      <header className="flex justify-between items-center pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-bold text-slate-900">
            Lesson {lesson.lessonIndex}
          </h2>
          {lesson.isCompleted && (
            <span className="text-blue-700 bg-blue-50 border border-blue-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
              ✓ Completed
            </span>
          )}
        </div>
      </header>

      {/* Theory Content */}
      <VocabularySection vocabulary={lesson.vocabulary} />
      <GrammarSection grammar={lesson.grammar} />

      {/* Practice Navigation Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePracticeNavigation("writing");
          }}
          className="flex-1 min-w-[180px] px-4 py-2.5 bg-white hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-600 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
        >
          <span>Practice Writing</span>
          <span aria-hidden="true">→</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePracticeNavigation("reading");
          }}
          className="flex-1 min-w-[180px] px-4 py-2.5 bg-white hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-600 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
        >
          <span>Practice Reading</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------
// Main Controller Component: LessonDetail
// Fully harmonized with MainLayout (sticky top offset to top-[70px])
// ----------------------------------------------------------------------
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

  // 1. Redirect legacy URL format '/lessons/theory/:lessonId'
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

  // 2. Fetch lesson list data based on level
  useEffect(() => {
    let cancelled = false;

    async function loadLessons() {
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

    loadLessons();
    return () => {
      cancelled = true;
    };
  }, [level, lessonId, token]);

  // 3. Fallback redirect for out-of-bounds lesson indices
  useEffect(() => {
    if (!loading && data && level && lessonIndex) {
      const idx = parseInt(lessonIndex, 10);
      const length = data.pairedLessons.length;
      if (length > 0 && (isNaN(idx) || idx <= 0 || idx > length)) {
        navigate(`/lesson/${level}/1`, { replace: true });
      }
    }
  }, [lessonIndex, data, loading, level, navigate]);

  // 4. Smooth auto-scroll behavior to target lesson index
  useEffect(() => {
    if (!loading && data && lessonIndex) {
      const idx = parseInt(lessonIndex, 10);
      if (!isNaN(idx)) {
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

  // 5. Handle marking lesson completed
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

      setData((prev) => {
        if (!prev) return prev;
        const nextPaired = prev.pairedLessons.map((l) =>
          l.lessonIndex === idx ? { ...l, isCompleted: true } : l,
        );
        return { ...prev, pairedLessons: nextPaired };
      });

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

      if (idx < data.pairedLessons.length) {
        navigate(`/lesson/${level}/${idx + 1}`);
      }
    } catch (err) {
      setError("Failed to mark lesson complete. Please try again.");
    } finally {
      setCompleting(false);
    }
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-blue-600 animate-spin" />
          <p className="text-slate-500 text-xs font-medium">Loading lessons...</p>
        </div>
      </div>
    );
  }

  const normalizedLevel = level?.toUpperCase() || "";
  const isInvalidLevel = !VALID_LEVELS.includes(normalizedLevel);

  // Error Screen
  if (error || !data || isInvalidLevel) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full border border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center gap-4 bg-white shadow-sm">
          <h2 className="text-slate-900 text-lg font-bold">Level Not Found</h2>
          <p className="text-slate-500 text-xs leading-relaxed">
            {error || `Level "${level}" could not be found or is invalid.`}
          </p>
          <button
            type="button"
            onClick={() => navigate("/roadmap")}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
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
      <div className="w-full min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full border border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center gap-4 bg-white shadow-sm">
          <h2 className="text-slate-900 text-lg font-bold">No Lessons Available</h2>
          <p className="text-slate-500 text-xs leading-relaxed">
            No paired lessons are available for this level currently.
          </p>
          <button
            type="button"
            onClick={() => navigate("/roadmap")}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
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
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 text-slate-800 pb-16">
      {/* 
        Sticky Control Toolbar:
        Positioned at top-[70px] to dock cleanly right beneath MainLayout's 70px Header 
      */}
      <div className="sticky top-[70px] z-40 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-3 flex items-center justify-between shadow-sm transition-all">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/roadmap")}
            className="px-2.5 py-1.5 hover:bg-slate-100 rounded-lg text-slate-600 font-medium text-xs transition-colors flex items-center gap-1 cursor-pointer"
            type="button"
          >
            ← Roadmap
          </button>
          <span className="h-4 w-px bg-slate-200" />
          <h1 className="!text-slate-900 !text-sm !font-bold">Theory Review</h1>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isFirstLesson}
            onClick={() => navigateToLesson(currentIdx - 1)}
            className="p-1.5 hover:bg-slate-100 disabled:opacity-30 rounded-md text-slate-600 transition-colors cursor-pointer text-xs"
            aria-label="Previous Lesson"
          >
            ◀
          </button>
          <span className="text-slate-700 font-medium text-xs font-mono bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
            {currentIdx} / {numLessons}
          </span>
          <button
            type="button"
            disabled={isLastLesson}
            onClick={() => navigateToLesson(currentIdx + 1)}
            className="p-1.5 hover:bg-slate-100 disabled:opacity-30 rounded-md text-slate-600 transition-colors cursor-pointer text-xs"
            aria-label="Next Lesson"
          >
            ▶
          </button>
        </div>

        {/* Completion Action Button */}
        <button
          type="button"
          onClick={handleMarkComplete}
          disabled={completing || activeLesson.isCompleted}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm cursor-pointer ${
            activeLesson.isCompleted
              ? "bg-slate-100 border border-slate-200 text-slate-500 cursor-default"
              : "bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          }`}
        >
          {activeLesson.isCompleted
            ? "✓ Completed"
            : completing
              ? "Saving..."
              : "Mark Complete"}
        </button>
      </div>

      {/* Minimalist Title Section */}
      <div className="w-full border-b border-slate-200 pb-4 flex flex-col items-start gap-1.5">
        <span className="px-2 py-0.5 border border-blue-600 text-blue-600 rounded text-[10px] font-mono font-bold tracking-wide uppercase">
          Level {data.level}
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {data.level_title}
        </h2>
      </div>

      {/* Paired Lessons Sequence List */}
      <div className="w-full flex flex-col gap-6">
        {pairedLessons.map((lesson) => (
          <LessonSection
            key={lesson.lessonIndex}
            lesson={lesson}
            level={level ?? "A1"}
            isCurrent={lesson.lessonIndex === currentIdx}
            onNavigateToLesson={navigateToLesson}
          />
        ))}
      </div>
    </div>
  );
}
