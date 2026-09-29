import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[360px]">
      <div className="w-16 h-16 border-2 border-dashed border-frame/40 flex items-center justify-center text-2xl font-mono font-bold text-frame/40 mb-4 select-none">
        {"{}"}
      </div>
      <h3 className="font-mono font-bold uppercase tracking-wider text-frame text-base mb-2">
        Awaiting Code Submission
      </h3>
      <p className="font-mono text-xs text-frame/60 max-w-sm leading-relaxed">
        Paste your code on the left, then click &quot;ROAST MY CODE&quot; or press
        Ctrl+Enter (⌘+Enter on Mac).
      </p>
    </div>
  );
}
