"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaCode } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiSupabase,
} from "react-icons/si";

const JourneyCard = ({ icon, title, desc, index, align = "left" }: any) => {
  const isLeft = align === "left";
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "1.2 0"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8],
  );

  const xDistance = isLeft ? -100 : 100;
  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [xDistance, 0, 0, xDistance],
  );

  const rotateVal = isLeft ? -10 : 10;
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [rotateVal, 0, 0, rotateVal],
  );

  return (
    <div
      ref={cardRef}
      className={`absolute w-full flex justify-center z-20 ${
        index === 0
          ? "top-[2%]"
          : index === 1
            ? "top-[18%]"
            : index === 2
              ? "top-[34%]"
              : index === 3
                ? "top-[50%]"
                : ""
      }`}
    >
      <motion.div
        style={{ opacity, scale, x, rotateY }}
        className={`relative w-[85%] md:w-[45%] max-w-lg p-6 md:p-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl shadow-2xl group hover:border-blue-500/50 transition-colors duration-500
          ${isLeft ? "md:ml-auto md:mr-16" : "md:mr-auto md:ml-16"}
        `}
      >
        <div className="absolute inset-0 bg-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

        <div
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-zinc-950 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-30
           ${isLeft ? "-right-[2.5rem] md:-right-[5rem] bg-emerald-400" : "-left-[2.5rem] md:-left-[5rem] bg-blue-400"}
        `}
        >
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-[2px] w-8 md:w-16 bg-zinc-800 -z-10
                ${isLeft ? "right-full mr-1" : "left-full ml-1"}
            `}
          ></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 shadow-inner">
              {icon}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-zinc-100">
              {title}
            </h3>
          </div>
          <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
            {desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "80%"]);

  const opacityHeader = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const yHeader = useTransform(scrollYProgress, [0, 0.05], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative z-10 h-[300vh] bg-zinc-950 overflow-hidden"
    >
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <motion.div
        style={{ opacity: opacityHeader, y: yHeader }}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center z-10 pointer-events-none"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tighter text-center px-4">
          كيف نصنع السحر؟
        </h2>
        <p className="text-zinc-500 text-lg mt-4">
          رحلة الكود من الفكرة إلى الواقع
        </p>
        <div className="mt-10 animate-bounce text-zinc-600">↓</div>
      </motion.div>

      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] bg-zinc-800 z-0">
        <motion.div
          style={{ height: lineHeight }}
          className="w-full bg-gradient-to-b from-blue-500 via-emerald-400 to-purple-500 shadow-[0_0_20px_rgba(52,211,153,0.6)]"
        />
      </div>

      <div className="relative w-full h-full max-w-7xl mx-auto">
        <JourneyCard
          index={0}
          align="left"
          icon={<FaHtml5 className="text-orange-500 text-3xl" />}
          title="1. الأساس الهيكلي"
          desc="نبدأ ببناء هيكل دلالي (Semantic HTML) قوي يضمن الوصولية (Accessibility) ويشكل العمود الفقري للمشروع."
        />

        <JourneyCard
          index={1}
          align="right"
          icon={<FaCss3Alt className="text-blue-500 text-3xl" />}
          title="2. الفن والهوية"
          desc="باستخدام TailwindCSS، نحول الهيكل الجامد إلى تحفة بصرية. نركز على التناسق اللوني وتجربة المستخدم."
        />

        <JourneyCard
          index={2}
          align="left"
          icon={
            <div className="flex gap-2">
              <SiTypescript className="text-blue-400 text-3xl" />
              <FaJs className="text-yellow-400 text-3xl" />
            </div>
          }
          title="3. الروح والذكاء"
          desc="نضيف التفاعلية والمنطق باستخدام TypeScript لضمان كود خالٍ من الأخطاء وينبض بالحياة."
        />

        <JourneyCard
          index={3}
          align="right"
          icon={
            <div className="flex gap-2">
              <FaReact className="text-cyan-400 text-3xl animate-spin-slow" />
              <SiNextdotjs className="text-white text-3xl" />
            </div>
          }
          title="4. المحرك النفاث"
          desc="نستخدم Next.js 15 لربط كل شيء معاً. نضمن سرعة تحميل فائقة وأداء يضاهي التطبيقات العالمية."
        />

        <div className="absolute top-[60%] w-full flex justify-center z-20 pb-20 mb-200000 ">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-b from-zinc-900 to-black p-10 rounded-3xl border border-emerald-500/30 w-[90%] max-w-3xl text-center shadow-[0_0_50px_rgba(16,185,129,0.1)]"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-zinc-950 rounded-full border-4 border-emerald-500 flex items-center justify-center z-10 shadow-lg shadow-emerald-500/20">
              <FaCode className="text-emerald-500" />
            </div>

            <h3 className="text-3xl font-bold text-white mb-4 mt-4">
              جاهز للإطلاق
            </h3>
            <p className="text-zinc-400 mb-6">
              يتم ربط المشروع بقواعد البيانات (Supabase) ونشره على خوادم سحابية
              سريعة.
            </p>

            <div className="flex justify-center gap-6 text-4xl opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <SiSupabase className="text-emerald-500 hover:scale-110 transition-transform" />
              <SiNextdotjs className="text-white hover:scale-110 transition-transform" />
              <SiTailwindcss className="text-cyan-400 hover:scale-110 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
