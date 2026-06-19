import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // ===== PUBLIC ROUTES =====
  @Public()
  @Get('public')
  @ApiOperation({ summary: '[Public] Danh sách sản phẩm active' })
  findPublic(@Query() query: QueryProductDto) {
    return this.productsService.findPublic(query);
  }

  @Public()
  @Get('public/:slug')
  @ApiOperation({ summary: '[Public] Chi tiết sản phẩm theo slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  // ===== ADMIN ROUTES =====
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Tạo sản phẩm' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Danh sách tất cả sản phẩm' })
  findAll(@Query() query: QueryProductDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Chi tiết sản phẩm theo ID' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Cập nhật sản phẩm' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Xóa sản phẩm' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
