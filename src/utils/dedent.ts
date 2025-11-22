function dedent(str: string) {
  const lines = str.split("\n");
  const nonEmptyLines = lines.filter(l => l.trim().length > 0);
  if (nonEmptyLines.length === 0) return "";

  const minIndent = Math.min(
    ...nonEmptyLines.map(l => l.match(/^ */)![0].length)
  );

  return lines.map(l => l.slice(minIndent)).join("\n");
}
export { dedent };
