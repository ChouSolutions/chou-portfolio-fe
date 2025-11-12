"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaHeart,
  FaComment,
  FaEye,
  FaShare,
  FaCalendarAlt,
  FaBook,
} from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { AVATAR_URL } from "../../utils/avatar";

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  views: string;
  likes: number;
  comments: number;
  tags: string[];
  image: boolean;
  coverImageUrl: string | null;
}

export default function ArticleCardClient({
  post,
  index,
}: {
  post: Post;
  index: number;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/bai-viet/${post.slug}`}>
      <article className="backdrop-blur-md rounded-2xl overflow-hidden mt-4 bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer">
        {/* Header với Author Info */}
        <div className="p-5 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 p-0.5 flex-shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image
                  src={AVATAR_URL}
                  alt={post.author}
                  fill
                  className="object-cover"
                  sizes="40px"
                  unoptimized
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-sm">
                {post.author}
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <FaCalendarAlt size={10} />
                <span>{post.date}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-white font-bold text-xl mb-3 leading-tight group-hover:text-orange-300 transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-white/70 text-sm mb-4 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Image Thumbnail */}
        {post.image && (
          <div className="relative w-full bg-white/5 overflow-hidden">
            {post.coverImageUrl && !imageError ? (
              <div className="relative w-full flex justify-center min-h-[200px] max-h-96">
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 800px"
                  unoptimized
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="relative h-48 bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-pink-500/30">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/20 to-pink-400/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaBook size={48} className="text-white/30" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer với Stats và Actions */}
        <div className="p-5 pt-4 border-t border-white/10">
          <div className="flex items-center justify-end flex-row">
            {/* Actions */}
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-400/80 to-pink-500/80 text-white text-xs font-semibold hover:from-orange-400 hover:to-pink-500 transition-all flex items-center gap-1.5">
                <span>Đọc thêm</span>
                <MdOpenInNew size={14} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
