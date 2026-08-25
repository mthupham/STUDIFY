import { Test } from '@nestjs/testing';
import { FlashcardController } from '../../../Backend/src/features/flashcard/flashcard.controller';
import { FlashcardService } from '../../../Backend/src/features/flashcard/flashcard.service';

describe('FlashcardController', () => {
  let controller: FlashcardController;
  let service: { create: jest.Mock; findAll: jest.Mock; update: jest.Mock; remove: jest.Mock };

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [FlashcardController],
      providers: [{ provide: FlashcardService, useValue: service }],
    }).compile();

    controller = module.get<FlashcardController>(FlashcardController);
  });

  it('creates a flashcard with required fields', async () => {
    service.create.mockResolvedValue({ id: '1', term: 'Hello', explanation: 'Greeting', tags: ['basic'] });

    const result = await controller.create({ term: 'Hello', explanation: 'Greeting', tags: ['basic'] });

    expect(service.create).toHaveBeenCalledWith({ term: 'Hello', explanation: 'Greeting', tags: ['basic'] });
    expect(result.term).toBe('Hello');
  });

  it('returns flashcards filtered by tag', async () => {
    service.findAll.mockResolvedValue([{ id: '1', term: 'Verb', explanation: 'Action word', tags: ['grammar'] }]);

    const result = await controller.findAll('grammar');

    expect(service.findAll).toHaveBeenCalledWith('grammar');
    expect(result).toHaveLength(1);
  });
});
