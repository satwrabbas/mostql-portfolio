/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "../../lib/supabase";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";

const translations = {
  ar: {
    techStack: "التقنيات المستخدمة",
    liveDemo: "معاينة حية",
    viewCode: "الكود المصدري",
    goBack: "العودة للمشاريع",
    loading: "جاري تحميل تفاصيل المشروع...",
    notFound: "المشروع غير موجود.",
  },
  en: {
    techStack: "Technology Stack",
    liveDemo: "Live Demo",
    viewCode: "Source Code",
    goBack: "Back to Projects",
    loading: "Loading project details...",
    notFound: "Project not found.",
  },
};

export default function ProjectClient({ id }: { id: string }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();

  const { themeColors, isDarkMode, colorPalette } = useTheme();

  const router = useRouter();
  const supabase = createClient();
  const t = translations[lang];

  useEffect(() => {
    if (!id) return;
    async function fetchProject() {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      if (error || !data) {
        console.error("Error fetching project:", error);
        setProject(null);
      } else {
        setProject(data);
      }
      setLoading(false);
    }
    fetchProject();
  }, [id, supabase]);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

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

  if (loading) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center z-50 transition-colors duration-500 ${themeColors.bg}`}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 md:w-20 md:h-20 border-4 border-blue-500/20 rounded-full"></div>
          <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute w-3 h-3 md:w-4 md:h-4 bg-blue-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-2">
          <h2
            className={`text-lg md:text-xl font-bold tracking-wider animate-pulse ${themeColors.textMain}`}
          >
            {lang === "ar" ? "جاري التحميل..." : "Loading..."}
          </h2>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center gap-4 ${themeColors.bg} ${themeColors.textMain}`}
      >
        <p>{t.notFound}</p>
        <button
          onClick={() => router.push("/")}
          className={`px-6 py-2 rounded-lg font-bold ${themeColors.accent} ${themeColors.accentText}`}
        >
          {t.goBack}
        </button>
      </div>
    );
  }

  const title = lang === "ar" ? project.title_ar : project.title_en;
  const description =
    lang === "ar" ? project.description_ar : project.description_en;

  return (
    <div
      className={`min-h-screen font-sans selection:bg-blue-500 selection:text-white pb-12 md:pb-20 transition-colors duration-500 relative overflow-hidden
      ${themeColors.bg} ${themeColors.textSub}`}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 md:w-250 md:h-250 blur-[120px] rounded-full pointer-events-none transition-colors duration-1000
        ${getGlowColor()}`}
      />

      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-24 md:pt-32 relative z-10">
        <div className="mb-8 md:mb-12">
          <button
            onClick={() => router.push("/#portfolio")}
            className={`flex items-center gap-2 transition-colors text-sm md:text-base
              ${themeColors.textSub} hover:${themeColors.textMain}`}
          >
            <FaArrowLeft className={lang === "ar" ? "rotate-180" : ""} />
            <span>{t.goBack}</span>
          </button>
        </div>

        <h1 className="text-3xl md:text-6xl font-bold text-center mb-6 md:mb-12 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-emerald-400 leading-tight">
          {title}
        </h1>

        <div
          className={`relative w-full aspect-video mb-8 md:mb-16 border shadow-2xl rounded-xl overflow-hidden group
          ${themeColors.border} ${isDarkMode ? "bg-black/20 shadow-black/50" : "bg-zinc-100 shadow-zinc-200/50"}`}
        >
          <Image
            src={project.image_url}
            alt={title}
            fill
            className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            unoptimized={true}
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16">
          <div className="lg:col-span-2">
            <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          <div className="space-y-8">
            <div
              className={`p-6 rounded-2xl border ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5"}`}
            >
              <h3
                className={`text-lg md:text-xl font-bold mb-4 border-b pb-2 ${themeColors.textMain} ${themeColors.border}`}
              >
                {t.techStack}
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {project.tags?.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className={`px-3 py-1 border text-xs md:text-sm rounded-lg
                      ${isDarkMode ? "bg-white/5 border-white/10 text-zinc-300" : "bg-black/5 border-black/5 text-zinc-600"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white text-sm md:text-base shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1"
                >
                  <FaExternalLinkAlt /> {t.liveDemo}
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-sm md:text-base transition-all border hover:-translate-y-1
                    ${themeColors.border} ${isDarkMode ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/5 text-black hover:bg-black/10"}`}
                >
                  <FaGithub /> {t.viewCode}
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
