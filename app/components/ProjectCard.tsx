"use client";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Project } from "../types/project";
import { useTheme } from "@/app/context/ThemeContext";

interface ProjectProps {
  project: Project;
  lang: "ar" | "en";
}

export default function ProjectCard({ project, lang }: ProjectProps) {
  const { themeColors, isDarkMode } = useTheme();

  const isAr = lang === "ar";

  const title = isAr
    ? project.title_ar || project.title_en
    : project.title_en || project.title_ar;


  return (
    <div
      className={`group relative border rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 flex flex-col
      hover:-translate-y-1 hover:shadow-2xl
      
      ${themeColors.border}
      ${
        isDarkMode
          ? "bg-white/5 hover:bg-white/10 shadow-black/50"
          : "bg-white hover:bg-white shadow-zinc-200/50 hover:shadow-zinc-300/50"
      }
      `}
    >
      <Link
        href={`/project/${project.id}`}
        className="absolute inset-0 z-10"
        aria-label={title}
      />

      <div
        className={`relative w-full aspect-video border-b overflow-hidden
        ${themeColors.border}
        ${isDarkMode ? "bg-black/20" : "bg-zinc-100"}
      `}
      >
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            unoptimized={true}
          />
        ) : (
          <div
            className={`flex items-center justify-center h-full ${themeColors.textSub}`}
          >
            No Preview
          </div>
        )}

        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none" />
      </div>

      <div className="p-4 md:p-6 relative pointer-events-none flex-1 flex flex-col">
        <h3
          className={`text-lg md:text-xl font-bold mb-1 md:mb-2 transition-colors truncate
          ${themeColors.textMain}
        `}
        >
          {title}
        </h3>

        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6 mt-auto">
          {project.tags?.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-0.5 md:px-2.5 md:py-1 border text-[10px] md:text-xs rounded-md transition-colors
                ${
                  isDarkMode
                    ? "bg-white/5 border-white/10 text-zinc-300"
                    : "bg-black/5 border-black/5 text-zinc-600"
                }
              `}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className={`flex items-center justify-between pt-3 md:pt-4 border-t relative z-20 pointer-events-auto
           ${themeColors.border}
        `}
        >
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className={`text-[10px] md:text-xs font-bold flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full transition-all cursor-pointer
                ${
                  isDarkMode
                    ? "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 hover:text-emerald-300"
                    : "text-emerald-700 bg-emerald-100 hover:bg-emerald-200"
                }
              `}
            >
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {isAr ? "معاينة" : "Demo"}
            </a>
          )}

          <div className="flex gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className={`transition-colors cursor-pointer
                  ${themeColors.textSub} hover:${themeColors.textMain}
                `}
              >
                <FaGithub className="text-base md:text-lg" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
