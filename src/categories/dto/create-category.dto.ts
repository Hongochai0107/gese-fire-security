import { IsNotEmpty, IsOptional, IsNumber, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Đầu báo cháy' })
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 'dau-bao-chay' })
  @IsNotEmpty()
  @MaxLength(255)
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  sortOrder?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  parentId?: number;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
