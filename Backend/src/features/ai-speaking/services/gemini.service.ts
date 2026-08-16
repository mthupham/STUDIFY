import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

import {
  GrammarError,
  GrammarFeedback,
  VocabularyAnalysis,
  ClarityAnalysis,
} from '../interfaces/speaking-analysis.interface';

interface SpeakingGeminiFeedback {
  grammar: GrammarFeedback;
  technicalVocabulary: VocabularyAnalysis;
  clarity: ClarityAnalysis;
}

@Injectable()
export class GeminiService {
  private readonly client: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    this.client = new GoogleGenAI({
      apiKey,
    });
  }

  async explainGrammarError(
    originalSentence: string,
    errors: GrammarError[],
    scenario?: string,
  ): Promise<SpeakingGeminiFeedback> {
    try {
      const prompt = `
You are an English speaking tutor for software developers.

The learner is practicing spoken English in this scenario:
${scenario ?? 'general'}

Original transcript:
"${originalSentence}"

The grammar checker detected these errors:
${JSON.stringify(errors, null, 2)}

Analyze the learner's speaking performance.

IMPORTANT RULES:
1. Do NOT invent additional grammar errors.
2. Only explain grammar errors provided by the grammar checker.
3. Analyze technical vocabulary based on the scenario.
4. Identify useful software-engineering terms that the learner actually used.
5. Suggest technical vocabulary that would improve the answer.
6. Analyze the clarity of the learner's answer.
7. Keep feedback suitable for an English learner.
8. Use simple and clear English.
9. Scores must be integers from 0 to 100.
10. Return ONLY valid JSON.
11. Do not use markdown code fences.

Return exactly this structure:

{
  "grammar": {
    "explanation": "...",
    "grammarRule": "...",
    "example": "...",
    "improvementTip": "..."
  },
  "technicalVocabulary": {
    "score": 0,
    "usedTerms": [],
    "suggestions": [],
    "feedback": "..."
  },
  "clarity": {
    "score": 0,
    "strengths": [],
    "suggestions": [],
    "feedback": "..."
  }
}
`;

      const response = await this.client.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text;

      if (!text) {
        throw new Error('Gemini returned an empty response');
      }

      console.log('===== GEMINI RAW RESPONSE =====');
      console.log(text);
      console.log('===== END GEMINI RAW RESPONSE =====');

      return JSON.parse(text) as SpeakingGeminiFeedback;
    } catch (error) {
      console.error('Gemini speaking feedback error:', error);

      throw new InternalServerErrorException(
        'Failed to generate speaking feedback',
      );
    }
  }
}
