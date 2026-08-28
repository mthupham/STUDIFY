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
      (item) => item.level?.toUpperCase() === levelKey,
    );

    if (!levelData) {
      throw new BadRequestException(`Level ${levelId} not found in curriculum data`);
    }

    // The Lessons page exposes two practices for every vocabulary topic:
    // reading and writing. Use those same items for the dashboard percentage
    // so a fully completed Lessons page always produces 100%.
    const lessonIds = (levelData.vocabulary_lessons || []).flatMap((lesson) => [
      `${lesson.topic_id}_reading`,
      `${lesson.topic_id}_writing`,
    ]);
    const totalLessons = lessonIds.length;

    // Get completed lessons from database (both types)
    const completedLessons = await this.progressModel.count({
      where: {
        userId,
        lessonId: lessonIds,
        isCompleted: true,
      },
      distinct: true,
      col: 'lessonId',
    });

    const percent =
      totalLessons === 0
        ? 0
        : Math.round((completedLessons / totalLessons) * 100);

    return { levelId, totalLessons, completedLessons, percent };
  }

  // Lấy danh sách lesson trong một level kèm trạng thái hoàn thành
  async getLessonsWithStatus(userId: number, levelId: string) {
    const levelKey = levelId.toUpperCase();

    // Get all lessons from curriculum data
    const levelData = this.lessonData.find(
      (item) => item.level?.toUpperCase() === levelKey,
    );

    if (!levelData) {
      throw new BadRequestException(`Level ${levelId} not found in curriculum data`);
    }

    // Get all lesson IDs from both vocabulary and grammar
    const vocabLessons = (levelData.vocabulary_lessons || []).map((lesson) => ({
      lessonId: lesson.topic_id,
      lessonType: 'vocabulary',
    }));
    const grammarLessons = (levelData.grammar_lessons || []).map((lesson) => ({
      lessonId: lesson.grammar_id,
      lessonType: 'grammar',
    }));

    const allLessons = [...vocabLessons, ...grammarLessons];

    // Include practice records (for example A2_T1_reading) so the Lessons page
    // can unlock the next practice, while getLevelProgress still counts only
    // the curriculum vocabulary and grammar IDs.
    const prefix = `${levelKey}_`;
    const progresses = await this.progressModel.findAll({
      where: {
        userId,
        lessonId: { [Op.like]: `${prefix}%` },
      },
      raw: true,
    });

    // Create a map for quick lookup
    const progressMap = new Map(
      progresses.map((progress) => [
        progress.lessonId,
        {
          isCompleted: progress.isCompleted,
          completedAt: progress.completedAt,
        },
      ]),
    );

    const curriculumStatuses = allLessons.map(({ lessonId, lessonType }) => ({
      lessonId,
      lessonType,
      isCompleted: progressMap.get(lessonId)?.isCompleted || false,
      completedAt: progressMap.get(lessonId)?.completedAt || null,
    }));

    const curriculumIds = new Set(allLessons.map((lesson) => lesson.lessonId));
    const practiceStatuses = progresses
      .filter((progress) => !curriculumIds.has(progress.lessonId))
      .map((progress) => ({
        lessonId: progress.lessonId,
        lessonType: progress.lessonType,
        isCompleted: progress.isCompleted,
        completedAt: progress.completedAt,
      }));

    return [...curriculumStatuses, ...practiceStatuses];
  }
}
