import fs from "fs";

export class FileCache {
    private cache = new Map<string, string>();

    /**
     * Loads a file's content into the cache (or updates it if needed)
     * @param filePath - The path of the file to load.
     * @return The content of the file.
     */
    update(filePath: string) {
        const newContent = fs.readFileSync(filePath, "utf-8");
        const oldContent = this.cache.get(filePath);

        const changed = oldContent !== newContent;
        if (changed) {
            this.cache.set(filePath, newContent);
        }

        return { content: newContent, changed };
    }

    /**
     * Get content without re-reading the file
     */
    get(filePath: string): string | undefined {
        return this.cache.get(filePath) || "";
    } 

    /**
     * Preload initial files into the cache so watcher doesn't treat them as changes
     */
    preload(files: string[]) {
        for (const file of files) {
            const content = fs.readFileSync(file, "utf-8");
            this.cache.set(file, content);
        }
    }
}