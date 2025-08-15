// landingpage-builder/genesis-landing/src/app/api/generate/route.ts
import { NextRequest } from 'next/server';
import { generateComponent } from '@/lib/ai-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, model = 'deepseek', sessionId } = body;

    // Validate request
    if (!prompt || typeof prompt !== 'string') {
      return Response.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    if (model !== 'deepseek' && model !== 'gemini') {
      return Response.json(
        { error: 'Model must be either "deepseek" or "gemini"' },
        { status: 400 }
      );
    }

    // Generate component using AI service
    const componentCode = await generateComponent(prompt, model);

    return Response.json({
      success: true,
      component: {
        code: componentCode,
        model,
        prompt,
        timestamp: new Date().toISOString(),
      },
      sessionId,
    });

  } catch (error) {
    console.error('Component generation error:', error);
    
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({
    message: 'Component generation API',
    methods: ['POST'],
    requiredFields: ['prompt'],
    optionalFields: ['model', 'sessionId'],
    supportedModels: ['deepseek', 'gemini'],
  });
}