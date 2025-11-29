import { generateMarkdown } from '../docs/docGenerator.ts';

export function parseAndGenerateDocs(filePath: string, code: string) {
  const items: any[] = [];

  // Function regex: captures optional comments above the function
const functionRegex = /(?:\s*(\/\/.*|\/\*[\s\S]*?\*\/)\s*)*\s*function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*(?::\s*([^{\s]+))?/g;

  let match;
  while ((match = functionRegex.exec(code)) !== null) {
    const rawComment = match[1] ?? "";
    const comment = rawComment ? cleanComment(rawComment) : undefined;

    items.push({
    type: "function",
    name: match[2],
    params: match[3] || null,
    return: match[4] || "void",
    comment,
    });

  }

  // Class regex: captures optional comments above the class
  const classRegex = /((?:\/\/.*\n|\/\*[\s\S]*?\*\/\n)*)class\s+([a-zA-Z0-9_]+)/g;
  while ((match = classRegex.exec(code)) !== null) {
    const rawComment = match[1] ?? "";

    const cleanComment = rawComment
      .split("\n")
      .map(line => line.replace(/^(\s*\/\/\s*|\s*\/\*|\*\/)/, "").trim())
      .filter(line => line)
      .join(" ");

    items.push({
      type: "class",
      name: match[2],
      comment: cleanComment || undefined,
    });
  }

  return generateMarkdown(filePath, items);
}

function cleanComment(raw: string): string {
  return raw
    .replace(/\/\*+/, "")        // remove starting /*
    .replace(/\*+\/$/, "")       // remove ending */
    .split("\n")
    .map(line => line.replace(/^\s*\*\s?/, "").trim()) // remove leading * in multi-line comments
    .map(line => line.replace(/^\/\/\s?/, ""))        // remove // from single-line
    .filter(line => line) // remove empty lines
    .join(" ");
}
