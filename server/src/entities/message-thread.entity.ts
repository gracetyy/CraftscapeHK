import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('message_threads')
export class MessageThread {
  @Column({ primary: true })
  id: string;

  @Column()
  customerName: string;

  @Column()
  lastMessage: string;

  @Column()
  timestamp: string;

  @Column({ default: false })
  unread: boolean;

  @Column()
  avatar: string;

  @Column()
  productId: number;
}
