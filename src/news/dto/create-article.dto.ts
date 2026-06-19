import { IsNotEmpty, IsOptional, IsEnum, IsArray, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { ArticleStatus } from '../entities/article.entity';

export class CreateArticleDto {
  @ApiProperty({ example: 'Hướng dẫn lắp đặt hệ thống báo cháy' })
  @IsNotEmpty()
  @MaxLength(500)
  title: string;

  @ApiProperty({ example: 'huong-dan-lap-dat-he-thong-bao-chay' })
  @IsNotEmpty()
  @MaxLength(500)
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  thumbnail?: string;

  @ApiPropertyOptional()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  excerpt?: string;

  @ApiPropertyOptional({ enum: ArticleStatus })
  @IsOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;

  @ApiPropertyOptional()
  @IsOptional()
  publishedAt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  seoTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  seoDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;

  @ApiPropertyOptional({ type: [String], example: ['PCCC', 'báo cháy'] })
  @IsOptional()
  @IsArray()
  tags?: string[];
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}

export class QueryArticleDto {
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

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  tag?: string;

  @ApiPropertyOptional({ enum: ArticleStatus })
  @IsOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;
}
