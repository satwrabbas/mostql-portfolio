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
    <section ref={containerRef} className="relative py-24 bg-zinc-950 overflow-hidden">
      {/* إضاءة خلفية */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <motion.h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
            {lang === "ar" ? "رحلتنا" : "Our Journey"}
          </motion.h2>
        </div>

        <div className="relative">
          {/* الخط المركزي */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-zinc-800 -translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-blue-500 via-emerald-500 to-purple-500 -translate-x-1/2 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
          />

          <div className="space-y-16 md:space-y-32">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              const isNow = item.phase === "now";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex flex-col md:flex-row items-center justify-between ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* النقطة المركزية */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-950 border border-zinc-700 z-20">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`} />
                  </div>

                  {/* 
                    التغيير هنا:
                    بدلاً من w-[45%] استخدمت w-[42%] 
                    هذا يزيد الفراغ في المنتصف من 10% إلى 16% تقريباً
                  */}
                  <div className="w-full md:w-[42%] pl-12 md:pl-0">
                    <div className={`
                      relative p-6 md:p-10 rounded-[2.5rem] border transition-all duration-500 group
                      ${isNow ? "bg-zinc-900/80 border-emerald-500/50 shadow-2xl" : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"}
                      backdrop-blur-md
                    `}>
                      <span className={`inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded-full bg-zinc-800/50 text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                        {item.year}
                      </span>
                      
                      <h3 className={`text-2xl md:text-3xl font-bold text-white mb-4 group-hover:bg-clip-text transition-all`}>
                        {item.title[lang]}
                      </h3>
                      
                      <p className="text-zinc-400 leading-relaxed text-sm md:text-lg">
                        {item.description[lang]}
                      </p>

                      <item.icon className="absolute bottom-6 right-6 text-7xl md:text-8xl text-white/5 rotate-[-10deg] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>

                  {/* 
                    التغيير هنا أيضاً:
                    يجب مطابقة حجم الفراغ المقابل ليصبح w-[42%]
                  */}
                  <div className="hidden md:block md:w-[42%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}