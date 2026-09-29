import { APP } from "@/config/app.config";
import Image from "next/image";
import React from "react";

interface TopBarProps {
  children: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="border-b-2 border-frame bg-panel px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-4 select-none">
      {/* Left: Branding */}
      <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
        <div className="flex items-center gap-3">
          {/* Official GDG Nashik Logo */}
          <div className="relative h-7 w-28 sm:w-36 flex items-center">
            <Image
              src="/assests/GDG-Nashik_Logo.svg"
              alt="GDG Nashik"
              width={140}
              height={32}
              className="h-7 w-auto object-contain"
              priority
            />
          </div>

          <div className="h-5 w-[2px] bg-frame/30 hidden sm:block"></div>

          {/* App Name & Version */}
          <div className="flex items-center gap-2">
            <h1 className="font-sans font-black uppercase tracking-wider text-base sm:text-lg text-frame leading-none">
              {APP.name}
            </h1>
            <span className="font-mono text-[10px] font-black uppercase px-1.5 py-0.5 border border-frame bg-mustard text-frame leading-none">
              {APP.version}
            </span>
          </div>
        </div>

        {/* DevFest 26 Badge on mobile */}
        <div className="lg:hidden relative h-6 w-16">
          <Image
            src="/assests/DevFest-26'_Logo.svg"
            alt="DevFest 26"
            width={64}
            height={24}
            className="h-6 w-auto object-contain"
          />
        </div>
      </div>

      {/* Right: Controls & DevFest Logo */}
      <div className="flex flex-wrap items-center justify-end gap-4 w-full lg:w-auto">
        <div className="flex flex-wrap items-center justify-end gap-3 w-full sm:w-auto">
          {children}
        </div>

        {/* Official DevFest 26 Logo for Desktop */}
        <div className="hidden lg:flex items-center pl-2 border-l-2 border-frame/20">
          <Image
            src="/assests/DevFest-26'_Logo.svg"
            alt="DevFest Nashik 2026"
            width={90}
            height={30}
            className="h-7 w-auto object-contain"
            priority
          />
        </div>
      </div>
    </header>
  );
}
