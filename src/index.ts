import fs from "fs";
import { glob } from "glob";
import path from "path";
import { LiveDocsConfig } from "./core/config.ts";
import { collectFiles } from "./fs/fileCollector.ts";
import { startWatcher } from "./fs/fileWatcher.ts";
import { parseAndGenerateDocs } from "./parsing/parseTS.ts";

/**
 * -------------------------------------------------------------
 * CONFIGURATION
 * -------------------------------------------------------------
 * These will eventually be replaced with CLI flags:
 *   --out <dir>
 *   --root <srcDir>
 *   --pattern <glob>
 */
const SOURCE_GLOB = LiveDocsConfig.pattern;
const OUTPUT_DIR = LiveDocsConfig.outputDir;
const OUTPUT_FILE = path.join(LiveDocsConfig.outputDir, LiveDocsConfig.outputFile);

/**
 * Ensures the docs directory + file exist.
 * Later: this becomes a reusable util function.
 */
function ensureOutput() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  if (!fs.existsSync(OUTPUT_FILE)) {
    fs.writeFileSync(OUTPUT_FILE, "# Documentation\n\n");
  }
  
  console.log("✅ Docs will be written to:", OUTPUT_FILE);
}

/**
 * -------------------------------------------------------------
 *  generateAllDocs()
 * -------------------------------------------------------------
 * Reads ALL TypeScript files, parses them, and builds one big MD file.
 *
 * This is the core "build everything once" function.
 * Later: this will be used by CLI flag --once
 */
export function generateAllDocs() {
  try {
    ensureOutput();

    const tsFiles = collectFiles(LiveDocsConfig.pattern);

    if (tsFiles.length === 0) {
      console.warn("⚠️ No TypeScript files found to parse.");
      return;
    }

    let allDocs = "";

    for (const file of tsFiles) {
      const content = fs.readFileSync(file, "utf-8");
      allDocs += parseAndGenerateDocs(file) + "\n";
    }

    fs.writeFileSync(OUTPUT_FILE, allDocs, "utf-8");
    console.log(`✨ Rebuilt full documentation at ${OUTPUT_FILE}`);
  } catch (err) {
    console.error("❌ Failed to generate documentation:", err);
  }
}

/**
 * -------------------------------------------------------------
 *  startWatchMode()
 * -------------------------------------------------------------
 * Uses your watcher to rebuild docs for the changed file and
 * regenerate the combined docs output.
 *
 * This becomes the default CLI mode (live docs).
 */
export function startWatchMode() {
  if(LiveDocsConfig.watchMode) {
    console.log("🔍 LiveDocs is now watching for file changes...");

    startWatcher("src/**/*.ts", (filePath, content) => {
      console.log("File changed:", filePath); // ✅ filePath is valid here
      console.log("Content length:", content.length); // ✅ content is valid here

      try {
        const docs = parseAndGenerateDocs(filePath);
        console.log("✅ Parsed docs for file:", filePath);
        console.log(docs);

        generateAllDocs(); // optional: regenerate all docs
      } catch (err) {
        console.error("❌ Error parsing file:", filePath, err);
      }
    });
  }
}

/**
 * -------------------------------------------------------------
 *  run() — this is what the CLI calls right now
 * -------------------------------------------------------------
 * Minimal behavior:
 *    1. Ensure docs folder exists
 *    2. Build all docs initially
 *    3. Start watcher for live updates
 *
 * Later:
 *   run() will examine CLI flags and route to:
 *     - startWatchMode()
 *     - generateAllDocs()
 *     - showHelp()
 *     - etc.
 */
export function run() {
  console.log("LiveDocs console test running...");

  ensureOutput();
  generateAllDocs();
  startWatchMode();
}