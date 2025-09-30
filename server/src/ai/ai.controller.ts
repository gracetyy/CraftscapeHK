import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('api/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-image')
  @HttpCode(HttpStatus.OK)
  async generateImage(@Body() body: { craftName: string; userPrompt: string }) {
    const { craftName, userPrompt } = body;
    return this.aiService.generateCraftImage(craftName, userPrompt);
  }
}