import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as path from 'path';
import * as fs from 'fs';
import { UserProgress } from '../../../models/user_progress.model';
import { UserService } from '../../../modules/user/user.service';
import { NotificationService } from '../../../modules/notification/notification.service';
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

@Injectable()
export class LessonService implements OnModuleInit {
  private lessonData: any[] = [];
private questionBankData: any[] = [];
  constructor(
  @InjectModel(UserProgress)
  private readonly progressModel: typeof UserProgress,
  private readonly userService: UserService,
  private readonly notificationService: NotificationService,
) {}

  onModuleInit() {
    this.lessonData = this.loadJsonFile('lesson.json');
    this.questionBankData = this.loadJsonFile('questionbank.json');
  }

  private getDataFilePath(fileName: string): string {
    return path.resolve(__dirname, '../../../../database/data', fileName);
  }

  private loadJsonFile(fileName: string): any[] {
    try {
      const filePath = this.getDataFilePath(fileName);
      if (!fs.existsSync(filePath)) {
        return [];
      }
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
      console.error(`[STUDIFY ERROR] Không thể đọc ${fileName}:`, (error as Error).message);
      return [];
    }
  }

  private normalizeText(value: string): string {
    return value?.trim().toLowerCase() ?? '';
  }

  private findLessonById(lessonId: string) {
    const normalizedLessonId = lessonId?.toUpperCase?.() || lessonId;

    for (const levelGroup of this.lessonData) {
      const vocabLesson = (levelGroup.vocabulary_lessons || []).find(
        (lesson: any) => lesson.topic_id.toUpperCase() === normalizedLessonId,
      );
      if (vocabLesson) {
        return { lesson: vocabLesson, lessonType: 'VOCABULARY' as const };
      }

      const grammarLesson = (levelGroup.grammar_lessons || []).find(
        (lesson: any) => lesson.grammar_id.toUpperCase() === normalizedLessonId,
      );
      if (grammarLesson) {
        return { lesson: grammarLesson, lessonType: 'GRAMMAR' as const };
      }
    }

    return null;
  }

  private findQuestionInBank(questionId: string) {
    if (!questionId) return null;

    return this.questionBankData
      .flatMap((item: any) => [
        ...(item.reading_questions || []),
        ...(item.writing_questions || []),
      ])
      .find((question: any) => question.question_id === questionId);
  }

