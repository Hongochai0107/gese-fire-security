import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Public()
  @Get('public')
  @ApiOperation({ summary: '[Public] Cây danh mục (active)' })
  findPublic() {
    return this.categoriesService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Tạo danh mục' })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Danh sách tất cả danh mục' })
  findAll() {
    return this.categoriesService.findAllFlat();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Chi tiết danh mục' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Cập nhật danh mục' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Xóa danh mục' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
