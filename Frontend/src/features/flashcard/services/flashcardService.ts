import type {
  FlashcardDeck,
  DeckDetail,
  Flashcard,
  CreateDeckDto,
  CreateCardDto,
  UpdateCardDto,
  ApiResponse,
} from '../types/flashcard';

const BASE_URL = 'http://localhost:3000/api/v1/flashcards';

const getAuthHeaders = (): Record<string, string> => {
  const token =
    localStorage.getItem('token') ||
    localStorage.getItem('accessToken') ||
    localStorage.getItem('jwt') ||
    '';
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMessage =
      data?.message || data?.error || `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }
  return data;
}

export const flashcardService = {
  // --- Deck APIs ---
  getDecks: async (): Promise<ApiResponse<FlashcardDeck[]>> => {
    const res = await fetch(`${BASE_URL}/decks`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse<ApiResponse<FlashcardDeck[]>>(res);
  },

  createDeck: async (payload: CreateDeckDto): Promise<ApiResponse<FlashcardDeck>> => {
    const res = await fetch(`${BASE_URL}/decks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse<ApiResponse<FlashcardDeck>>(res);
  },

  getDeckDetail: async (deckId: string | number): Promise<ApiResponse<DeckDetail>> => {
    const res = await fetch(`${BASE_URL}/decks/${deckId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse<ApiResponse<DeckDetail>>(res);
  },

  touchStudy: async (deckId: string | number): Promise<ApiResponse<void>> => {
    const res = await fetch(`${BASE_URL}/decks/${deckId}/touch-study`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    return handleResponse<ApiResponse<void>>(res);
  },

  // --- Flashcard APIs ---
  getCards: async (
    deckId: string | number,
    filter: 'all' | 'unmastered' = 'all'
  ): Promise<ApiResponse<Flashcard[]>> => {
    const res = await fetch(`${BASE_URL}/decks/${deckId}/cards?filter=${filter}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse<ApiResponse<Flashcard[]>>(res);
  },

  createCard: async (
    deckId: string | number,
    data: CreateCardDto
  ): Promise<ApiResponse<Flashcard>> => {
    const res = await fetch(`${BASE_URL}/decks/${deckId}/cards`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<ApiResponse<Flashcard>>(res);
  },

  updateCard: async (
    cardId: string | number,
    data: UpdateCardDto
  ): Promise<ApiResponse<Flashcard>> => {
    const res = await fetch(`${BASE_URL}/cards/${cardId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<ApiResponse<Flashcard>>(res);
  },

  updateCardMastery: async (
    cardId: string | number,
    isMastered: boolean
  ): Promise<ApiResponse<void>> => {
    const res = await fetch(`${BASE_URL}/cards/${cardId}/mastery`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ isMastered }),
    });
    return handleResponse<ApiResponse<void>>(res);
  },

  deleteCard: async (cardId: string | number): Promise<ApiResponse<void>> => {
    const res = await fetch(`${BASE_URL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse<ApiResponse<void>>(res);
  },
};