"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// تعريف أنواع الثيمات المتاحة
export type ColorPalette = "zinc" | "slate" | "stone";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colorPalette: ColorPalette;
  cycleColorPalette: () => void;
  themeColors: any; // الكائن الذي يحتوي على أكواد الألوان
}

// تعريف الألوان المركزية لتستخدمها في الهيدر والفوتر وأي مكان
export const themesConfig = {
  zinc: {
    name: "Zinc",
    dark: { bg: "bg-zinc-950", border: "border-zinc-900", textMain: "text-zinc-100", textSub: "text-zinc-400", accent: "bg-white", accentText: "text-zinc-950" },
    light: { bg: "bg-zinc-50", border: "border-zinc-200", textMain: "text-zinc-900", textSub: "text-zinc-600", accent: "bg-zinc-900", accentText: "text-white" }
  },
  slate: {
    name: "Slate",
    dark: { bg: "bg-slate-950", border: "border-slate-800", textMain: "text-slate-100", textSub: "text-slate-400", accent: "bg-sky-100", accentText: "text-slate-900" },
    light: { bg: "bg-slate-50", border: "border-slate-200", textMain: "text-slate-900", textSub: "text-slate-600", accent: "bg-slate-900", accentText: "text-white" }
  },
  stone: {
    name: "Stone",
    dark: { bg: "bg-stone-950", border: "border-stone-800", textMain: "text-stone-100", textSub: "text-stone-400", accent: "bg-orange-50", accentText: "text-stone-900" },
    light: { bg: "bg-[#FDFCF8]", border: "border-stone-200", textMain: "text-stone-800", textSub: "text-stone-500", accent: "bg-stone-800", accentText: "text-stone-50" }
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [colorPalette, setColorPalette] = useState<ColorPalette>("zinc");

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const cycleColorPalette = () => {
    const palettes: ColorPalette[] = [ "stone","zinc", "slate"];
    const nextIndex = (palettes.indexOf(colorPalette) + 1) % palettes.length;
    setColorPalette(palettes[nextIndex]);
  };

  const themeColors = isDarkMode 
    ? themesConfig[colorPalette].dark 
    : themesConfig[colorPalette].light;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colorPalette, cycleColorPalette, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};