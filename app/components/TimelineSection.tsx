"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaHandshake,
  FaRocket,
  FaLightbulb,
  FaFingerprint,
} from "react-icons/fa";

import { useTheme } from "@/app/context/ThemeContext";

const timelineData = [
  {
    id: 1,
    phase: "foundation",
    year: "The Foundation",
    icon: FaFingerprint,
    title: {
      ar: "صقل المهارات الفردية",
      en: "Mastering the Crafts",
    },
    description: {
      ar: "قبل أن نصبح ABCE، أمضى كل منا سنوات في تخصصه. أنا في هندسة البرمجيات والأنظمة المعقدة، وشريكتي في فنون التصميم والبصريات. كنا نبني الأساس المتين.",
      en: "Before ABCE, we spent years sharpening our individual edges. One deep in code architecture, the other mastering visuals. Building the solid foundation.",
    },
    color: "from-zinc-500 to-zinc-400",
  },
  {
    id: 2,
    phase: "synergy",
    year: "The Synergy",
    icon: FaHandshake,
    title: {
      ar: "لقاء الكود بالفن",
      en: "The Convergence",
    },
    description: {
      ar: "أدركنا أن الكود وحده جامد، والتصميم وحده ساكن. بدأنا التعاون لسد الفجوة، وولد مبدأنا: التقنية يجب أن تكون جميلة، والجمال يجب أن يكون وظيفياً.",
      en: "We realized code alone is rigid, and design alone is static. We joined forces to bridge the gap: Technology must be beautiful, and beauty must be functional.",
    },
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 3,
    phase: "now",
    year: "NOW - Inception",
    icon: FaRocket,
    title: {
      ar: "ولادة استوديو ABCE",
      en: "Inception of ABCE",
    },
    description: {
      ar: "نحن في مرحلة التحول من 'مستقلين' إلى 'كيان مؤسسي'. نؤسس استوديو للتجارب الرقمية الغامرة، ونفتح الباب لعدد محدود من الشركاء المؤسسين.",
      en: "Transitioning from freelancers to a Creative Studio. We are currently opening our doors to a select few partners to become our first success stories.",
    },
    badge: {
      ar: "مرحلة التأسيس",
      en: "Founding Phase",
    },
    color: "from-emerald-500 to-green-400",
    glow: true,
  },
  {
    id: 4,
    phase: "future",
    year: "Future Vision",
    icon: FaLightbulb,
    title: {
      ar: "التوسع والابتكار (R&D)",
      en: "Evolution & R&D",
    },
    description: {
      ar: "رؤيتنا لا تتوقف هنا. نبني فريقاً من فناني الـ 3D ومطوري WebGL لدفع حدود الويب إلى مناطق لم تُرَ من قبل.",
      en: "Our vision doesn't stop here. We are actively building a multidisciplinary team of 3D artists and WebGL wizards to push the boundaries of the web.",
    },
    color: "from-purple-500 to-pink-500",
  },
];

interface TimelineProps {
  lang: "ar" | "en";
}

export default function TimelineSection({ lang }: TimelineProps) {
  const { themeColors, isDarkMode, colorPalette } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
    <section
      ref={containerRef}
      className={`relative py-24 overflow-hidden transition-colors duration-700 ${themeColors.bg}`}
    >
      {/* 
        1. الإضاءة المركزية الجديدة (Central Glow) 
        تتمركز في وسط القسم تماماً
      */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-102.5 h-250 md:w-150 md:h-250 blur-[120px] rounded-full pointer-events-none transition-colors duration-1000
        ${getGlowColor()}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b pb-2
              ${isDarkMode ? "from-white to-zinc-500" : "from-zinc-900 to-zinc-500"}`}
          >
            {lang === "ar" ? "رحلتنا" : "Our Journey"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`mt-2 md:mt-4 text-sm md:text-base max-w-lg mx-auto transition-colors duration-500
              ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
          >
            {lang === "ar"
              ? "من العمل الفردي إلى بناء كيان إبداعي متكامل"
              : "From solo craftsmanship to a unified creative entity"}
          </motion.p>
        </div>

        <div className="relative">
          <div
            className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 transition-colors duration-700
            ${isDarkMode ? "bg-zinc-800" : "bg-zinc-200"}`}
          />

          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-linear-to-b from-blue-500 via-emerald-500 to-purple-500 -translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />

          <div className="space-y-12 md:space-y-32">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              const isNow = item.phase === "now";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center justify-between ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full border z-20 shadow-xl transition-colors duration-500
                    ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`}
                  >
                    <div
                      className={`w-2 h-2 md:w-4 md:h-4 rounded-full bg-linear-to-r ${item.color} ${isNow ? "animate-pulse" : ""}`}
                    />

                    {isNow && (
                      <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                    )}
                  </div>

                  <div className="hidden md:block md:w-[42%]" />

                  <div className="w-full md:w-[42%] pl-12 md:pl-0">
                    <div
                      className={`
                      relative p-6 md:p-8 rounded-2xl border transition-all duration-300 group
                      hover:scale-[1.02] backdrop-blur-sm
                      
                      ${
                        isNow
                          ? isDarkMode
                            ? "bg-zinc-900/80 border-emerald-500/30 shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)]"
                            : "bg-white/90 border-emerald-500/30 shadow-xl ring-1 ring-emerald-500/20"
                          : isDarkMode
                            ? "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60"
                            : "bg-white/60 border-zinc-200 hover:border-zinc-300 hover:bg-white/90"
                      }
                    `}
                    >
                      <span
                        className={`
                        inline-block px-3 py-1 mb-3 text-[10px] md:text-xs font-bold tracking-wider uppercase rounded-full border 
                        text-transparent bg-clip-text bg-linear-to-r ${item.color}
                        ${isDarkMode ? "bg-zinc-800/50 border-white/5" : "bg-zinc-100 border-zinc-200"}
                      `}
                      >
                        {item.year}
                      </span>

                      {item.badge && (
                        <span className="absolute top-6 right-6 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                      )}

                      <h3
                        className={`text-xl md:text-2xl font-bold mb-3 transition-colors duration-300
                        group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r ${item.color}
                        ${themeColors.textMain}
                        `}
                      >
                        {item.title[lang]}
                      </h3>

                      <p
                        className={`leading-relaxed text-sm md:text-base transition-colors duration-500 ${themeColors.textSub}`}
                      >
                        {item.description[lang]}
                      </p>

                      <item.icon
                        className={`absolute bottom-4 right-4 text-5xl md:text-7xl rotate-[-15deg] pointer-events-none group-hover:scale-110 transition-transform duration-500
                        ${isDarkMode ? "text-white/5" : "text-black/5"}`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
