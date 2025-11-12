import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { FaCalendarAlt } from "react-icons/fa";
import BackButtonHeader from "../../../components/BackButtonHeader";
import MarkdownImage from "./MarkdownImage";
import { AVATAR_URL } from "../../../utils/avatar";
import { getStrapiUrl, isProductionDomain } from "../../../utils/strapi";

interface CoverImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ApiPost {
  id: number;
  documentId: string;
  title: string;
  slug: string | null;
  content: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: CoverImage | CoverImage[] | null;
}

interface ApiResponse {
  data: ApiPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Hàm format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return diffInMinutes <= 0 ? "Vừa xong" : `${diffInMinutes} phút trước`;
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  } else if (diffInDays < 7) {
    return `${diffInDays} ngày trước`;
  } else {
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} tuần trước`;
  }
}

// Fetch post với ISR và cache tags
async function getPost(slug: string): Promise<ApiPost | null> {
  try {
    const response = await fetch(
      `${getStrapiUrl()}/api/posts?filters[slug][$eq]=${slug}&populate=*`,
      {
        next: {
          revalidate: 60, // ISR: revalidate mỗi 60 giây
          tags: ["posts", `post-${slug}`], // Tags để có thể revalidate on-demand
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data: ApiResponse = await response.json();

    if (data.data && data.data.length > 0) {
      return data.data[0];
    }

    return null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// Generate static params cho SSG
export async function generateStaticParams() {
  try {
    const response = await fetch(`${getStrapiUrl()}/api/posts?fields=slug`, {
      next: {
        revalidate: 3600, // Revalidate danh sách slugs mỗi giờ
        tags: ["posts"], // Tag để có thể revalidate on-demand
      },
    });

    if (!response.ok) {
      return [];
    }

    const data: ApiResponse = await response.json();

    return data.data
      .filter((post) => post.slug !== null)
      .map((post) => ({
        slug: post.slug!,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata cho SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return {
      title: "Bài viết không tìm thấy",
    };
  }

  const excerpt = post.content
    ? post.content
        .replace(/!\[.*?\]\(.*?\)/g, "")
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/\*\*([^\*]+)\*\*/g, "$1")
        .replace(/```[\s\S]*?```/g, "")
        .substring(0, 160)
        .trim()
    : "Bài viết về lập trình và công nghệ";

  // Helper function để normalize URL (xử lý cả localhost và relative paths)
  const normalizeUrl = (url: string): string => {
    // Nếu URL chứa localhost, thay thế toàn bộ domain bằng base URL
    if (url.includes("localhost:1337")) {
      const path = url.replace(/^https?:\/\/[^\/]+/, "");
      return getStrapiUrl(path);
    }
    // Nếu URL là relative path, thêm base URL
    if (url.startsWith("/")) {
      return getStrapiUrl(url);
    }
    // Nếu URL đã là full URL với domain production (từ env), giữ nguyên
    if (url.startsWith("http://") || url.startsWith("https://")) {
      if (isProductionDomain(url)) {
        return url;
      }
      // Nếu là domain khác, giữ nguyên
      return url;
    }
    // Fallback: thêm base URL
    return getStrapiUrl(`/${url}`);
  };

  // Helper function để lấy cover image URL
  const getCoverImageUrl = (
    cover: CoverImage | CoverImage[] | null
  ): string | undefined => {
    if (!cover) return undefined;

    const coverImage = Array.isArray(cover) ? cover[0] : cover;
    if (!coverImage || !coverImage.url) return undefined;

    // Ưu tiên sử dụng formats.medium hoặc formats.large
    let imageUrl: string | null = null;
    if (coverImage.formats) {
      if (coverImage.formats.medium?.url) {
        imageUrl = normalizeUrl(coverImage.formats.medium.url);
      } else if (coverImage.formats.large?.url) {
        imageUrl = normalizeUrl(coverImage.formats.large.url);
      } else if (coverImage.formats.small?.url) {
        imageUrl = normalizeUrl(coverImage.formats.small.url);
      }
    }

    if (!imageUrl) {
      imageUrl = normalizeUrl(coverImage.url);
    }

    return imageUrl;
  };

  const coverImageUrl = getCoverImageUrl(post.cover);

  return {
    title: `${post.title} - Bài Viết`,
    description: excerpt || "Bài viết về lập trình và công nghệ",
    keywords: ["lập trình", "programming", "React", "Next.js", "TypeScript"],
    openGraph: {
      title: post.title,
      description: excerpt || "Bài viết về lập trình và công nghệ",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: coverImageUrl ? [coverImageUrl] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: excerpt || "Bài viết về lập trình và công nghệ",
      images: coverImageUrl ? [coverImageUrl] : undefined,
    },
  };
}

// Component render markdown sử dụng react-markdown
function MarkdownRenderer({ content }: { content: string | null }) {
  if (!content) {
    return (
      <div className="text-white/70 text-center py-8">
        <p>Nội dung bài viết đang được cập nhật...</p>
      </div>
    );
  }

  return (
    <div className="markdown-content prose prose-invert max-w-none">
      <ReactMarkdown
        components={{
          // Headers
          h1: ({ children }) => (
            <h1 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl mt-4 sm:mt-6 lg:mt-10 mb-2 sm:mb-3 lg:mb-5">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-white font-bold text-lg sm:text-xl lg:text-2xl mt-4 sm:mt-6 lg:mt-8 mb-2 sm:mb-3 lg:mb-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl mt-3 sm:mt-4 lg:mt-6 mb-1.5 sm:mb-2 lg:mb-3">
              {children}
            </h3>
          ),
          // Paragraphs
          p: ({ children }) => (
            <p className="text-white/90 leading-relaxed mb-2.5 sm:mb-3 lg:mb-4 text-xs sm:text-sm lg:text-base">
              {children}
            </p>
          ),
          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline break-words text-xs sm:text-sm lg:text-base"
            >
              {children}
            </a>
          ),
          // Images - sử dụng Client Component để xử lý event handlers
          img: ({ src, alt }) => {
            if (!src) {
              return null;
            }

            const srcString = typeof src === "string" ? src : String(src);
            return <MarkdownImage src={srcString} alt={alt} />;
          },
          // Code blocks
          code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match;

            if (isInline) {
              return (
                <code
                  className="bg-white/10 px-1 sm:px-1.5 py-0.5 rounded text-[10px] sm:text-xs lg:text-sm font-mono text-orange-300"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <pre className="bg-white/10 rounded-lg p-2.5 sm:p-3 lg:p-4 my-2.5 sm:my-3 lg:my-4 overflow-x-auto">
                <code
                  className="text-white/90 text-[10px] sm:text-xs lg:text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              </pre>
            );
          },
          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-purple-400 pl-2.5 sm:pl-3 lg:pl-4 my-2.5 sm:my-3 lg:my-4 italic text-white/80 text-xs sm:text-sm lg:text-base">
              {children}
            </blockquote>
          ),
          // Horizontal rules
          hr: () => <hr className="my-3 sm:my-4 lg:my-6 border-white/20" />,
          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-white/90 mb-2.5 sm:mb-3 lg:mb-4 space-y-1 sm:space-y-1.5 lg:space-y-2 text-xs sm:text-sm lg:text-base">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-white/90 mb-2.5 sm:mb-3 lg:mb-4 space-y-1 sm:space-y-1.5 lg:space-y-2 text-xs sm:text-sm lg:text-base">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="text-white/90">{children}</li>,
          // Strong and emphasis
          strong: ({ children }) => (
            <strong className="font-bold text-white">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default async function ChiTietBaiVietPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const timeAgo = formatDate(post.publishedAt || post.createdAt);

  return (
    <div
      className="min-h-screen pb-8"
      style={{
        background:
          "linear-gradient(to bottom, #25368A, #46288B, #482689, #213989)",
      }}
    >
      {/* Header */}
      <BackButtonHeader href="/bai-viet" maxWidth="narrow" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 lg:pt-6 pb-6 sm:pb-8">
        {/* Post Header Card */}
        <div className="rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
          {/* Author Info */}
          <div className="flex items-start justify-between mb-3 sm:mb-4 lg:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 p-0.5 flex-shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src={AVATAR_URL}
                    alt="Bùi Văn Châu"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 36px, (max-width: 1024px) 40px, 48px"
                    unoptimized
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-xs sm:text-sm lg:text-base mb-0.5 sm:mb-1 truncate">
                  Bùi Văn Châu
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 text-white/70 text-[10px] sm:text-xs">
                  <FaCalendarAlt
                    size={9}
                    className="sm:w-[10px] sm:h-[10px] flex-shrink-0"
                  />
                  <span className="truncate">{timeAgo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-4 lg:mb-6 leading-tight">
            {post.title}
          </h1>
        </div>

        {/* Content Card */}
        <div className="rounded-xl sm:rounded-2xl mb-3 sm:mb-4 lg:mb-6">
          <MarkdownRenderer content={post.content} />
        </div>
      </div>
    </div>
  );
}
