import { Injectable, OnModuleInit, NotFoundException, BadRequestException } from '@nestjs/common';
import { SubmitTestDto } from './submit-test.dto';
import * as path from 'path';
import * as fs from 'fs';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class PlacementTestService implements OnModuleInit {
  constructor(private readonly userService: UserService) {} 
  private placementTestData: any = null;
  private lessonData: any[] = [];
  
  // Giả lập lưu trữ Level hiện tại của User sau khi test (Thay thế bằng DB Sequelize sau này)
  private userLevelStorage = new Map<string, string>();

  onModuleInit() {
    try {
      // Đường dẫn động tìm đến thư mục chứa các file dữ liệu JSON của bạn
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
  
  // Trả câu hỏi nhưng KHÔNG có correct_answer để tránh lộ đáp án
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

  /**
   * API CHẤM ĐIỂM & SMART ONBOARDING (Bản tối ưu Full UI kết quả, nhận xét và giải thích câu hỏi)
   */
  submitTest(dto: SubmitTestDto, userId: number) {
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

      // ĐỔI MỚI: Trả thêm dữ liệu câu hỏi, các phương án lựa chọn giúp FE hiển thị bảng giải thích
      questionDetails.push({
        questionNumber: qNum,
        level: qLevel,
        questionText: q.question, // Nội dung câu hỏi dạng: "She ___ a teacher..."
        options: q.options,       // Các lựa chọn { A, B, C, D } để FE vẽ UI giải thích
        userAnswer: userAns || 'No Answer',
        correctAnswer: correctAnswer,
        isCorrect: isCorrect
      });
    });

    // Thuật toán Smart Onboarding phân tầng
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

    this.userLevelStorage.set(String(userId), assignedLevel);

    // BỔ SUNG: Tính toán tỷ lệ phần trăm và đưa ra lời phê động y chang trong hình thiết kế
    const percentage = parseFloat(((totalCorrect / questions.length) * 100).toFixed(2));
    let feedbackTitle = 'KEEP TRYING!';
    let feedbackMessage = 'You are off to a good start. Let\'s build up your foundation together!';

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

    return {
    status: 'success',
    meta: {
      userId: userId,
      totalQuestions: questions.length,
      totalCorrect: totalCorrect,
      percentage: percentage,
      },
      // Trường dữ liệu phục vụ riêng cho phần text tiêu đề to sặc sỡ trên UI
      feedback: {
        title: feedbackTitle,     // Ví dụ: "OUTSTANDING WORK!"
        message: feedbackMessage  // Lời nhắn giải thích đi kèm
      },
      assignedLevel: assignedLevel,
      recommendation: `Hệ thống đề xuất bạn nên bắt đầu học từ cấp độ: ${assignedLevel}.`,
      analysis: levelStats, 
      testDetails: questionDetails // Mảng chứa đầy đủ gốc rễ câu hỏi phục vụ popup giải thích
    };
  }

  /**
   * API LẤY LỘ TRÌNH CHI TIẾT (Đóng gói cấu trúc Chương/Bài học lồng nhau khớp 100% UI Sơ đồ)
   */
  getMyRoadmap(userId: number) {
    const userLevel = this.userLevelStorage.get(String(userId)) || 'A1';

    // 2. Tìm dữ liệu level trong file lesson.json
    const levelGroupData = this.lessonData.find((g) => g.level.toUpperCase() === userLevel.toUpperCase());
    if (!levelGroupData) {
      throw new NotFoundException(`Không tìm thấy cấu trúc dữ liệu bài học cho level ${userLevel}`);
    }

    const vocabularyLessons = levelGroupData.vocabulary_lessons || [];
    const grammarLessons = levelGroupData.grammar_lessons || [];

    // Mảng chứa các Chương (Chapters) lớn để FE map cột bên trái
    const chapters: any[] = [];
    
    // Thuật toán gom cụm: Cứ 1 cặp (Từ vựng + Ngữ pháp) sẽ tạo thành 1 Chương học tập
    const maxChaptersCount = Math.max(vocabularyLessons.length, grammarLessons.length);
    let globalOrder = 1;

    for (let i = 0; i < maxChaptersCount; i++) {
      const chapterLessons: any[] = [];

      // Lấy bài từ vựng của chương này (nếu có)
      if (i < vocabularyLessons.length) {
        const vocab = vocabularyLessons[i];
        chapterLessons.push({
          lessonId: vocab.topic_id,
          title: vocab.topic_name,
          type: 'VOCABULARY',
          totalItems: vocab.items?.length || 0,
          itemLabel: `${vocab.items?.length || 0} Từ vựng`, // Phục vụ text hiển thị nhỏ trên card UI
          status: globalOrder === 1 ? 'IN_PROGRESS' : 'LOCKED',
          progress: globalOrder === 1 ? 25 : 0,
          order: globalOrder++
        });
      }

      // Lấy bài ngữ pháp của chương này (nếu có) để xếp chung vào nhóm bài học của Chương
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
          order: globalOrder++
        });
      }

      // Đóng gói thành một cụm Chương hoàn chỉnh
      chapters.push({
        chapterId: `CHAPT_${userLevel}_${i + 1}`,
        chapterTitle: `Chương ${i + 1}`,
        description: `Tối ưu hóa năng lực nền tảng phần ${i + 1}`,
        lessons: chapterLessons // Mảng con chứa danh sách bài học của chương đó
      });
    }

    // Thiết lập trạng thái mẫu: Cho Chương 1 ở trạng thái hoạt động, các Chương sau tạm khóa
    const finalChapters = chapters.map((ch, idx) => ({
      ...ch,
      isChapterUnlocked: idx === 0 ? true : false
    }));

    return {
      status: 'success',
      data: {
        userId: userId,
        assignedLevel: userLevel,
        levelTitle: levelGroupData.level_title, // Tên level to (Ví dụ: BREAKTHROUGH)
        totalChapters: finalChapters.length,
        chapters: finalChapters // Trả về cấu trúc lồng nhau y chang Frontend mong đợi
      }
    };
  }

  /**
   * API LẤY CHI TIẾT NỘI DUNG LÝ THUYẾT (Từ vựng hoặc Ngữ pháp khớp UI màn hình học)
   */
  getLessonDetail(lessonId: string, type: string) {
    if (!lessonId || !type) {
      throw new BadRequestException('Vui lòng cung cấp đầy đủ tham số lessonId và type (VOCABULARY/GRAMMAR).');
    }

    // Duyệt qua toàn bộ các level trong file lesson.json để tìm bài học tương thích
    for (const levelGroup of this.lessonData) {
      if (type.toUpperCase() === 'VOCABULARY') {
        const vocabLesson = levelGroup.vocabulary_lessons?.find((l: any) => l.topic_id === lessonId);
        if (vocabLesson) {
          return {
            status: 'success',
            type: 'VOCABULARY',
            level: levelGroup.level,
            levelTitle: levelGroup.level_title,
            lessonId: vocabLesson.topic_id,
            title: vocabLesson.topic_name,
            content: vocabLesson.items || [] 
          };
        }
      }

      if (type.toUpperCase() === 'GRAMMAR') {
        const grammarLesson = levelGroup.grammar_lessons?.find((g: any) => g.grammar_id === lessonId);
        if (grammarLesson) {
          return {
            status: 'success',
            type: 'GRAMMAR',
            level: levelGroup.level,
            levelTitle: levelGroup.level_title,
            lessonId: grammarLesson.grammar_id,
            title: grammarLesson.grammar_title,
            content: {
              rule: grammarLesson.rule,
              explanation: grammarLesson.explanation,
              examples: grammarLesson.examples || []
            }
          };
        }
      }
    }

    // Nếu chạy hết dữ liệu không thấy
    throw new NotFoundException(`Không tìm thấy nội dung bài học với ID '${lessonId}' thuộc loại '${type}'.`);
  }
}