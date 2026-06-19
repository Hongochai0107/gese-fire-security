import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Media } from './entities/media.entity';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private mediaRepo: Repository<Media>,
    private config: ConfigService,
  ) {}

  async upload(file: Express.Multer.File) {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Chỉ chấp nhận file ảnh (JPEG, PNG, WebP, GIF, SVG)');
    }

    const maxSize = this.config.get<number>('MAX_FILE_SIZE', 5242880);
    if (file.size > maxSize) {
      throw new BadRequestException(`File vượt quá dung lượng tối đa (${maxSize / 1024 / 1024}MB)`);
    }

    const url = `/uploads/${file.filename}`;

    const media = this.mediaRepo.create({
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url,
    });

    return this.mediaRepo.save(media);
  }

  async uploadMultiple(files: Express.Multer.File[]) {
    const results = [];
    for (const file of files) {
      results.push(await this.upload(file));
    }
    return results;
  }

  async findAll(page = 1, limit = 20) {
    const [items, total] = await this.mediaRepo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: items,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async remove(id: number) {
    await this.mediaRepo.delete(id);
    return { success: true, message: 'Xóa file thành công' };
  }
}
