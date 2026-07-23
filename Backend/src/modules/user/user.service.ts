import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../models/user.model';
import * as bcrypt from 'bcryptjs';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async findByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new BadRequestException('User not found.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password.');

    return user;
  }

  async registerUser(email: string, password: string, name: string) {
    const alreadyExist = await this.findByEmail(email);
    if (alreadyExist) throw new BadRequestException('User already exists.');

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({ email, password: hashed, name } as any);
    return user;
  }

  async updateResetOtp(email: string, hashedOtp: string | null, expires: Date | null) {
    await this.userModel.update(
      { 
        resetOtp: hashedOtp ?? undefined, 
        resetOtpExpires: expires ?? undefined 
      },
      { where: { email } }
    );
  }

  async getUserById(id: number) {
  const user = await this.userModel.findByPk(id);
  if (!user) throw new BadRequestException('User not found.');
  return user;
  }

  async updateProfile(id: number, dto: UpdateProfileDto) {
    const user = await this.getUserById(id);

    if (dto.email && dto.email !== user.email) {
      const existedUser = await this.findByEmail(dto.email);
      if (existedUser && existedUser.id !== user.id) {
        throw new BadRequestException('Email already in use.');
      }
    }

    await user.update({
      ...(dto.name && { name: dto.name }),
      ...(dto.email && { email: dto.email }),
      ...(dto.avatar && { avatar: dto.avatar }),
      ...(dto.phone && { phone: dto.phone }),
    });
    return { message: 'Update successful', data: user };
  }
}