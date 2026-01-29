"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaGlobe, FaVolumeMute } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMusicActive, setIsMusicActive] = useState(false);
  const { lang, setLang } = useLanguage();

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

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 
        
          
           "bg-transparent py-4 md:py-6"
      `}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative w-9 h-9 md:w-12 md:h-12 bg-white/10 rounded-xl overflow-hidden flex items-center justify-center border border-white/5">
            <Image
              src="/logo.svg"
              alt="Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={toggleMusic}
            className={`group flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-500 ${
              isMusicActive
                ? "bg-blue-500/20 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                : "bg-white/5 border-white/10 text-zinc-500 hover:text-white"
            }`}
          >
            {isMusicActive ? (
              <div className="flex gap-[2px] items-end h-3">
                <span className="w-[3px] bg-blue-400 animate-[music-bar_0.8s_infinite]"></span>
                <span className="w-[3px] bg-blue-400 animate-[music-bar_1.2s_infinite]"></span>
                <span className="w-[3px] bg-blue-400 animate-[music-bar_0.6s_infinite]"></span>
                <span className="w-[3px] bg-blue-400 animate-[music-bar_1s_infinite]"></span>
              </div>
            ) : (
              <FaVolumeMute size={16} />
            )}
          </button>

          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-xs md:text-sm font-medium transition-all text-zinc-300"
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
