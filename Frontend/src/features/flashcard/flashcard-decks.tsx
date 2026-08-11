import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { flashcardService } from "./services/flashcardService";
import type { FlashcardDeck, CreateDeckDto } from "./types/flashcard";
import { formatLastStudied } from "./utilitites/formatLastStudied";

interface IconProps {
  className?: string;
}

// --- Inline SVG Icons ---
const PlusIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MonitorIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const BriefcaseIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const GlobeIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const BookOpenIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const XIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const getDeckIcon = (category?: string) => {
  const cat = (category || "").toLowerCase();
  if (cat.includes("tech") || cat.includes("computer")) return MonitorIcon;
  if (cat.includes("business") || cat.includes("work")) return BriefcaseIcon;
  if (cat.includes("travel") || cat.includes("globe")) return GlobeIcon;
  return BookOpenIcon;
};

export const FlashcardLibrary: React.FC = () => {
  const navigate = useNavigate();
  const [userDecks, setUserDecks] = useState<FlashcardDeck[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [newDeck, setNewDeck] = useState<CreateDeckDto>({
    title: "",
    description: "",
    category: "language",
    color: "bg-blue-600",
    progressColor: "bg-sky-700",
    isPublic: false,
  });

  const fetchDecks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await flashcardService.getDecks();
      if (response.success && response.data) {
        setUserDecks(response.data);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load decks";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleCreateDeckSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      const response = await flashcardService.createDeck(newDeck);
      if (response.success && response.data) {
        setUserDecks((prev) => [response.data!, ...prev]);
        setIsModalOpen(false);
        setNewDeck({
          title: "",
          description: "",
          category: "language",
          color: "bg-blue-600",
          progressColor: "bg-sky-700",
          isPublic: false,
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not create deck";
      setFormError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-10 font-sans text-gray-900">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Flashcard Library
          </h1>
          <p className="mt-1 text-base text-gray-600 max-w-xl">
            Master your vocabulary with spaced repetition. Track your progress
            and share decks with the community.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFormError(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-medium rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Create New Deck</span>
        </button>
      </header>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-gray-500 font-medium">
          Loading flashcard decks...
        </div>
      ) : userDecks.length === 0 && !error ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <p className="text-gray-600 text-sm font-medium">
            No decks available. Create your first flashcard deck above!
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {userDecks.map((deck) => {
            const Icon = getDeckIcon(deck.category);
            return (
              <article
                key={deck.id}
                onClick={() => navigate(`/flashcard/${deck.id}`)}
                className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div
                    className={`p-3 ${deck.color || "bg-blue-600"} rounded-lg text-white`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    Last studied: {formatLastStudied(deck.lastStudied)}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {deck.title}
                  </h2>
                  <p className="text-sm font-semibold text-gray-600 mt-1">
                    {deck.cards} Cards
                  </p>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-700">Mastery</span>
                    <span className="text-gray-900 font-bold">
                      {deck.mastery}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${deck.progressColor || "bg-sky-700"} rounded-full transition-all duration-300`}
                      style={{ width: `${deck.mastery}%` }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-sky-100 text-sky-700 rounded-lg">
                  <PlusIcon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Create New Deck
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-slate-100 transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDeckSubmit} className="p-6 space-y-5">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
                  {formError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-900">
                  Deck Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Medical Spanish, Advanced React"
                  value={newDeck.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewDeck({ ...newDeck, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-700 text-sm text-gray-900 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-900">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief summary..."
                  value={newDeck.description || ""}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setNewDeck({ ...newDeck, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-700 text-sm text-gray-900 transition-all resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-gray-700 text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 disabled:opacity-50 text-white text-sm font-medium transition-colors shadow-sm cursor-pointer"
                >
                  {isSubmitting ? "Creating..." : "Create Deck"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default FlashcardLibrary;
