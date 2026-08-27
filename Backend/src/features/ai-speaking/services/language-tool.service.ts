import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';

export interface LanguageToolMatch {
  message: string;
  shortMessage: string;
  offset: number;
  length: number;
  replacements: {
    value: string;
  }[];
  rule: {
    id: string;
    description: string;
    issueType?: string;
  };
  context?: {
    text: string;
    offset: number;
    length: number;
  };
}

export interface LanguageToolResponse {
  matches: LanguageToolMatch[];
}

@Injectable()
export class LanguageToolService {
  async checkGrammar(
    text: string,
  ): Promise<LanguageToolResponse> {
    try {
      const response =
        await axios.post<LanguageToolResponse>(
          'https://api.languagetool.org/v2/check',
          new URLSearchParams({
            text,
            language: 'en-US',
          }),
          {
            headers: {
              'Content-Type':
                'application/x-www-form-urlencoded',
            },
          },
        );

      return response.data;
    } catch (error) {
      console.error(
        'LanguageTool error:',
        error,
      );

      throw new InternalServerErrorException(
        'Failed to check grammar',
      );
    }
  }
}