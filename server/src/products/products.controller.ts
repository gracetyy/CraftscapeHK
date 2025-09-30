import { Controller, Get, Post, Body, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Post('generate-image')
  @HttpCode(HttpStatus.OK)
  generateImage(@Body() body: { craftName: string; userPrompt: string }) {
    const { craftName, userPrompt } = body;
    return this.productsService.generateCraftImage(craftName, userPrompt);
  }
}
