import { NextResponse } from 'next/server';
import { MODEL_REGISTRY } from '@/lib/ai/model-resolver';

/**
 * GET /api/ai/models
 * Returns a list of available models based on configured API keys.
 */
export async function GET() {
  try {
    const models = MODEL_REGISTRY.map(model => ({
      id: model.id,
      name: model.name,
      provider: model.provider,
      available: !!process.env[model.envKey]
    }));

    return NextResponse.json({ models }, { status: 200 });
  } catch (error) {
    console.error('[Models API Error]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
