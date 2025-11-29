export function cleanComment(raw: string): string {
    return raw
        .replace(/\/\*\*?/, '') // Remove /* or /**
        .replace(/\*\/$/, '')   // Remove */
        .split('\n')            // Split into lines
        .map(line => line.replace(/^\s*\*\s?/, '').trim()) // Remove leading * and whitespace
        .join(' ')              // Join lines back into a single string
        .trim();               // Trim leading/trailing whitespace
}