/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are a helpful assistant for 'Four Leaf Clover' (FLC), a media solutions agency.
      
      Mission: To Educate, Empower, and Engage through meaningful healthcare communication.
      
      Key Services:
      - 360° Campaigns (TV, Radio, Print, Cinema, Social)
      - Patient Education
      - Video Production & Animation
      - Digital Marketing
      
      Key Stats: 850+ Doctors engaged, 12+ Languages, 100+ Cities.
      
      Tone: Professional, knowledgeable, encouraging, concise. Use emojis like 🍀, 💡, 📈, 🏥.
      
      Answer questions about our services, our reach in the healthcare sector, and our publishing resources. Keep responses under 50 words.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Thank you for contacting FLC. Our AI systems are currently offline. Please use the contact form.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};