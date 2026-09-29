import { AI, APP } from "@/config/app.config";
import React from "react";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t-2 border-frame bg-panel px-4 py-2 text-xs font-mono select-none">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Engine & Processing Status */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-frame">STATUS:</span>
          {isRoasting ? (
            <span className="inline-flex items-center gap-1.5 text-amber-600 font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              PROCESSING...
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden sm:inline text-frame/40">|</span>
          <span className="hidden sm:inline text-frame/60 uppercase">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>

        {/* Right: APP metadata */}
        <div className="font-bold tracking-widest text-frame/75 uppercase text-[11px]">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Second centered line: Workshop Attribution */}
      <div className="mt-1 text-center text-[10px] text-frame/50 tracking-wider font-medium">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
