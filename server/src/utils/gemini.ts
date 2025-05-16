import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateTripPlan = async (
  destination: string,
  duration: number,
  preferences: string[],
  budget: number
) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
    Create a detailed ${duration}-day trip itinerary for ${destination}.
    Consider these preferences: ${preferences.join(', ')}.
    Total budget: $${budget}

    For each day, provide:
    - Multiple activities with descriptions
    - Estimated costs
    - Recommended time slots
    - Location details

    Format the response as a structured itinerary with daily plans.
    Include budget warnings if the suggested activities might exceed the given budget.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response and structure it
    // This is a simplified example - you might need more complex parsing
    return {
      success: true,
      data: text,
    };
  } catch (error) {
    console.error('Error generating trip plan:', error);
    return {
      success: false,
      error: 'Failed to generate trip plan',
    };
  }
}; 