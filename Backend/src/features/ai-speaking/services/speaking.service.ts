import { BadRequestException, Injectable } from '@nestjs/common';
import { LanguageToolService } from '../services/language-tool.service';
import { GeminiService } from '../services/gemini.service';
import { SPEAKING_QUESTIONS } from '../data/speaking-questions';

import type {
  GrammarError,
  SpeakingAnalysisResponse,
} from '../interfaces/speaking-analysis.interface';

@Injectable()
export class SpeakingService {
  constructor(
    private readonly languageToolService: LanguageToolService,
    private readonly geminiService: GeminiService,
  ) {}

  // ==========================================
  // RANDOM QUESTION
  // ==========================================

  getRandomQuestion(scenario: string) {
    const questions = SPEAKING_QUESTIONS.filter(
      (question) => question.scenario === scenario,
    );

    if (questions.length === 0) {
      throw new BadRequestException(
        `No speaking questions found for scenario: ${scenario}`,
      );
    }

    const randomIndex = Math.floor(Math.random() * questions.length);

    return questions[randomIndex];
  }

  async analyzeSpeaking(
    transcript: string,
    scenario: string,
  ): Promise<SpeakingAnalysisResponse> {
    const languageToolResult =
      await this.languageToolService.checkGrammar(transcript);

    const errors: GrammarError[] = languageToolResult.matches
      .filter(
        (match) =>
          match.rule?.issueType === 'grammar' || !match.rule?.issueType,
      )
      .map((match) => {
        const errorText =
          match.context?.text?.slice(
            match.context.offset,
            match.context.offset + match.context.length,
          ) ?? transcript.slice(match.offset, match.offset + match.length);

        return {
          text: errorText,
          suggestion: match.replacements?.[0]?.value ?? '',
          message: match.message,
          ruleId: match.rule?.id ?? '',
          issueType: match.rule?.issueType ?? 'grammar',
        };
      });

    // Không có lỗi
    if (errors.length === 0) {
      return {
        transcript,
        grammar: {
          hasErrors: false,
          score: 100,
          errors: [],
        },
        technicalVocabulary: {
          score: 0,
          usedTerms: [],
          suggestions: [],
          feedback: '',
        },
        clarity: {
          score: 0,
          strengths: [],
          suggestions: [],
          feedback: '',
        },
      };
    }

    // Có lỗi
    const score = this.calculateGrammarScore(transcript, errors.length);

    const feedback = await this.geminiService.explainGrammarError(
      transcript,
      errors,
      scenario,
    );

    return {
      transcript,
      grammar: {
        hasErrors: false,
        score: 100,
        errors: [],
      },
      technicalVocabulary: {
        score: 0,
        usedTerms: [],
        suggestions: [],
        feedback: '',
      },
      clarity: {
        score: 0,
        strengths: [],
        suggestions: [],
        feedback: '',
      },
    };
  }

  private calculateGrammarScore(
    transcript: string,
    errorCount: number,
  ): number {
    if (!transcript.trim()) {
      return 0;
    }

    if (errorCount === 0) {
      return 100;
    }

    const wordCount = transcript.trim().split(/\s+/).length;

    /*
     * Simple MVP scoring:
     *
     * 0 errors       -> 100
     * 1 error        -> small deduction
     * More errors    -> larger deduction
     *
     * Minimum score = 0
     */

    const errorRate = errorCount / Math.max(wordCount, 1);

    const score = Math.round(100 - errorRate * 100);

    return Math.max(0, Math.min(100, score));
  }
}
