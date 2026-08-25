import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Deck } from '../../models/deck.model';
import { Flashcard } from '../../models/flashcard.model';
import { CreateDeckDto } from './dto/create-deck.dto';
import { NotFoundException } from '@nestjs/common';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';

@Injectable()
export class FlashcardService {
  constructor(
    @InjectModel(Deck)
    private readonly deckModel: typeof Deck,

    @InjectModel(Flashcard)
    private readonly flashcardModel: typeof Flashcard,
  ) {}

  async getDecksByUser(userId: number) {
    const decks = await this.deckModel.findAll({
      where: {
        userId,
      },
      order: [['created_at', 'DESC']],
    });

    const data = await Promise.all(
      decks.map(async (deck) => {
        const totalCards = await this.flashcardModel.count({
          where: {
            deckId: deck.id,
          },
        });

        const masteredCards = await this.flashcardModel.count({
          where: {
            deckId: deck.id,
            isMastered: true,
          },
        });

        const mastery =
          totalCards === 0 ? 0 : Math.round((masteredCards / totalCards) * 100);

        return {
          id: deck.id,
          title: deck.title,
          cards: totalCards,
          lastStudied: deck.lastStudiedAt ? deck.lastStudiedAt : 'Never',
          mastery,
          color: deck.color,
          progressColor: deck.progressColor,
          category: deck.category,
        };
      }),
    );

    return {
      success: true,
      data,
    };
  }

  async createDeck(userId: number, dto: CreateDeckDto) {
    const deck = await this.deckModel.create({
      userId,
      title: dto.title,
      description: dto.description ?? null,
      category: dto.category ?? 'General',
      color: dto.color ?? 'bg-blue-600',
      progressColor: dto.progressColor ?? 'bg-sky-700',
      isPublic: dto.isPublic ?? false,
    });

    return {
      success: true,
      message: 'Deck created successfully',
      data: {
        id: deck.id,
        title: deck.title,
        description: deck.description,
        category: deck.category,
        color: deck.color,
        progressColor: deck.progressColor,
        isPublic: deck.isPublic,
        cards: 0,
        mastery: 0,
        lastStudied: 'Never',
      },
    };
  }

  async getCards(deckId: number, filter: 'all' | 'unmastered' = 'all') {
    const where: any = {
      deckId,
    };

    if (filter === 'unmastered') {
      where.isMastered = false;
    }

    const cards = await Flashcard.findAll({
      where,
      order: [['id', 'ASC']],
    });

    return {
      success: true,
      data: cards.map((card) => ({
        id: card.id,
        front: card.front,
        back: card.back,
        isMastered: card.isMastered,
      })),
    };
  }

  async createCard(deckId: number, dto: CreateFlashcardDto) {
    const deck = await Deck.findByPk(deckId);

    if (!deck) {
      throw new NotFoundException('Deck not found');
    }

    const card = await Flashcard.create({
      deckId,
      front: dto.front,
      back: dto.back,
      isMastered: false,
    });

    return {
      success: true,
      message: 'Flashcard added successfully',
      data: {
        id: card.id,
        front: card.front,
        back: card.back,
        isMastered: card.isMastered,
      },
    };
  }
  async touchStudy(deckId: number, userId: number) {
    const deck = await Deck.findOne({
      where: {
        id: deckId,
        userId,
      },
    });

    if (!deck) {
      throw new NotFoundException('Deck not found');
    }

    await deck.update({
      lastStudiedAt: new Date(),
    });

    return {
      success: true,
      message: 'Study timestamp updated',
    };
  }

  async updateCard(cardId: number, dto: UpdateFlashcardDto, userId: number) {
    const card = await Flashcard.findByPk(cardId);

    if (!card) {
      throw new NotFoundException('Flashcard not found');
    }

    const deck = await Deck.findOne({
      where: {
        id: card.deckId,
        userId,
      },
    });

    if (!deck) {
      throw new NotFoundException('Flashcard not found');
    }

    await card.update({
      front: dto.front,
      back: dto.back,
    });

    return {
      success: true,
      message: 'Card updated successfully',
      data: {
        id: card.id,
        front: card.front,
        back: card.back,
        isMastered: card.isMastered,
      },
    };
  }

  async updateMastery(cardId: number, isMastered: boolean, userId: number) {
    const card = await Flashcard.findByPk(cardId);

    if (!card) {
      throw new NotFoundException('Flashcard not found');
    }

    const deck = await Deck.findOne({
      where: {
        id: card.deckId,
        userId,
      },
    });

    if (!deck) {
      throw new NotFoundException('Flashcard not found');
    }

    await card.update({
      isMastered,
    });

    return {
      success: true,
      message: 'Mastery status updated',
      data: {
        id: card.id,
        isMastered: card.isMastered,
      },
    };
  }

  async deleteCard(cardId: number, userId: number) {
    const card = await Flashcard.findByPk(cardId);

    if (!card) {
      throw new NotFoundException('Flashcard not found');
    }

    const deck = await Deck.findOne({
      where: {
        id: card.deckId,
        userId,
      },
    });

    if (!deck) {
      throw new NotFoundException('Flashcard not found');
    }

    await card.destroy();

    return {
      success: true,
      message: 'Flashcard deleted successfully',
    };
  }

  async getDeckDetail(deckId: number, userId: number) {
    const deck = await this.deckModel.findOne({
      where: {
        id: deckId,
        userId,
      },
    });

    if (!deck) {
      throw new NotFoundException('Deck not found');
    }

    const totalCards = await this.flashcardModel.count({
      where: {
        deckId,
      },
    });

    const masteredCards = await this.flashcardModel.count({
      where: {
        deckId,
        isMastered: true,
      },
    });

    const mastery =
      totalCards === 0 ? 0 : Math.round((masteredCards / totalCards) * 100);

    return {
      success: true,
      data: {
        id: deck.id,
        title: deck.title,
        description: deck.description,
        category: deck.category,
        color: deck.color,
        progressColor: deck.progressColor,
        isPublic: deck.isPublic,
        cards: totalCards,
        mastery,
        lastStudied: deck.lastStudiedAt,
      },
    };
  }
}
