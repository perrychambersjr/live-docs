import { SourceFile, SyntaxKind } from "ts-morph";
import type { FunctionItem } from "../types/Types.ts";
import { cleanComment } from "./cleanComments.ts";
import { getJsDocCommentText } from "./getJsDocCommentText.ts";

export function parseFunctions(sourceFile: SourceFile): FunctionItem[] {
    const functionItems: FunctionItem[] = [];

    // Normal and exported functions
    sourceFile.getFunctions().forEach((func) => {  
        const comment = func
            .getJsDocs()
            .map(getJsDocCommentText)
            .map(cleanComment)
            .join("\n") || undefined;

        functionItems.push({
            type: "function",
            name: func.getName() || "anonymous",
            params: func.getParameters().map(param => param.getText()).join(", ") || "None",
            return: func.getReturnType().getText() || "void",
            comment: comment,
        });
    });

    // Arrow functions assigned to variables (including exported)
    sourceFile.getVariableDeclarations().forEach(v => {
        const initializer = v.getInitializer();
        const arrow = initializer?.asKind(SyntaxKind.ArrowFunction);

        if (!arrow) return;

        const varStatement = v.getVariableStatement();
        const jsDocs = varStatement?.getJsDocs() ?? [];

        const comment = jsDocs
            .map(getJsDocCommentText)
            .map(cleanComment)
            .join("\n") || undefined;

        functionItems.push({
            type: "function",
            name: v.getName(),
            params: arrow.getParameters().map(p => p.getText()).join(", ") || null,
            return: arrow.getReturnType().getText(),
            comment: comment
        });
    });
    
    return functionItems;
}