  async getLessonQuestions(lessonId: string) {
    const lessonInfo = this.findLessonById(lessonId);
    if (!lessonInfo) {
      throw new NotFoundException(`Không tìm thấy bài học với ID: ${lessonId}`);
    }

    const topicName =
      lessonInfo.lesson.topic_name || lessonInfo.lesson.topic || lessonInfo.lesson.grammar_title;

    const questionBank = this.questionBankData.find(
      (item: any) =>
        item.topic?.toLowerCase() === topicName?.toLowerCase() ||
        item.lesson_id?.toLowerCase() === lessonId.toLowerCase(),
    );

    if (!questionBank) {
      throw new NotFoundException(
        `Chưa hỗ trợ câu hỏi cho bài học này hoặc không tìm thấy question bank cho '${lessonId}'.`,
      );
    }

    const questions = [
      ...(questionBank.reading_questions || []).map((question: any) => ({
        id: question.question_id,
        type: 'multiple-choice' as const,
        question: question.question_text,
        options: question.options || [],
      })),
      ...(questionBank.writing_questions || []).map((question: any) => ({
        id: question.question_id,
        type: 'written' as const,
        question: question.question_text,
      })),
    ];

    return {
      success: true,
      lessonId,
      topic: questionBank.topic,
      questions,
    };
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
    const normalizedLessonId = lessonId?.toUpperCase?.() || lessonId;
    const levelKey = normalizedLessonId.includes('_') ? normalizedLessonId.split('_')[0] : normalizedLessonId;

    const levelGroup = this.lessonData.find(
      (level) => level.level.toUpperCase() === levelKey.toUpperCase(),
    );

    if (!levelGroup) {
      throw new NotFoundException(`Không tìm thấy bài học với ID: ${lessonId}`);
    }

    const vocabLessons = levelGroup.vocabulary_lessons || [];
    const grammarLessons = levelGroup.grammar_lessons || [];
    const numLessons = Math.min(vocabLessons.length, grammarLessons.length);

    const allLessonIds = this.getAllLessonIdsInLevel(levelGroup.level);
    const progressRecords = await this.progressModel.findAll({
      where: { userId, lessonId: allLessonIds },
    });
    const progressMap = new Map(progressRecords.map((p) => [p.lessonId, p.isCompleted]));

    const pairedLessons: any[] = [];
    for (let i = 0; i < numLessons; i++) {
      const vocab = vocabLessons[i];
      const grammar = grammarLessons[i];
      const isVocabCompleted = progressMap.get(vocab.topic_id) || false;
      const isGrammarCompleted = progressMap.get(grammar.grammar_id) || false;

      pairedLessons.push({
        lessonIndex: i + 1,
        vocabulary: vocab,
        grammar: grammar,
        isCompleted: isVocabCompleted && isGrammarCompleted,
      });
    }

    const progress = normalizedLessonId.includes('_')
      ? await this.progressModel.findOne({ where: { userId, lessonId: normalizedLessonId } })
      : null;

    return {
      success: true,
      data: {
        level: levelGroup.level,
        level_title: levelGroup.level_title,
        pairedLessons,
        isCompleted: progress?.isCompleted || false,
      },
    };
  }
async submitMultipleChoiceAnswer(
  lessonId: string,
  questionId: string,
  userAnswer: string,
  userId: number,
) {
  const multipleChoiceTypes = [
    'vocabulary_in_context',
    'multiple_choice_detail',
    'main_idea_matching',
    'true_false_not_given',
  ];

  const questionBankItem = this.questionBankData.find((bank: any) =>
    (bank.reading_questions || []).some(
      (question: any) => question.question_id === questionId,
    ),
  );

  if (!questionBankItem) {
    throw new NotFoundException(
      `Không tìm thấy câu hỏi ${questionId} trong questionbank.`,
    );
  }

  const question = questionBankItem.reading_questions.find(
    (item: any) => item.question_id === questionId,
  );

  if (!multipleChoiceTypes.includes(question.type)) {
    throw new NotFoundException(
      `Câu hỏi ${questionId} không thuộc nhóm trắc nghiệm`,
    );
  }

  if (
    !Array.isArray(question.options) ||
    question.options.length === 0
  ) {
    throw new NotFoundException(
      `Câu hỏi ${questionId} không có danh sách lựa chọn`,
    );
  }

  const submittedAnswer = userAnswer
    .trim()
    .toLowerCase();

  const correctAnswer = String(
    question.correct_answer,
  ).trim();

  const isCorrect =
    submittedAnswer === correctAnswer.toLowerCase();

  return {
    success: true,
    lessonId,
    questionBankLessonId: questionBankItem.lesson_id,
    questionId: question.question_id,
    originalType: question.type,
    questionType: 'multiple-choice',
    status: 'graded',
    isCorrect,
    userAnswer,
    correctAnswer,
    userId,
  };
}
async submitPractice(
  lessonId: string,
  answers: Record<string, string>,
  userId: number,
) {
  const questionBank = this.questionBankData.find((bank: any) => {
    const allQuestions = [
      ...(bank.reading_questions || []),
      ...(bank.writing_questions || []),
    ];

    return allQuestions.some(
      (question: any) =>
        Object.prototype.hasOwnProperty.call(
          answers,
          question.question_id,
        ),
    );
  });

  if (!questionBank) {
    throw new NotFoundException(
      `Không tìm thấy question bank cho bài ${lessonId}`,
    );
  }

  const readingQuestions =
    questionBank.reading_questions || [];

  const writingQuestions =
    questionBank.writing_questions || [];

  const testDetails: any[] = [];

  let correctAnswersCount = 0;
  let multipleChoiceCount = 0;
  let writtenCount = 0;

  for (const question of readingQuestions) {
    const userAnswer =
      answers[question.question_id] || '';

    const correctAnswer = String(
      question.correct_answer || '',
    );

    const isCorrect =
      this.normalizeText(userAnswer) ===
      this.normalizeText(correctAnswer);

    if (isCorrect) {
      correctAnswersCount++;
    }

    multipleChoiceCount++;

    testDetails.push({
      questionId: question.question_id,
      type: 'multiple-choice',
      originalType: question.type,
      questionText: question.question_text,
      options: question.options || [],
      userAnswer,
      correctAnswer,
      status: isCorrect ? 'correct' : 'incorrect',
      isCorrect,
    });
  }

  for (const question of writingQuestions) {
    const userAnswer =
      answers[question.question_id] || '';

    writtenCount++;

    testDetails.push({
      questionId: question.question_id,
      type: 'written',
      originalType: question.type,
      questionText: question.question_text,
      userAnswer,
      sampleAnswer: question.correct_answer || '',
      status: 'review',
      isCorrect: null,
    });
  }

  const totalQuestions =
    multipleChoiceCount + writtenCount;

  const percentage =
    multipleChoiceCount > 0
      ? Math.round(
          (correctAnswersCount / multipleChoiceCount) *
            100,
        )
      : 0;

  const feedback = {
  message:
    percentage >= 80
      ? 'Great job!'
      : percentage >= 50
        ? 'Good effort. Keep practicing.'
        : 'You should review this lesson again.',
};

const recommendation =
  percentage >= 80
    ? 'Continue to the next lesson.'
    : 'Review incorrect answers before continuing.';


return {
  success: true,

  lessonId,
  questionBankLessonId: questionBank.lesson_id,
  userId,
  meta: {
    totalQuestions,
    multipleChoiceCount,
    writtenCount,
    correctAnswersCount,
    percentage,
  },
  feedback,
  testDetails,
  recommendation,
};
}

