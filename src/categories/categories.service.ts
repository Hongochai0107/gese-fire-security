import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Category } from '../products/entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoryRepo: Repository<Category>) {}

  async create(dto: CreateCategoryDto) {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async findAll() {
    return this.categoryRepo.find({
      where: { parentId: IsNull() },
      relations: { children: true },
      order: { sortOrder: 'ASC', name: 'ASC' },
    });
  }

  async findAllFlat() {
    return this.categoryRepo.find({ order: { sortOrder: 'ASC' } });
  }

  async findOne(id: number) {
    const cat = await this.categoryRepo.findOne({ where: { id }, relations: { children: true, parent: true } });
    if (!cat) throw new NotFoundException('Danh mục không tồn tại');
    return cat;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    await this.findOne(id);
    await this.categoryRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.categoryRepo.delete(id);
    return { success: true, message: 'Xóa danh mục thành công' };
  }
}
