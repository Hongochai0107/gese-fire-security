import { Controller, Get, Post, Put, Delete, Body, Param, Query, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateArticleDto, UpdateArticleDto, QueryArticleDto } from './dto/create-article.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  // ===== PUBLIC =====
  @Public()
  @Get('public')
  @ApiOperation({ summary: '[Public] Danh sách bài viết published' })
  findPublic(@Query() query: QueryArticleDto) {
    return this.newsService.findPublic(query);
  }

  @Public()
  @Get('public/:slug')
  @ApiOperation({ summary: '[Public] Chi tiết bài viết theo slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.newsService.findBySlug(slug);
  }

  @Public()
  @Get('categories/public')
  @ApiOperation({ summary: '[Public] Danh mục tin tức' })
  findPublicCategories() {
    return this.newsService.findCategories();
  }

  // ===== ADMIN =====
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Tạo bài viết' })
  create(@Body() dto: CreateArticleDto, @Request() req: any) {
    return this.newsService.create(dto, req.user.id);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Danh sách tất cả bài viết' })
  findAll(@Query() query: QueryArticleDto) {
    return this.newsService.findAll(query);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Chi tiết bài viết theo ID' })
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Cập nhật bài viết' })
  update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.newsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Xóa bài viết' })
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }

  // ===== NEWS CATEGORIES =====
  @Post('categories')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Tạo danh mục tin tức' })
  createCategory(@Body() dto: { name: string; slug: string; sortOrder?: number }) {
    return this.newsService.createCategory(dto);
  }

  @Get('categories/all')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Danh sách danh mục tin tức' })
  findCategories() {
    return this.newsService.findCategories();
  }

  @Put('categories/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Cập nhật danh mục tin tức' })
  updateCategory(@Param('id') id: string, @Body() dto: { name?: string; slug?: string }) {
    return this.newsService.updateCategory(+id, dto);
  }

  @Delete('categories/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Xóa danh mục tin tức' })
  removeCategory(@Param('id') id: string) {
    return this.newsService.removeCategory(+id);
  }
}
