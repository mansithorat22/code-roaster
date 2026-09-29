"use client";

import { CodeEditor } from "@/components/CodeEditor";
import { ErrorMessageInput } from "@/components/ErrorMessageInput";
import { RoastControls } from "@/components/RoastControls";
import { RoastReport } from "@/components/RoastReport";
import { StatusBar } from "@/components/StatusBar";
import { TopBar } from "@/components/TopBar";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { requestRoast } from "@/lib/api";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import React, { useCallback, useEffect, useState } from "react";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>(SAMPLE.code);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);
  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string | null>(null);

  const isRoasting = reportState === "loading";

  // Trigger Roast API
  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code || code.trim().length === 0) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError(null);

    try {
      const result = await requestRoast({
        language,
        code,
        roastLevel,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Failed to generate roast.");
      setReportState("error");
    }
  }, [code, errorMessage, isRoasting, language, roastLevel]);

  // Load sample bug
  const handleLoadSample = () => {
    setLanguage(SAMPLE.language);
    setCode(SAMPLE.code);
  };

  // Keyboard shortcut listener for Ctrl+Enter / Cmd+Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  // Highlight first issue line only if code hasn't changed since last roast
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues?.[0]?.line
      : undefined;

  return (
    <main className="w-full max-w-[1360px] mx-auto min-h-[92vh] my-auto flex flex-col bg-panel border-2 border-frame hard-shadow overflow-hidden">
      {/* TopBar with brand and RoastControls */}
      <TopBar>
        <RoastControls
          roastLevel={roastLevel}
          onRoastLevelChange={setRoastLevel}
          language={language}
          onLanguageChange={setLanguage}
          onRoast={handleRoast}
          isRoasting={isRoasting}
          errorDrawerOpen={errorDrawerOpen}
          onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
        />
      </TopBar>

      {/* Conditionally rendered error drawer */}
      {errorDrawerOpen && (
        <ErrorMessageInput
          value={errorMessage}
          onChange={setErrorMessage}
          onClose={() => setErrorDrawerOpen(false)}
        />
      )}

      {/* Main Split Body: CodeEditor (54-55%) + RoastReport (46-45%) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Code Editor (~54%) */}
        <div className="w-full md:w-[54%] flex flex-col min-h-[400px]">
          <CodeEditor
            code={code}
            onChange={setCode}
            language={language}
            errorLine={errorLine}
            onLoadSample={handleLoadSample}
          />
        </div>

        {/* Roast Report (~46%) */}
        <div className="w-full md:w-[46%] flex flex-col min-h-[400px]">
          <RoastReport
            state={reportState}
            roastLevel={roastLevel}
            language={language}
            result={roastResult}
            errorMsg={apiError}
            onRetry={handleRoast}
            onApplyFix={(fixedCode) => setCode(fixedCode)}
          />
        </div>
      </div>

      {/* Persistent StatusBar */}
      <StatusBar isRoasting={isRoasting} />
    </main>
  );
}
