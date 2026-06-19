import { IsNotEmpty, IsOptional, IsEmail, IsEnum, Matches, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { LeadStatus } from '../entities/lead.entity';

export class CreateLeadDto {
  @ApiProperty({ example: 'Nguyễn Văn A' })
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: '0912345678' })
  @IsNotEmpty()
  @Matches(/^[0-9]{9,11}$/, { message: 'Số điện thoại không hợp lệ' })
  phone: string;

  @ApiPropertyOptional({ example: 'email@congty.vn' })
  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;

  @ApiPropertyOptional({ example: 'Công ty TNHH ABC' })
  @IsOptional()
  @MaxLength(255)
  company?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(2000)
  message?: string;

  @ApiPropertyOptional({ example: 'Hệ thống báo cháy tự động' })
  @IsOptional()
  @MaxLength(255)
  service?: string;

  @ApiPropertyOptional({ description: 'Honeypot field - để trống' })
  @IsOptional()
  honeypot?: string;
}

export class UpdateLeadDto {
  @ApiPropertyOptional({ enum: LeadStatus })
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(2000)
  adminNote?: string;
}

export class QueryLeadDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({ enum: LeadStatus })
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @ApiPropertyOptional()
  @IsOptional()
  search?: string;
}
