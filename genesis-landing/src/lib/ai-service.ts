// landingpage-builder/genesis-landing/src/lib/ai-service.ts
import { DeepSeek } from 'deepseek-api';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize AI clients
const deepseek = new DeepSeek(process.env.DEEPSEEK_API_KEY || '');
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const geminiModel = gemini.getGenerativeModel({ model: "gemini-pro" });

// System prompt for component generation
const SYSTEM_PROMPT = `
You are an expert React/Next.js developer. Your task is to generate clean, production-ready Next.js components based on user prompts.

Requirements:
1. Use TypeScript with strict typing
2. Use functional components with React hooks
3. Follow Next.js App Router conventions
4. Use Tailwind CSS for styling
5. Export components as default exports
6. Include proper JSDoc comments
7. Ensure accessibility (a11y) compliance
8. Make components responsive
9. Use Next.js Image component for images
10. Separate server and client components appropriately

Component Structure:
- Create components in the app/components directory
- Use PascalCase for component names
- Include TypeScript interfaces for props
- Use CSS Modules for component-scoped styles

Response Format:
Return ONLY the component code in a single code block. Do not include explanations.
`;

export async function generateComponent(prompt: string, model: 'deepseek' | 'gemini'): Promise<string> {
  try {
    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Prompt: ${prompt}`;

    if (model === 'deepseek') {
      const response = await deepseek.chatCompletions.create({
        model: 'deepseek-coder',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
        temperature: 0.2,
      });

      return response.choices[0].message.content.trim();
    }
    else {
      const result = await geminiModel.generateContent(fullPrompt);
      const response = await result.response;
      return response.text().trim();
    }
  } catch (error) {
    console.error(`Error generating component with ${model}:`, error);
    throw new Error(`AI service error: ${(error as Error).message}`);
  }
}

// Utility function to validate component code
export function validateComponentCode(code: string): boolean {
  const requiredPatterns = [
    /import React/,
    /export default function \w+\(\)/,
    /return \(/,
    /<div.*>/,
    /<\/div>/
  ];

  return requiredPatterns.every(pattern => pattern.test(code));
}

// Example usage:
// const componentCode = await generateComponent(
//   'Create a hero section with headline, subheadline and CTA button',
//   'deepseek'
// );
