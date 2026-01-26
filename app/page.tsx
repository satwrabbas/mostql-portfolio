"use client";

import { useEffect } from "react";
import { useLanguage } from "./context/LanguageContext";
import { useHireMe } from "./hooks/useHireMe";

import Header from "./components/Header";
import Hero from "./components/Hero";
import PortfolioGrid from "./components/PortfolioGrid";
import Footer from "./components/Footer";
import TimelineSection from "./components/TimelineSection";

export default function Portfolio() {
  const { lang } = useLanguage();
  const { handleHireMe } = useHireMe(lang);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <Header onContactClick={handleHireMe} />

      <Hero lang={lang} onContactClick={handleHireMe} />

      <TimelineSection lang={lang}/>
      <PortfolioGrid lang={lang} />

      <Footer />
    </main>
  );
}
