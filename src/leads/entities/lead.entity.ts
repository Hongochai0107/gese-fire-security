import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  CLOSED = 'closed',
  SPAM = 'spam',
}

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  company: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ nullable: true })
  service: string;

  @Column({ nullable: true })
  source: string;

  @Column({ type: 'enum', enum: LeadStatus, default: LeadStatus.NEW })
  status: LeadStatus;

  @Column({ type: 'text', nullable: true })
  adminNote: string;

  @Column({ nullable: true })
  ipAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
