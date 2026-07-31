import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlacementTestResult } from '../../../models/placement_test_result.model';
import { UserProgress } from '../../../models/user_progress.model';
import * as path from 'path';
import * as fs from 'fs';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const LEVEL_MAP: Record<string, string> = {
  BEGINNER: 'A1',
  INTERMEDIATE: 'B1',
  ADVANCED: 'C1',
  A1: 'A1', A2: 'A2', B1: 'B1', B2: 'B2', C1: 'C1', C2: 'C2',
};

@Injectable()
export class RoadmapService {
  private lessonData: any[] = [];

  constructor(
    @InjectModel(PlacementTestResult)
    private resultModel: typeof PlacementTestResult,
    @InjectModel(UserProgress)
    private progressModel: typeof UserProgress,
  ) {
    const filePath = path.join(process.cwd(), 'database', 'data', 'lesson.json');
    if (fs.existsSync(filePath)) {
      this.lessonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  }
  private calculateStreak(progressRecords: UserProgress[]): number {
  const completedDates = progressRecords
    .filter((record) => record.isCompleted && record.completedAt)
    .map((record) => {
      const date = new Date(record.completedAt);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    });

  const uniqueDates = [...new Set(completedDates)].sort((a, b) => b - a);

  if (uniqueDates.length === 0) {
    return 0;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const latestDate = uniqueDates[0];

  if (
    latestDate !== today.getTime() &&
    latestDate !== yesterday.getTime()
  ) {
    return 0;
  }

  let streak = 1;

  for (let index = 1; index < uniqueDates.length; index++) {
    const previousDate = uniqueDates[index - 1];
    const currentDate = uniqueDates[index];

    const differenceInDays =
      (previousDate - currentDate) / (1000 * 60 * 60 * 24);

    if (differenceInDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

  async getRoadmapForUser(userId: number) {
    // 1. Lấy level được assign từ placement test gần nhất
    const latestResult = await this.resultModel.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    const rawLevel = latestResult?.levelAssigned || 'BEGINNER';
    const assignedLevel = LEVEL_MAP[rawLevel] || 'A1';

    // 2. Lấy toàn bộ tiến độ thật của user, map theo lessonId để tra cứu nhanh
    const progressRecords = await this.progressModel.findAll({
      where: { userId },
    });
    const completedMap = new Map(
      progressRecords.filter((p) => p.isCompleted).map((p) => [p.lessonId, true]),
    );

    // 3. Build views từ lesson.json — tất cả levels, mỗi level các node theo trạng thái thật
    let globalOrder = 1;
    const views = LEVELS.map((level) => {
      const levelData = this.lessonData.find((l) => l.level === level);
      if (!levelData) return { id: `view${level}`, label: level, level, nodes: [] };

      const vocabLessons = levelData.vocabulary_lessons || [];
      const grammarLessons = levelData.grammar_lessons || [];
      const allLessons = [
        ...vocabLessons.map((v: any) => ({ id: v.topic_id, label: v.topic_name, type: 'vocabulary' })),
        ...grammarLessons.map((g: any) => ({ id: g.grammar_id, label: g.grammar_title, type: 'grammar' })),
      ];

      // Tìm bài đầu tiên CHƯA hoàn thành trong level này — đó sẽ là "active"
      const firstUncompletedIndex = allLessons.findIndex((l) => !completedMap.has(l.id));

      const nodes = allLessons.map((lesson, index) => {
        const position = Math.round(5 + (index / Math.max(allLessons.length - 1, 1)) * 90);
        const row = index % 2 === 0 ? 'top' : 'bottom';

        let status = 'locked';
        if (completedMap.has(lesson.id)) {
          status = 'completed';
        } else if (index === firstUncompletedIndex) {
          status = 'active';
        }

        return {
          id: lesson.id,
          type: lesson.type,
          label: lesson.label,
          position,
          row,
          status,
          order: globalOrder++,
        };
      });

      return { id: `view${level}`, label: level, level, nodes };
    });

    // 4. Tính metrics dựa trên số lesson thực sự đã hoàn thành (toàn bộ, không chỉ level hiện tại)
    const totalLessons = views.reduce((sum, v) => sum + v.nodes.length, 0);
    const completedLessonsCount = completedMap.size;
    const streak = this.calculateStreak(progressRecords);

    return {
      levels: LEVELS,
      assignedLevel,
      levelTitle: this.lessonData.find((l) => l.level === assignedLevel)?.level_title || '',
      views,
      metrics: {
        level: assignedLevel,
        lessons: `${completedLessonsCount}/${totalLessons}`,
        streak,
        tip: 'If you pass your quiz, you will unlock the next level immediately',
      },
    };
  }
}