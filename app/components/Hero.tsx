"use client";
import Image from "next/image";
import { FaRocket } from "react-icons/fa";
import { translations } from "../constants/translations";
import { useTheme } from "@/app/context/ThemeContext";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop";

interface HeroProps {
  lang: "ar" | "en";
  onContactClick: () => void;
}

export default function Hero({ lang, onContactClick }: HeroProps) {
  const t = translations[lang];
  const { themeColors, isDarkMode, colorPalette } = useTheme();

  // الإصلاح الرئيسي: تعديل التدرج ليبدأ شفافاً
  const getGradientOverlay = () => {
    // في الوضع الداكن: يبدأ شفاف، ثم يمر بلون الثيم بنسبة 80%، ثم يمتلئ بالكامل
    if (isDarkMode) {
      switch (colorPalette) {
        case "slate": return "from-transparent via-slate-950/80 to-slate-950";
        case "stone": return "from-transparent via-stone-950/80 to-stone-950";
        default: return "from-transparent via-zinc-950/80 to-zinc-950";
      }
    } 
    // في الوضع الفاتح: نفس المبدأ لكن بألوان فاتحة
    else {
      switch (colorPalette) {
        case "slate": return "from-transparent via-slate-50/80 to-slate-50";
        case "stone": return "from-[#FDFCF8]/50 via-[#FDFCF8]/90 to-[#FDFCF8]";
        default: return "from-transparent via-zinc-50/80 to-zinc-50";
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 pt-16 md:pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={BG_IMAGE}
          alt="Background"
          fill
          // قمنا بزيادة وضوح الصورة قليلاً
          className={`object-cover select-none transition-opacity duration-700
            ${isDarkMode ? "opacity-70" : "opacity-80"} 
          `}
          priority
          unoptimized={true}
        />
        <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-700 ${getGradientOverlay()}`}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className={`inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full border text-xs md:text-sm mb-6 md:mb-8 animate-fade-in-up backdrop-blur-sm
          ${isDarkMode 
            ? "bg-blue-500/10 border-blue-500/20 text-blue-400" 
            : "bg-blue-100 border-blue-200 text-blue-700"}
        `}>
          <span className="relative flex h-2 w-2 md:h-3 md:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-blue-500"></span>
          </span>
          {t.badge}
        </div>

        <h1 className={`text-3xl sm:text-4xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight transition-colors duration-500 ${themeColors.textMain}`}>
          {t.titleStart} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            {t.titleHighlight}
          </span>{" "}
          {t.titleEnd}
        </h1>

        <p className={`text-sm md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2 transition-colors duration-500 ${themeColors.textSub}`}>
          {t.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 sm:px-0">
          <button
            onClick={onContactClick}
            className={`w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2
              ${isDarkMode 
                ? "bg-white text-zinc-950 hover:bg-blue-50 shadow-white/5" 
                : "bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-400/20"}
            `}
          >
            <FaRocket className={isDarkMode ? "text-blue-600" : "text-blue-400"} /> {t.ctaMain}
          </button>
          
          <a
            href="#portfolio"
            className={`w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 backdrop-blur-sm border rounded-xl font-bold text-base md:text-lg transition-all text-center
              ${isDarkMode 
                ? "bg-zinc-800/50 hover:bg-zinc-800 border-zinc-700 text-white" 
                : "bg-white/50 hover:bg-white/80 border-zinc-300 text-zinc-900"}
            `}
          >
            {t.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}