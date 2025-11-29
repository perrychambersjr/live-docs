import path from "path";

export const LiveDocsConfig = {
    // Glob pattern to watch source TypeScript files
    pattern: "src/test/**/*.ts",

    // Directories/files to ignore (node_modules, .git, dist, etc)
    ignored: ["node_modules", ".git", "dist", "docs"],

    // Output directory for generated documentation
    outputDir: path.join(process.cwd(), "docs"),

    // Output file name
    outputFile: "docs.md",

    // Optional: file extensions to parse
    extensions: [".ts", ".tsx"],

    // Optional: enable/disable watching mode
    watchMode: true,

    // Optional: parser options (can bve expanded later)
    parserOptions: {
        includePrivate: false,
    }

    
}