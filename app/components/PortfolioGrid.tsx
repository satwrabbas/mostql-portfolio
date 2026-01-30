"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { createClient } from "../lib/supabase";
import { translations } from "../constants/translations";
import { useTheme } from "@/app/context/ThemeContext";

interface PortfolioGridProps {
  lang: "ar" | "en";
}

export default function PortfolioGrid({ lang }: PortfolioGridProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const t = translations[lang];
  const supabase = createClient();
  
  // 1. استدعاء colorPalette للتحكم بلون التوهج
  const { themeColors, isDarkMode, colorPalette } = useTheme();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setProjects(data);
      } catch (error: any) {
        console.error("Error fetching projects:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [supabase]);

  // 2. دالة لتحديد لون الإضاءة المركزية (نفس المنطق السابق)
  const getGlowColor = () => {
    if (isDarkMode) {
      switch (colorPalette) {
        case "slate": return "bg-blue-500/10";
        case "stone": return "bg-orange-500/10";
        default: return "bg-zinc-500/10";
      }
    } else {
      switch (colorPalette) {
        case "slate": return "bg-blue-400/30";
        case "stone": return "bg-orange-400/30";
        default: return "bg-zinc-400/30";
      }
    }
  };

  return (
    <section 
      id="portfolio" 
      // 3. أضفنا relative و overflow-hidden لضمان احتواء الإضاءة
      className={`relative py-12 md:py-24 px-4 md:px-6 overflow-hidden transition-colors duration-500 ${themeColors.bg}`}
    >
      {/* 
         4. عنصر الإضاءة المركزية (Glow Element)
         يقع خلف المحتوى مباشرة
      */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[1500px] blur-[120px] rounded-full pointer-events-none transition-colors duration-1000
        ${getGlowColor()}`}
      />

      {/* 5. رفع المحتوى ليكون فوق الإضاءة (relative z-10) */}
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-4 border-b pb-8 transition-colors duration-500 ${themeColors.border}`}
        >
          <div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 transition-colors duration-500 ${themeColors.textMain}`}>
              {t.latestWork}
            </h2>
            <p className={`max-w-md transition-colors duration-500 ${themeColors.textSub}`}>
              {t.workSub}
            </p>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2].map((n) => (
              <div
                key={n}
                className={`h-80 animate-pulse rounded-2xl border transition-colors duration-500
                  ${themeColors.border}
                  ${isDarkMode ? "bg-white/5" : "bg-black/5"} 
                `}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{
                  opacity: 0,
                  y: 50,
                  filter: "blur(8px)",
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                }}
                viewport={{
                  once: false,
                  amount: 0.1,
                  margin: "0px 0px -20px 0px",
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  delay: (index % 2) * 0.2,
                }}
              >
                <ProjectCard project={project} lang={lang} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}