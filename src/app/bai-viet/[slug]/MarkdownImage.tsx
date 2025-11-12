"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getStrapiUrl } from "../../../utils/strapi";

export default function MarkdownImage({
  src,
  alt,
}: {
  src: string;
  alt?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!src) {
    return null;
  }

  const srcString = typeof src === "string" ? src : String(src);

  // Xử lý URL - nếu đã có http:// hoặc https:// thì giữ nguyên
  let imageUrl = srcString;
  if (
    srcString &&
    !srcString.startsWith("http://") &&
    !srcString.startsWith("https://")
  ) {
    // Nếu URL bắt đầu bằng / thì thêm base URL
    if (srcString.startsWith("/")) {
      imageUrl = getStrapiUrl(srcString);
    } else {
      // Nếu không có / ở đầu, thêm cả / và base URL
      imageUrl = getStrapiUrl(`/${srcString}`);
    }
  }

  // Chỉ hiển thị error sau khi mounted để tránh hydration mismatch
  if (mounted && imageError) {
    return (
      <div className="my-3 sm:my-4 lg:my-6 w-full flex justify-center">
        <div className="bg-white/10 rounded-lg p-2.5 sm:p-3 lg:p-4 text-center text-white/60 text-xs sm:text-sm">
          Không thể tải ảnh: {alt || "Image"}
        </div>
      </div>
    );
  }

  return (
    <div className="my-3 sm:my-4 lg:my-6 w-full flex justify-center">
      <div className="relative w-full max-w-full overflow-hidden rounded-lg sm:rounded-xl bg-white/5">
        <Image
          src={imageUrl}
          alt={alt || ""}
          width={1200}
          height={800}
          className="w-full h-auto object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
          unoptimized
          onError={() => {
            if (mounted) {
              console.error("Image failed to load:", imageUrl);
              setImageError(true);
            }
          }}
        />
      </div>
    </div>
  );
}
