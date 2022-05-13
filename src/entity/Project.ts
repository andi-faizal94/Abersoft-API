import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectName: string;

  @Column()
  customer: string;

  @Column({ nullable: true })
  reportedHours: number;

  @Column()
  projectManager: string;

  @Column()
  company: string;

  @Column({ type: 'decimal' })
  latitude: number;

  @Column({ type: 'decimal' })
  longitude: number;

  @Column()
  isInvoiced: boolean;
}
