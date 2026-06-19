import { IsNotEmpty, IsOptional, IsEnum, IsNumber, IsObject, IsArray, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductStatus } from '../entities/product.entity';

export class CreateProductDto {
  @ApiProperty({ example: 'Đầu báo khói quang điện' })
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 'dau-bao-khoi-quang-dien' })
  @IsNotEmpty()
  @MaxLength(255)
  slug: string;

  @ApiPropertyOptional({ example: 'GESE-SDE-01' })
  @IsOptional()
  @MaxLength(50)
  sku?: string;

  @ApiPropertyOptional()
  @IsOptional()
  shortDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: { 'Nguồn': '24VDC', 'Nhiệt độ': '-10°C ~ 50°C' } })
  @IsOptional()
  @IsObject()
  specifications?: Record<string, string>;

  @ApiPropertyOptional({ example: 850000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ enum: ProductStatus, default: ProductStatus.DRAFT })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @ApiPropertyOptional()
  @IsOptional()
  seoTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  seoDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  thumbnail?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  categoryId?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  imageUrls?: string[];
}
