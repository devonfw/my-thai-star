import { IsEmail, IsOptional, IsString } from 'class-validator';
import { LoginDTO } from './login.dto';

export class RegisterDTO extends LoginDTO {
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;
}
