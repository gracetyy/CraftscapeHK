import { GoogleGenAI, Type } from "@google/genai";

type GlyphName = 
  | 'shou' | 'tian' | 'shui' | 'kou' | 'nian' | 'bu' | 'shan' | 'ge' | 'ren' | 'xin'
  | 'ri' | 'shi' | 'mu' | 'huo' | 'tu' | 'zhu' | 'da' | 'zhong' | 'jin' | 'nu'
  | 'yue' | 'gong' | 'heng' | 'shu' | 'pie' | 'na' | 'dian' | 'ti';

interface CanvasElement {
  id: string;
  glyph: GlyphName;
  char: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  zIndex: number;
  fontWeight: number;
}

interface AiLayout {
  description: string;
  elements: Omit<CanvasElement, 'id' | 'zIndex' | 'char'>[];
}

const GLYPH_LIBRARY: { name: string; glyph: GlyphName }[] = [
  { name: '手', glyph: 'shou' },
  { name: '田', glyph: 'tian' },
  { name: '水', glyph: 'shui' },
  { name: '口', glyph: 'kou' },
  { name: '廿', glyph: 'nian' },
  { name: '卜', glyph: 'bu' },
  { name: '山', glyph: 'shan' },
  { name: '戈', glyph: 'ge' },
  { name: '人', glyph: 'ren' },
  { name: '心', glyph: 'xin' },
  { name: '日', glyph: 'ri' },
  { name: '尸', glyph: 'shi' },
  { name: '木', glyph: 'mu' },
  { name: '火', glyph: 'huo' },
  { name: '土', glyph: 'tu' },
  { name: '竹', glyph: 'zhu' },
  { name: '大', glyph: 'da' },
  { name: '中', glyph: 'zhong' },
  { name: '金', glyph: 'jin' },
  { name: '女', glyph: 'nu' },
  { name: '月', glyph: 'yue' },
  { name: '弓', glyph: 'gong' },
  { name: '一', glyph: 'heng' },
  { name: '丨', glyph: 'shu' },
  { name: '丿', glyph: 'pie' },
  { name: '㇏', glyph: 'na' },
  { name: '㇔', glyph: 'dian' },
  { name: '𠃋', glyph: 'ti' },
];

// Get API key from environment variable or use the existing one
const API_KEY = process.env.GOOGLE_AI_API_KEY || process.env.API_KEY;

let ai: GoogleGenAI | null = null;

try {
  if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  }
} catch (error) {
  console.warn('Failed to initialize Google GenAI:', error);
}

const glyphNames = GLYPH_LIBRARY.map(g => g.glyph);

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        layouts: {
            type: Type.ARRAY,
            description: "An array of 3 distinct layout proposals for the seal.",
            items: {
                type: Type.OBJECT,
                properties: {
                    description: {
                        type: Type.STRING,
                        description: "A brief, artistic description of the visual style (e.g., 'A minimalist cat using strokes for its form.', 'A house shape built from radicals.').",
                    },
                    elements: {
                        type: Type.ARRAY,
                        description: "The array of graphical elements that compose the design. Use at least 5 glyphs, but feel free to use more to create a detailed shape.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                glyph: {
                                    type: Type.STRING,
                                    enum: glyphNames,
                                    description: "The name of the glyph or stroke to use."
                                },
                                x: {
                                    type: Type.NUMBER,
                                    description: "The x-coordinate for the center of the element on a 300x300 canvas."
                                },
                                y: {
                                    type: Type.NUMBER,
                                    description: "The y-coordinate for the center of the element on a 300x300 canvas."
                                },
                                scale: {
                                    type: Type.NUMBER,
                                    description: "The scale of the element. 1 is normal size."
                                },
                                rotation: {
                                    type: Type.NUMBER,
                                    description: "The rotation in degrees."
                                },
                                fontWeight: {
                                    type: Type.NUMBER,
                                    description: "The font weight from 100 to 900. Use different weights to create visual hierarchy and contrast."
                                }
                            },
                            required: ["glyph", "x", "y", "scale", "rotation", "fontWeight"]
                        }
                    }
                },
                required: ["description", "elements"]
            }
        }
    },
    required: ["layouts"]
};

