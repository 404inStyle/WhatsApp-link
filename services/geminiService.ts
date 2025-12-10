import { GoogleGenAI } from "@google/genai";
import { ToneType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAiMessage = async (tone: ToneType, context: string): Promise<string> => {
  try {
    const prompt = `You are an expert copywriter for WhatsApp marketing. 
    Write a short, engaging, and effective WhatsApp opening message.
    
    Tone: ${tone}
    Context/Purpose: ${context || "General greeting"}
    
    Requirements:
    - Language: Chinese (Simplified)
    - Keep it concise (under 50 words).
    - Include 1-2 relevant emojis.
    - Output ONLY the message text, no explanations.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Error generating message:", error);
    throw new Error("Failed to generate AI message.");
  }
};