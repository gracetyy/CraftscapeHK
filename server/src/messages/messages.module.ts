import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessageThread } from '../entities/message-thread.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageThread])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
