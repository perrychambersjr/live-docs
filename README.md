# live-docs

# Watch files with default config
node src/cli.ts --watch

# Watch only specific files
node src/cli.ts --watch --pattern "src/test/**/*.ts"

# Output to a custom directory
node src/cli.ts --outDir "./custom-docs"

