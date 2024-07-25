import { readFile } from 'fs/promises';
import { accessSync, constants } from 'fs';

const cleanupFilepath = (path: string): string => {
  return path.replace(/['"]+/g, '');
}

export const fileExists = (path: string): boolean => {
  try {
    accessSync(cleanupFilepath(path), constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export const readFileContent = async (path: string): Promise<string> => readFile(cleanupFilepath(path), 'utf-8');

export const normalizeProjectName = (name: string): string => name.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();


export const cleanOutput = (output: string) => {
  // If the output CONTAINS a typescript code block, get the content of the code block
  const codeBlock = output.match(/```typescript\n([\s\S]*?)\n```/);
  if (codeBlock) {
    return codeBlock[1];
  } else {
    return output;
  }
};