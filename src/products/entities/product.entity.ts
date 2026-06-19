import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { ProductImage } from './product-image.entity';

export enum ProductStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  sku: string;

  @Column({ type: 'text', nullable: true })
  shortDescription: string;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @Column({ type: 'json', nullable: true })
  specifications: Record<string, string>;

  @Column({ type: 'decimal', precision: 15, scale: 0, nullable: true })
  price: number;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.DRAFT })
  status: ProductStatus;

  @Column({ nullable: true })
  seoTitle: string;

  @Column({ type: 'text', nullable: true })
  seoDescription: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => Category, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => ProductImage, (img) => img.product, { cascade: true })
  images: ProductImage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
