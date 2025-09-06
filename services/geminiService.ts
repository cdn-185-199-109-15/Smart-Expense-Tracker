
import { GoogleGenAI, Type } from "@google/genai";
import { CATEGORIES } from '../constants';
import { ExpenseCategory } from '../types';

// IMPORTANT: This line assumes that the API key is set in the environment variables.
// Do not hardcode the API key here or expose it in the client-side code.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const categorizeExpense = async (description: string): Promise<ExpenseCategory> => {
  if (!description) {
    return ExpenseCategory.Other;
  }
  
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Categorize the following expense description into one of the following categories: ${CATEGORIES.join(', ')}. Description: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: {
              type: Type.STRING,
              enum: CATEGORIES,
              description: 'The most appropriate category for the expense.'
            }
          },
          required: ['category']
        }
      }
    });

    const jsonText = result.text.trim();
    const parsed = JSON.parse(jsonText);
    const category = parsed.category as ExpenseCategory;

    // Final validation to ensure the category from Gemini is one we expect.
    if (CATEGORIES.includes(category)) {
      return category;
    }

    console.warn(`Gemini returned an unexpected category: ${category}`);
    return ExpenseCategory.Other;

  } catch (error) {
    console.error("Error categorizing expense with Gemini:", error);
    // Fallback to 'Other' if the API call fails or parsing fails.
    return ExpenseCategory.Other;
  }
};
