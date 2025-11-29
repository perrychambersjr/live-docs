import type { ClassItem } from "../types/Types.ts";
import { dedent } from "../utils/dedent.ts";

export function renderClass(item: Extract<ClassItem, { type: "class" }>): string {
    const commentLine = item.comment ? `- Description: ${item.comment}` : "";
    const block = `
        ## Class: ${item.name}
        ${commentLine}
    `; 
 
    return dedent(block) + "\n\n";
}