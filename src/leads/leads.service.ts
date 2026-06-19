import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { MailService } from '../mail/mail.service';
import { CreateLeadDto, UpdateLeadDto, QueryLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead) private leadRepo: Repository<Lead>,
    private mailService: MailService,
  ) {}

  async create(dto: CreateLeadDto, ipAddress?: string) {
    if (dto.honeypot) {
      throw new BadRequestException('Spam detected');
    }

    const lead = this.leadRepo.create({ ...dto, ipAddress, source: dto.service });
    const saved = await this.leadRepo.save(lead);

    this.mailService.sendNewLeadNotification(dto);

    return { success: true, message: 'Gửi yêu cầu thành công. Chúng tôi sẽ liên hệ sớm nhất!' };
  }

  async findAll(query: QueryLeadDto) {
    const { page = 1, limit = 10, status, search } = query;
    const qb = this.leadRepo.createQueryBuilder('l');

    if (status) qb.andWhere('l.status = :status', { status });
    if (search) qb.andWhere('(l.name LIKE :s OR l.phone LIKE :s OR l.email LIKE :s)', { s: `%${search}%` });

    qb.orderBy('l.createdAt', 'DESC').skip((page - 1) * limit).take(limit);

    const [items, total] = await qb.getManyAndCount();
    return { data: items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const lead = await this.leadRepo.findOneBy({ id });
    if (!lead) throw new NotFoundException('Lead không tồn tại');
    return lead;
  }

  async update(id: number, dto: UpdateLeadDto) {
    await this.findOne(id);
    await this.leadRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.leadRepo.delete(id);
    return { success: true, message: 'Xóa lead thành công' };
  }

  async exportCsv(query: QueryLeadDto) {
    const { data } = await this.findAll({ ...query, limit: 10000 });
    const { Parser } = await import('json2csv');
    const fields = ['id', 'name', 'phone', 'email', 'company', 'service', 'message', 'status', 'adminNote', 'createdAt'];
    const parser = new Parser({ fields });
    return parser.parse(data);
  }
}
