import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client
// Note: In a real production app, you might want to handle the missing key case more gracefully in the UI.
const ai = new GoogleGenAI({ apiKey });

export const generateAdvice = async (
  prompt: string, 
  context: string
): Promise<string> => {
  try {
    if (!apiKey) {
      return "Simulated Response: API Key is missing. Please configure process.env.API_KEY to use the Gemini API.";
    }

    const modelId = 'gemini-3-flash-preview';
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: `You are WAHI, a helpful, empathetic, and empowering AI assistant for women. 
        Your context is currently focused on: ${context}.
        Keep your responses concise, supportive, and practical. 
        Use a warm, "angel-like" (protective and guiding) tone.`,
      },
    });

    return response.text || "I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};