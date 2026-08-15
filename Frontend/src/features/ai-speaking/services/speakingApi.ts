import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface SpeakingQuestion {
  id: string;
  scenario: string;
  question: string;
}

export interface GrammarError {
  text: string;
  suggestion: string;
  message: string;
  ruleId: string;
  issueType: string;
}

export interface GrammarAnalysis {
  hasErrors: boolean;
  score: number;
  errors: GrammarError[];
}

export interface GrammarFeedback {
  explanation: string;
  grammarRule: string;
  example: string;
  improvementTip: string;
}

export interface SpeakingAnalysisResponse {
  transcript: string;
  grammar: GrammarAnalysis;
  feedback?: GrammarFeedback;
}

export async function getRandomQuestion(
  scenario: string,
): Promise<SpeakingQuestion> {
  const response = await axios.get<SpeakingQuestion>(
    `${BASE_URL}/speaking/questions/random`,
    {
      params: { scenario },
    },
  );
  return response.data;
}

export async function analyzeSpeaking(
  transcript: string,
  scenario: string,
): Promise<SpeakingAnalysisResponse> {
  const response = await axios.post<SpeakingAnalysisResponse>(
    `${BASE_URL}/speaking/analyze`,
    {
      transcript,
      scenario,
    },
  );

  return response.data;
}