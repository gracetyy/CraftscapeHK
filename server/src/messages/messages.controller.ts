import { Controller, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageThread } from '../entities/message-thread.entity';

@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async findAll(): Promise<MessageThread[]> {
    return this.messagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MessageThread> {
    return this.messagesService.findOne(id);
  }
}
