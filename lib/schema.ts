import { SEVERITIES } from "@/config/app.config";
import { Schema, Type } from "@google/genai";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "Hinglish humorous critique tailored to the roast level.",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of identified issues sorted by severity.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number where the issue appears.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity of the issue.",
          },
          title: {
            type: Type.STRING,
            description: "Short catchy title in Hinglish.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact snippet of code from original source.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "What is wrong and why, in Hinglish.",
          },
          expected: {
            type: Type.STRING,
            description: "What should be done instead, in Hinglish.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "Complete runnable corrected version of the code.",
    },
    takeaway: {
      type: Type.STRING,
      description: "Final short takeaway lesson in Hinglish.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
