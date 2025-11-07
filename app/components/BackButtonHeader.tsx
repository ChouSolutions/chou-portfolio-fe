"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface BackButtonHeaderProps {
  href: string;
  maxWidth?: "default" | "narrow";
}

export default function BackButtonHeader({
  href,
  maxWidth = "default",
}: BackButtonHeaderProps) {
  const containerClass =
    maxWidth === "narrow" ? "max-w-4xl" : "max-w-7xl";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-white/15 via-purple-200/15 to-blue-200/15 border-b border-white/10 shadow-sm">
      <div className={`${containerClass} mx-auto px-4 md:px-6 py-3`}>
        <Link href={href} className="inline-block">
          <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <FaArrowLeft size={18} />
            <span className="text-sm font-medium">Quay lại</span>
          </button>
        </Link>
      </div>
    </header>
  );
}

