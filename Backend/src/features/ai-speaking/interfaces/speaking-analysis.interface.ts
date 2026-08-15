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

export interface VocabularyAnalysis {
  score: number;
  usedTerms: string[];
  suggestions: string[];
  feedback: string;
}

export interface ClarityAnalysis {
  score: number;
  strengths: string[];
  suggestions: string[];
  feedback: string;
}

export interface SpeakingAnalysisResponse {
  transcript: string;
  grammar: GrammarAnalysis;
  technicalVocabulary: VocabularyAnalysis;
  clarity: ClarityAnalysis;
  feedback?: GrammarFeedback;
}