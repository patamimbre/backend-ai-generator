import * as p from '@clack/prompts';
import { fileExists, normalizeProjectName } from './utils';
import { PROJECT_REPOSITORY } from './constants';
import { AIProvider, AIProviderConfig, ExternalAIProvider, OllamaAIProvider } from './ai';

const spinnerInstance = p.spinner();

export const displayIntro = () => p.intro(`Backend AI Generator version ${process.env.npm_package_version}`);
export const displayOutro = (projectName: string) => p.outro(`Thank you for using Backend AI Generator! Your project was created on ${projectName} folder. Please consider starring ⭐️ the project on GitHub and give us feedback: ${PROJECT_REPOSITORY}`);
export const displayERDInstructions = () => p.log.warning('Go to https://app.eraser.io and generate your project Entity Relationship Diagram (ERD). Then, save the diagram as a file.');
export const displaySyntaxErrorsWarning = () => p.log.warning('The generated project might contain syntax errors on the generated schema, please review the generated code before running it. We are working on improving the generated code.');
export const displayAiProvidersWarning = () => p.log.warning('The results may vary depending on the AI provider you choose. The generated schema might contain syntax errors, please review the generated code before running it. Check different AI providers to get the best results.');

export const getProjectName = async (): Promise<string> => {
  const name = await p.text({ message: 'Project name', validate: (v) => v.length > 0 ? undefined : 'The project name is required' });
  if (p.isCancel(name)) process.exit(0);
  return normalizeProjectName(name);
}

export const selectAIProvider = async (): Promise<AIProviderConfig> => {
  const externalProviderKeys = Object.keys(ExternalAIProvider);
  const provider = await p.select({
    message: 'Select the AI provider to generate the schema',
    options: Object.entries({
      ...ExternalAIProvider,
      ...OllamaAIProvider,
    }).map(([key, value]) => ({
      value,
      label: key,
      hint: externalProviderKeys.includes(key) ? 'External' : 'Ollama',
    })),
  });
  if (p.isCancel(provider)) process.exit(0);

  if (Object.values(OllamaAIProvider).includes(provider as OllamaAIProvider)) {
    return { type: provider as OllamaAIProvider };
  }

  const apiKey = (await getApiKey(provider as ExternalAIProvider)) as string;
  return { type: provider as ExternalAIProvider, apiKey };
}

const getApiKey = async (provider: AIProvider): Promise<string | void> => {
  // If the provider is an ollama provider, we don't need an API key
  if (Object.values(OllamaAIProvider).includes(provider as OllamaAIProvider)) return;

  const apiKey = await p.text({
    message: `Enter your ${provider.toString()} API key`,
    validate: (v) => v.length > 0 ? undefined : 'The api key is required',
  });
  if (p.isCancel(apiKey)) process.exit(0);
  return apiKey;
}

export const getFilePath = async (): Promise<string> => {
  const filepath = await p.text({
    message: 'Provide the path to the file with the ERD diagram',
    validate: (v) => {
      if (v.length === 0) return 'The file path is required';
      if (!fileExists(v)) return 'The file does not exist';
    }
  });
  if (p.isCancel(filepath)) process.exit(0);
  return filepath;
}

export const executeSchemaGeneration = async (
  promise: Promise<string>
) => {
  try {
    spinnerInstance.start('Generating the schema using AI, this could take a while 🤖');
    const result = await promise;
    spinnerInstance.stop('Schema generated!');
    return result;
  } catch (error) {
    spinnerInstance.stop('An error occurred while generating the schema');
    const message = (error as Error).message;

    p.log.error((error as Error).message);
    if (message === "Not Found") {
      p.log.error('Please pull the model before using it');
    }
    process.exit(1);
  }
};

export const executeProjectGeneration = async (
  promise: Promise<void>,
) => {
  spinnerInstance.start('Cloning the project template and injecting the schema 📦');
  await promise;
  spinnerInstance.stop(`Project generated 🎉`);
}
