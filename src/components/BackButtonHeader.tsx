"use client";

import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface BackButtonHeaderProps {
  href: string;
  maxWidth?: "default" | "narrow";
}

export default function BackButtonHeader({
  href,
  maxWidth = "default",
}: BackButtonHeaderProps) {
  const router = useRouter();
  const containerClass = maxWidth === "narrow" ? "max-w-4xl" : "max-w-7xl";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-white/15 via-purple-200/15 to-blue-200/15 border-b border-white/10 shadow-sm">
      <div className={`${containerClass} mx-auto px-4 sm:px-6 py-2.5 sm:py-3`}>
        <button onClick={() => router.back()} className="inline-block">
          <button className="flex items-center gap-1.5 sm:gap-2 text-white/80 hover:text-white transition-colors">
            <FaArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="text-xs sm:text-sm font-medium">Quay lại</span>
          </button>
        </button>
      </div>
    </header>
  );
}
