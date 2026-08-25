import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException('Token expired.');
    }
    if (info?.name === 'JsonWebTokenError') {
      throw new UnauthorizedException('Invalid token.');
    }
    if (!user) {
      throw new UnauthorizedException('Invalid access token.');
    }
    return user;
  }
}