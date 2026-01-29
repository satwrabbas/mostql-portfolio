import Image from "next/image";
import { FaRocket } from "react-icons/fa";
import { translations } from "../constants/translations";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop";

interface HeroProps {
  lang: "ar" | "en";
  onContactClick: () => void;
}

export default function Hero({ lang, onContactClick }: HeroProps) {
  const t = translations[lang];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 pt-16 md:pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={BG_IMAGE}
          alt="Background"
          fill
          className="object-cover opacity-500 select-none"
          priority
          unoptimized={true}
        />
        <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-zinc-950/80 to-zinc-950"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs md:text-sm mb-6 md:mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2 md:h-3 md:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-blue-500"></span>
          </span>
          {t.badge}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight">
          {t.titleStart} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
            {t.titleHighlight}
          </span>{" "}
          {t.titleEnd}
        </h1>

        <p className="text-zinc-400 text-sm md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
          {t.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 sm:px-0">
          <button
            onClick={onContactClick}
            className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white text-zinc-950 hover:bg-blue-50 rounded-xl font-bold text-base md:text-lg shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <FaRocket className="text-blue-600" /> {t.ctaMain}
          </button>
          <a
            href="#portfolio"
            className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-zinc-800/50 hover:bg-zinc-800 backdrop-blur-sm border border-zinc-700 rounded-xl font-bold text-base md:text-lg text-white transition-all text-center"
          >
            {t.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}