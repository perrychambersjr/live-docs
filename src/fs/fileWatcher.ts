import chokidar from "chokidar";
import { FileCache } from "./fileCache.ts";
import { collectFiles } from "./fileCollector.ts";

export function startWatcher(
    pattern: string,
    onChange: (filePath: string, content: string) => void
) {
    const files = collectFiles(pattern);
    const cache = new FileCache();

    // Preload files to avoid firing change on startup
    cache.preload(files);

    const watcher = chokidar.watch(files, {
        ignored: /node_modules|\.git/,
        persistent: true,
    });

    watcher.on("change", (filePath) => {
        const { content, changed } = cache.update(filePath);

        if (changed) {
            onChange(filePath, content);
        }
    });

    console.log(`👀 Watching ${files.length} files for changes...`);
}