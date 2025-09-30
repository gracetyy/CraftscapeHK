import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Craft } from '../entities/craft.entity';

@Injectable()
export class CraftsService {
  constructor(
    @InjectRepository(Craft)
    private craftsRepository: Repository<Craft>,
  ) {}

  async findAll(): Promise<Craft[]> {
    return this.craftsRepository.find();
  }

  async findOne(id: number): Promise<Craft> {
    const craft = await this.craftsRepository.findOne({ where: { id } });
    if (!craft) {
      throw new NotFoundException(`Craft with ID ${id} not found`);
    }
    return craft;
  }
}
