"use client";

import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import React, { useEffect, useRef, useState } from "react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const [cursor, setCursor] = useState({ line: 1, col: 1 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const languageLabel = langConfig ? langConfig.label : language;

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 10);

  // Sync gutter scroll with textarea
  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Cursor tracking
  const updateCursor = () => {
    if (!textareaRef.current) return;
    const textBefore = textareaRef.current.value.substring(
      0,
      textareaRef.current.selectionStart
    );
    const lineArray = textBefore.split("\n");
    const currentLine = lineArray.length;
    const currentCol = lineArray[lineArray.length - 1].length + 1;
    setCursor({ line: currentLine, col: currentCol });
  };

  // Tab key handling (insert 4 spaces)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.setRangeText("    ", start, end, "end");
      onChange(textarea.value);

      // Trigger update on cursor position
      setTimeout(updateCursor, 0);
    }
  };

  const handleClear = () => {
    onChange("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    setCursor({ line: 1, col: 1 });
  };

  useEffect(() => {
    updateCursor();
  }, [code]);

  return (
    <div className="flex-1 flex flex-col bg-neutral-950 text-neutral-100 font-mono text-xs overflow-hidden min-h-[450px]">
      {/* 40px Header Strip */}
      <div className="h-10 border-b-2 border-frame px-4 flex items-center justify-between bg-canvas text-frame select-none">
        <span className="text-frame/60 uppercase font-semibold">INPUT // SRC</span>
        <span className="font-bold uppercase tracking-wider text-frame">Your Code</span>
        <div className="flex items-center gap-3">
          <button
            onClick={onLoadSample}
            type="button"
            className="text-frame hover:text-accent font-bold uppercase text-[11px] underline cursor-pointer"
          >
            SAMPLE BUG
          </button>
          <span className="text-frame/30">|</span>
          <button
            onClick={handleClear}
            type="button"
            className="text-frame/60 hover:text-frame font-bold uppercase text-[11px] underline cursor-pointer"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Main: Gutter + Textarea */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-12 bg-neutral-900 border-r border-neutral-800 text-neutral-500 py-3 select-none overflow-hidden text-right pr-2 text-xs font-mono leading-relaxed"
        >
          {Array.from({ length: lineCount }, (_, i) => {
            const lineNum = i + 1;
            const isError = lineNum === errorLine;
            return (
              <div
                key={lineNum}
                className={`${
                  isError
                    ? "text-red-500 font-black bg-red-950/60"
                    : "text-neutral-500"
                }`}
              >
                {String(lineNum).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onSelect={updateCursor}
          onClick={updateCursor}
          onKeyUp={updateCursor}
          onKeyDown={handleKeyDown}
          placeholder="// Paste your code here and prepare to be roasted..."
          spellCheck={false}
          className="flex-1 bg-neutral-950 text-neutral-100 p-3 outline-none resize-none font-mono text-xs leading-relaxed overflow-auto whitespace-pre tab-4"
          style={{ tabSize: 4 }}
        />
      </div>

      {/* Bottom status strip overlay */}
      <div className="border-t border-neutral-800 bg-neutral-900/90 px-3 py-1.5 text-[11px] text-neutral-400 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span>
            Ln {cursor.line}, Col {cursor.col}
          </span>
          <span>·</span>
          <span className="text-neutral-300 font-semibold">{languageLabel}</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-neutral-500 text-[10px]">
          <span>UTF-8</span>
          <span>·</span>
          <span>Tab Size: 4</span>
        </div>
      </div>
    </div>
  );
}
