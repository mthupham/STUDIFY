import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserProgress, LessonType } from '../../models/user_progress.model';
import { VocabularyLesson } from '../../models/vocab_lesson.model';
import { GrammarLesson } from '../../models/grammar_lesson.model';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(UserProgress) private progressModel: typeof UserProgress,
    @InjectModel(VocabularyLesson) private vocabLessonModel: typeof VocabularyLesson,
    @InjectModel(GrammarLesson) private grammarLessonModel: typeof GrammarLesson,
  ) {}

  // Trả về đúng model dựa theo lessonType
  private getLessonModel(lessonType: string): any {
    if (lessonType === LessonType.VOCABULARY) return this.vocabLessonModel;
    if (lessonType === LessonType.GRAMMAR) return this.grammarLessonModel;
    throw new BadRequestException('Invalid lesson type.');
  }

  async completeLesson(userId: number, lessonId: number, lessonType: string) {
    const lessonModel = this.getLessonModel(lessonType);
    const lesson = await lessonModel.findByPk(lessonId);
    if (!lesson) throw new NotFoundException('Lesson not found.');

    const [progress] = await this.progressModel.findOrCreate({
      where: { userId, lessonId, lessonType },
      defaults: { userId, lessonId, lessonType, isCompleted: true, completedAt: new Date() } as any,
    });

    if (!progress.isCompleted) {
      progress.isCompleted = true;
      progress.completedAt = new Date();
      await progress.save();
    }

    return this.getLevelProgress(userId, lesson.levelId, lessonType);
  }

  // Tính % hoàn thành của 1 level theo loại lesson (vocab hoặc grammar)
  async getLevelProgress(userId: number, levelId: number, lessonType: string) {
    const lessonModel = this.getLessonModel(lessonType);

    const totalLessons = (await lessonModel.count({ where: { levelId } })) as number;

    const completedCount = (await this.progressModel.count({
      where: { userId, lessonType, isCompleted: true },
      include: [{ model: lessonModel, where: { levelId }, attributes: [] }],
    })) as number;

    const percent = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

    return { levelId, lessonType, totalLessons, completedLessons: completedCount, percent };
  }

  // Lấy danh sách lesson trong 1 level kèm trạng thái hoàn thành
  async getLessonsWithStatus(userId: number, levelId: number, lessonType: string) {
    const lessonModel = this.getLessonModel(lessonType);
    const lessons = await lessonModel.findAll({ where: { levelId }, raw: true });

    const progresses = await this.progressModel.findAll({
      where: { userId, lessonType },
      raw: true,
    });

    const progressMap = new Map(progresses.map((p) => [p.lessonId, p.isCompleted]));

    return lessons.map((lesson: any) => ({
      ...lesson,
      isCompleted: progressMap.get(lesson.id) ?? false,
    }));
  }
}