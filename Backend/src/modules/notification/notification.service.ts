import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification, NotificationType } from '../../models/notification.model';
import { Op } from 'sequelize';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification)
    private notificationModel: typeof Notification,
  ) {}

  // Lấy tất cả notification của user (chưa đọc lên trước)
  async getNotifications(userId: number) {
    const notifications = await this.notificationModel.findAll({
      where: { userId },
      order: [
        ['isRead', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return {
      unreadCount,
      notifications,
    };
  }

  // Đánh dấu 1 notification đã đọc
  async markAsRead(notificationId: number, userId: number) {
    await this.notificationModel.update(
      { isRead: true },
      { where: { id: notificationId, userId } },
    );
    return { message: 'Marked as read.' };
  }

  // Đánh dấu tất cả đã đọc
  async markAllAsRead(userId: number) {
    await this.notificationModel.update(
      { isRead: true },
      { where: { userId, isRead: false } },
    );
    return { message: 'All notifications marked as read.' };
  }

  // Tạo notification "chưa hoàn thành lesson"
  async createLessonIncompleteNotification(userId: number, lessonId: string, lessonTitle: string) {
    // Tránh tạo trùng nếu đã có notification cùng loại + lessonId chưa đọc
    const existing = await this.notificationModel.findOne({
      where: {
        userId,
        type: NotificationType.LESSON_INCOMPLETE,
        lessonId,
        isRead: false,
      },
    });
    if (existing) return;

    await this.notificationModel.create({
      userId,
      type: NotificationType.LESSON_INCOMPLETE,
      title: 'Bài học đang dang dở!',
      message: `Bạn chưa hoàn thành bài "${lessonTitle}". Tiếp tục học ngay nhé!`,
      lessonId,
      isRead: false,
    } as any);
  }

  // Tạo notification "bài mới được mở khóa"
  async createLessonUnlockedNotification(userId: number, lessonId: string, lessonTitle: string) {
    const unlockedMessage = `${lessonTitle} has been unlocked.`;
    const existing = await this.notificationModel.findOne({
      where: {
        userId,
        type: NotificationType.LESSON_UNLOCKED,
        lessonId,
        isRead: false,
      },
    });
    if (existing) return;

    await this.notificationModel.create({
      userId,
      type: NotificationType.LESSON_UNLOCKED,
      /* Legacy localized copy retained in source history.
      title: 'Bài học mới được mở khóa!',
      message: `Bài "${lessonTitle}" đã sẵn sàng. Bắt đầu học ngay!`,
      */
      title: 'New lesson unlocked!',
      message: unlockedMessage,
      lessonId,
      isRead: false,
    } as any);
  }
}
