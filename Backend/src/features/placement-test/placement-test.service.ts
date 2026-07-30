import { Injectable, OnModuleInit, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as path from 'path';
import * as fs from 'fs';
import { PlacementTestResult } from '../../models/placement_test_result.model';
import { SubmitPlacementTestDto } from './dto/submit-placement-test.dto';
import { UserService } from '../../modules/user/user.service';

@Injectable()
export class PlacementTestService implements OnModuleInit {
  private placementTestData: any = null;
  private lessonData: any[] = [];

  constructor(
    @InjectModel(PlacementTestResult)
    private readonly resultModel: typeof PlacementTestResult,
    private readonly userService: UserService,
  ) {}

  onModuleInit() {
    try {
      const dataDir = path.join(process.cwd(), 'database', 'data');

      const placementTestPath = path.join(dataDir, 'placementtest.json');
      if (fs.existsSync(placementTestPath)) {
        const rawData = fs.readFileSync(placementTestPath, 'utf-8');
        this.placementTestData = JSON.parse(rawData);
        console.log(`[STUDIFY] Đã nạp đề thi thành công: ${this.placementTestData.test_title}`);
      }

      const lessonPath = path.join(dataDir, 'lesson.json');
      if (fs.existsSync(lessonPath)) {
        const rawData = fs.readFileSync(lessonPath, 'utf-8');
        this.lessonData = JSON.parse(rawData);
        console.log(`[STUDIFY] Đã nạp dữ liệu lộ trình thành công: ${this.lessonData.length} levels`);
      }
    } catch (error) {
      console.error('[STUDIFY ERROR] Không thể đọc các file dữ liệu JSON:', (error as Error).message);
    }
  }

  getQuestions() {
    if (!this.placementTestData) {
      throw new BadRequestException('Chưa nạp được dữ liệu đề thi.');
    }

    const questions = this.placementTestData.questions.map((q: any) => ({
      questionNumber: q.question_number,
      level: q.level,
      question: q.question,
      options: q.options,
    }));

    return {
      status: 'success',
      testTitle: this.placementTestData.test_title,
      totalQuestions: questions.length,
      questions,
    };
  }

  async submitTest(dto: SubmitPlacementTestDto, userId: number) {
    if (!this.placementTestData) {
      throw new BadRequestException('Hệ thống chưa nạp được dữ liệu đề thi.');
    }

    const questions = this.placementTestData.questions || [];
    let totalCorrect = 0;

    const levelStats: Record<string, { correct: number; total: number }> = {};
    const questionDetails: any[] = [];


    questions.forEach((q: any) => {
      const qNum = q.question_number;
      const qLevel = q.level || 'A1';
      const correctAnswer = q.correct_answer;
      const userAns = dto.answers[qNum] || '';
      if (!levelStats[qLevel]) {
        levelStats[qLevel] = { correct: 0, total: 0 };
      }
      levelStats[qLevel].total += 1;

      const isCorrect = userAns.trim().toUpperCase() === correctAnswer.trim().toUpperCase();

      if (isCorrect) {
        totalCorrect += 1;
        levelStats[qLevel].correct += 1;
      }

      questionDetails.push({
        questionNumber: qNum,
        level: qLevel,
        questionText: q.question,
        options: q.options,
        userAnswer: userAns || 'No Answer',
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
      });
    });

    const orderedLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    let assignedLevel = 'A1';

    for (const lvl of orderedLevels) {
      const stat = levelStats[lvl];
      if (stat && stat.total > 0) {
        const accuracy = stat.correct / stat.total;
        if (accuracy >= 0.7) {
          const nextIdx = orderedLevels.indexOf(lvl) + 1;
          assignedLevel = nextIdx < orderedLevels.length ? orderedLevels[nextIdx] : 'C2';
        } else {
          assignedLevel = lvl;
          break;
        }
      }
    }

    const percentage = parseFloat(((totalCorrect / questions.length) * 100).toFixed(2));
    let feedbackTitle = 'KEEP TRYING!';
    let feedbackMessage = "You are off to a good start. Let's build up your foundation together!";

    if (percentage >= 90) {
      feedbackTitle = 'OUTSTANDING WORK!';
      feedbackMessage = 'Phenomenal! You have demonstrated absolute mastery over the core skill sets.';
    } else if (percentage >= 75) {
      feedbackTitle = 'EXCELLENT JOB!';
      feedbackMessage = 'Great technical aptitude! You have a highly capable analytical framework.';
    } else if (percentage >= 50) {
      feedbackTitle = 'GOOD EFFORT!';
      feedbackMessage = 'Solid performance. With a bit more targeted practice, you will master this level.';
    }

    const savedResult = await this.resultModel.create({
      userId,
      scorePercentage: percentage,
      totalQuestions: questions.length,
      correctAnswersCount: totalCorrect,
      levelAssigned: assignedLevel,
      answersDetail: questionDetails,
    } as any);

    await this.userService.markOnboardingComplete(userId);
    await this.userService.setCurrentLevel(userId, assignedLevel);

    return {
      status: 'success',
      meta: {
        resultId: savedResult.id,
        userId: userId,
        totalQuestions: questions.length,
        totalCorrect: totalCorrect,
        percentage: percentage,
      },
      feedback: {
        title: feedbackTitle,
        message: feedbackMessage,
      },
      assignedLevel: assignedLevel,
      recommendation: `Hệ thống đề xuất bạn nên bắt đầu học từ cấp độ: ${assignedLevel}.`,
      analysis: levelStats,
      testDetails: questionDetails,
    };
  }

  /**
   * Lấy lộ trình học (khung sườn) dựa theo level được assign gần nhất từ placement test.
   * Đọc nội dung lesson từ file lesson.json (không dùng bảng DB).
   */
  async getMyRoadmap(userId: number) {
    // 1. Tìm kết quả placement test mới nhất của user
    const latestResult = await this.resultModel.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    const userLevel = latestResult?.levelAssigned || 'A1';

    // 2. Tìm dữ liệu level tương ứng trong lesson.json
    const levelGroupData = this.lessonData.find(
      (g) => g.level.toUpperCase() === userLevel.toUpperCase(),
    );
    if (!levelGroupData) {
      throw new NotFoundException(
        `Không tìm thấy cấu trúc dữ liệu bài học cho level ${userLevel}`,
      );
    }

    const vocabularyLessons = levelGroupData.vocabulary_lessons || [];
    const grammarLessons = levelGroupData.grammar_lessons || [];

    const chapters: any[] = [];
    const maxChaptersCount = Math.max(vocabularyLessons.length, grammarLessons.length);
    let globalOrder = 1;

    for (let i = 0; i < maxChaptersCount; i++) {
      const chapterLessons: any[] = [];

      if (i < vocabularyLessons.length) {
        const vocab = vocabularyLessons[i];
        chapterLessons.push({
          lessonId: vocab.topic_id,
          title: vocab.topic_name,
          type: 'VOCABULARY',
          totalItems: vocab.items?.length || 0,
          itemLabel: `${vocab.items?.length || 0} Từ vựng`,
          // TODO: status hiện đang mock đơn giản, chưa join với bảng UserProgress
          // vì UserProgress.lessonId là INTEGER trong khi topic_id ở đây là STRING (vd "A1_T1")
          // cần đồng bộ kiểu dữ liệu trước khi map status thật theo tiến độ user
          status: globalOrder === 1 ? 'IN_PROGRESS' : 'LOCKED',
          progress: globalOrder === 1 ? 25 : 0,
          order: globalOrder++,
        });
      }

      if (i < grammarLessons.length) {
        const gram = grammarLessons[i];
        chapterLessons.push({
          lessonId: gram.grammar_id,
          title: gram.grammar_title,
          type: 'GRAMMAR',
          totalItems: gram.examples?.length || 0,
          itemLabel: `${gram.examples?.length || 0} Cấu trúc ngữ pháp`,
          status: 'LOCKED',
          progress: 0,
          order: globalOrder++,
        });
      }

      chapters.push({
        chapterId: `CHAPT_${userLevel}_${i + 1}`,
        chapterTitle: `Chương ${i + 1}`,
        description: `Tối ưu hóa năng lực nền tảng phần ${i + 1}`,
        lessons: chapterLessons,
      });
    }

    const finalChapters = chapters.map((ch, idx) => ({
      ...ch,
      isChapterUnlocked: idx === 0,
    }));

    return {
      status: 'success',
      data: {
        userId: userId,
        assignedLevel: userLevel,
        levelTitle: levelGroupData.level_title,
        percentage: 0, // TODO: tính thật khi có UserProgress join đầy đủ
        totalChapters: finalChapters.length,
        chapters: finalChapters,
      },
    };
  }
}