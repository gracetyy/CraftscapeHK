import { Controller, Get, Param } from '@nestjs/common';
import { CraftsService } from './crafts.service';
import { Craft } from '../entities/craft.entity';

@Controller('api/crafts')
export class CraftsController {
  constructor(private readonly craftsService: CraftsService) {}

  @Get()
  async findAll(): Promise<Craft[]> {
    return this.craftsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Craft> {
    return this.craftsService.findOne(+id);
  }
}
