import { generateMarkdown } from './docs-gen.ts';

export function parseAndGenerateDocs(filePath: string, code: string) {
    const items: any[] = [];

    // Function detection
    const functionRegex = /function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)/g;
    let match;
    while ((match = functionRegex.exec(code)) !== null) {
        items.push({
            type: 'function',
            name: match[1],
            params: match[2],
        });
    }

    // Class detection
    const classRegex = /class\s+([a-zA-Z0-9_]+)/g;
    while ((match = classRegex.exec(code)) !== null) {
        items.push({
            type: 'class',
            name: match[1],
        });
    }  

    return generateMarkdown(filePath, items);
}