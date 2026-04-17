/**
 * MODEL_REGISTRY
 * Central source of truth for all supported LLM models.
 */
export const MODEL_REGISTRY = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai', envKey: 'OPENAI_API_KEY' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'openai', envKey: 'OPENAI_API_KEY' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'anthropic', envKey: 'ANTHROPIC_API_KEY' },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'anthropic', envKey: 'ANTHROPIC_API_KEY' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'google', envKey: 'GOOGLE_AI_API_KEY' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'google', envKey: 'GOOGLE_AI_API_KEY' },
  { id: 'llama-3-70b', name: 'Llama 3 70B', provider: 'meta', envKey: 'GROQ_API_KEY' },
  { id: 'mixtral-8x7b', name: 'Mixtral 8x7B', provider: 'mistral', envKey: 'MISTRAL_API_KEY' },
];

/**
 * resolveModel
 * Determines which provider and model to use based on configuration.
 */
export function resolveModel(modelId: string) {
  const model = MODEL_REGISTRY.find(m => m.id === modelId);
  if (!model) throw new Error(`Model ${modelId} not found in registry`);

  return {
    ...model,
    available: !!process.env[model.envKey]
  };
}
