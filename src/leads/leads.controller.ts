import { Controller, Get, Post, Put, Delete, Body, Param, Query, Req, Res } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { LeadsService } from './leads.service';
import { CreateLeadDto, UpdateLeadDto, QueryLeadDto } from './dto/create-lead.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  constructor(private leadsService: LeadsService) {}

  @Public()
  @Post('submit')
  @ApiOperation({ summary: '[Public] Gửi form liên hệ' })
  submit(@Body() dto: CreateLeadDto, @Req() req: Request) {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
    return this.leadsService.create(dto, ip);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Danh sách leads' })
  findAll(@Query() query: QueryLeadDto) {
    return this.leadsService.findAll(query);
  }

  @Get('export')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Export CSV leads' })
  async exportCsv(@Query() query: QueryLeadDto, @Res() res: Response) {
    const csv = await this.leadsService.exportCsv(query);
    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.header('Content-Disposition', 'attachment; filename=leads.csv');
    res.send('﻿' + csv);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Chi tiết lead' })
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Cập nhật trạng thái lead' })
  update(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return this.leadsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Xóa lead' })
  remove(@Param('id') id: string) {
    return this.leadsService.remove(+id);
  }
}
