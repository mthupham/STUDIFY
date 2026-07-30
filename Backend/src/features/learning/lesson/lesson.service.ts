import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as path from 'path';
import * as fs from 'fs';
import { UserProgress } from '../../../models/user_progress.model';

@Injectable()
export class LessonService implements OnModuleInit {
  private lessonData: any[] = [];

  constructor(
    @InjectModel(UserProgress)
    private readonly progressModel: typeof UserProgress,
  ) {}

  onModuleInit() {
    try {
      const filePath = path.join(process.cwd(), 'database', 'data', 'lesson.json');
      if (fs.existsSync(filePath)) {
        this.lessonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        console.log(`[STUDIFY] LessonService đã nạp lesson.json: ${this.lessonData.length} levels`);
      }
    } catch (error) {
      console.error('[STUDIFY ERROR] Không thể đọc lesson.json:', (error as Error).message);
    }
  }

  // 1. Lấy danh sách tất cả bài học (vocab + grammar) theo level, kèm trạng thái hoàn thành của user
  async getLessonsByLevel(level: string, userId: number) {
    const levelData = this.lessonData.find(
      (l) => l.level.toUpperCase() === level.toUpperCase(),
    );
    if (!levelData) {
      throw new NotFoundException(`Không tìm thấy dữ liệu cho level ${level}`);
    }

    const vocabLessons = levelData.vocabulary_lessons || [];
    const grammarLessons = levelData.grammar_lessons || [];

    const allLessonIds = [
      ...vocabLessons.map((v: any) => v.topic_id),
      ...grammarLessons.map((g: any) => g.grammar_id),
    ];

    const progressRecords = await this.progressModel.findAll({
      where: { userId, lessonId: allLessonIds },
    });
    const progressMap = new Map(progressRecords.map((p) => [p.lessonId, p.isCompleted]));

    const lessons = [
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

    return lessons;
  }

  // 2. Lấy chi tiết nội dung 1 bài học (từ vựng hoặc ngữ pháp), kèm trạng thái hoàn thành
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

  // 3. Đánh dấu hoàn thành bài học (dùng ở Bước 4, viết sẵn luôn cho tiện)
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

    return { success: true, message: 'Đã đánh dấu hoàn thành bài học.' };
  }
}