import * as cli from './cli';
import { readFileContent } from './utils';
import { generateProject } from './project';
import { generateSchema } from './ai';

(async () => {
  cli.displayIntro();

  const projectName = await cli.getProjectName();

  cli.displayAiProvidersWarning();
  const provider = await cli.selectAIProvider();

  cli.displayERDInstructions();

  const filepath = await cli.getFilePath();
  const diagram = await readFileContent(filepath);

  const schemaContent = await cli.executeSchemaGeneration(
    generateSchema({
      diagram,
      provider,
    })
  );

  await cli.executeProjectGeneration(
    generateProject({
      projectName,
      schemaContent,
    })
  );

  cli.displaySyntaxErrorsWarning();
  cli.displayOutro(projectName);
})();