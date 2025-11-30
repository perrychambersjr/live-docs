import { JSDoc, JSDocLink, JSDocLinkCode, JSDocLinkPlain, JSDocText, Node } from "ts-morph";

export function getJsDocCommentText(jsDoc: JSDoc): string {
  try {
    return jsDoc.getInnerText().trim();
  } catch {
    // fallback
    const comment = jsDoc.getComment();
    if (!comment) return "";
    return Array.isArray(comment)
      ? comment.map(c => c?.getText?.() ?? "").join("")
      : comment;
  }
}