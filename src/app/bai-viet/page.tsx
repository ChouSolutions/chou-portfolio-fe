import { Metadata } from "next";
import Link from "next/link";
import {
  FaBook,
  FaUser,
  FaHeart,
  FaComment,
  FaEye,
  FaShare,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import BackButtonHeader from "../../components/BackButtonHeader";
import ArticleCardClient from "./ArticleCardClient";
import { getStrapiUrl } from "../../utils/strapi";

interface CoverImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: any;
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
  cover: CoverImage[] | null;
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

// Metadata cho SEO
export const metadata: Metadata = {
  title: "Bài Viết - Chia sẻ kiến thức và kinh nghiệm về lập trình",
  description:
    "Khám phá các bài viết về lập trình, công nghệ, và best practices từ Bùi Văn Châu - Senior Full-Stack Developer",
  keywords: [
    "lập trình",
    "programming",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "web development",
    "bài viết công nghệ",
  ],
  openGraph: {
    title: "Bài Viết - Chia sẻ kiến thức và kinh nghiệm về lập trình",
    description:
      "Khám phá các bài viết về lập trình, công nghệ, và best practices",
    type: "website",
  },
};

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

// Hàm extract excerpt từ content (loại bỏ markdown và images)
function extractExcerpt(
  content: string | null,
  maxLength: number = 150
): string {
  if (!content) {
    return "Không có mô tả";
  }

  // Loại bỏ markdown images: ![alt](url)
  let text = content.replace(/!\[.*?\]\(.*?\)/g, "");
  // Loại bỏ markdown links: [text](url)
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");
  // Loại bỏ markdown headers: # ## ###
  text = text.replace(/^#{1,6}\s+/gm, "");
  // Loại bỏ markdown bold/italic: **text** *text*
  text = text.replace(/\*\*([^\*]+)\*\*/g, "$1");
  text = text.replace(/\*([^\*]+)\*/g, "$1");
  // Loại bỏ code blocks
  text = text.replace(/```[\s\S]*?```/g, "");
  text = text.replace(/`[^`]+`/g, "");
  // Loại bỏ các ký tự đặc biệt markdown
  text = text.replace(/[>_~]/g, "");
  // Loại bỏ nhiều khoảng trắng
  text = text.replace(/\s+/g, " ").trim();

  if (text.length <= maxLength) {
    return text || "Không có mô tả";
  }
  return text.substring(0, maxLength) + "...";
}

// Hàm kiểm tra content có chứa image không
function hasImage(content: string | null): boolean {
  if (!content) {
    return false;
  }
  return (
    /!\[.*?\]\(.*?\)/.test(content) ||
    /\.(jpg|jpeg|png|gif|webp)/i.test(content)
  );
}

// Hàm extract tags từ content (tìm các từ khóa phổ biến)
function extractTags(content: string | null): string[] {
  if (!content) {
    return [];
  }

  const commonTags = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Frontend",
    "Backend",
    "API",
    "Web Development",
    "Programming",
    "Best Practices",
    "Performance",
    "Optimization",
  ];

  const foundTags: string[] = [];
  const lowerContent = content.toLowerCase();

  commonTags.forEach((tag) => {
    if (lowerContent.includes(tag.toLowerCase())) {
      foundTags.push(tag);
    }
  });

  return foundTags.slice(0, 3); // Giới hạn 3 tags
}

// Fetch posts với ISR và cache tags
async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${getStrapiUrl()}/api/posts?populate=cover`, {
      next: {
        revalidate: 60, // ISR: revalidate mỗi 60 giây
        tags: ["posts"], // Tag để có thể revalidate on-demand
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data: ApiResponse = await response.json();

    // Hàm helper để lấy URL ảnh cover
    const getCoverImageUrl = (cover: CoverImage[] | null): string | null => {
      if (!cover || cover.length === 0) return null;
      const imageUrl = cover[0].url;
      // Nếu URL là relative path, thêm base URL
      if (imageUrl.startsWith("/")) {
        return getStrapiUrl(imageUrl);
      }
      return imageUrl;
    };

    const mappedPosts: Post[] = data.data
      .filter((apiPost) => apiPost.slug !== null) // Chỉ lấy các posts có slug
      .map((apiPost) => ({
        id: apiPost.id,
        slug: apiPost.slug!,
        title: apiPost.title,
        excerpt: extractExcerpt(apiPost.content),
        author: "Bùi Văn Châu",
        date: formatDate(apiPost.publishedAt || apiPost.createdAt),
        views: "0",
        likes: 0,
        comments: 0,
        tags: extractTags(apiPost.content),
        image:
          hasImage(apiPost.content) ||
          (apiPost.cover !== null && apiPost.cover.length > 0),
        coverImageUrl: getCoverImageUrl(apiPost.cover),
      }));

    return mappedPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BaiVietPage() {
  const posts = await getPosts();

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(to bottom, #25368A, #46288B, #482689, #213989)",
      }}
    >
      {/* Header */}
      <BackButtonHeader href="/" maxWidth="narrow" />

      <div className="px-4 pt-4 pb-24 max-w-4xl mx-auto">
        <div className="text-center mb-8">
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
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/70">Chưa có bài viết nào.</p>
            </div>
          ) : (
            posts.map((post, index) => (
              <ArticleCardClient key={post.id} post={post} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
