import { access, writeFile } from 'fs/promises';
import { constants } from 'fs';
import { downloadTemplate } from "giget";

import { TEMPLATE_REPOSITORY, TEMPLATE_SCHEMA_PATH } from "./constants";

const cloneTemplate = async (destination: string) => {
  return downloadTemplate(TEMPLATE_REPOSITORY, {dir: destination});
}

const injectSchema = async (projectSrc: string, schemaContent: string) => {
  const path = `${projectSrc}/${TEMPLATE_SCHEMA_PATH}`;

  // verify the path exists and have write permissions
  await access(path, constants.F_OK | constants.W_OK);

  // write the schema content to the file, overwriting the existing content
  await writeFile(path, schemaContent);
}

export const generateProject = async ({
  projectName,
  schemaContent,
}: {
  projectName: string;
  schemaContent: string;
}) => {
  const { dir } = await cloneTemplate(projectName);
  await injectSchema(dir, schemaContent);
};