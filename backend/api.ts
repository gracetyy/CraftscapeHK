// @/backend/api.ts

import { GoogleGenAI } from '@google/genai';
import { CRAFTS, PRODUCTS, EVENTS, ORDERS, ARTISANS, MESSAGE_THREADS } from '../constants';
import type { Craft, Product, Event, Order, Artisan, MessageThread } from '../types';

// --- Helper to simulate network delay ---
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const SIMULATED_DELAY = 500; // 500ms delay

// --- API Key Management (Simulating AWS Secrets Manager) ---
// This key is now "on the backend" and not accessible by the frontend.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real backend, this would throw an error during startup.
  // For the mock, we log a warning but allow it to proceed
  // to avoid crashing the frontend demo if the key isn't set.
  console.warn("API_KEY environment variable not set. AI features will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });


// --- Mock API Endpoints ---

export const getCrafts = async (): Promise<Craft[]> => {
    await sleep(SIMULATED_DELAY);
    return CRAFTS;
};

export const getProducts = async (): Promise<Product[]> => {
    await sleep(SIMULATED_DELAY);
    return PRODUCTS;
};

export const getEvents = async (): Promise<Event[]> => {
    await sleep(SIMULATED_DELAY);
    return EVENTS;
};

export const getOrders = async (): Promise<Order[]> => {
    await sleep(SIMULATED_DELAY);
    // In a real API, this join would be done with a database query.
    return ORDERS.map(order => ({
        ...order,
        product: PRODUCTS.find(p => p.id === order.product.id)!
    }));
};

export const getArtisans = async (): Promise<Artisan[]> => {
    await sleep(SIMULATED_DELAY);
    return ARTISANS;
}

export const getMessageThreads = async (): Promise<MessageThread[]> => {
    await sleep(SIMULATED_DELAY);
    return MESSAGE_THREADS;
}

/**
 * SECURE BACKEND FUNCTION
 * Generates an image based on a craft's description and a user prompt.
 * This function now lives "on the server" and safely uses the API key.
 * @param craftName - The name of the craft (e.g., "Canton Porcelain").
 * @param userPrompt - The user's creative input.
 * @returns A base64 encoded string of the generated JPEG image.
 */
export const generateCraftImageApi = async (craftName: string, userPrompt: string): Promise<string> => {
  if (!API_KEY) {
      throw new Error("The AI service is not configured on the server.");
  }
  try {
    const fullPrompt = `A high-quality, artistic image of a modern interpretation of a traditional Hong Kong craft: ${craftName}. The design is inspired by: "${userPrompt}". Focus on intricate details and beautiful lighting.`;
    
    // Simulate a longer delay for AI generation
    await sleep(2000);

    const response = await ai.models.generateImages({
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
      return `data:image/jpeg;base64,${base64ImageBytes}`;
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
};