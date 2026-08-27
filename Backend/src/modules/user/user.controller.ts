import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateOnboardingDto } from './dto/update-onboarding.dto';
import { SelectLevelDto } from './dto/select_level.dto';


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

  @UseGuards(JwtGuard)
  @Patch('onboarding')
  async updateOnboarding(@Req() req, @Body() dto: UpdateOnboardingDto) {
    const user = await this.userService.updateOnboarding(req.user.id, dto.weeklyStudyHours, dto.currentLevel);
    return { message: 'Onboarding pace updated', data: user };
  }

  @UseGuards(JwtGuard)
  @Patch('select-level')
  async selectLevel(@Req() req, @Body() dto: SelectLevelDto) {
    const user = await this.userService.chooseLevelManually(req.user.id, dto.level);
    return { message: 'Level selected', data: user };
  }

}