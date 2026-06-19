import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto, QueryProjectDto } from './dto/create-project.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Public()
  @Get('public')
  @ApiOperation({ summary: '[Public] Danh sách dự án active' })
  findPublic(@Query() query: QueryProjectDto) {
    return this.projectsService.findPublic(query);
  }

  @Public()
  @Get('public/:slug')
  @ApiOperation({ summary: '[Public] Chi tiết dự án theo slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.projectsService.findBySlug(slug);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Tạo dự án' })
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Danh sách tất cả dự án' })
  findAll(@Query() query: QueryProjectDto) {
    return this.projectsService.findAll(query);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Chi tiết dự án theo ID' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Cập nhật dự án' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Xóa dự án' })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
