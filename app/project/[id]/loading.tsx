"use client"; // 1. يجب أن يكون Client Component لاستخدام الهوكس

import { useTheme } from "@/app/context/ThemeContext"; // 2. استيراد الثيم

export default function Loading() {
  const { themeColors } = useTheme(); // 3. استدعاء ألوان الثيم

  return (
    // 4. تطبيق الألوان الديناميكية على الخلفية والنصوص
    <div className={`min-h-screen flex flex-col items-center justify-center z-50 transition-colors duration-500 ${themeColors.bg}`}>
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 border-4 border-blue-500/20 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <h2 className={`text-xl font-bold tracking-wider animate-pulse ${themeColors.textMain}`}>
          Loading Project
        </h2>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}