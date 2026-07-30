import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as path from 'path';
import * as fs from 'fs';
import { UserProgress } from '../../../models/user_progress.model';
import { UserService } from '../../../modules/user/user.service';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

@Injectable()
export class LessonService implements OnModuleInit {
  private lessonData: any[] = [];

  constructor(
    @InjectModel(UserProgress)
    private readonly progressModel: typeof UserProgress,
    private readonly userService: UserService,
  ) {}

  onModuleInit() {
    try {
      const filePath = path.join(process.cwd(), 'database', 'data', 'lesson.json');
      if (fs.existsSync(filePath)) {
        this.lessonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      }
    } catch (error) {
      console.error('[STUDIFY ERROR] Không thể đọc lesson.json:', (error as Error).message);
    }
  }

  private getAllLessonIdsInLevel(level: string): string[] {
    const levelData = this.lessonData.find((l) => l.level.toUpperCase() === level.toUpperCase());
    if (!levelData) return [];
    const vocabIds = (levelData.vocabulary_lessons || []).map((v: any) => v.topic_id);
    const grammarIds = (levelData.grammar_lessons || []).map((g: any) => g.grammar_id);
    return [...vocabIds, ...grammarIds];
  }

  async getLessonsByLevel(level: string, userId: number) {
    const levelData = this.lessonData.find(
      (l) => l.level.toUpperCase() === level.toUpperCase(),
    );
    if (!levelData) {
      throw new NotFoundException(`Không tìm thấy dữ liệu cho level ${level}`);
    }

    const vocabLessons = levelData.vocabulary_lessons || [];
    const grammarLessons = levelData.grammar_lessons || [];
    const allLessonIds = this.getAllLessonIdsInLevel(level);

    const progressRecords = await this.progressModel.findAll({
      where: { userId, lessonId: allLessonIds },
    });
    const progressMap = new Map(progressRecords.map((p) => [p.lessonId, p.isCompleted]));

    return [
      ...vocabLessons.map((v: any) => ({
        lessonId: v.topic_id,
        title: v.topic_name,
        type: 'VOCABULARY',
        totalItems: v.items?.length || 0,
        isCompleted: progressMap.get(v.topic_id) || false,
      })),
      ...grammarLessons.map((g: any) => ({
        lessonId: g.grammar_id,
        title: g.grammar_title,
        type: 'GRAMMAR',
        totalItems: g.examples?.length || 0,
        isCompleted: progressMap.get(g.grammar_id) || false,
      })),
    ];
  }

  async getLessonDetail(lessonId: string, userId: number) {
    for (const levelGroup of this.lessonData) {
      const vocabLesson = levelGroup.vocabulary_lessons?.find((l: any) => l.topic_id === lessonId);
      if (vocabLesson) {
        const progress = await this.progressModel.findOne({ where: { userId, lessonId } });
        return {
          success: true,
          data: {
            lessonId: vocabLesson.topic_id,
            type: 'VOCABULARY',
            level: levelGroup.level,
            levelTitle: levelGroup.level_title,
            title: vocabLesson.topic_name,
            content: vocabLesson.items || [],
            isCompleted: progress?.isCompleted || false,
          },
        };
      }

      const grammarLesson = levelGroup.grammar_lessons?.find((g: any) => g.grammar_id === lessonId);
      if (grammarLesson) {
        const progress = await this.progressModel.findOne({ where: { userId, lessonId } });
        return {
          success: true,
          data: {
            lessonId: grammarLesson.grammar_id,
            type: 'GRAMMAR',
            level: levelGroup.level,
            levelTitle: levelGroup.level_title,
            title: grammarLesson.grammar_title,
            content: {
              rule: grammarLesson.rule,
              explanation: grammarLesson.explanation,
              examples: grammarLesson.examples || [],
            },
            isCompleted: progress?.isCompleted || false,
          },
        };
      }
    }

    throw new NotFoundException(`Không tìm thấy bài học với ID: ${lessonId}`);
  }

  async markLessonComplete(lessonId: string, lessonType: 'VOCABULARY' | 'GRAMMAR', userId: number) {
    const [record] = await this.progressModel.findOrCreate({
      where: { userId, lessonId },
      defaults: {
        userId,
        lessonId,
        lessonType: lessonType.toLowerCase(),
        isCompleted: true,
        completedAt: new Date(),
      } as any,
    });

    if (!record.isCompleted) {
      await record.update({ isCompleted: true, completedAt: new Date() });
    }

    // Kiểm tra xem đã hoàn thành HẾT lesson trong level của bài này chưa -> tự động lên cấp
    const level = lessonId.split('_')[0]; // vd "A1_T1" -> "A1"
    const allLessonIds = this.getAllLessonIdsInLevel(level);

    if (allLessonIds.length > 0) {
      const completedInLevel = await this.progressModel.count({
        where: { userId, lessonId: allLessonIds, isCompleted: true },
      });

      let leveledUp = false;
      let newLevel: string | null = null;

      if (completedInLevel === allLessonIds.length) {
        const currentLevel = await this.userService.getCurrentLevel(userId);
        const currentIndex = LEVELS.indexOf(currentLevel);
        // Chỉ lên cấp nếu level vừa hoàn thành CHÍNH LÀ level hiện tại của user
        // (tránh trường hợp hoàn thành lại 1 level cũ đã qua rồi vô tình đẩy cấp)
        if (currentLevel === level && currentIndex >= 0 && currentIndex < LEVELS.length - 1) {
          newLevel = LEVELS[currentIndex + 1];
          await this.userService.setCurrentLevel(userId, newLevel);
          leveledUp = true;
        }
      }

      return {
        success: true,
        message: 'Đã đánh dấu hoàn thành bài học.',
        leveledUp,
        newLevel,
      };
    }

    return { success: true, message: 'Đã đánh dấu hoàn thành bài học.' };
  }
}