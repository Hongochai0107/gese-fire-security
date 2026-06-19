import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@gesefiresecurity.vn' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Admin@123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  refreshToken: string;
}
