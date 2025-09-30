import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CraftsController } from './crafts.controller';
import { CraftsService } from './crafts.service';
import { Craft } from '../entities/craft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Craft])],
  controllers: [CraftsController],
  providers: [CraftsService],
  exports: [CraftsService],
})
export class CraftsModule {}
