import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlacementTestResult } from '../../../models/placement_test_result.model';
import { UserProgress } from '../../../models/user_progress.model';
import { UserService } from '../../../modules/user/user.service';
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
    private userService: UserService,
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
    // 1. Lấy level của user từ bảng User trước, nếu không có hoặc là mặc định thì xem placement test
    const user = await this.userService.getUserById(userId);
    let rawLevel = user?.currentLevel;

    if (!rawLevel) {
      const latestResult = await this.resultModel.findOne({
        where: { userId },
        order: [['createdAt', 'DESC']],
      });
      rawLevel = latestResult?.levelAssigned || 'BEGINNER';
    }

    const assignedLevel = LEVEL_MAP[rawLevel] || 'A1';
    const assignedIndex = LEVELS.indexOf(assignedLevel); 

    // 2. Lấy toàn bộ tiến độ thật của user, map theo lessonId để tra cứu nhanh
    const progressRecords = await this.progressModel.findAll({
      where: { userId },
    });
    const completedMap = new Map(
      progressRecords.filter((p) => p.isCompleted).map((p) => [p.lessonId, true]),
    );

    // 3. Build views từ lesson.json — tất cả levels, mỗi level các node theo trạng thái thật
    let globalOrder = 1;
    const views = LEVELS.map((level, levelIndex) => {
      const levelData = this.lessonData.find((l) => l.level === level);
      if (!levelData) return { id: `view${level}`, label: level, level, nodes: [] };

      const vocabLessons = levelData.vocabulary_lessons || [];
      const grammarLessons = levelData.grammar_lessons || [];
      const numLessons = Math.min(vocabLessons.length, grammarLessons.length);

      // Tìm bài đầu tiên CHƯA hoàn thành trong level này — đó sẽ là "active"
      let firstUncompletedIndex = -1;
      for (let i = 0; i < numLessons; i++) {
        const isVocabCompleted = completedMap.has(vocabLessons[i].topic_id);
        const isGrammarCompleted = completedMap.has(grammarLessons[i].grammar_id);
        if (!isVocabCompleted || !isGrammarCompleted) {
          firstUncompletedIndex = i;
          break;
        }
      }

      const isLevelBelowAssigned = levelIndex < assignedIndex;   
      const isCurrentLevel = levelIndex === assignedIndex;        

      const nodes: any[] = [];
      for (let i = 0; i < numLessons; i++) {
        const vocab = vocabLessons[i];
        const grammar = grammarLessons[i];

        const isVocabCompleted = completedMap.has(vocab.topic_id);
        const isGrammarCompleted = completedMap.has(grammar.grammar_id);
        const isCompleted = isVocabCompleted && isGrammarCompleted;

        const position = Math.round(5 + (i / Math.max(numLessons - 1, 1)) * 90);
        const row = i % 2 === 0 ? 'top' : 'bottom';

        let status = 'locked';
        if (isCompleted) {
          status = 'completed';
        } else if (isLevelBelowAssigned) {
          status = 'available';
        } else if (isCurrentLevel) {
          if (i === firstUncompletedIndex) {
            status = 'active';
          } else if (i < firstUncompletedIndex) {
            status = 'completed';
          } else if (firstUncompletedIndex !== -1 && i > firstUncompletedIndex) {
            status = 'locked';
          }
        }

        nodes.push({
          id: `${level}_L${i + 1}`,
          level,
          lessonIndex: i + 1,
          type: 'lesson',
          label: `Lesson ${i + 1}`,
          position,
          row,
          status,
          order: globalOrder++,
        });
      }

      return { id: `view${level}`, label: level, level, nodes };
    });

    // 4. Tính metrics dựa trên số lesson thực sự đã hoàn thành (toàn bộ, không chỉ level hiện tại)
    const totalLessons = views.reduce((sum, v) => sum + v.nodes.length, 0);
    const completedLessonsCount = views.reduce(
      (sum, v) => sum + v.nodes.filter((node) => node.status === 'completed').length,
      0,
    );
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