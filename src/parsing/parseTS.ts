import { generateMarkdown } from '../docs/generateMarkdown.ts';
import type { ClassItem, FunctionItem } from '../types/Types.ts';
import { parseClasses } from './parseClasses.ts';
import { parseFunctions } from './parseFunctions.ts';

type DocItem = FunctionItem | ClassItem;

export function parseAndGenerateDocs(filePath: string, code: string) {
  const functions = parseFunctions(code);
  const classes = parseClasses(code);

  const items: DocItem[] = [...functions, ...classes];
  return generateMarkdown(filePath, items);
}