import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { UserProgress, LessonType } from '../../models/user_progress.model';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(UserProgress) private progressModel: typeof UserProgress,
  ) {}

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

    const [progress] = await this.progressModel.findOrCreate({
      where: { userId, lessonId, lessonType: type },
      defaults: { userId, lessonId, lessonType: type, isCompleted: true, completedAt: new Date() } as any,
    });

    if (!progress.isCompleted) {
      progress.isCompleted = true;
      progress.completedAt = new Date();
      await progress.save();
    }

    return { success: true, message: 'Đã đánh dấu hoàn thành bài học.' };
  }

  // Tính % hoàn thành trong một level (levelId là string như "A1", "B2")
  // Dùng prefix matching trên lessonId thay vì join DB
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