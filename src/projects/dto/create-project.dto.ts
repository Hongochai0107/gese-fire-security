import { IsNotEmpty, IsOptional, IsEnum, IsArray, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { ProjectStatus } from '../entities/project.entity';

export class CreateProjectDto {
  @ApiProperty({ example: 'Hệ thống PCCC nhà máy linh kiện điện tử' })
  @IsNotEmpty()
  @MaxLength(500)
  title: string;

  @ApiProperty({ example: 'he-thong-pccc-nha-may-linh-kien' })
  @IsNotEmpty()
  @MaxLength(500)
  slug: string;

  @ApiPropertyOptional({ example: 'Công ty TNHH ABC' })
  @IsOptional()
  client?: string;

  @ApiPropertyOptional({ example: 'KCN Yên Phong, Bắc Ninh' })
  @IsOptional()
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  thumbnail?: string;

  @ApiPropertyOptional()
  @IsOptional()
  completedAt?: Date;

  @ApiPropertyOptional({ type: [String], example: ['Thiết kế', 'Thi công'] })
  @IsOptional()
  @IsArray()
  scope?: string[];

  @ApiPropertyOptional({ enum: ProjectStatus })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiPropertyOptional()
  @IsOptional()
  seoTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  seoDescription?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  imageUrls?: string[];
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

export class QueryProjectDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ enum: ProjectStatus })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;
}
