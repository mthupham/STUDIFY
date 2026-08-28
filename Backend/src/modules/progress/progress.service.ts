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

  async getLevelProgress(userId: number, levelId: string) {
    const levelKey = levelId.toUpperCase();

    // Get total lessons from lesson data (JSON file) - this reflects the full curriculum
    const levelData = this.lessonData.find(
      (item) => item.level?.toUpperCase() === levelKey
    );

    if (!levelData) {
      throw new BadRequestException(`Level ${levelId} not found in curriculum data`);
    }

    // Get total lessons from both vocabulary and grammar
    const vocabLessons = (levelData.vocabulary_lessons || []).length;
    const grammarLessons = (levelData.grammar_lessons || []).length;
    const totalLessons = vocabLessons + grammarLessons;

    // Get completed lessons from database (both types)
    const prefix = `${levelKey}_`;
    const completedLessons = await this.progressModel.count({
      where: {
        userId,
        lessonId: { [Op.like]: `${prefix}%` },
        isCompleted: true,
      },
    });

    const percent = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

    return { levelId, totalLessons, completedLessons, percent };
  }

  // Lấy danh sách lesson trong một level kèm trạng thái hoàn thành
  async getLessonsWithStatus(userId: number, levelId: string) {
    const levelKey = levelId.toUpperCase();

    // Get all lessons from curriculum data
    const levelData = this.lessonData.find(
      (item) => item.level?.toUpperCase() === levelKey
    );

    if (!levelData) {
      throw new BadRequestException(`Level ${levelId} not found in curriculum data`);
    }

    // Get all lesson IDs from both vocabulary and grammar
    const vocabLessons = (levelData.vocabulary_lessons || []).map(l => ({
      lessonId: l.topic_id,
      lessonType: 'vocabulary'
    }));
    const grammarLessons = (levelData.grammar_lessons || []).map(l => ({
      lessonId: l.grammar_id,
      lessonType: 'grammar'
    }));

    const allLessons = [...vocabLessons, ...grammarLessons];

    // Get progress records for these lessons
    const progresses = await this.progressModel.findAll({
      where: {
        userId,
        lessonId: allLessons.map(l => l.lessonId),
      },
      raw: true,
    });

    // Create a map for quick lookup
    const progressMap = new Map(
      progresses.map(p => [p.lessonId, { 
        isCompleted: p.isCompleted, 
        completedAt: p.completedAt,
        lessonType: p.lessonType
      }])
    );

    // Return all lessons with their status
    return allLessons.map(({ lessonId, lessonType }) => ({
      lessonId,
      lessonType,
      isCompleted: progressMap.get(lessonId)?.isCompleted || false,
      completedAt: progressMap.get(lessonId)?.completedAt || null,
    }));
  }
}
