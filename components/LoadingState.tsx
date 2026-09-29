import React from "react";

export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[360px]">
      <div className="w-16 h-16 border-2 border-frame bg-mustard/20 flex items-center justify-center text-2xl font-mono font-bold text-frame mb-4 hard-shadow-sm select-none">
        <span className="inline-block animate-spin">/</span>
      </div>
      <h3 className="font-mono font-bold uppercase tracking-wider text-frame text-base mb-2 animate-pulse">
        Analyzing Code
      </h3>
      <p className="font-mono text-xs text-frame/60 max-w-sm leading-relaxed">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
}
