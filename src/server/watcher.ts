import chokidar from 'chokidar';
import fs from 'fs';

export function startWatcher(onChange: (filePath: string, content: string) => void) {
    const watcher = chokidar.watch(process.cwd(), {
        ignored: /node_modules|\.git/,
        persistent: true,
    });

    watcher.on('change', (filePath) => {
        const content = fs.readFileSync(filePath, 'utf-8');
        onChange(filePath, content);
    });

    console.log('Watching for file changes...');
}