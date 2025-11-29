import fs from "fs";
import path from "path";
import { LiveDocsConfig } from "./core/config.ts";
import { startWatcher } from "./fs/fileWatcher.ts";
import { generateAllDocs } from "./index.ts";
import { parseAndGenerateDocs } from "./parsing/parseTS.ts";
import { debounce } from "./utils/debounce.ts";

// Helper to parse CLI flags
function parseCLIArgs() {
  const args = process.argv.slice(2);
  const flags: Record<string, string | boolean> = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (!arg) continue;

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = args[i + 1];

      if (next?.startsWith("--") === false) { // ✅ only runs if next exists AND does not start with "--"
        flags[key] = next;
        i++;
      } else {
        flags[key] = true; // boolean flag
      }
    }

  }

  return flags;
}

const flags = parseCLIArgs();

// Apply flags to config
const filePattern = (flags["pattern"] as string) || LiveDocsConfig.pattern;
const outputDir = (flags["outDir"] as string) || LiveDocsConfig.outputDir;
const watchMode = flags["watch"] !== undefined ? Boolean(flags["watch"]) : LiveDocsConfig.watchMode;

// Ensure output directory exists
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Watch mode
if (watchMode) {
  // debounce full rebuild to prevent rapid consecutive saves and race conditions
  const debouncedGenerateAllDocs = debounce(generateAllDocs, 500);

  startWatcher(filePattern, (filePath, content) => {
    console.log("File changed:", filePath);

    try {
      const docs = parseAndGenerateDocs(filePath);
      console.log("Updated docs for file:", filePath);

      generateAllDocs();
    } catch (err) {
      console.error("Error parsing file:", filePath, err);
    }
  });
} else {
  // Single run mode: parse all files once
  generateAllDocs();
}