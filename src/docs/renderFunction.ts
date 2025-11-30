import { blob } from "stream/consumers";
import type { FunctionItem } from "../types/Types.ts";
import { dedent } from "../utils/dedent.ts";
import { formatJsDoc } from "./formatJsDoc.ts";

export function renderFunction(item: Extract<FunctionItem, { type: "function" }>): string {
    const commentLine = item.comment ? `- Description: ${item.comment}` : "";
    const block = `
        ## Function: ${item.name}
        - Params: ${item.params ?? "None"}
        - Returns: ${item.return === "void" ? "Void" : item.return}
        ${formatJsDoc(item.comment)}
    `;

    return dedent(block) + "\n\n";
}