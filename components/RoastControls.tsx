import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";
import React from "react";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs select-none">
      {/* 1. Roast Level Radio Group */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-frame uppercase tracking-wider text-[11px]">
          Roast Level:
        </span>
        <div className="flex items-center gap-1.5 bg-canvas border-2 border-frame p-1 hard-shadow-sm">
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <label
                key={level.id}
                title={level.description}
                className={`flex items-center gap-1.5 px-2 py-1 cursor-pointer transition-all ${
                  isSelected
                    ? "bg-mustard font-black text-frame border border-frame"
                    : "hover:bg-panel font-medium text-frame/75"
                }`}
              >
                <input
                  type="radio"
                  name="roastLevel"
                  value={level.id}
                  checked={isSelected}
                  onChange={() => onRoastLevelChange(level.id)}
                  className="w-3 h-3 accent-frame cursor-pointer"
                />
                <span className="text-xs uppercase">{level.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Language Dropdown */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-frame uppercase tracking-wider text-[11px]">
          Language:
        </span>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none border-2 border-frame bg-panel py-1 pl-2.5 pr-7 font-mono text-xs font-bold text-frame outline-none hard-shadow-sm cursor-pointer"
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-frame text-[10px]">
            ▼
          </span>
        </div>
      </div>

      {/* 3. Error Drawer Toggle Button */}
      <button
        onClick={onToggleErrorDrawer}
        type="button"
        className={`px-2.5 py-1.5 border-2 border-dashed border-frame font-bold uppercase tracking-wider text-[11px] transition-all cursor-pointer ${
          errorDrawerOpen
            ? "bg-frame text-panel border-solid"
            : "bg-panel text-frame hover:bg-mustard/30"
        }`}
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      {/* 4. Primary Action Button */}
      <button
        onClick={onRoast}
        disabled={isRoasting}
        type="button"
        className={`px-4 py-2 border-2 border-frame font-black uppercase tracking-wider text-xs flex items-center gap-2 transition-all cursor-pointer ${
          isRoasting
            ? "bg-frame/80 text-panel cursor-not-allowed animate-pulse"
            : "bg-frame text-panel hard-shadow-sm hover:bg-mustard hover:text-frame active:hard-shadow-pressed"
        }`}
      >
        {isRoasting ? (
          <span>ANALYZING...</span>
        ) : (
          <>
            <span>ROAST MY CODE 🔥</span>
            <span className="bg-panel/20 text-[10px] px-1.5 py-0.2 rounded font-mono font-normal">
              Ctrl ⏎
            </span>
          </>
        )}
      </button>
    </div>
  );
}
