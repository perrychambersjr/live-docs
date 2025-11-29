import type { ClassItem, FunctionItem } from '../types/Types.ts';
import { renderClass } from './renderClass.ts';
import { renderFunction } from './renderFunction.ts';

export function generateMarkdown(filePath: string, items: (FunctionItem | ClassItem)[]): string {
    let md = `# ${filePath}\n\n`;

    for (const item of items) {
        switch (item.type) {
            case 'function':
                md += renderFunction(item);
                break;
            case 'class':
                md += renderClass(item);
                break;
            default:
                break;
        }
    }

    return md;

}