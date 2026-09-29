import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel } from "@/types/roast";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const payload = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
  const code = typeof payload.code === "string" ? payload.code : "";
  const errorMessage =
    typeof payload.errorMessage === "string" ? payload.errorMessage.trim() : "";

  // Validate code presence
  if (code.trim().length === 0) {
    return NextResponse.json({ error: "No code provided." }, { status: 400 });
  }

  // Validate code length
  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Validate error message length
  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Language fallback
  const validLanguages = LANGUAGES.map((l) => l.id as string);
  const language: LanguageId =
    typeof payload.language === "string" && validLanguages.includes(payload.language)
      ? (payload.language as LanguageId)
      : DEFAULTS.language;

  // Roast level fallback
  const validLevels = ROAST_LEVELS.map((r) => r.id as string);
  const roastLevel: RoastLevel =
    typeof payload.roastLevel === "string" && validLevels.includes(payload.roastLevel)
      ? (payload.roastLevel as RoastLevel)
      : DEFAULTS.roastLevel;

  try {
    const result = await analyzeCode({
      language,
      code,
      roastLevel,
      errorMessage: errorMessage || undefined,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Error in /api/roast:", err);
    const message = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
