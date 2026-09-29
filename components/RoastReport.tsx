import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { FixedCode } from "@/components/FixedCode";
import { IssueCard } from "@/components/IssueCard";
import { LoadingState } from "@/components/LoadingState";
import { SectionHeader } from "@/components/SectionHeader";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import React from "react";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg: string | null;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const hasFixedCode = Boolean(result?.correctedCode && result.correctedCode.trim().length > 0);
  const takeawaySectionNumber = hasFixedCode ? 4 : 3;

  return (
    <div className="flex-1 flex flex-col bg-panel border-t-2 md:border-t-0 md:border-l-2 border-frame overflow-hidden min-h-[450px]">
      {/* 40px Header Strip */}
      <div className="h-10 border-b-2 border-frame px-4 flex items-center justify-between bg-canvas font-mono text-xs select-none">
        <span className="text-frame/60 uppercase font-semibold">AUDIT // REPORT</span>
        <span className="font-bold uppercase tracking-wider text-frame">
          Roast Report
        </span>
        <span className="w-12"></span>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}

        {state === "results" && result && (
          <div className="p-4 sm:p-6 overflow-y-auto">
            {/* Section 1: Roast */}
            <div className="mb-6 font-mono">
              <SectionHeader number={1} title="Roast">
                <span className="text-frame/60 uppercase text-[11px] font-bold">
                  STYLE: {roastLevel}
                </span>
              </SectionHeader>
              <div className="bg-canvas border-2 border-frame p-4 hard-shadow-sm font-mono text-sm leading-relaxed text-frame italic">
                &ldquo;{result.roast}&rdquo;
              </div>
            </div>

            {/* Section 2: What's Wrong */}
            <div className="mb-6 font-mono">
              <SectionHeader number={2} title="What's Wrong">
                <span className="text-frame/60 uppercase text-[11px] font-bold">
                  {result.issues.length === 1
                    ? "1 ISSUE"
                    : `${result.issues.length} ISSUES`}
                </span>
              </SectionHeader>

              {result.issues.length === 0 ? (
                <div className="border-2 border-emerald-600 bg-emerald-50 text-emerald-800 p-4 font-mono text-xs font-bold hard-shadow-sm">
                  ✓ No issues found. Suspiciously clean.
                </div>
              ) : (
                result.issues.map((issue, idx) => (
                  <IssueCard key={`${issue.line}-${idx}`} index={idx} issue={issue} />
                ))
              )}
            </div>

            {/* Section 3: Fix */}
            {hasFixedCode && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Takeaway Section: Section number computed dynamically */}
            {result.takeaway && result.takeaway.trim().length > 0 && (
              <div className="mb-4 font-mono text-xs">
                <SectionHeader number={takeawaySectionNumber} title="Takeaway" />
                <div className="bg-mustard/15 border-2 border-frame p-4 hard-shadow-sm text-frame leading-relaxed">
                  <span className="font-bold uppercase tracking-wider text-xs block mb-1">
                    💡 Summary Takeaway:
                  </span>
                  {result.takeaway}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
