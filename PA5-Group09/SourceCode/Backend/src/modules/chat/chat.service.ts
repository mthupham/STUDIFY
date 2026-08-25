import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message)
    private readonly messageModel: typeof Message,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const createdMessage = await this.messageModel.create(createChatDto as any);
    return this.messageModel.findByPk(createdMessage.id, {
      include: [User],
    });
  }

  async findAll() {
    return this.messageModel.findAll({
      include: [User],
      order: [['createdAt', 'ASC']],
    });
  }

  async findByGroupId(groupId: string) {
    return this.messageModel.findAll({
      where: { groupId },
      include: [User],
      order: [['createdAt', 'ASC']],
    });
  }

  async findOne(id: number) {
    return this.messageModel.findByPk(id, {
      include: [User],
    });
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    const message = await this.messageModel.findByPk(id);
    if (!message) {
      return null;
    }

    await message.update(updateChatDto as any);
    return this.messageModel.findByPk(id, {
      include: [User],
    });
  }

  async remove(id: number) {
    const message = await this.messageModel.findByPk(id);
    if (!message) {
      return null;
    }

    await message.destroy();
    return { deleted: true, id };
  }
}