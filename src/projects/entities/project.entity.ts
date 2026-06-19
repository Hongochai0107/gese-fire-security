import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProjectImage } from './project-image.entity';

export enum ProjectStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  client: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'longtext', nullable: true })
  content: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  completedAt: Date;

  @Column({ type: 'json', nullable: true })
  scope: string[];

  @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.DRAFT })
  status: ProjectStatus;

  @Column({ nullable: true })
  seoTitle: string;

  @Column({ type: 'text', nullable: true })
  seoDescription: string;

  @OneToMany(() => ProjectImage, (img) => img.project, { cascade: true })
  images: ProjectImage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
