import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

    if (user.lockUntil && new Date() < user.lockUntil) {
      const secondsLeft = Math.ceil((user.lockUntil.getTime() - Date.now()) / 1000);
      throw new UnauthorizedException(
        `Account temporarily locked due to too many failed attempts. Try again in ${secondsLeft} seconds.`,
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const attempts = user.failedLoginAttempts + 1;

      if (attempts >= 5) {
        await user.update({
          failedLoginAttempts: 0,
          lockUntil: new Date(Date.now() + 60 * 1000),
        });
        throw new UnauthorizedException(
          'Too many failed login attempts. Account locked for 1 minute.',
        );
      }

      await user.update({ failedLoginAttempts: attempts });
      throw new UnauthorizedException(
        `Invalid password. ${5 - attempts} attempt(s) remaining before lockout.`,
      );
    }

    if (user.failedLoginAttempts > 0 || user.lockUntil) {
      await user.update({ failedLoginAttempts: 0, lockUntil: null });
    }

    return user;
  }

  async registerUser(email: string, password: string, name: string) {
    const alreadyExist = await this.findByEmail(email);
    if (alreadyExist) throw new BadRequestException('User already exists.');

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({ email, password: hashed, name } as any);
    return user;
  }

     async updateResetOtp(
      email: string,
        hashedOtp: string | null,
        expires: Date | null,
) {
  await this.userModel.update(
    {
      resetOtp: hashedOtp,
      resetOtpExpires: expires,
    },
    {
      where: { email },
    },
  );
}
  async getCurrentLevel(userId: number): Promise<string> {
      const user = await this.userModel.findByPk(userId);
      return user?.currentLevel || 'A1';
  }

  async setCurrentLevel(userId: number, level: string) {
      await this.userModel.update({ currentLevel: level }, { where: { id: userId } });
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

  async updateOnboarding(userId: number, weeklyStudyHours: number) {
  const user = await this.userModel.findByPk(userId);
  if (!user) throw new NotFoundException('User not found');

  await user.update({ weeklyStudyHours });
  return user;
  }

  async markOnboardingComplete(userId: number) {
    await this.userModel.update(
      { hasCompletedOnboarding: true },
      { where: { id: userId } }
    );
  }

  async updateWeeklyStudyHours(
  userId: number,
  weeklyStudyHours: number,
  ) {
    await this.userModel.update(
      { weeklyStudyHours },
      {
        where: { id: userId },
      },
    );
  }

  async createGoogleUser(email: string, name: string, avatar: string) {
    const user = await this.userModel.create({
      email,
      name,
      avatar,
      password: '',  
      provider: 'google',
    } as any);
    return user;
  }

  async chooseLevelManually(userId: number, level: string) {
    const user = await this.userModel.findByPk(userId);
    if (!user) throw new NotFoundException('User not found');

    await user.update({
      currentLevel: level,
      hasCompletedOnboarding: true,
    });
    return user;
  }
}