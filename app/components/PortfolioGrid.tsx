"use client";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { createClient } from "../lib/supabase";
import { translations } from "../constants/translations";

interface PortfolioGridProps {
  lang: "ar" | "en";
}

export default function PortfolioGrid({ lang }: PortfolioGridProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const t = translations[lang];
  const supabase = createClient();

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error.message);
      } else if (data) {
        setProjects(data);
      }
    }
    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="py-12 md:py-24 bg-zinc-900/50 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4 border-b border-zinc-800 pb-6 md:pb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t.latestWork}
            </h2>
            <p className="text-sm md:text-base text-zinc-400">{t.workSub}</p>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 md:py-20 text-zinc-500 bg-zinc-900 rounded-2xl border border-dashed border-zinc-800">
            {t.loading}
          </div>
        )}
      </div>
    </section>
  );
}