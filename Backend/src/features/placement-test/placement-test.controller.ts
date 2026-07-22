import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlacementTestService } from './placement-test.service';
import { SubmitPlacementTestDto } from './dto/submit-placement-test.dto';

@ApiTags('Placement Test')
@Controller('placement-test')
export class PlacementTestController {
  constructor(private readonly placementTestService: PlacementTestService) {}

  @Get('questions')
  @ApiOperation({ summary: 'API 1: Lấy danh sách câu hỏi test đầu vào' })
  async getQuestions() {
    return this.placementTestService.getQuestions();
  }

  @Post('submit')
  @ApiOperation({
    summary: 'API 2: Chấm điểm bài test placement-test (Lấy DB)',
    description: 'FE gửi danh sách đáp án người dùng chọn, BE so sánh với DB để tính điểm, xếp lớp và trả lời giải chi tiết.',
  })
  @ApiResponse({ status: 200, description: 'Chấm điểm và trả kết quả thành công' })
  async submitTest(@Body() dto: SubmitPlacementTestDto) {
    return this.placementTestService.submitTest(dto);
  }
}