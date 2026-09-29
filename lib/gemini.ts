import { AI } from "@/config/app.config";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import { RoastRequest, RoastResult } from "@/types/roast";
import { ApiError, GoogleGenAI } from "@google/genai";

function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const baseMessage = error instanceof Error ? error.message : String(error);

  switch (status) {
    case 400:
      return "Invalid request sent to Gemini API. Please review the input and try again.";
    case 403:
      return "Invalid or unauthorized GEMINI_API_KEY. Please check your API key in .env.local.";
    case 404:
      return `Model "${AI.model}" not found or unsupported. Verify AI.model in config/app.config.ts.`;
    case 429:
      return "Gemini API rate limit exceeded. Please take a chai break and try again in a few moments.";
    case 503:
      return "Gemini servers are currently overloaded. Please retry your roast shortly.";
    default:
      return `Gemini API error (${status ?? "unknown"}): ${baseMessage}`;
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim().length === 0) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: buildUserPrompt(request),
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || responseText.trim().length === 0) {
        throw new Error("Gemini returned an empty response.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(responseText);
      } catch (parseErr) {
        throw new Error(`Failed to parse Gemini response as JSON: ${parseErr instanceof Error ? parseErr.message : String(parseErr)}`);
      }

      return {
        roast: parsed.roast ?? "",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? "",
        takeaway: parsed.takeaway ?? "",
      };
    } catch (err: unknown) {
      lastError = err;
      const status =
        err instanceof ApiError
          ? err.status
          : typeof err === "object" && err !== null && "status" in err
          ? Number((err as { status: unknown }).status)
          : undefined;

      if (status === 503 && attempt < AI.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      throw new Error(friendlyErrorMessage(status, err));
    }
  }

  throw new Error(friendlyErrorMessage(503, lastError));
}
