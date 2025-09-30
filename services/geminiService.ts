
import { generateCraftImageApi } from './apiService';

/**
 * Client-side function to request an image generation from the backend.
 * It no longer handles the API key or direct communication with the Gemini API.
 * @param craftName - The name of the craft (e.g., "Canton Porcelain").
 * @param userPrompt - The user's creative input.
 * @returns A base64 encoded string of the generated JPEG image, fetched from our backend.
 */
export const generateCraftImage = async (craftName: string, userPrompt: string): Promise<string> => {
  try {
    // This now calls our secure backend function instead of the Gemini API directly.
    const imageUrl = await generateCraftImageApi(craftName, userPrompt);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching generated image from backend:", error);
    // Re-throw the error so the UI component can handle it.
    throw error;
  }
};
