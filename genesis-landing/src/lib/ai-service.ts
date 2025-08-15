// landingpage-builder/genesis-landing/src/lib/ai-service.ts

// DeepSeek API configuration
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

// System prompt for component generation
const SYSTEM_PROMPT = `
You are an expert React/Next.js developer. Generate a COMPLETE, working React component based on the user's request.

CRITICAL REQUIREMENTS:
1. Generate ONLY ONE focused component per request
2. Make it COMPLETE - no truncated code
3. Use TypeScript with proper interfaces
4. Use Tailwind CSS for all styling - MUST be mobile-first responsive
5. Include realistic sample data within the component
6. RESPONSIVE DESIGN: Use sm:, md:, lg:, xl: breakpoints extensively
7. Use semantic HTML elements (section, header, main, article)
8. Include hover effects and smooth transitions
9. Ensure text is readable on mobile (proper font sizes)
10. Use proper spacing and padding for mobile devices

RESPONSE FORMAT:
- Return ONLY the component code
- NO markdown code blocks (no \`\`\`tsx)
- NO explanations or comments
- Start with import statements
- End with export default ComponentName;
- Keep it under 3500 tokens to ensure completion

COMPONENT STRUCTURE:
- Single focused component (Hero, Features, Testimonials, etc.)
- Include TypeScript interface for props
- Use realistic sample data (names, text, images from unsplash)
- Make it visually appealing with gradients, shadows, rounded corners
- Include interactive elements (buttons, hover effects)
- MOBILE-FIRST: Start with mobile styles, then add larger breakpoints
- Use responsive grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Responsive text: text-2xl md:text-4xl lg:text-5xl
- Responsive spacing: py-8 md:py-16 lg:py-24
- Responsive containers: px-4 md:px-6 lg:px-8

EXAMPLE OUTPUT:
import React from 'react';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  return (
    <section className={\`bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 md:py-20 lg:py-24 \${className}\`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">Transform Your Business</h1>
        <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">Discover powerful solutions that drive growth and success</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started
          </button>
          <button className="border-2 border-white text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
`;

export async function generateComponent(
  prompt: string,
  model: "deepseek" | "gemini" = "deepseek",
): Promise<string> {
  try {
    if (model === "deepseek") {
      if (!DEEPSEEK_API_KEY) {
        throw new Error('DeepSeek API key not configured');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-coder',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: prompt },
          ],
          max_tokens: 4000,
          temperature: 0.2,
          stream: false,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`DeepSeek API error: ${response.status} ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from DeepSeek API');
      }

      const rawContent = data.choices[0].message.content.trim();

      // Clean the response - remove markdown code blocks and extract clean code
      return cleanAIResponse(rawContent);
    } else {
      // For now, return a placeholder for Gemini
      // You can implement Gemini API integration later
      throw new Error('Gemini integration not yet implemented');
    }
  } catch (error) {
    console.error(`Error generating component with ${model}:`, error);

    // For development/testing, provide a fallback mock component
    if (process.env.NODE_ENV === 'development') {
      console.log('Using fallback mock component for development');
      return generateMockComponent(prompt);
    }

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
    /<\/div>/,
  ];

  return requiredPatterns.every((pattern) => pattern.test(code));
}

// Clean AI response by removing markdown code blocks
function cleanAIResponse(content: string): string {
  // Remove markdown code blocks (```tsx, ```typescript, ```jsx, etc.)
  let cleaned = content.replace(/^```[\w]*\n?/gm, '').replace(/\n?```$/gm, '');

  // Remove any leading/trailing whitespace
  cleaned = cleaned.trim();

  // If the response still has code block markers, try a more aggressive approach
  if (cleaned.includes('```')) {
    const codeBlockRegex = /```[\w]*\n?([\s\S]*?)\n?```/g;
    const match = codeBlockRegex.exec(cleaned);
    if (match && match[1]) {
      cleaned = match[1].trim();
    }
  }

  // Check if the response appears to be truncated
  if (!cleaned.includes('export default') && !cleaned.endsWith('};')) {
    console.warn('Response appears to be truncated, using fallback');
    throw new Error('Response was truncated - please try a simpler prompt');
  }

  return cleaned;
}

// Mock component generator for development/testing
function generateMockComponent(prompt: string): string {
  const componentName = 'MockComponent';

  return `import React from 'react';

interface ${componentName}Props {
  className?: string;
}

/**
 * Mock component generated for prompt: "${prompt}"
 * This is a fallback component used when the AI service is unavailable.
 */
const ${componentName}: React.FC<${componentName}Props> = ({ className = '' }) => {
  return (
    <div className={\`bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg \${className}\`}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Mock Component
        </h1>
        <p className="text-xl mb-6 opacity-90">
          Generated for: "{prompt}"
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default ${componentName};`;
}

// Example usage:
// const componentCode = await generateComponent(
//   'Create a hero section with headline, subheadline and CTA button',
//   'deepseek'
// );
