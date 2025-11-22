import type { Item } from "../types/Types.ts";
import { dedent } from "../utils/dedent.ts";

export function generateMarkdown(filePath: string, items: Item[]): string {
  let md = `# ${filePath}\n\n`;

    const renderers: Record<Item["type"], (item: Item) => string> = {
    function: (item) => {
        const func = item as Extract<Item, { type: "function" } & { comment?: string }>;
        const commentLine = func.comment ? `- Description: ${func.comment}` : "";

        const block = `
            ## Function: ${func.name}
            - Params: ${func.params ?? "None"}
            - Returns: ${func.return === "void" ? "Void" : func.return}
            ${commentLine}
        `;

        return dedent(block) + "\n\n";
    },

    class: (item) => {
        const cls = item as Extract<Item, { type: "class" } & { comment?: string }>;
        const commentLine = cls.comment ? `- Description: ${cls.comment}` : "";

        const block = `
            ## Class: ${cls.name}
            ${commentLine}
        `;

        return dedent(block) + "\n\n";
    },
    };


  for (const item of items) {
    const renderer = renderers[item.type];
    if (renderer) {
      md += renderer(item);
    }
  }

  return md;
}

