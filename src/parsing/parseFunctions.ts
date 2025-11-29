import { cleanComment } from "./cleanComments.ts";

export interface FunctionItem {
  type: "function";
  name: string;
  params: string | null;
  return: string;
  comment?: string;
}

export function parseFunctions(code: string): FunctionItem[] {
  const items: FunctionItem[] = [];

    // Matches:
    // - function foo(...) {}
    // - export function foo(...) {}
    // - export default function foo(...) {}
    // Matches standard, exported, default, and arrow functions
    const funcRegex = /(?:\/\/.*|\/\*[\s\S]*?\*\/)*\s*(?:export\s+)?(?:default\s+)?function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)/g;
    const arrowRegex = /(?:\/\/.*|\/\*[\s\S]*?\*\/)*\s*export\s+const\s+([a-zA-Z0-9_]+)\s*=\s*\(([^)]*)\)\s*=>/g;


  let match;
  while ((match = funcRegex.exec(code)) !== null) {
    const rawComment = match[0]; // includes preceding comment lines
    const comment = rawComment ? cleanComment(rawComment) : undefined;

    items.push({
      type: "function",
      name: match[1] ?? "unknown",
      params: match[2] || null,
      return: match[3] || "void",
      comment,
    });
  }

  // Also match exported arrow functions:
  while ((match = arrowRegex.exec(code)) !== null) {
    const rawComment = match[0];
    const comment = rawComment ? cleanComment(rawComment) : undefined;

    items.push({
      type: "function",
      name: match[1] ?? "unknown",
      params: match[2] || null,
      return: "void",
      comment,
    });
  }

  console.log(`✅ parseFunctions: found ${items.length} functions`);
  return items;
}
