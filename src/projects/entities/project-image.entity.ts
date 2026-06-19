import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity('project_images')
export class ProjectImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  alt: string;

  @Column({ default: 0 })
  sortOrder: number;

  @Column()
  projectId: number;

  @ManyToOne(() => Project, (project) => project.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