export const generateDrafts = async (prompt: string): Promise<AiLayout[]> => {
    if (!ai) {
        console.warn('Google GenAI not initialized, returning mock data');
        // Return mock data when AI is not available
        return [
            {
                description: `Minimalist design of "${prompt}"`,
                elements: [
                    { glyph: 'zhong', x: 150, y: 150, scale: 1.2, rotation: 0, fontWeight: 900 },
                    { glyph: 'heng', x: 150, y: 120, scale: 0.8, rotation: 0, fontWeight: 700 },
                    { glyph: 'shu', x: 120, y: 150, scale: 0.8, rotation: 0, fontWeight: 700 },
                    { glyph: 'dian', x: 180, y: 150, scale: 0.6, rotation: 0, fontWeight: 500 },
                    { glyph: 'dian', x: 150, y: 180, scale: 0.6, rotation: 0, fontWeight: 500 },
                ]
            },
            {
                description: `Dynamic composition of "${prompt}"`,
                elements: [
                    { glyph: 'shan', x: 140, y: 140, scale: 1.0, rotation: 15, fontWeight: 800 },
                    { glyph: 'shui', x: 160, y: 160, scale: 1.1, rotation: -10, fontWeight: 900 },
                    { glyph: 'huo', x: 150, y: 120, scale: 0.9, rotation: 30, fontWeight: 600 },
                    { glyph: 'tu', x: 130, y: 170, scale: 0.8, rotation: 45, fontWeight: 700 },
                    { glyph: 'jin', x: 170, y: 130, scale: 0.7, rotation: -30, fontWeight: 500 },
                ]
            },
            {
                description: `Traditional style of "${prompt}"`,
                elements: [
                    { glyph: 'da', x: 150, y: 130, scale: 1.3, rotation: 0, fontWeight: 900 },
                    { glyph: 'xin', x: 150, y: 170, scale: 1.0, rotation: 0, fontWeight: 800 },
                    { glyph: 'dian', x: 130, y: 150, scale: 0.7, rotation: 0, fontWeight: 600 },
                    { glyph: 'dian', x: 170, y: 150, scale: 0.7, rotation: 0, fontWeight: 600 },
                    { glyph: 'heng', x: 150, y: 100, scale: 0.9, rotation: 0, fontWeight: 700 },
                    { glyph: 'heng', x: 150, y: 200, scale: 0.9, rotation: 0, fontWeight: 700 },
                ]
            }
        ];
    }

    try {
        const systemInstruction = `You are a creative visual artist specializing in typography art. Your task is to create a visual representation of a user's concept by arranging a set of predefined Chinese radicals and strokes on a canvas. Your goal is to form a recognizable shape or silhouette of the concept, not to create a new, valid Chinese character.

Follow these steps meticulously:

1.  **Visualize the Concept**: Imagine the user's prompt (e.g., 'Dragon', '香港', '❤️', 'a running cat') as a simple, iconic shape or silhouette.

2.  **Select Glyphs as Building Blocks**: You have a limited palette of Chinese radicals and strokes. Think of them as your "ink" or "pixels". Select a variety of these glyphs to use as building blocks for your artwork. You can use a glyph multiple times. You are REQUIRED to use at least 5 glyphs for each design, but feel free to use more to create a more detailed shape. A design with fewer than 5 glyphs is an invalid response.

3.  **Arrange Glyphs to Form the Shape (VERY IMPORTANT)**:
    *   **Canvas**: The canvas is a 300x300 grid. The main drawing area is the central 200x200 box (from x=50 to x=250, y=50 to y=250). All coordinates are for the element's CENTER.
    *   **Placement**: Place the selected glyphs on the canvas. Use their 'x' and 'y' coordinates to position them.
    *   **Transformation**: Use 'scale' to make glyphs larger or smaller, and 'rotation' to orient them correctly to fit the contours of the shape you are creating. For example, you might rotate the 'heng' (一) stroke to form lines at different angles, or scale up a 'kou' (口) to be an outline.
    *   **Font Weight**: Use 'fontWeight' (100-900) to create visual hierarchy and emphasis. Use heavier weights (700-900) for main structural elements, medium weights (400-600) for supporting elements, and lighter weights (100-300) for subtle details.

4.  **Create 3 Distinct Variations**: Generate three different artistic interpretations of the same concept. They should differ in their composition, glyph choice, or style (e.g., one abstract, one literal, one dynamic).

5.  **Describe the Artwork**: For each layout, provide a brief description of what you were trying to depict and how the glyphs were used to achieve the visual effect. For example: "A minimalist representation of a cat, using the 'gong' (弓) glyph for its arched back and 'dian' (㇔) for its eyes."`;
        
        const result = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: `Generate layouts for the concept: "${prompt}"`,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = result.text.trim();
        const responseJson = JSON.parse(jsonText);

        if (responseJson && Array.isArray(responseJson.layouts)) {
            return responseJson.layouts;
        }

        console.error("Parsed response is not in the expected format:", responseJson);
        return [];

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate drafts from the AI.");
    }
};