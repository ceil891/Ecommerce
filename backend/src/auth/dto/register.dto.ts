import { IsEmail, MinLength, IsOptional, IsIn } from 'class-validator';

export class RegisterDto {
  @IsEmail() email: string;
  @MinLength(8) password: string;
  @IsOptional() fullName?: string;
  @IsIn(['customer', 'seller', 'staff', 'admin']) role?: string;
}
