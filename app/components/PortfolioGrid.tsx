"use client";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { createClient } from "../lib/supabase";
import { translations } from "../constants/translations";
import { motion } from "framer-motion";

interface PortfolioGridProps {
  lang: "ar" | "en";
}

export default function PortfolioGrid({ lang }: PortfolioGridProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[lang];
  const supabase = createClient();

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

  return (
    <section id="portfolio" className="py-12 md:py-24 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-4 border-b border-zinc-800 pb-8"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {t.latestWork}
            </h2>
            <p className="text-zinc-400 max-w-md">{t.workSub}</p>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-80 bg-zinc-900/50 animate-pulse rounded-2xl border border-zinc-800"
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
                  amount: 0.2,
                  margin: "0px 0px -50px 0px",
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  delay: (index % 2) * 0.1,
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
