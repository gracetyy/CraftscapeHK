import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Craft } from '../entities/craft.entity';
import { Product } from '../entities/product.entity';
import { Event } from '../entities/event.entity';
import { Artisan } from '../entities/artisan.entity';
import { Order } from '../entities/order.entity';
import { MessageThread } from '../entities/message-thread.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('DATABASE_PATH', 'database.sqlite'),
        entities: [Craft, Product, Event, Artisan, Order, MessageThread],
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}