
import { GoogleGenAI, Type } from "@google/genai";

export interface AISearchResult {
  operacion?: string;
  tipo?: string;
  zona?: string;
  precioMax?: number;
  explanation?: string;
}

export const parseUserSearchIntent = async (query: string): Promise<AISearchResult | null> => {
  // Fix: Ensure the API key is present before attempting to call the SDK
  if (!process.env.API_KEY) return null;

  try {
    // Fix: Always use the pattern `new GoogleGenAI({apiKey: process.env.API_KEY})` 
    // and initialize right before use for consistency.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analiza la siguiente búsqueda de un usuario que busca propiedades inmobiliarias en CDMX/EdoMex y extrae los filtros necesarios: "${query}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            operacion: { type: Type.STRING, description: "Venta o Renta" },
            tipo: { type: Type.STRING, description: "Casa, Departamento o Terreno" },
            zona: { type: Type.STRING, description: "Ubicación aproximada" },
            precioMax: { type: Type.NUMBER, description: "Presupuesto máximo en pesos" },
            explanation: { type: Type.STRING, description: "Breve explicación de lo que entendiste" }
          },
          required: ["explanation"]
        }
      }
    });

    // Fix: Property `text` is a getter, do not call it as a function.
    const text = response.text;
    if (text) {
      return JSON.parse(text) as AISearchResult;
    }
  } catch (error) {
    console.error("Gemini Error:", error);
  }
  return null;
};
