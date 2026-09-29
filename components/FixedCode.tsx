"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import React, { useState } from "react";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const extension = langConfig ? langConfig.extension : "txt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="mb-6 font-mono text-xs">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-bold text-emerald-700 tracking-wider text-[11px]">
          CORRECTED CODE
        </span>
      </SectionHeader>

      {/* Code Block Container */}
      <div className="border-2 border-frame bg-neutral-950 text-neutral-100 hard-shadow-sm mb-3">
        {/* Header strip */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-3 py-1.5 bg-neutral-900 text-[11px]">
          <span className="font-bold text-neutral-400">solution.{extension}</span>
          <span className="font-bold text-emerald-400 text-[10px] tracking-wider uppercase">
            ● READY TO APPLY
          </span>
        </div>

        {/* Code Content */}
        <pre className="p-3.5 overflow-x-auto text-xs leading-relaxed font-mono">
          <code>{code}</code>
        </pre>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleCopy}
          type="button"
          className="flex-1 min-w-[160px] py-2 px-3 border-2 border-frame bg-panel font-bold tracking-wider uppercase text-frame hard-shadow-sm hover:bg-frame hover:text-panel transition-all active:hard-shadow-pressed"
        >
          {copyLabel}
        </button>

        <button
          onClick={() => onApply(code)}
          type="button"
          className="flex-1 min-w-[160px] py-2 px-3 border-2 border-frame bg-mustard font-bold tracking-wider uppercase text-frame hard-shadow-sm hover:bg-frame hover:text-panel transition-all active:hard-shadow-pressed"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
