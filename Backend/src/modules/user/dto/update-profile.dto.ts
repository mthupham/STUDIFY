import { StringOptional } from '@/common/decorators';

export class UpdateProfileDto {
  @StringOptional('Name')
  name?: string;

  @StringOptional('Avatar')
  avatar?: string;

  @StringOptional('Phone')
  phone?: string;
}