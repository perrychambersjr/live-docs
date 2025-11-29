import type { FunctionItem } from "../types/Types.ts";
import { cleanComment } from "./cleanComments.ts";

export function parseFunctions(source: string): FunctionItem[] {
    const items: FunctionItem[] = [];

    const functionRegex = /\/\*\*([\s\S]*?)\*\/\s*export function (\w+)\s*\(([^)]*)\)\s*:\s*([^{\n]+)/g;

    let match;
    while ((match = functionRegex.exec(source)) !== null) {
        const rawComment = match[1] ?? "";
        const comment = rawComment ? cleanComment(rawComment) : undefined;

        const functionName = match[2];
        if (!functionName) continue;

        items.push({
            type: 'function',
            name: functionName,
            params: match[3] || null,
            return: match[4] || "void",
            comment,
        });
    }

    return items;
}
