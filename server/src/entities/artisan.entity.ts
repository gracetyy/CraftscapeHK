import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artisans')
export class Artisan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  name: { zh: string; en: string };

  @Column()
  bio: string;

  @Column()
  image: string;

  @Column('json')
  craftIds: number[];
}
