import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlacementTestService } from './placement-test.service';
import { SubmitPlacementTestDto } from './dto/submit-placement-test.dto';
import { JwtGuard } from '../../modules/auth/guards/jwt.guard';

@ApiTags('Placement Test')
@Controller('placement-test')
export class PlacementTestController {
  constructor(private readonly placementTestService: PlacementTestService) {}

  @Get('questions')
  @ApiOperation({ summary: 'Lấy danh sách câu hỏi test đầu vào' })
  async getQuestions() {
    return this.placementTestService.getQuestions();
  }

  @Post('submit')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Chấm điểm bài test placement-test' })
  @ApiResponse({ status: 200, description: 'Chấm điểm và trả kết quả thành công' })
  async submitTest(@Body() dto: SubmitPlacementTestDto, @Req() req: any) {
    return this.placementTestService.submitTest(dto, req.user.id);
  }
}