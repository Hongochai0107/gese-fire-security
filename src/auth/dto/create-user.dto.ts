import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../common/decorators/roles.decorator';

export class CreateUserDto {
  @ApiProperty({ example: 'admin@gesefiresecurity.vn' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Admin GESE' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Admin@123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ enum: Role, default: Role.EDITOR })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