  async markLessonComplete(lessonId: string, lessonType: 'VOCABULARY' | 'GRAMMAR', userId: number) {
    const [record, created] = await this.progressModel.findOrCreate({
      where: { userId, lessonId },
      defaults: {
        userId,
        lessonId,
        lessonType: lessonType.toLowerCase(),
        isCompleted: true,
        completedAt: new Date(),
      } as any,
    });

    const componentBecameCompleted = created || !record.isCompleted;

    if (!record.isCompleted) {
      await record.update({ isCompleted: true, completedAt: new Date() });
    }

    const level = lessonId.split('_')[0]; // vd "A1_T1" -> "A1"
    const allLessonIds = this.getAllLessonIdsInLevel(level);

    let leveledUp = false;
    let newLevel: string | null = null;

    if (allLessonIds.length > 0) {
      const completedInLevel = await this.progressModel.count({
        where: { userId, lessonId: allLessonIds, isCompleted: true },
      });

      if (completedInLevel === allLessonIds.length) {
        const currentLevel = await this.userService.getCurrentLevel(userId);
        const currentIndex = LEVELS.indexOf(currentLevel);
        if (currentLevel === level && currentIndex >= 0 && currentIndex < LEVELS.length - 1) {
          newLevel = LEVELS[currentIndex + 1];
          await this.userService.setCurrentLevel(userId, newLevel);
          leveledUp = true;
        }
      }
      
      // ==========================================
      // ĐOẠN CODE THÊM MỚI: TẠO THÔNG BÁO UNLOCK
      // ==========================================
      const levelData = this.lessonData.find(
        (item) => item.level.toUpperCase() === level.toUpperCase(),
      );
      const vocabLessons = levelData?.vocabulary_lessons || [];
      const grammarLessons = levelData?.grammar_lessons || [];
      const currentIndexInLevel = Array.from(
        { length: Math.min(vocabLessons.length, grammarLessons.length) },
        (_, index) => index,
      ).find(
        (index) =>
          vocabLessons[index].topic_id === lessonId ||
          grammarLessons[index].grammar_id === lessonId,
      ) ?? -1;
      const completedCurrentPair = currentIndexInLevel >= 0
        ? await this.progressModel.count({
            where: {
              userId,
              lessonId: [
                vocabLessons[currentIndexInLevel].topic_id,
                grammarLessons[currentIndexInLevel].grammar_id,
              ],
              isCompleted: true,
            },
          })
        : 0;
      // Kiểm tra nếu bài hiện tại không phải bài cuối cùng của level
      if (
        componentBecameCompleted &&
        completedCurrentPair === 2 &&
        currentIndexInLevel >= 0 &&
        currentIndexInLevel < Math.min(vocabLessons.length, grammarLessons.length) - 1
      ) {
        const nextLessonId = vocabLessons[currentIndexInLevel + 1].topic_id;
        
        // Lấy tên của bài học tiếp theo để hiển thị ra thông báo cho đẹp
        const nextLessonInfo = this.findLessonById(nextLessonId);
        const nextLessonName = nextLessonInfo?.lesson?.topic_name || nextLessonId;
        const nextLessonTitle = `Lesson ${currentIndexInLevel + 2} - ${nextLessonName}`;
      // ===== Kiểm tra unlock theo CẶP lesson (vocab + grammar cùng index), khớp đúng RoadmapService =====
      const levelData = this.lessonData.find((l) => l.level.toUpperCase() === level.toUpperCase());
      if (levelData) {
        const vocabLessons = levelData.vocabulary_lessons || [];
        const grammarLessons = levelData.grammar_lessons || [];
        const numPairs = Math.min(vocabLessons.length, grammarLessons.length);

        // Tìm vị trí cặp chứa lessonId vừa được đánh dấu hoàn thành
        const vocabIndex = vocabLessons.findIndex((v: any) => v.topic_id === lessonId);
        const pairIndex = vocabIndex !== -1
          ? vocabIndex
          : grammarLessons.findIndex((g: any) => g.grammar_id === lessonId);

        if (pairIndex !== -1 && pairIndex < numPairs) {
          const vocabId = vocabLessons[pairIndex].topic_id;
          const grammarId = grammarLessons[pairIndex].grammar_id;

          const [vocabProgress, grammarProgress] = await Promise.all([
            this.progressModel.findOne({ where: { userId, lessonId: vocabId } }),
            this.progressModel.findOne({ where: { userId, lessonId: grammarId } }),
          ]);

          const isPairFullyCompleted =
            (vocabProgress?.isCompleted || false) && (grammarProgress?.isCompleted || false);

          // Chỉ báo unlock khi CẢ CẶP hiện tại đã xong hoàn toàn VÀ còn cặp kế tiếp
          if (isPairFullyCompleted && pairIndex < numPairs - 1) {
            const nextLessonLabel = `Lesson ${pairIndex + 2}`;

            await this.notificationService.createLessonUnlockedNotification(
              userId,
              `${level}_L${pairIndex + 2}`, // khớp id dạng RoadmapService đang dùng (vd "A1_L2")
              nextLessonLabel,
            );
          }
        }
      }
      // ===== HẾT PHẦN FIX =====
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
