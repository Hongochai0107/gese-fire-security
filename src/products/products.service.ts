import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product, ProductStatus } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(ProductImage) private imageRepo: Repository<ProductImage>,
  ) {}

  async create(dto: CreateProductDto) {
    const { imageUrls, ...data } = dto;
    const product = this.productRepo.create(data);
    const saved = await this.productRepo.save(product);

    if (imageUrls?.length) {
      const images = imageUrls.map((url, i) =>
        this.imageRepo.create({ url, sortOrder: i, productId: saved.id }),
      );
      await this.imageRepo.save(images);
    }

    return this.findOne(saved.id);
  }

  async findAll(query: QueryProductDto) {
    const { page = 1, limit = 10, search, categoryId, status } = query;
    const qb = this.productRepo.createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'category')
      .leftJoinAndSelect('p.images', 'images');

    if (search) {
      qb.andWhere('(p.name LIKE :search OR p.sku LIKE :search)', { search: `%${search}%` });
    }
    if (categoryId) {
      qb.andWhere('p.categoryId = :categoryId', { categoryId });
    }
    if (status) {
      qb.andWhere('p.status = :status', { status });
    }

    qb.orderBy('p.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [items, total] = await qb.getManyAndCount();
    return {
      data: items,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findPublic(query: QueryProductDto) {
    query.status = ProductStatus.ACTIVE;
    return this.findAll(query);
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: { category: true, images: true },
    });
    if (!product) throw new NotFoundException('Sản phẩm không tồn tại');
    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.productRepo.findOne({
      where: { slug, status: ProductStatus.ACTIVE },
      relations: { category: true, images: true },
    });
    if (!product) throw new NotFoundException('Sản phẩm không tồn tại');
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    const { imageUrls, ...data } = dto;

    Object.assign(product, data);
    await this.productRepo.save(product);

    if (imageUrls !== undefined) {
      await this.imageRepo.delete({ productId: id });
      if (imageUrls.length) {
        const images = imageUrls.map((url, i) =>
          this.imageRepo.create({ url, sortOrder: i, productId: id }),
        );
        await this.imageRepo.save(images);
      }
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.productRepo.delete(id);
    return { success: true, message: 'Xóa sản phẩm thành công' };
  }
}
