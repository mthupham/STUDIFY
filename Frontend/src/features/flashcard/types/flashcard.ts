export interface FlashcardDeck {
  id: number;
  title: string;
  description?: string | null;
  category: string;
  cards: number;
  lastStudied: string;
  mastery: number;
  color: string;
  progressColor: string;
  isPublic?: boolean;
}

export interface DeckDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  totalCards: number;
  masteredCount: number;
  masteryPercentage: number;
}

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  isMastered: boolean;
}

export interface CreateDeckDto {
  title: string;
  description?: string;
  category?: string;
  color?: string;
  progressColor?: string;
  isPublic?: boolean;
}

export interface CreateCardDto {
  front: string;
  back: string;
}

export interface UpdateCardDto {
  front: string;
  back: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}