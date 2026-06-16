import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../../models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await this.userService.validateUser(email, password);
    return this.generateTokens(user);
  }

  async register(email: string, password: string, name: string) {
    const user = await this.userService.registerUser(email, password, name);
    return this.generateTokens(user);
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const user = await this.userService.findByEmail(payload.email);
      if (!user) throw new Error();
      return this.generateTokens(user);
    } catch {
      throw new Error('Invalid refresh token.');
    }
  }
}
