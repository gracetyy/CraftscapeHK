import { Controller, Get, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from '../entities/event.entity';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(+id);
  }
}
