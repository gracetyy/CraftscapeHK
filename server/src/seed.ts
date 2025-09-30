import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Craft } from './entities/craft.entity';
import { Product } from './entities/product.entity';
import { Event } from './entities/event.entity';
import { Artisan } from './entities/artisan.entity';
import { Order } from './entities/order.entity';
import { MessageThread } from './entities/message-thread.entity';
import { CRAFTS, PRODUCTS, EVENTS, ARTISANS, ORDERS, MESSAGE_THREADS } from '../../constants.cjs';

async function seed() {
  console.log('🌱 Starting database seeding...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  try {
    // Clear existing data (orders first due to foreign key constraints)
    await dataSource.query('DELETE FROM orders');
    await dataSource.query('DELETE FROM message_threads');
    await dataSource.query('DELETE FROM crafts');
    await dataSource.query('DELETE FROM products');
    await dataSource.query('DELETE FROM events');
    await dataSource.query('DELETE FROM artisans');
    console.log('✅ Cleared existing data');

    // Seed crafts
    const craftRepository = dataSource.getRepository(Craft);
    await craftRepository.save(CRAFTS);
    console.log(`✅ Seeded ${CRAFTS.length} crafts`);

    // Seed products
    const productRepository = dataSource.getRepository(Product);
    await productRepository.save(PRODUCTS);
    console.log(`✅ Seeded ${PRODUCTS.length} products`);

    // Seed events
    const eventRepository = dataSource.getRepository(Event);
    await eventRepository.save(EVENTS);
    console.log(`✅ Seeded ${EVENTS.length} events`);

    // Seed artisans
    const artisanRepository = dataSource.getRepository(Artisan);
    await artisanRepository.save(ARTISANS);
    console.log(`✅ Seeded ${ARTISANS.length} artisans`);

    // Seed orders
    const orderRepository = dataSource.getRepository(Order);
    await orderRepository.save(ORDERS);
    console.log(`✅ Seeded ${ORDERS.length} orders`);

    // Seed message threads
    const messageRepository = dataSource.getRepository(MessageThread);
    await messageRepository.save(MESSAGE_THREADS);
    console.log(`✅ Seeded ${MESSAGE_THREADS.length} message threads`);

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await app.close();
  }
}

seed();
