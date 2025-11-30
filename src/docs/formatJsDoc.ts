export function formatJsDoc(comment?: string) {
    if (!comment) return "";

    const lines = comment.split("\n").map(line => line.trim());
    const params: string[] = [];
    let returns: string | undefined = "";
    const descriptionLines: string[] = [];

    lines.forEach(line => {
        if (line.startsWith("@param")) {
            const match = line.match(/^@param\s+(\w+)\s+-\s+(.*)$/);
            if (match) {
                params.push(`  - \`${match[1]}\` — ${match[2]}`);
            }
        } else if (line.startsWith("@returns")) {
            const match = line.match(/^@returns\s+(.*)$/);
            if (match) returns = match[1];
        } else {
            descriptionLines.push(line);
        }
    });

    const mdLines = [];
    if (params.length) mdLines.push(`- **Params:**\n${params.join("\n")}`);
    if (returns) mdLines.push(`- **Returns:** \`${returns}\``);
    if (descriptionLines.length) mdLines.push(`- **Description:** ${descriptionLines.join(" ")}`);

    return mdLines.join("\n");
}