import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import {  RegisterDto } from './dto/register.dto';
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
    const alreadyExist = await this.findByEmail(email);

    if (!alreadyExist) throw new BadRequestException('Non-existent user.');

    console.log({alreadyExist});
    
    return {message: 'Login'};
  }

  async registerUser(CreateUserDto: RegisterDto) {
    const existingUser = await this.findByEmail(CreateUserDto.email);
    if (existingUser) throw new BadRequestException('Email already in use.');

    const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10);
    const payload = { ...CreateUserDto, password: hashedPassword };

    await this.userModel.create(payload as any);

    return{message: 'User registered successfully.'};
  }
}
