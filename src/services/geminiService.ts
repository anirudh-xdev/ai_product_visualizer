import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import type { OriginalImage } from "../../types";

// IMPORTANT: Ensure you have the API_KEY in your environment variables.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  // In a real app, you might handle this more gracefully, but for this context, an error is fine.
  console.warn(
    "API_KEY environment variable not set. App will not function correctly."
  );
}
const ai = new GoogleGenAI({ apiKey: API_KEY! });
const model = "gemini-2.5-flash-image";

const fileToGenerativePart = (base64Data: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
};

const extractImageFromResponse = (
  response: GenerateContentResponse
): string | null => {
  // The response contains the generated image as base64 data in one of its parts.
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return part.inlineData.data;
    }
  }
  return null;
};

export const generateVisualizations = async (
  productImage: OriginalImage
): Promise<string[]> => {
  const imagePart = fileToGenerativePart(
    productImage.base64,
    productImage.mimeType
  );

  const prompts = [
    "Place this product onto a white coffee mug. The mug is on a wooden table in a bright, modern cafe. The product should be clearly visible and centered on the mug.",
    "Render this product onto the front of a black cotton t-shirt worn by a person walking down a vibrant city street. The product logo or design should be prominent.",
    "Display this product on a massive, glowing billboard in a futuristic city at night, similar to Times Square. The lighting should be dramatic and eye-catching.",
  ];

  // Use proxy path instead of direct API URL
  const url = '/api/freepik/v1/ai/gemini-2-5-flash-image-preview';

  const generationPromises = prompts.map(async (prompt) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, reference_images: [imagePart.inlineData.data] }),
    }).then(response => {
      if (!response.ok) {
        throw new Error(`Failed to generate image: ${response.statusText}`);
      }
      return response.json();
    });
  });

  const results = await Promise.all(generationPromises);
  return results.map((result) => result.image);
};

export const editImage = async (
  image: { base64: string; mimeType: string },
  prompt: string
): Promise<string> => {
  const imagePart = fileToGenerativePart(image.base64, image.mimeType);

  const response = await ai.models.generateContent({
    model,
    contents: { parts: [imagePart, { text: prompt }] },
    config: { responseModalities: [Modality.IMAGE] },
  });

  const result = extractImageFromResponse(response);
  if (!result) {
    throw new Error("Failed to edit image or extract it from the response.");
  }
  return result;
};
