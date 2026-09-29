import React from "react";

interface ErrorStateProps {
  error?: string | null;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[360px]">
      <div className="w-16 h-16 border-2 border-red-600 bg-red-50 flex items-center justify-center text-3xl font-mono font-black text-red-600 mb-4 hard-shadow-sm select-none">
        !
      </div>
      <h3 className="font-mono font-bold uppercase tracking-wider text-red-600 text-base mb-2">
        Analysis Failed
      </h3>
      <p className="font-mono text-xs text-frame/75 max-w-md leading-relaxed mb-6 bg-red-50/70 border border-red-200 p-3 rounded-none">
        {error || "An unknown error occurred during code evaluation."}
      </p>
      <button
        onClick={onRetry}
        type="button"
        className="px-5 py-2 border-2 border-frame bg-frame text-panel font-mono font-bold text-xs uppercase tracking-wider hard-shadow-sm hover:bg-panel hover:text-frame transition-all active:hard-shadow-pressed"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
