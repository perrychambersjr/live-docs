import { JSDoc, JSDocLink, JSDocLinkCode, JSDocLinkPlain, JSDocText, Node } from "ts-morph";

type JsDocPart = JSDocText | JSDocLink | JSDocLinkCode | JSDocLinkPlain;

function isJsDocPart(node: any): node is JsDocPart {
  return node && typeof node.getText === "function";
}

export function getJsDocCommentText(jsDoc: JSDoc): string {
  const comment = jsDoc.getComment();
  if (!comment) return "";

  if (typeof comment === "string") return comment;

  // comment is an array of JSDocText | JSDocLink | etc.
  return comment
    .filter(isJsDocPart)           // filter only nodes with getText()
    .map(part => part.getText())   // now safe
    .join("")
    .trim();
}
