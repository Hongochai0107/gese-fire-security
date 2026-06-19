import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne, ManyToMany, JoinTable, JoinColumn,
} from 'typeorm';
import { NewsCategory } from './news-category.entity';
import { Tag } from './tag.entity';
import { User } from '../../auth/entities/user.entity';

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ type: 'longtext', nullable: true })
  content: string;

  @Column({ type: 'text', nullable: true })
  excerpt: string;

  @Column({ type: 'enum', enum: ArticleStatus, default: ArticleStatus.DRAFT })
  status: ArticleStatus;

  @Column({ nullable: true })
  publishedAt: Date;

  @Column({ nullable: true })
  seoTitle: string;

  @Column({ type: 'text', nullable: true })
  seoDescription: string;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => NewsCategory, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoryId' })
  category: NewsCategory;

  @Column({ nullable: true })
  authorId: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable({ name: 'article_tags' })
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
