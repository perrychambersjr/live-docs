export function generateMarkdown(filePath: string, items: any[]): string {
    let md = `# ${filePath}\n\n`;

    items.forEach((item) => {
        if (item.type === 'function') {
            md += `\n## Function: ${item.name}\n- Params: \`${item.params}\`\n`;
        }

        if (item.type === 'class') {
            md += `\n## Class: ${item.name}\n`;
        }
            
    });

    return md;
}