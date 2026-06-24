import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtGuard)
  getProfile(@Req() req: any) {
    return this.userService.getUserById(req.user.id);
  }

  @Patch('profile')
  @UseGuards(JwtGuard)
  updateProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
    return this.userService.updateProfile(req.user.id, dto);
  }
}