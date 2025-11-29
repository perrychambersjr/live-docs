import { SourceFile, SyntaxKind } from "ts-morph";
import type { FunctionItem } from "../types/Types.ts";
import { cleanComment } from "./cleanComments.ts";
import { getJsDocCommentText } from "./getJsDocCommentText.ts";

export function parseFunctions(sourceFile: SourceFile): FunctionItem[] {
    const functionItems: FunctionItem[] = [];

    // Normal and exported functions
    sourceFile.getFunctions().forEach((func) => {
        functionItems.push({
            type: "function",
            name: func.getName() || "anonymous",
            params: func.getParameters().map(param => param.getText()).join(", ") || "None",
            return: func.getReturnType().getText() || "void",
            comment: cleanComment(func.getJsDocs().map(doc => doc.getComment()).join("\n")),
        });
    });

    // Arrow functions assigned to variables (including exported)
    sourceFile.getVariableDeclarations().forEach(v => {
        const initializer = v.getInitializer();

        if (initializer?.getKind() === SyntaxKind.ArrowFunction) {
        // getJsDocs exists on the arrow function itself, not the variable declaration
        const arrowFunc = initializer.asKind(SyntaxKind.ArrowFunction);
        if (arrowFunc) {
            functionItems.push({
            type: "function",
            name: v.getName(),
            params: arrowFunc.getParameters().map(p => p.getText()).join(", ") || null,
            return: arrowFunc.getReturnType().getText(),
            comment: arrowFunc.getJsDocs().map(getJsDocCommentText).map(cleanComment).join("\n") || undefined
            });
        }
        }
    });

    return functionItems;
}
