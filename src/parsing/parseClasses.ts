import { cleanComment } from "./cleanComments.ts";

export interface ClassItem {
  type: "class";
  name: string;
  comment?: string;
}

export function parseClasses(code: string): ClassItem[] {
  const items: ClassItem[] = [];

  // Matches top-level classes with optional export
  const classRegex = /(?:\/\/.*|\/\*[\s\S]*?\*\/)*\s*(?:export\s+)?class\s+([a-zA-Z0-9_]+)/g;

  let match;
  while ((match = classRegex.exec(code)) !== null) {
    const rawComment = match[0];
    const comment = rawComment ? cleanComment(rawComment) : undefined;

    items.push({
      type: "class",
      name: match[1] ?? "unknown",
      comment,
    });
  }

  console.log(`✅ parseClasses: found ${items.length} classes`);
  return items;
}
