"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";

export default function Footer() {
  const { lang } = useLanguage();

  const { themeColors, isDarkMode, colorPalette } = useTheme();

  const t = {
    ar: {
      ready: "جاهز لإطلاق مشروعك القادم؟",
      sub: "تواصل معي فوراً لنناقش التفاصيل.",
      rights: "جميع الحقوق محفوظة.",
      available: "متاح للعمل",
    },
    en: {
      ready: "?Ready to launch your next project",
      sub: "Contact me now to discuss details",
      rights: ".All rights reserved",
      available: "Available for work",
    },
  };

  const txt = t[lang];

  const getGlowColor = () => {
    if (isDarkMode) {
      switch (colorPalette) {
        case "slate":
          return "bg-blue-500/10";
        case "stone":
          return "bg-orange-500/10";
        default:
          return "bg-zinc-500/10";
      }
    } else {
      switch (colorPalette) {
        case "slate":
          return "bg-blue-400/30";
        case "stone":
          return "bg-orange-400/30";
        default:
          return "bg-zinc-400/30";
      }
    }
  };

  return (
    <footer
      className={`relative pt-16 pb-8 px-6 border-t overflow-hidden transition-all duration-700
      ${themeColors.bg} ${themeColors.border}`}
    >
      {/* 
        3. عنصر الإضاءة الخلفية المحدث (Central Glow)
        تم ضبطه ليكون في المنتصف تماماً مع استخدام getGlowColor
      */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 md:w-175 md:h-100 blur-[100px] rounded-full pointer-events-none transition-colors duration-1000
        ${getGlowColor()}`}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="mb-12">
          <div className="relative w-40 h-40 mx-auto mb-6 group">
            <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full group-hover:bg-emerald-500/30 transition-all duration-500"></div>
            <Image
              src="/adorable-pleading.gif"
              alt="Hire me"
              width={160}
              height={160}
              unoptimized
              className={`relative w-full h-full object-cover rounded-2xl border-2 shadow-2xl hover:scale-105 transition-all duration-300
              ${isDarkMode ? "border-white/10" : "border-black/10"}`}
            />
            <div
              className={`absolute -right-4 -top-4 text-xs font-bold px-3 py-1 rounded-full shadow-lg rotate-12 animate-bounce
              ${themeColors.accent} ${themeColors.accentText}`}
            >
              ?Please
            </div>
          </div>

          <h2
            className={`text-3xl md:text-5xl font-bold mb-4 tracking-tight transition-colors duration-300 ${themeColors.textMain}`}
          >
            {txt.ready}
          </h2>
          <p
            className={`text-lg mb-8 transition-colors duration-300 ${themeColors.textSub}`}
          >
            {txt.sub}
          </p>

          <a
            href="https://mostaql.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-xl
            ${themeColors.accent} ${themeColors.accentText} shadow-black/5`}
          >
            <FaWhatsapp className="text-2xl text-emerald-600" />
            <span> رابط التواصل على منصة مستقل</span>
          </a>
        </div>

        <div
          className={`h-px w-full mb-8 bg-linear-to-r from-transparent via-current to-transparent opacity-20 ${themeColors.textSub}`}
        ></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={24}
                height={24}
                className={`w-6 h-6 ${!isDarkMode && "invert"}`}
              />
              <span
                className={`font-bold tracking-tighter ${themeColors.textMain}`}
              >
                ABCE-S
              </span>
            </div>
            <div
              className={`h-4 w-px bg-current opacity-20 ${themeColors.textSub}`}
            ></div>

            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5"}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span
                className={`text-[10px] font-medium ${themeColors.textSub}`}
              >
                {txt.available}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center md:text-right">
          <p className={`text-xs ${themeColors.textSub}`}>
            © {new Date().getFullYear()} ABCE-S. {txt.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
