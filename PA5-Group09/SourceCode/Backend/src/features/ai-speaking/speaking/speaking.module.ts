import { Module } from '@nestjs/common';

import { SpeakingController } from './speaking.controller';
import { SpeakingService } from '../services/speaking.service';
import { LanguageToolService } from '../services/language-tool.service';
import { GeminiService } from '../services/gemini.service';

@Module({
  controllers: [SpeakingController],
  providers: [
    SpeakingService,
    LanguageToolService,
    GeminiService,
  ],
})
export class SpeakingModule {}
