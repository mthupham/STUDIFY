import { Injectable, BadRequestException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import * as path from 'path';
import * as fs from 'fs';
import { UserProgress, LessonType } from '../../models/user_progress.model';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ProgressService implements OnModuleInit {
  private lessonData: any[] = [];

  constructor(
    @InjectModel(UserProgress) private progressModel: typeof UserProgress,
    private readonly notificationService: NotificationService,
  ) {}

  onModuleInit() {
    const filePath = path.resolve(
      __dirname,
      '../../../database/data/lesson.json',
    );

    if (fs.existsSync(filePath)) {
      this.lessonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  }

  // Trả về đúng lessonType value sau khi normalize
  private validateType(lessonType: string): string {
    const normalized = (lessonType || '').toLowerCase();
    if (!Object.values(LessonType).includes(normalized as LessonType)) {
      throw new BadRequestException('Invalid lesson type.');
    }
    return normalized;
  }

  // Đánh dấu hoàn thành một bài học (lessonId là string như "A1_G1", "A1_T1")
  async completeLesson(userId: number, lessonId: string, lessonType: string) {
    const type = this.validateType(lessonType);

    const [progress, created] = await this.progressModel.findOrCreate({
      where: { userId, lessonId, lessonType: type },
      defaults: { userId, lessonId, lessonType: type, isCompleted: true, completedAt: new Date() } as any,
    });

    const becameCompleted = created || !progress.isCompleted;

    if (!progress.isCompleted) {
      progress.isCompleted = true;
      progress.completedAt = new Date();
      await progress.save();
    }

    if (becameCompleted) {
      await this.createNextLessonUnlockedNotification(userId, lessonId);
    }

    return { success: true, message: 'Đã đánh dấu hoàn thành bài học.' };
  }

  // Tính % hoàn thành trong một level (levelId là string như "A1", "B2")
  // Dùng prefix matching trên lessonId thay vì join DB
  private async createNextLessonUnlockedNotification(
    userId: number,
    completedLessonId: string,
  ) {
    const level = completedLessonId.split('_')[0]?.toUpperCase();
    const levelData = this.lessonData.find(
      (item) => item.level?.toUpperCase() === level,
    );

    if (!levelData) return;

    const vocabularyLessons = levelData.vocabulary_lessons || [];
    const grammarLessons = levelData.grammar_lessons || [];
    const pairedLessonCount = Math.min(
      vocabularyLessons.length,
      grammarLessons.length,
    );
    const currentIndex = Array.from(
      { length: pairedLessonCount },
      (_, index) => index,
    ).find(
      (index) =>
        vocabularyLessons[index].topic_id === completedLessonId ||
        grammarLessons[index].grammar_id === completedLessonId,
    );

    if (currentIndex === undefined || currentIndex >= pairedLessonCount - 1) {
      return;
    }

    const completedPairCount = await this.progressModel.count({
      where: {
        userId,
        lessonId: [
          vocabularyLessons[currentIndex].topic_id,
          grammarLessons[currentIndex].grammar_id,
        ],
        isCompleted: true,
      },
    });

    if (completedPairCount !== 2) return;

    const nextIndex = currentIndex + 1;
    const nextVocabulary = vocabularyLessons[nextIndex];
    const nextGrammar = grammarLessons[nextIndex];
    const nextLessonName = [
      nextVocabulary.topic_name,
      nextGrammar.grammar_title,
    ]
      .filter(Boolean)
      .join(' & ');

    await this.notificationService.createLessonUnlockedNotification(
      userId,
      `${level}_L${nextIndex + 1}`,
      `Lesson ${nextIndex + 1} - ${nextLessonName}`,
    );
  }

  async getLevelProgress(userId: number, levelId: string, lessonType: string) {
    const type = this.validateType(lessonType);
    const prefix = `${levelId.toUpperCase()}_`;

    const allInLevel = await this.progressModel.findAll({
      where: {
        userId,
        lessonType: type,
        lessonId: { [Op.like]: `${prefix}%` },
      },
    });

    const totalLessons = allInLevel.length;
    const completedLessons = allInLevel.filter((p) => p.isCompleted).length;
    const percent = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

    return { levelId, lessonType: type, totalLessons, completedLessons, percent };
  }

  // Lấy danh sách lesson trong một level kèm trạng thái hoàn thành
  async getLessonsWithStatus(userId: number, levelId: string, lessonType: string) {
    const type = this.validateType(lessonType);
    const prefix = `${levelId.toUpperCase()}_`;

    const progresses = await this.progressModel.findAll({
      where: {
        userId,
        lessonType: type,
        lessonId: { [Op.like]: `${prefix}%` },
      },
      raw: true,
    });

    return progresses.map((p) => ({
      lessonId: p.lessonId,
      lessonType: p.lessonType,
      isCompleted: p.isCompleted,
      completedAt: p.completedAt,
    }));
  }
}
