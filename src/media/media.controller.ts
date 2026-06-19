import {
  Controller, Post, Get, Delete, Param, Query, UseInterceptors, UploadedFile, UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { PaginationDto } from '../common/dto/pagination.dto';

const storage = diskStorage({
  destination: './uploads',
  filename: (_req, file, cb) => {
    const ext = extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

@ApiTags('Media')
@ApiBearerAuth()
@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload một ảnh' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @UseInterceptors(FileInterceptor('file', { storage }))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.mediaService.upload(file);
  }

  @Post('upload-multiple')
  @ApiOperation({ summary: 'Upload nhiều ảnh' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } } } } })
  @UseInterceptors(FilesInterceptor('files', 10, { storage }))
  uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    return this.mediaService.uploadMultiple(files);
  }

  @Get()
  @ApiOperation({ summary: 'Danh sách media' })
  findAll(@Query() query: PaginationDto) {
    return this.mediaService.findAll(query.page, query.limit);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa media' })
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}
