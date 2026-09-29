import { RoastIssue, Severity } from "@/types/roast";
import React from "react";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityStyles: Record<
  Severity,
  { badgeBg: string; badgeText: string; cardBorder: string; snippetBorder: string }
> = {
  "FATAL BUG": {
    badgeBg: "bg-red-600",
    badgeText: "text-white",
    cardBorder: "border-red-600",
    snippetBorder: "border-l-red-600",
  },
  "CODE SMELL": {
    badgeBg: "bg-amber-500",
    badgeText: "text-dark",
    cardBorder: "border-amber-500",
    snippetBorder: "border-l-amber-500",
  },
  OPTIMIZATION: {
    badgeBg: "bg-emerald-600",
    badgeText: "text-white",
    cardBorder: "border-emerald-600",
    snippetBorder: "border-l-emerald-600",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const style = severityStyles[issue.severity] || severityStyles["FATAL BUG"];
  const paddedIndex = String(index + 1).padStart(2, "0");

  return (
    <div className="bg-panel border-2 border-frame p-3.5 mb-3.5 hard-shadow-sm font-mono text-xs">
      {/* Top row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-subtle">
        <div className="flex items-center gap-2">
          {/* Black index chip */}
          <span className="bg-frame text-panel font-mono font-black px-1.5 py-0.5 text-[10px]">
            {paddedIndex}
          </span>
          <span className="font-bold text-frame uppercase tracking-wider">
            LINE {issue.line}
          </span>
          {/* Severity badge */}
          <span
            className={`font-bold px-2 py-0.5 text-[10px] tracking-wider uppercase border border-frame ${style.badgeBg} ${style.badgeText}`}
          >
            {issue.severity}
          </span>
        </div>

        {/* Title right aligned */}
        <span className="text-frame/70 font-semibold text-[11px] text-right flex-1 min-w-[120px] break-words">
          {issue.title}
        </span>
      </div>

      {/* Code snippet block */}
      {issue.codeSnippet && issue.codeSnippet.trim().length > 0 && (
        <pre className={`bg-neutral-900 text-neutral-100 p-2.5 mb-2.5 overflow-x-auto text-[11px] border-l-4 ${style.snippetBorder}`}>
          <code>{issue.codeSnippet}</code>
        </pre>
      )}

      {/* Diagnosis line */}
      <div className="text-red-700 font-medium mb-1 leading-snug">
        <span className="font-black text-red-600 mr-1.5">✕</span>
        <span className="font-bold">Diagnosis:</span> {issue.diagnosis}
      </div>

      {/* Expected line */}
      <div className="text-emerald-800 font-medium leading-snug">
        <span className="font-black text-emerald-600 mr-1.5">✓</span>
        <span className="font-bold">Expected:</span> {issue.expected}
      </div>
    </div>
  );
}
