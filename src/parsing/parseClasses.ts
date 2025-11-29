import { SourceFile } from "ts-morph";
import type { ClassItem } from "../types/Types.ts";
import { cleanComment } from "./cleanComments.ts";
import { getJsDocCommentText } from "./getJsDocCommentText.ts";

export function parseClasses(sourceFile: SourceFile): ClassItem[] {
  const items: ClassItem[] = [];

  sourceFile.getClasses().forEach(cls => {
    const comment = cls.getJsDocs().map(getJsDocCommentText).map(cleanComment).join("\n") || undefined;

    items.push({
      type: "class",
      name: cls.getName() ?? "unknown",
      comment
    });
  });

  return items;
}
