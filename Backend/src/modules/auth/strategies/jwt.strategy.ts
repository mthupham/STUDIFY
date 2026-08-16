import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Fallback guarantees a string matching your auth.service signing key
      secretOrKey: configService.get<string>('JWT_SECRET') || 'your_fallback_jwt_secret',
    });
  }

  async validate(payload: any) {
  return {
    id: payload.id,
    email: payload.email,
    role: payload.role,
    username: payload.username || payload.name || payload.email.split('@')[0],
  };
}
}