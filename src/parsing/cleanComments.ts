export function cleanComment(raw: string): string {
  return raw
    .replace(/\/\*+/, "")           // remove /* 
    .replace(/\*+\//, "")           // remove */ 
    .split("\n")
    .map(line => line.replace(/^\s*\*\s?/, "")) // remove leading *
    .map(line => line.replace(/^\/\/\s?/, ""))  // remove //
    .filter(line => line.trim().length > 0)
    .join(" ");
}
