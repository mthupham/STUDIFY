import { Controller, Get, Patch, Param, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtGuard } from '../../modules/auth/guards/jwt.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
@UseGuards(JwtGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // GET /notifications — lấy danh sách notification
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách notification của user' })
  async getNotifications(@Req() req: any) {
    return await this.notificationService.getNotifications(req.user.id);
  }

  // PATCH /notifications/:id/read — đánh dấu 1 notification đã đọc
  @Patch(':id/read')
  @ApiOperation({ summary: 'Đánh dấu 1 notification đã đọc' })
  async markAsRead(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return await this.notificationService.markAsRead(id, req.user.id);
  }

  // PATCH /notifications/read-all — đánh dấu tất cả đã đọc
  @Patch('read-all')
  @ApiOperation({ summary: 'Đánh dấu tất cả notification đã đọc' })
  async markAllAsRead(@Req() req: any) {
    return await this.notificationService.markAllAsRead(req.user.id);
  }
}