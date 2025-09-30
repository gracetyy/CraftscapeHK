import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crafts')
export class Craft {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  name: { zh: string; en: string };

  @Column('json')
  artisan: { zh: string; en: string };

  @Column('json')
  short_description: { zh: string; en: string };

  @Column('json')
  full_description: { zh: string; en: string };

  @Column('json')
  images: string[];

  @Column('json')
  history: { zh: string; en: string };

  @Column('json')
  story: { zh: string; en: string };

  @Column({ nullable: true })
  category?: string;
}
