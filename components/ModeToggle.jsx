"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useToggleMode } from "../hooks/useToggleMode";

export default function ModeToggle() {
  const { isDark, toggleMode, mounted } = useToggleMode();

  if (!mounted) return null;

  return (
    <button
      onClick={toggleMode}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-2xl hover:shadow-slate-500/50 hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Toggle dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-6 h-6">
        {isDark ? (
          <Moon
            size={24}
            className="absolute inset-0 rotate-0 scale-100 transition-all duration-300"
          />
        ) : (
          <Sun
            size={24}
            className="absolute inset-0 rotate-0 scale-100 transition-all duration-300"
          />
        )}
      </div>

      {/* Ripple effect background */}
      <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </button>
  );
}
