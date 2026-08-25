import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { SpeakingService } from '../services/speaking.service';
import { LanguageToolService } from '../services/language-tool.service';

import { CheckGrammarDto } from '../dto/check-grammar.dto';
import { AnalyzeSpeakingDto } from '../dto/analyze-speaking.dto';

@Controller('speaking')
export class SpeakingController {
  constructor(
    private readonly speakingService: SpeakingService,
    private readonly languageToolService: LanguageToolService,
  ) {}

  @Get('questions/random')
  async getRandomQuestion(@Query('scenario') scenario: string) {
    console.log('SCENARIO:', scenario);

    const result = await this.speakingService.getRandomQuestion(scenario);

    console.log('RESULT:', result);

    return result;
  }

  @Post('grammar-check')
  async checkGrammar(@Body() body: CheckGrammarDto) {
    return this.languageToolService.checkGrammar(body.text);
  }

  @Post('analyze')
  async analyzeSpeaking(@Body() body: AnalyzeSpeakingDto) {
    return this.speakingService.analyzeSpeaking(body.transcript, body.scenario);
  }
}
