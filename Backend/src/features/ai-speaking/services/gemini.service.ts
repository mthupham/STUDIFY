import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

export interface GrammarFeedback {
  explanation: string;
  grammarRule: string;
  example: string;
  improvementTip: string;
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
    errors: {
      text: string;
      suggestion: string;
      message: string;
      ruleId: string;
    }[],
    scenario?: string,
  ): Promise<GrammarFeedback> {
    try {
      const prompt = `
You are an English grammar tutor for software developers.

The learner is practicing spoken English in this scenario:
${scenario ?? 'general'}

Original sentence:
"${originalSentence}"

The grammar checker detected these errors:
${JSON.stringify(errors, null, 2)}

Your task is to explain the detected grammar errors.

IMPORTANT RULES:
1. Do NOT invent additional grammar errors.
2. Only explain errors provided by the grammar checker.
3. Keep the explanation suitable for an English learner.
4. Use simple and clear English.
5. The example should be relevant to software engineering when possible.
6. Give one practical improvement tip.
7. Return ONLY valid JSON.
8. Do not use markdown code fences.

Return exactly this structure:

{
  "explanation": "...",
  "grammarRule": "...",
  "example": "...",
  "improvementTip": "..."
}
`;

      const response = await this.client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text;

      if (!text) {
        throw new Error('Gemini returned an empty response');
      }

      return JSON.parse(text) as GrammarFeedback;
    } catch (error) {
      console.error(
        'Gemini grammar feedback error:',
        error,
      );

      throw new InternalServerErrorException(
        'Failed to generate grammar feedback',
      );
    }
  }
}