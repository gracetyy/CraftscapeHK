import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleGenAI } from '@google/genai';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private ai: GoogleGenAI;

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY environment variable not set. AI features will fail.");
    }
    this.ai = new GoogleGenAI({ apiKey: apiKey! });
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async generateCraftImage(craftName: string, userPrompt: string): Promise<{ imageUrl: string }> {
    if (!process.env.API_KEY) {
      throw new Error("The AI service is not configured on the server.");
    }

    try {
      const fullPrompt = `A high-quality, artistic image of a modern interpretation of a traditional Hong Kong craft: ${craftName}. The design is inspired by: "${userPrompt}". Focus on intricate details and beautiful lighting.`;

      const response = await this.ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '3:4',
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return { imageUrl: `data:image/jpeg;base64,${base64ImageBytes}` };
      } else {
        throw new Error('AI failed to generate an image. Please try again later.');
      }
    } catch (error) {
      console.error("Error generating image with Gemini:", error);
      if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
      }
      throw new Error('An unknown error occurred during image generation.');
    }
  }
}