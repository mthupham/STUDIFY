import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { flashcardService } from "./services/flashcardService";
import type { DeckDetail, Flashcard } from "./types/flashcard";

interface DeckDetailViewProps {
  onBack?: () => void;
}

interface IconProps {
  className?: string;
}

// --- Inline SVG Icons ---
const ArrowLeftIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const PlusIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const EditIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const RotateCwIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const CheckCircleIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const BookOpenIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const LayersIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const XIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SparklesIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

export const DeckDetailView: React.FC<DeckDetailViewProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const { deckId } = useParams<{ deckId: string }>();

  // Primary State
  const [deckInfo, setDeckInfo] = useState<DeckDetail | null>(null);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Study View State
  const [activeTab, setActiveTab] = useState<"study" | "manage">("study");
  const [studyFilter, setStudyFilter] = useState<"all" | "unmastered">("all");
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isFinishedSession, setIsFinishedSession] = useState<boolean>(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [cardForm, setCardForm] = useState<{ front: string; back: string }>({
    front: "",
    back: "",
  });
  const [modalError, setModalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Derived filtered cards for Study Mode
  const activeStudyCards = useMemo(() => {
    return studyFilter === "unmastered"
      ? cards.filter((card) => !card.isMastered)
      : cards;
  }, [cards, studyFilter]);

  const currentCard = activeStudyCards[currentCardIndex];

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/flashcard");
    }
  };

  const loadDeckAndCards = useCallback(async () => {
    if (!deckId) return;

    setLoading(true);
    setError(null);

    try {
      const [decksRes, allCardsRes] = await Promise.all([
        flashcardService.getDecks(),
        flashcardService.getCards(deckId, "all"),
      ]);

      if (!decksRes.success || !decksRes.data) {
        throw new Error("Failed to load deck information");
      }

      if (!allCardsRes.success || !allCardsRes.data) {
        throw new Error("Failed to load flashcards");
      }

      const deck = decksRes.data.find(
        (item) => Number(item.id) === Number(deckId)
      );

      if (!deck) {
        throw new Error("Deck not found");
      }

      const loadedCards = allCardsRes.data;
      setCards(loadedCards);

      const totalCards = loadedCards.length;
      const masteredCount = loadedCards.filter((card) => card.isMastered).length;
      const masteryPercentage =
        totalCards === 0 ? 0 : Math.round((masteredCount / totalCards) * 100);

      setDeckInfo({
        id: deck.id,
        title: deck.title,
        description: deck.description ?? "",
        category: deck.category,
        totalCards,
        masteredCount,
        masteryPercentage,
      });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Error loading deck details";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [deckId]);

  useEffect(() => {
    loadDeckAndCards();
  }, [loadDeckAndCards]);

  const handleTouchStudy = useCallback(async () => {
    if (!deckId) return;
    try {
      await flashcardService.touchStudy(deckId);
    } catch (e) {
      console.error("Failed to update study timestamp", e);
    }
  }, [deckId]);

  useEffect(() => {
    if (activeTab === "study") {
      handleTouchStudy();
    }
  }, [activeTab, handleTouchStudy]);

  const handleAnswer = async (isCorrect: boolean) => {
    if (!currentCard) return;

    try {
      await flashcardService.updateCardMastery(currentCard.id, isCorrect);
      setCards((prev) =>
        prev.map((c) =>
          c.id === currentCard.id ? { ...c, isMastered: isCorrect } : c
        )
      );

      if (deckInfo) {
        const newlyMastered = isCorrect && !currentCard.isMastered;
        const newlyUnmastered = !isCorrect && currentCard.isMastered;
        let newMasteredCount = deckInfo.masteredCount;
        if (newlyMastered) newMasteredCount += 1;
        if (newlyUnmastered) newMasteredCount -= 1;

        const total = deckInfo.totalCards || 1;
        setDeckInfo({
          ...deckInfo,
          masteredCount: Math.max(0, newMasteredCount),
          masteryPercentage: Math.round(
            (Math.max(0, newMasteredCount) / total) * 100
          ),
        });
      }
    } catch (err) {
      console.error("Failed to update mastery status", err);
    }

    setIsFlipped(false);

    if (currentCardIndex + 1 < activeStudyCards.length) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      setIsFinishedSession(true);
    }
  };

  const handleRestartStudy = (filterType: "all" | "unmastered" = "all") => {
    setStudyFilter(filterType);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsFinishedSession(false);
    handleTouchStudy();
  };

  const handleOpenAddModal = () => {
    setEditingCard(null);
    setCardForm({ front: "", back: "" });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (card: Flashcard) => {
    setEditingCard(card);
    setCardForm({ front: card.front, back: card.back });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleSaveCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cardForm.front.trim() || !cardForm.back.trim() || !deckId) return;

    setModalError(null);
    setIsSubmitting(true);

    try {
      if (editingCard) {
        const response = await flashcardService.updateCard(
          editingCard.id,
          cardForm
        );
        if (response.success) {
          setCards((prev) =>
            prev.map((c) =>
              c.id === editingCard.id
                ? { ...c, front: cardForm.front, back: cardForm.back }
                : c
            )
          );
          setIsModalOpen(false);
        }
      } else {
        const response = await flashcardService.createCard(deckId, cardForm);
        if (response.success && response.data) {
          setCards((prev) => [...prev, response.data!]);
          if (deckInfo) {
            const newTotal = deckInfo.totalCards + 1;
            setDeckInfo({
              ...deckInfo,
              totalCards: newTotal,
              masteryPercentage: Math.round(
                (deckInfo.masteredCount / newTotal) * 100
              ),
            });
          }
          setIsModalOpen(false);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save card";
      setModalError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCard = async (cardId: number) => {
    if (!window.confirm("Are you sure you want to delete this flashcard?"))
      return;

    try {
      const response = await flashcardService.deleteCard(cardId);
      if (response.success) {
        const targetCard = cards.find((c) => c.id === cardId);
        setCards((prev) => prev.filter((c) => c.id !== cardId));

        if (deckInfo) {
          const newTotal = Math.max(0, deckInfo.totalCards - 1);
          const newMastered = targetCard?.isMastered
            ? Math.max(0, deckInfo.masteredCount - 1)
            : deckInfo.masteredCount;
          setDeckInfo({
            ...deckInfo,
            totalCards: newTotal,
            masteredCount: newMastered,
            masteryPercentage:
              newTotal > 0 ? Math.round((newMastered / newTotal) * 100) : 0,
          });
        }
      }
    } catch (err) {
      console.error("Failed to delete card", err);
    }
  };

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto p-6 font-sans text-gray-900 text-center py-20">
        <p className="text-gray-500 font-medium">Loading deck details...</p>
      </main>
    );
  }

  if (error || !deckInfo) {
    return (
      <main className="max-w-6xl mx-auto p-6 font-sans text-gray-900 space-y-4">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-sky-700"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Library</span>
        </button>
        <div className="p-6 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl">
          {error || "Deck not found"}
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-8 font-sans text-gray-900">
      <header className="space-y-4">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-sky-700 transition-colors cursor-pointer"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Library</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-sky-100 text-sky-800 text-xs font-semibold rounded-lg">
                {deckInfo.category}
              </span>
              {deckId && (
                <span className="text-xs text-gray-400 font-mono">
                  ID: #{deckId}
                </span>
              )}
              <span className="text-xs text-gray-500 font-medium">
                {deckInfo.totalCards} Flashcards
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">
              {deckInfo.title}
            </h1>
            <p className="text-gray-600 text-sm mt-1">{deckInfo.description}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 min-w-[240px] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-gray-700">
                Level of memorization
              </span>
              <span className="font-bold text-sky-700">
                {deckInfo.masteryPercentage}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-700 rounded-full transition-all duration-300"
                style={{ width: `${deckInfo.masteryPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-gray-500 text-right">
              Remembered {deckInfo.masteredCount}/{deckInfo.totalCards}{" "}
              flashcards.
            </p>
          </div>
        </div>
      </header>

      <nav className="flex border-b border-slate-200 gap-8">
        <button
          type="button"
          onClick={() => setActiveTab("study")}
          className={`pb-3 inline-flex items-center gap-2 font-semibold text-sm transition-all border-b-2 cursor-pointer ${
            activeTab === "study"
              ? "border-sky-700 text-sky-700"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          <BookOpenIcon className="w-4 h-4" />
          <span>Study Mode</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("manage")}
          className={`pb-3 inline-flex items-center gap-2 font-semibold text-sm transition-all border-b-2 cursor-pointer ${
            activeTab === "manage"
              ? "border-sky-700 text-sky-700"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          <LayersIcon className="w-4 h-4" />
          <span>List & Edit ({deckInfo.totalCards})</span>
        </button>
      </nav>

      {activeTab === "study" && (
        <section className="space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-200">
            <span className="text-xs font-medium text-gray-600 pl-2">
              Filter Mode:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleRestartStudy("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  studyFilter === "all"
                    ? "bg-white shadow-sm text-sky-800 font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All ({deckInfo.totalCards})
              </button>
              <button
                type="button"
                onClick={() => handleRestartStudy("unmastered")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  studyFilter === "unmastered"
                    ? "bg-amber-100 text-amber-900 font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Needs Review ({deckInfo.totalCards - deckInfo.masteredCount})
              </button>
            </div>
          </div>

          {activeStudyCards.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-4">
              <SparklesIcon className="w-12 h-12 text-amber-500 mx-auto" />
              <h3 className="text-lg font-bold text-gray-900">
                No flashcards to review!
              </h3>
            </div>
          ) : isFinishedSession ? (
            <div className="p-10 text-center bg-white rounded-2xl border border-slate-200 space-y-5">
              <CheckCircleIcon className="w-16 h-16 text-emerald-500 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  Session Complete!
                </h3>
                <p className="text-sm text-gray-600">
                  You have gone through all {activeStudyCards.length} cards in
                  this round.
                </p>
              </div>

              <div className="flex justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => handleRestartStudy("unmastered")}
                  className="px-5 py-2.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl font-medium text-sm hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  Review Unmastered Cards
                </button>
                <button
                  type="button"
                  onClick={() => handleRestartStudy("all")}
                  className="px-5 py-2.5 bg-sky-700 text-white rounded-xl font-medium text-sm hover:bg-sky-800 transition-colors shadow-sm cursor-pointer"
                >
                  Relearn All
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
                <span>
                  Card {currentCardIndex + 1} of {activeStudyCards.length}
                </span>
                <span>{isFlipped ? "Back (Answer)" : "Front (Question)"}</span>
              </div>

              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full min-h-[280px] p-8 bg-white rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col justify-between items-center text-center cursor-pointer hover:border-sky-300 transition-all group"
              >
                <div className="w-full flex justify-end">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      currentCard?.isMastered
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {currentCard?.isMastered ? "Mastered" : "Needs Review"}
                  </span>
                </div>

                <div className="my-auto space-y-3">
                  <p className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
                    {isFlipped ? "Answer / Definition" : "Term / Concept"}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                    {isFlipped ? currentCard?.back : currentCard?.front}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 group-hover:text-sky-700 transition-colors">
                  <RotateCwIcon className="w-3.5 h-3.5" />
                  <span>Click to flip</span>
                </div>
              </div>

              {isFlipped ? (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleAnswer(false)}
                    className="py-3 px-4 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 font-semibold rounded-xl text-sm transition-colors flex justify-center items-center gap-2 cursor-pointer"
                  >
                    <XIcon className="w-4 h-4 text-rose-600" />
                    <span>Need Practice</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAnswer(true)}
                    className="py-3 px-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-semibold rounded-xl text-sm transition-colors flex justify-center items-center gap-2 cursor-pointer"
                  >
                    <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                    <span>Remembered</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsFlipped(true)}
                  className="w-full py-3 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
                >
                  Show Answer
                </button>
              )}
            </div>
          )}
        </section>
      )}

      {activeTab === "manage" && (
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">
              List of Flashcards in Deck
            </h2>
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-medium text-sm rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add New Flashcard</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <span className="text-xs font-bold text-gray-400 mt-1">
                      #{index + 1}
                    </span>
                    <div className="space-y-1 min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {card.front}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {card.back}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${
                        card.isMastered
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {card.isMastered ? "Mastered" : "Needs Review"}
                    </span>

                    <div className="flex items-center gap-1 border-l border-slate-200 pl-3">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(card)}
                        className="p-2 text-gray-500 hover:text-sky-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCard(card.id)}
                        className="p-2 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-gray-900">
                {editingCard ? "Edit Flashcard" : "Add New Flashcard"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg transition-colors cursor-pointer"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCard} className="p-6 space-y-4">
              {modalError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
                  {modalError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-900">
                  Front (Concept / Question){" "}
                  <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Enter Question or Concept..."
                  value={cardForm.front}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setCardForm({ ...cardForm, front: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-700 transition-all resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-900">
                  Back (Definition / Answer){" "}
                  <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter Definition or Answer..."
                  value={cardForm.back}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setCardForm({ ...cardForm, back: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-700 transition-all resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-sky-700 hover:bg-sky-800 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors shadow-sm cursor-pointer"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingCard
                      ? "Save Changes"
                      : "Add Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default DeckDetailView;