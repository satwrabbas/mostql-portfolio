"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaCode,
  FaPaintBrush,
  FaHandshake,
  FaRocket,
  FaLightbulb,
  FaFingerprint,
} from "react-icons/fa";

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
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 bg-zinc-950 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 pb-2"
          >
            {lang === "ar" ? "رحلتنا" : "Our Journey"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-2 md:mt-4 text-sm md:text-base text-zinc-400 max-w-lg mx-auto"
          >
            {lang === "ar"
              ? "من العمل الفردي إلى بناء كيان إبداعي متكامل"
              : "From solo craftsmanship to a unified creative entity"}
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 -translate-x-1/2" />

          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-purple-500 -translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />

          <div className="space-y-8 md:space-y-24">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              const isNow = item.phase === "now";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-900 border border-zinc-700 z-20 shadow-xl group">
                    <div
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r ${item.color} ${isNow ? "animate-pulse" : ""}`}
                    />

                    {isNow && (
                      <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                    )}
                  </div>

                  <div className="hidden md:block w-1/2" />

                  <div
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isEven
                        ? "md:pr-12 md:text-right text-left"
                        : "md:pl-12 text-left"
                    }`}
                  >
                    <div
                      className={`
                      relative p-4 md:p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] group
                      ${
                        isNow
                          ? "bg-zinc-900/80 border-emerald-500/30 shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)]"
                          : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60"
                      }
                      backdrop-blur-sm
                    `}
                    >
                      <span
                        className={`
                        inline-block px-2 py-0.5 mb-2 md:px-3 md:py-1 md:mb-3 text-[10px] md:text-xs font-bold tracking-wider uppercase rounded-full bg-zinc-800/50 border border-white/5
                        text-transparent bg-clip-text bg-gradient-to-r ${item.color}
                      `}
                      >
                        {item.year}
                      </span>

                      {item.badge && (
                        <span className="absolute top-4 right-4 flex h-2 w-2 md:h-3 md:w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-emerald-500"></span>
                        </span>
                      )}

                      <h3
                        className={`text-lg md:text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${item.color} transition-all`}
                      >
                        {item.title[lang]}
                      </h3>

                      <p className="text-zinc-400 leading-relaxed text-xs md:text-base">
                        {item.description[lang]}
                      </p>

                      <item.icon className="absolute bottom-4 right-4 text-4xl md:text-6xl text-white/5 rotate-[-15deg] pointer-events-none" />
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
