/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaGlobe,
  FaVolumeMute,
  FaSun,
  FaMoon,
  FaPalette,
} from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import { useTheme, ColorPalette } from "@/app/context/ThemeContext";

export default function Header() {
  const [, setScrolled] = useState(false);
  const [isMusicActive, setIsMusicActive] = useState(false);
  const { lang, setLang } = useLanguage();
  const { isDarkMode, toggleDarkMode, cycleColorPalette, colorPalette } =
    useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const syncMusicState = (e: any) => {
      if (e.detail !== undefined) {
        setIsMusicActive(e.detail);
      }
    };

    window.addEventListener("music-status", syncMusicState);
    window.dispatchEvent(new Event("request-music-status"));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("music-status", syncMusicState);
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new Event("toggle-music"));
  };

  const getPaletteIconColor = (palette: ColorPalette) => {
    if (isDarkMode) {
      switch (palette) {
        case "slate":
          return "text-sky-400";
        case "stone":
          return "text-orange-400";
        default:
          return "text-zinc-300";
      }
    } else {
      switch (palette) {
        case "slate":
          return "text-sky-700";
        case "stone":
          return "text-orange-700";
        default:
          return "text-zinc-600";
      }
    }
  };

  const paletteIconColor = getPaletteIconColor(colorPalette);

  return (
    <header className="fixed top-0 w-full z-50 py-4 md:py-6 transition-all duration-500">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-3">
          <div
            className={`relative w-9 h-9 md:w-12 md:h-12 rounded-xl overflow-hidden flex items-center justify-center border transition-colors duration-500
            ${isDarkMode ? "bg-white/10 border-white/5" : "bg-black/5 border-black/5"}`}
          >
            <Image
              src="/logo.svg"
              alt="Logo"
              fill
              className={`object-cover ${!isDarkMode && "invert"}`}
              priority
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={toggleDarkMode}
            className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300
             ${
               isDarkMode
                 ? "bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10"
                 : "bg-black/5 border-black/10 text-indigo-600 hover:bg-black/10"
             }`}
          >
            {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>

          <button
            onClick={cycleColorPalette}
            className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 relative group
             ${
               isDarkMode
                 ? "bg-white/5 border-white/10 hover:border-white/20"
                 : "bg-black/5 border-black/10 hover:border-black/20"
             }
             ${paletteIconColor} 
            `}
          >
            <FaPalette size={16} />
            <span className="absolute -bottom-8 text-[10px] px-2 py-1 rounded bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none capitalize">
              {colorPalette}
            </span>
          </button>

          <button
            onClick={toggleMusic}
            className={`group flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-500 ${
              isMusicActive
                ? "bg-blue-500/20 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                : isDarkMode
                  ? "bg-white/5 border-white/10 text-zinc-500 hover:text-white"
                  : "bg-black/5 border-black/10 text-zinc-400 hover:text-black"
            }`}
          >
            {isMusicActive ? (
              <div className="flex gap-0.5 items-end h-3">
                <span className="w-0.75 bg-blue-400 animate-[music-bar_0.8s_infinite]"></span>
                <span className="w-0.75 bg-blue-400 animate-[music-bar_1.2s_infinite]"></span>
                <span className="w-0.75 bg-blue-400 animate-[music-bar_0.6s_infinite]"></span>
                <span className="w-0.75 bg-blue-400 animate-[music-bar_1s_infinite]"></span>
              </div>
            ) : (
              <FaVolumeMute size={16} />
            )}
          </button>

          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-xs md:text-sm font-medium transition-all
              ${
                isDarkMode
                  ? "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                  : "bg-black/5 border-black/10 text-zinc-600 hover:bg-black/10"
              }`}
          >
            <FaGlobe className="text-blue-400" />
            <span>{lang === "ar" ? "EN" : "عربي"}</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes music-bar {
          0%,
          100% {
            height: 4px;
          }
          50% {
            height: 14px;
          }
        }
      `}</style>
    </header>
  );
}
