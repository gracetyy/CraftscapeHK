import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageThread } from '../entities/message-thread.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageThread)
    private messagesRepository: Repository<MessageThread>,
  ) {}

  async findAll(): Promise<MessageThread[]> {
    return this.messagesRepository.find();
  }

  async findOne(id: string): Promise<MessageThread> {
    const message = await this.messagesRepository.findOne({
      where: { id },
    });
    if (!message) {
      throw new NotFoundException(`Message thread with ID "${id}" not found`);
    }
    return message;
  }
}
