import { generateMarkdown } from "../docs/generateMarkdown.ts";
import type { ClassItem } from "./parseClasses.ts";
import { parseClasses } from "./parseClasses.ts";
import type { FunctionItem } from "./parseFunctions.ts";
import { parseFunctions } from "./parseFunctions.ts";

export type Item = FunctionItem | ClassItem;

export function parseAndGenerateDocs(filePath: string, code: string): string {
  const funcs = parseFunctions(code);
  const classes = parseClasses(code);

  const items: Item[] = [...funcs, ...classes];

  console.log(`📝 parseAndGenerateDocs: total items found in ${filePath}: ${items.length}`);
  items.forEach(i => console.log(" -", i.type, i.name));

  return generateMarkdown(filePath, items);
}
