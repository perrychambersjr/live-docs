import { Project, SyntaxKind } from "ts-morph";
import { generateMarkdown } from "../docs/generateMarkdown.ts";
import type { ClassItem, FunctionItem } from "../types/Types.ts";
import { parseClasses } from "./parseClasses.ts";
import { parseFunctions } from "./parseFunctions.ts";

export type Item = FunctionItem | ClassItem;

export function parseAndGenerateDocs(filePath: string): string {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);

  // parse functions using AST-based parseFunctions
  const functionItems = parseFunctions(sourceFile);

  // parse classes using AST-based parseClasses
  const classItems = parseClasses(sourceFile);

  const allItems: Item[] = [...functionItems, ...classItems];

  console.log(
    `✅ parseAndGenerateDocs: total items found in ${filePath}: ${allItems.length}`,
  );

  return generateMarkdown(filePath, allItems);
}
