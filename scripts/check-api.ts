import { AI, SAMPLE } from "../config/app.config";
import { analyzeCode } from "../lib/gemini";

async function main() {
  console.log(`Testing Gemini API integration (${AI.model})...\n`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage:
        'TypeError: unsupported operand type(s) for +=: "int" and "list"',
    });

    console.log("✅ Success! Gemini returned a valid roast response:\n");
    console.log(`🔥 Roast: "${result.roast}"\n`);
    console.log(`🐛 Identified Issues (${result.issues.length}):`);
    result.issues.forEach((issue, idx) => {
      console.log(
        `  ${idx + 1}. [${issue.severity}] Line ${issue.line}: ${issue.title}`
      );
      console.log(`     Diagnosis: ${issue.diagnosis}`);
      console.log(`     Expected: ${issue.expected}`);
    });
    console.log(`\n💡 Takeaway: ${result.takeaway}`);
    console.log("\n🛠️ Corrected Code preview:");
    console.log(result.correctedCode.split("\n").slice(0, 5).join("\n") + "\n...");
  } catch (err) {
    console.error("❌ Gemini API check failed:");
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}

main();
