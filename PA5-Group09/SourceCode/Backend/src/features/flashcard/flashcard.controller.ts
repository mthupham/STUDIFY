import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Param,
  Query,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import type { Request } from 'express';
import { FlashcardService } from './flashcard.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { JwtGuard } from '../../modules/auth/guards/jwt.guard';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { UpdateMasteryDto } from './dto/update-mastery.dto';

@ApiTags('Flashcards')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('api/v1/flashcards')
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @Get('decks')
  async getDecks(@Req() req: Request) {
    const user = req.user as {
      id: number;
      email: string;
      role: string;
    };

    return this.flashcardService.getDecksByUser(user.id);
  }

  @Post('decks')
  async createDeck(@Req() req: Request, @Body() dto: CreateDeckDto) {
    const user = req.user as {
      id: number;
      email: string;
      role: string;
    };

    return this.flashcardService.createDeck(user.id, dto);
  }

  @Get('decks/:deckId/cards')
  async getCards(
    @Param('deckId') deckId: number,
    @Query('filter') filter: 'all' | 'unmastered' = 'all',
  ) {
    return this.flashcardService.getCards(deckId, filter);
  }

  @Post('decks/:deckId/cards')
  async createCard(
    @Param('deckId') deckId: number,
    @Body() dto: CreateFlashcardDto,
  ) {
    return this.flashcardService.createCard(deckId, dto);
  }

  @Patch('decks/:deckId/touch-study')
  async touchStudy(@Param('deckId') deckId: number, @Req() req: Request) {
    const user = req.user as { id: number };

    return this.flashcardService.touchStudy(deckId, user.id);
  }

  @Put('cards/:cardId')
  async updateCard(
    @Param('cardId') cardId: number,
    @Body() dto: UpdateFlashcardDto,
    @Req() req: Request,
  ) {
    const user = req.user as { id: number };

    return this.flashcardService.updateCard(cardId, dto, user.id);
  }

  @Patch('cards/:cardId/mastery')
  async updateMastery(
    @Param('cardId') cardId: number,
    @Body() dto: UpdateMasteryDto,
    @Req() req: Request,
  ) {
    const user = req.user as { id: number };

    return this.flashcardService.updateMastery(cardId, dto.isMastered, user.id);
  }

  @Delete('cards/:cardId')
  async deleteCard(@Param('cardId') cardId: number, @Req() req: Request) {
    const user = req.user as { id: number };

    return this.flashcardService.deleteCard(cardId, user.id);
  }

  @Get('decks/:deckId')
async getDeckDetail(
  @Param('deckId') deckId: number,
  @Req() req: Request,
) {
  const user = req.user as { id: number };

  return this.flashcardService.getDeckDetail(deckId, user.id);
}
}
