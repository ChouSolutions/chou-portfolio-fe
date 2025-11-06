"use client";

import Link from "next/link";
import {
  FaArrowLeft,
  FaBook,
  FaUser,
  FaHeart,
  FaComment,
  FaEye,
  FaShare,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";

export default function BaiVietPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(to bottom, #25368A, #46288B, #482689, #213989)",
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-white/15 via-purple-200/15 to-blue-200/15 border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          <Link href="/" className="inline-block">
            <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <FaArrowLeft size={18} />
              <span className="text-sm font-medium">Quay lại</span>
            </button>
          </Link>
        </div>
      </header>

      <div className="px-6 pt-12 pb-24 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 mb-4">
            <FaBook size={28} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Bài Viết
          </h1>
          <p className="text-white/70 text-sm md:text-base">
            Chia sẻ kiến thức và kinh nghiệm về lập trình
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              id: 1,
              title: "React 19: Những tính năng mới đáng chú ý",
              excerpt:
                "Khám phá các tính năng mới trong React 19 như Server Components, Actions, và nhiều cải tiến về performance...",
              author: "Bùi Văn Châu",
              date: "2 giờ trước",
              views: "1.2k",
              likes: 324,
              comments: 42,
              tags: ["React", "JavaScript", "Frontend"],
              image: true,
            },
            {
              id: 2,
              title: "Next.js 14: App Router và Server Components",
              excerpt:
                "Hướng dẫn chi tiết về cách sử dụng App Router và Server Components trong Next.js 14 để xây dựng ứng dụng web hiện đại...",
              author: "Bùi Văn Châu",
              date: "5 giờ trước",
              views: "856",
              likes: 189,
              comments: 23,
              tags: ["Next.js", "React", "Web Development"],
              image: true,
            },
            {
              id: 3,
              title: "TypeScript Best Practices cho dự án lớn",
              excerpt:
                "Chia sẻ các best practices khi làm việc với TypeScript trong các dự án lớn, bao gồm type safety, code organization...",
              author: "Bùi Văn Châu",
              date: "1 ngày trước",
              views: "2.1k",
              likes: 512,
              comments: 67,
              tags: ["TypeScript", "Programming", "Best Practices"],
              image: true,
            },
            {
              id: 4,
              title: "Tối ưu hóa Performance với React.memo và useMemo",
              excerpt:
                "Tìm hiểu cách sử dụng React.memo, useMemo và useCallback để tối ưu hóa performance của ứng dụng React...",
              author: "Bùi Văn Châu",
              date: "2 ngày trước",
              views: "945",
              likes: 201,
              comments: 34,
              tags: ["React", "Performance", "Optimization"],
              image: true,
            },
            {
              id: 5,
              title: "Xây dựng RESTful API với Node.js và Express",
              excerpt:
                "Hướng dẫn từng bước để xây dựng RESTful API với Node.js, Express, MongoDB và các best practices...",
              author: "Bùi Văn Châu",
              date: "3 ngày trước",
              views: "1.5k",
              likes: 378,
              comments: 56,
              tags: ["Node.js", "Backend", "API"],
              image: true,
            },
          ].map((post, index) => (
            <ArticleCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArticleCard({
  post,
  index,
}: {
  post: {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    views: string;
    likes: number;
    comments: number;
    tags: string[];
    image: boolean;
  };
  index: number;
}) {
  return (
    <Link href={`/bai-viet/${post.id}`}>
      <article className="backdrop-blur-md rounded-2xl overflow-hidden mt-4 bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer">
        {/* Header với Author Info */}
        <div className="p-5 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center flex-shrink-0">
              <FaUser size={18} className="text-white" />
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
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-pink-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/20 to-pink-400/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <FaBook size={48} className="text-white/30" />
            </div>
          </div>
        )}

        {/* Footer với Stats và Actions */}
        <div className="p-5 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            {/* Stats */}
            <div className="flex items-center gap-4 text-white/70 text-xs">
              <div className="flex items-center gap-1.5">
                <FaHeart size={14} className="text-red-400" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaComment size={14} className="text-blue-400" />
                <span>{post.comments}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaEye size={14} className="text-green-400" />
                <span>{post.views}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="p-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
              >
                <FaShare size={14} />
              </button>
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
