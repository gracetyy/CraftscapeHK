import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('orders')
export class Order {
  @Column({ primary: true })
  id: string;

  @Column()
  customerName: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'date' })
  date: string;

  @Column()
  status: string;
}
