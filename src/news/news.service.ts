import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article, ArticleStatus } from './entities/article.entity';
import { NewsCategory } from './entities/news-category.entity';
import { Tag } from './entities/tag.entity';
import { CreateArticleDto, UpdateArticleDto, QueryArticleDto } from './dto/create-article.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
    @InjectRepository(NewsCategory) private newsCatRepo: Repository<NewsCategory>,
    @InjectRepository(Tag) private tagRepo: Repository<Tag>,
  ) {}

  async create(dto: CreateArticleDto, authorId: number) {
    const { tags: tagNames, ...data } = dto;
    const article = this.articleRepo.create({ ...data, authorId });

    if (dto.status === ArticleStatus.PUBLISHED && !dto.publishedAt) {
      article.publishedAt = new Date();
    }

    if (tagNames?.length) {
      article.tags = await this.findOrCreateTags(tagNames);
    }

    return this.articleRepo.save(article);
  }

  async findAll(query: QueryArticleDto) {
    const { page = 1, limit = 10, search, categoryId, tag, status } = query;
    const qb = this.articleRepo.createQueryBuilder('a')
      .leftJoinAndSelect('a.category', 'category')
      .leftJoinAndSelect('a.author', 'author')
      .leftJoinAndSelect('a.tags', 'tags');

    if (search) qb.andWhere('(a.title LIKE :s OR a.excerpt LIKE :s)', { s: `%${search}%` });
    if (categoryId) qb.andWhere('a.categoryId = :categoryId', { categoryId });
    if (tag) qb.andWhere('tags.slug = :tag', { tag });
    if (status) qb.andWhere('a.status = :status', { status });

    qb.addSelect(['author.id', 'author.name', 'author.email'])
      .orderBy('a.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [items, total] = await qb.getManyAndCount();
    return { data: items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findPublic(query: QueryArticleDto) {
    query.status = ArticleStatus.PUBLISHED;
    return this.findAll(query);
  }

  async findOne(id: number) {
    const article = await this.articleRepo.findOne({
      where: { id },
      relations: { category: true, author: true, tags: true },
    });
    if (!article) throw new NotFoundException('Bài viết không tồn tại');
    return article;
  }

  async findBySlug(slug: string) {
    const article = await this.articleRepo.findOne({
      where: { slug, status: ArticleStatus.PUBLISHED },
      relations: { category: true, author: true, tags: true },
    });
    if (!article) throw new NotFoundException('Bài viết không tồn tại');
    return article;
  }

  async update(id: number, dto: UpdateArticleDto) {
    const article = await this.findOne(id);
    const { tags: tagNames, ...data } = dto;

    Object.assign(article, data);

    if (dto.status === ArticleStatus.PUBLISHED && !article.publishedAt) {
      article.publishedAt = new Date();
    }

    if (tagNames !== undefined) {
      article.tags = tagNames.length ? await this.findOrCreateTags(tagNames) : [];
    }

    return this.articleRepo.save(article);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.articleRepo.delete(id);
    return { success: true, message: 'Xóa bài viết thành công' };
  }

  // News Categories
  async createCategory(data: { name: string; slug: string; sortOrder?: number }) {
    return this.newsCatRepo.save(this.newsCatRepo.create(data));
  }

  async findCategories() {
    return this.newsCatRepo.find({ order: { sortOrder: 'ASC' } });
  }

  async updateCategory(id: number, data: Partial<NewsCategory>) {
    await this.newsCatRepo.update(id, data);
    return this.newsCatRepo.findOneBy({ id });
  }

  async removeCategory(id: number) {
    await this.newsCatRepo.delete(id);
    return { success: true, message: 'Xóa danh mục tin tức thành công' };
  }

  private async findOrCreateTags(names: string[]): Promise<Tag[]> {
    const tags: Tag[] = [];
    for (const name of names) {
      const slug = name.toLowerCase().replace(/[^a-z0-9À-ɏ]+/gi, '-').replace(/^-|-$/g, '');
      let tag = await this.tagRepo.findOne({ where: { slug } });
      if (!tag) {
        tag = await this.tagRepo.save(this.tagRepo.create({ name, slug }));
      }
      tags.push(tag);
    }
    return tags;
  }
}
