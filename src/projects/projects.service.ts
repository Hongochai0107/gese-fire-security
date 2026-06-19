import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { ProjectImage } from './entities/project-image.entity';
import { CreateProjectDto, UpdateProjectDto, QueryProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(ProjectImage) private imageRepo: Repository<ProjectImage>,
  ) {}

  async create(dto: CreateProjectDto) {
    const { imageUrls, ...data } = dto;
    const project = this.projectRepo.create(data);
    const saved = await this.projectRepo.save(project);

    if (imageUrls?.length) {
      const images = imageUrls.map((url, i) =>
        this.imageRepo.create({ url, sortOrder: i, projectId: saved.id }),
      );
      await this.imageRepo.save(images);
    }

    return this.findOne(saved.id);
  }

  async findAll(query: QueryProjectDto) {
    const { page = 1, limit = 10, search, status } = query;
    const qb = this.projectRepo.createQueryBuilder('p')
      .leftJoinAndSelect('p.images', 'images');

    if (search) qb.andWhere('(p.title LIKE :s OR p.client LIKE :s)', { s: `%${search}%` });
    if (status) qb.andWhere('p.status = :status', { status });

    qb.orderBy('p.createdAt', 'DESC').skip((page - 1) * limit).take(limit);

    const [items, total] = await qb.getManyAndCount();
    return { data: items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findPublic(query: QueryProjectDto) {
    query.status = ProjectStatus.ACTIVE;
    return this.findAll(query);
  }

  async findOne(id: number) {
    const project = await this.projectRepo.findOne({ where: { id }, relations: { images: true } });
    if (!project) throw new NotFoundException('Dự án không tồn tại');
    return project;
  }

  async findBySlug(slug: string) {
    const project = await this.projectRepo.findOne({
      where: { slug, status: ProjectStatus.ACTIVE },
      relations: { images: true },
    });
    if (!project) throw new NotFoundException('Dự án không tồn tại');
    return project;
  }

  async update(id: number, dto: UpdateProjectDto) {
    const project = await this.findOne(id);
    const { imageUrls, ...data } = dto;

    Object.assign(project, data);
    await this.projectRepo.save(project);

    if (imageUrls !== undefined) {
      await this.imageRepo.delete({ projectId: id });
      if (imageUrls.length) {
        const images = imageUrls.map((url, i) =>
          this.imageRepo.create({ url, sortOrder: i, projectId: id }),
        );
        await this.imageRepo.save(images);
      }
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.projectRepo.delete(id);
    return { success: true, message: 'Xóa dự án thành công' };
  }
}
