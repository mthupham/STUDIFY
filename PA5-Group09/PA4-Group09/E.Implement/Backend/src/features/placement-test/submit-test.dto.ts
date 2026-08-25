import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class SubmitTestDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsObject()
  // Cấu hình lại để nhận Key dạng Number khớp với file JSON đề thi
  // Ví dụ FE gửi: { 1: "B", 2: "C", 3: "A" }
  answers: Record<number, string>; 
}