import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  title: { zh: string; en: string };

  @Column()
  date: string;

  @Column('json')
  time: { zh: string; en: string };

  @Column('json')
  location: { zh: string; en: string };

  @Column('json')
  description: { zh: string; en: string };

  @Column()
  organizer: string;

  @Column()
  organizer_icon: string;

  @Column()
  image: string;

  @Column()
  region: string;

  @Column()
  type: string;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ nullable: true })
  url?: string;
}
