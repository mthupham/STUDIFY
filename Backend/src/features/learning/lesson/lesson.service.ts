import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from './models/lesson.model';
import { VocabularyItem } from './models/vocabulary-item.model';
import { GrammarItem } from './models/grammar-item.model';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson)
    private lessonModel: typeof Lesson,
    @InjectModel(VocabularyItem)
    private vocabModel: typeof VocabularyItem,
    @InjectModel(GrammarItem)
    private grammarModel: typeof GrammarItem,
  ) {}

  // 1. Lấy danh sách tất cả các bài học theo Level (A1, A2, B2...)
  async getLessonsByLevel(level: string) {
    return await this.lessonModel.findAll({
      where: { level: level.toUpperCase() },
      order: [['order_index', 'ASC']],
    });
  }

  // 2. Lấy chi tiết nội dung 1 bài học theo lessonId (Bao gồm Vocab/Grammar)
  async getLessonDetail(lessonId: string) {
    const lesson = await this.lessonModel.findOne({
      where: { id: lessonId },
      include: [
        { model: VocabularyItem },
        { model: GrammarItem },
      ],
    });

    if (!lesson) {
      throw new NotFoundException(`Không tìm thấy bài học với ID: ${lessonId}`);
    }

    return {
      success: true,
      data: lesson,
    };
  }
}