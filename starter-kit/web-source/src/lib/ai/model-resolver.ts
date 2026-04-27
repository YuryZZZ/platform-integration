/**
 * AI Model Registry & Resolver
 * Centralized registry of all supported LLM models and providers.
 */

export interface AIModel {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google' | 'meta' | 'mistral';
  available: boolean;
}

export const MODEL_REGISTRY: AIModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    available: !!process.env.OPENAI_API_KEY,
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    available: !!process.env.OPENAI_API_KEY,
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    available: !!process.env.ANTHROPIC_API_KEY,
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    available: !!process.env.ANTHROPIC_API_KEY,
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'google',
    available: !!process.env.GOOGLE_AI_STUDIO_API_KEY,
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'google',
    available: !!process.env.GOOGLE_AI_STUDIO_API_KEY,
  },
];

/**
 * resolveModel — Finds a model by ID and checks for availability
 */
export function resolveModel(modelId: string): AIModel | undefined {
  return MODEL_REGISTRY.find((m) => m.id === modelId);
}

/**
 * getAvailableModels — Returns all models that have configured API keys
 */
export function getAvailableModels(): AIModel[] {
  return MODEL_REGISTRY.map((model) => ({
    ...model,
    available: isProviderConfigured(model.provider),
  }));
}

function isProviderConfigured(provider: AIModel['provider']): boolean {
  switch (provider) {
    case 'openai':
      return !!process.env.OPENAI_API_KEY;
    case 'anthropic':
      return !!process.env.ANTHROPIC_API_KEY;
    case 'google':
      return !!process.env.GOOGLE_AI_STUDIO_API_KEY || !!process.env.GOOGLE_APPLICATION_CREDENTIALS;
    default:
      return false;
  }
}
