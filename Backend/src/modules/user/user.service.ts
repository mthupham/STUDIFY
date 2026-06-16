import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../models/user.model';
import * as bcrypt from 'bcryptjs';

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
}
