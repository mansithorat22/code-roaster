import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="border-b-2 border-frame bg-amber-50/50 p-3 font-mono text-xs select-none">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-bold uppercase tracking-wider text-frame text-[11px] flex items-center gap-1.5">
          <span className="text-amber-600">⚠</span> Attach Terminal Traceback / Compiler Error (Optional)
        </span>
        <button
          onClick={onClose}
          type="button"
          className="text-frame/60 hover:text-frame font-bold uppercase text-[11px] underline cursor-pointer"
        >
          Dismiss ✕
        </button>
      </div>

      <textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='TypeError: unsupported operand type(s) for +=: "int" and "list"'
        className="w-full border-2 border-frame bg-panel p-2 font-mono text-xs text-frame placeholder:text-frame/40 outline-none focus:border-accent transition-colors resize-y"
        spellCheck={false}
      />
    </div>
  );
}
