import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  name: { zh: string; en: string };

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('json')
  priceDisplay: { zh: string; en: string };

  @Column('json', { nullable: true })
  priceSubDisplay?: { zh: string; en: string };

  @Column()
  image: string;

  @Column('json')
  artisan: { zh: string; en: string };

  @Column('json')
  full_description: { zh: string; en: string };
}
