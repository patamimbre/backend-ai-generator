import { generateText } from 'ai';
import { SYSTEM_PROMPT } from './constants';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { cleanOutput } from './utils';
import { ollama } from 'ollama-ai-provider';

export enum ExternalAIProvider {
  GEMINI = 'gemini',
  OPENAI = 'openai',
  PERPLEXITY = 'perplexity',
}

export enum OllamaAIProvider {
  CODESTRAL = 'codestral',
  MISTRAL = 'mistral',
  LLAMA = 'llama',
  CODEGEMMA = 'codegemma',
}

export type AIProvider = ExternalAIProvider | OllamaAIProvider;

export type AIProviderConfig = {
  type: ExternalAIProvider;
  apiKey: string;
} | {
  type: OllamaAIProvider;
};

export const getModel = (config: AIProviderConfig) => {
  switch (config.type) {
    // External AI providers
    case ExternalAIProvider.GEMINI:
      return createGoogleGenerativeAI({ apiKey: config.apiKey })('models/gemini-1.5-flash-latest');
    case ExternalAIProvider.OPENAI:
      return createOpenAI({ apiKey: config.apiKey})('gpt-4o');
    case ExternalAIProvider.PERPLEXITY:
      return createOpenAI({ apiKey: config.apiKey, baseURL: 'https://api.perplexity.ai/' })('llama-3-sonar-small-32k-chat');
    // Ollama AI providers
    case OllamaAIProvider.LLAMA:
      return ollama('llama');
    case OllamaAIProvider.MISTRAL:
      return ollama('mistral');
    case OllamaAIProvider.CODEGEMMA:
      return ollama('codegemma');
    // Invalid AI provider
    default:
      throw new Error('Invalid AI provider');
  }
};

export const generateSchema = async ({diagram, provider }: {
  diagram: string;
  provider: AIProviderConfig;
}) => {
  const model = getModel(provider);

  const { text } = await generateText({
    model,
    system: SYSTEM_PROMPT,
    prompt: diagram,
  });

  return cleanOutput(text);
};
