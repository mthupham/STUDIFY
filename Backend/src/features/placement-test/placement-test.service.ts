import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlacementTestQuestion } from './models/placement-test-question.model';
import { PlacementTestResult } from './models/placement-test-result.model';
import { SubmitPlacementTestDto } from './dto/submit-placement-test.dto';

@Injectable()
export class PlacementTestService {
  constructor(
    @InjectModel(PlacementTestQuestion)
    private readonly questionModel: typeof PlacementTestQuestion,
    @InjectModel(PlacementTestResult)
    private readonly resultModel: typeof PlacementTestResult,
  ) {}

  // API 1: Lấy danh sách câu hỏi
  async getQuestions() {
    const questions = await this.questionModel.findAll({
      attributes: ['id', 'questionText', 'options', 'category'],
      order: [['createdAt', 'ASC']],
    });

    return {
      statusCode: 200,
      message: 'Lấy danh sách câu hỏi thành công',
      data: questions,
    };
  }

  // API 2: Chấm điểm bài test từ Database[cite: 1]
  async submitTest(dto: SubmitPlacementTestDto, userId?: string) {
    const questionIds = dto.answers.map((ans) => ans.questionId);

    // 1. Query danh sách câu hỏi tương ứng trực tiếp từ DB[cite: 1]
    const dbQuestions = await this.questionModel.findAll({
      where: { id: questionIds },
    });

    if (!dbQuestions || dbQuestions.length === 0) {
      throw new NotFoundException('Không tìm thấy dữ liệu câu hỏi trong hệ thống');
    }

    const questionMap = new Map(dbQuestions.map((q) => [q.id, q]));

    let correctCount = 0;
    // Tìm đến dòng khai báo answersDetail và sửa thành:
const answersDetail: any[] = []; // <-- THÊM KHIỂU DỮ LIỆU : any[]

    // 2. Chấm điểm từng câu dựa vào correctAnswer lưu ở DB[cite: 1]
    for (const userAns of dto.answers) {
      const dbQuestion = questionMap.get(userAns.questionId);
      if (!dbQuestion) continue;

      const isCorrect =
        dbQuestion.correctAnswer.trim().toUpperCase() ===
        userAns.selectedAnswer.trim().toUpperCase();

      if (isCorrect) {
        correctCount++;
      }

      answersDetail.push({
        questionId: dbQuestion.id,
        questionText: dbQuestion.questionText,
        userAnswer: userAns.selectedAnswer,
        correctAnswer: dbQuestion.correctAnswer,
        isCorrect,
        explanation: dbQuestion.explanation || '', // Đánh dấu câu sai/đúng + kèm lời giải chi tiết[cite: 1]
      });
    }

    const totalQuestions = dbQuestions.length;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    // 3. Logic xếp trình độ dựa theo % làm đúng
    let levelAssigned = 'BEGINNER';
    if (scorePercentage >= 80) {
      levelAssigned = 'ADVANCED';
    } else if (scorePercentage >= 50) {
      levelAssigned = 'INTERMEDIATE';
    }

    // 4. Lưu kết quả bài test vào Database[cite: 1]
    const savedResult = await this.resultModel.create({
      userId: userId || null,
      scorePercentage,
      totalQuestions,
      correctAnswersCount: correctCount,
      levelAssigned,
      answersDetail,
    });

    return {
      statusCode: 200,
      message: 'Chấm điểm bài test thành công',
      data: {
        resultId: savedResult.id,
        scorePercentage,
        correctAnswersCount: correctCount,
        totalQuestions,
        levelAssigned,
        answersDetail,
      },
    };
  }
}