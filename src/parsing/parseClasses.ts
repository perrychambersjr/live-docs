import type { ClassItem } from "../types/Types.ts";
import { cleanComment } from "./cleanComments.ts";

export function parseClasses(code: string): ClassItem[] {
    const items: ClassItem[] = [];

    const classRegex = /\/\*\*([\s\S]*?)\*\/\s*export class (\w+)/g;
    let match;
    while ((match = classRegex.exec(code)) !== null) {
        const rawComment = match[1] ?? "";
        const comment = rawComment ? cleanComment(rawComment) : undefined;

        const className = match[2];
        if (!className) continue;

        items.push({
            type: 'class',
            name: className,
            comment,
        });
    }
    return items;
}