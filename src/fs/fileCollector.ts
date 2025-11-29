import { glob } from "glob";

/**
 * Collects all files matching a glob pattern.
 * This becomes the source of truth for which files to watch + parse.
 *
 * @param pattern - The glob pattern to match files against.
 * @returns An array of file paths that match the given pattern.
 */

export function collectFiles(pattern: string): string[] {
    return glob.sync(pattern, {
        ignore: ["**/node_modules/**", "**/dist/**", "**/docs/**"],
        nodir: true,
    })
}