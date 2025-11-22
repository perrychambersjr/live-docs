import fs from "fs";
import { glob } from "glob";
import path from "path";
import { parseAndGenerateDocs } from "./parser.js";
import { startWatcher } from "./watcher.js";

const OUTPUT_DIR = path.join(process.cwd(), "docs");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "docs.md");

// Check if directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

// Check if file exists
if (!fs.existsSync(OUTPUT_FILE)) {
    fs.writeFileSync(OUTPUT_FILE, "# Documentation\n\n");
}

console.log("LiveDocs console test running...");

startWatcher((filePath, content) => {
  try {
    const docs = parseAndGenerateDocs(filePath, content);

    console.log("✅ Updated docs for:", filePath);
    console.log(docs);

    const tsFiles = glob.sync("src/test/**/*.ts");
    let allDocs = "";
    for (const file of tsFiles) {
        const content = fs.readFileSync(file, "utf-8");
        allDocs += parseAndGenerateDocs(file, content) + "\n";
    }
    fs.writeFileSync(OUTPUT_FILE, allDocs, "utf-8");
  } catch (err) {
    console.error("❌ Error parsing file:", filePath, err);
  }
});
