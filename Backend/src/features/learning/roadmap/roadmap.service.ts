import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoadmapLevel } from '../../../models/roadmap-level.model';
import { RoadmapLesson } from '../../../models/roadmap-lesson.model';

@Injectable()
export class RoadmapService {
  constructor(
    @InjectModel(RoadmapLevel)
    private roadmapLevelModel: typeof RoadmapLevel,
    @InjectModel(RoadmapLesson)
    private roadmapLessonModel: typeof RoadmapLesson,
  ) {}

  async getRoadmapForUser(userId: string) {
    // 1. Lấy dữ liệu Levels & Lessons từ DB
    const dbLevels = await this.roadmapLevelModel.findAll({
      include: [{ model: RoadmapLesson }],
      order: [
        ['level', 'ASC'],
        [{ model: RoadmapLesson, as: 'lessons' }, 'order_index', 'ASC'],
      ],
    });

    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    
    // 2. Transform DB Lessons thành "nodes" khớp hoàn toàn với UI FE
    const views = dbLevels.map((lvl) => {
      const lessons = lvl.lessons || [];
      const totalLessons = lessons.length;

      const nodes = lessons.map((lesson, index) => {
        // Tự động phân bổ vị trí % trên thanh đường đi (từ 10% đến 90%)
        const position = Math.round(10 + (index / (totalLessons > 1 ? totalLessons - 1 : 1)) * 80);
        
        // Luân phiên vị trí hàng: bài lẻ ở 'top', bài chẵn ở 'bottom'
        const row = index % 2 === 0 ? 'top' : 'bottom';

        // Mock trạng thái bài học (sau này query từ bảng UserProgress của userId)
        let status = 'locked';
        if (lvl.level === 'A1') status = 'completed';
        else if (lvl.level === 'B2' && index === 0) status = 'active';

        return {
          id: lesson.lesson_id,
          label: lesson.topic_name,
          position: position,
          row: row,
          status: status, // 'completed' | 'active' | 'locked'
        };
      });

      return {
        id: lvl.level,
        nodes: nodes,
      };
    });

    // 3. Trả về đúng format object mock FE đang import từ JSON
    return {
      levels: levels,
      metrics: {
        level: 'B2 Upper Intermediate',
        lessons: '42/60',
        streak: 12,
        tip: 'Practice speaking 15 minutes daily to improve fluency!',
      },
      views: views,
    };
  }
}