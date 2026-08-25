import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Deck } from '../../models/deck.model';
import { Flashcard } from '../../models/flashcard.model';

import { FlashcardController } from './flashcard.controller';
import { FlashcardService } from './flashcard.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Deck,
      Flashcard,
    ]),
  ],
  controllers: [
    FlashcardController,
  ],
  providers: [
    FlashcardService,
  ],
})
export class FlashcardModule {}