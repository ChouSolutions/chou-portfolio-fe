"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaHeart,
  FaComment,
  FaShare,
  FaBookmark,
  FaCode,
  FaGithub,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaTag,
  FaEye,
  FaStar,
} from "react-icons/fa";
import { MdLocationOn, MdOpenInNew } from "react-icons/md";
import BackButtonHeader from "../../components/BackButtonHeader";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiStripe,
  SiAmazon,
  SiTypescript,
  SiRedux,
  SiRedis,
  SiVuedotjs,
  SiLaravel,
  SiPython,
  SiTensorflow,
  SiFastapi,
  SiNextdotjs,
  SiGraphql,
  SiPostgresql,
  SiSolidity,
  SiWeb3Dotjs,
  SiEthereum,
} from "react-icons/si";

// Helper function để lấy icon cho công nghệ
function getTechIcon(name: string) {
  const iconMap: { [key: string]: React.ReactNode } = {
    React: <SiReact size={24} className="text-cyan-400" />,
    "Node.js": <SiNodedotjs size={24} className="text-green-500" />,
    MongoDB: <SiMongodb size={24} className="text-green-600" />,
    Stripe: <SiStripe size={24} className="text-indigo-500" />,
    AWS: <SiAmazon size={24} className="text-orange-500" />,
    TypeScript: <SiTypescript size={24} className="text-blue-500" />,
    Redux: <SiRedux size={24} className="text-purple-500" />,
    Redis: <SiRedis size={24} className="text-red-500" />,
    "Vue.js": <SiVuedotjs size={24} className="text-green-400" />,
    Laravel: <SiLaravel size={24} className="text-red-500" />,
    Python: <SiPython size={24} className="text-yellow-400" />,
    TensorFlow: <SiTensorflow size={24} className="text-orange-500" />,
    FastAPI: <SiFastapi size={24} className="text-teal-500" />,
    "Next.js": <SiNextdotjs size={24} className="text-white" />,
    GraphQL: <SiGraphql size={24} className="text-pink-500" />,
    PostgreSQL: <SiPostgresql size={24} className="text-blue-600" />,
    Solidity: <SiSolidity size={24} className="text-gray-400" />,
    "Web3.js": <SiWeb3Dotjs size={24} className="text-yellow-400" />,
    Ethereum: <SiEthereum size={24} className="text-blue-400" />,
  };

  return iconMap[name] || <FaCode size={24} className="text-white/70" />;
}

export default function ChiTietDuAnPage({
  params,
}: {
  params: { id: string };
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock data - trong thực tế sẽ fetch từ API
  const projectData = {
    id: params.id,
    title: "E-Commerce Platform",
    author: {
      name: "Bùi Văn Châu",
      role: "Senior Full-Stack Developer",
      avatar: null,
      location: "Hồ Chí Minh, Việt Nam",
    },
    date: "2023",
    description:
      "Nền tảng thương mại điện tử toàn diện được xây dựng với React và Node.js, cung cấp trải nghiệm mua sắm trực tuyến hiện đại và hiệu quả. Dự án này bao gồm hệ thống quản lý sản phẩm, giỏ hàng thông minh, tích hợp thanh toán online với nhiều phương thức, và hệ thống quản lý đơn hàng tự động. Ngoài ra, tôi đã tích hợp các tính năng như đánh giá sản phẩm, khuyến mãi động, và analytics dashboard cho admin.",
    fullDescription: `Dự án E-Commerce Platform là một giải pháp thương mại điện tử hoàn chỉnh được phát triển trong 8 tháng với team 5 người. 

**Tính năng chính:**
- Hệ thống quản lý sản phẩm với phân loại đa cấp và tìm kiếm nâng cao
- Giỏ hàng thông minh với tính năng lưu trữ và đồng bộ đa thiết bị
- Tích hợp thanh toán với Stripe, PayPal và các cổng thanh toán địa phương
- Hệ thống quản lý đơn hàng tự động với tracking real-time
- Đánh giá và bình luận sản phẩm với moderation
- Hệ thống khuyến mãi và coupon code linh hoạt
- Admin dashboard với analytics và báo cáo chi tiết
- Responsive design tối ưu cho mobile và desktop

**Công nghệ sử dụng:**
- Frontend: React 18, TypeScript, Tailwind CSS, Redux Toolkit
- Backend: Node.js, Express, MongoDB, Redis
- Payment: Stripe API, PayPal SDK
- Deployment: AWS EC2, S3, CloudFront
- CI/CD: GitHub Actions, Docker

**Thách thức và giải pháp:**
- Xử lý high traffic: Implement caching với Redis và CDN
- Bảo mật: JWT authentication, rate limiting, input validation
- Performance: Code splitting, lazy loading, image optimization
- Scalability: Microservices architecture cho các module lớn`,
    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "Stripe",
      "AWS",
      "TypeScript",
      "Redux",
      "Redis",
    ],
    technologies: [
      { name: "React", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "MongoDB", category: "Database" },
      { name: "Stripe", category: "Payment" },
      { name: "AWS", category: "Cloud" },
      { name: "TypeScript", category: "Language" },
      { name: "Redux", category: "State Management" },
      { name: "Redis", category: "Cache" },
    ],
    features: [
      "Quản lý sản phẩm đa cấp",
      "Giỏ hàng thông minh",
      "Thanh toán online",
      "Quản lý đơn hàng",
      "Đánh giá sản phẩm",
      "Admin dashboard",
      "Analytics & Reports",
      "Responsive design",
    ],
    engagement: {
      likes: 456,
      comments: 78,
      shares: 124,
      views: "5.2K",
    },
    links: {
      github: "https://github.com/example/ecommerce",
      demo: "https://ecommerce-demo.com",
      documentation: "https://docs.ecommerce-demo.com",
    },
    stats: {
      duration: "8 tháng",
      teamSize: "5 người",
      linesOfCode: "50K+",
      commits: "1.2K+",
    },
    image: true,
  };

  return (
    <div
      className="min-h-screen pb-8"
      style={{
        background:
          "linear-gradient(to bottom, #25368A, #46288B, #482689, #213989)",
      }}
    >
      {/* Header */}
      <BackButtonHeader href="/" maxWidth="narrow" />

      <div className="max-w-4xl mx-auto px-4 pt-6">
        {/* Project Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl mb-6"
        >
          {/* Author Info */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                <FaUser size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-base mb-1">
                  {projectData.author.name}
                </div>
                <div className="text-white/70 text-xs mb-1">
                  {projectData.author.role} • {projectData.date}
                </div>
                <div className="flex items-center gap-1 text-white/60 text-xs">
                  <MdLocationOn size={10} />
                  <span>{projectData.author.location}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0"
            >
              <FaBookmark
                size={18}
                className={isBookmarked ? "text-yellow-400" : "text-white/70"}
              />
            </button>
          </div>

          {/* Project Title */}
          <h1 className="text-white font-bold text-3xl mb-4">
            {projectData.title}
          </h1>

          {/* Project Description */}
          <div className="mb-4">
            <p className="text-white text-sm leading-relaxed whitespace-pre-line">
              {projectData.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {projectData.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-400/30 backdrop-blur-sm"
              >
                <FaTag size={10} className="inline mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Project Image */}
          {projectData.image && (
            <div className="relative w-full rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-pink-500/30">
              <div className="aspect-[16/10] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/40 via-blue-400/40 to-pink-400/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500/50 to-blue-500/50 flex items-center justify-center backdrop-blur-sm">
                      <FaCode size={32} className="text-white/70" />
                    </div>
                    <p className="text-white/60 text-sm">Project Screenshot</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Project Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="backdrop-blur-md rounded-2xl p-5 mb-6 bg-white/10"
        >
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            Thông tin dự án
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-white/60 text-xs mb-1">Thời gian</div>
              <div className="text-white font-semibold text-sm">
                {projectData.stats.duration}
              </div>
            </div>
            <div className="text-center">
              <div className="text-white/60 text-xs mb-1">Team size</div>
              <div className="text-white font-semibold text-sm">
                {projectData.stats.teamSize}
              </div>
            </div>
            <div className="text-center">
              <div className="text-white/60 text-xs mb-1">Lines of code</div>
              <div className="text-white font-semibold text-sm">
                {projectData.stats.linesOfCode}
              </div>
            </div>
            <div className="text-center">
              <div className="text-white/60 text-xs mb-1">Commits</div>
              <div className="text-white font-semibold text-sm">
                {projectData.stats.commits}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technologies Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="backdrop-blur-md rounded-2xl p-5 mb-6 bg-white/10"
        >
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <FaCode className="text-blue-400" />
            Công nghệ sử dụng
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {projectData.technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-lg p-3 border border-white/20 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-center justify-center mb-2">
                  {getTechIcon(tech.name)}
                </div>
                <div className="text-white font-semibold text-sm mb-1 text-center">
                  {tech.name}
                </div>
                <div className="text-white/60 text-xs text-center">
                  {tech.category}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="backdrop-blur-md rounded-2xl p-5 mb-6 bg-white/10"
        >
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <FaStar className="text-purple-400" />
            Tính năng chính
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projectData.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-white/90 text-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Full Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="backdrop-blur-md rounded-2xl p-5 mb-6 bg-white/10"
        >
          <h3 className="text-white font-bold text-lg mb-4">Chi tiết dự án</h3>
          <div className="text-white/90 text-sm leading-relaxed whitespace-pre-line">
            {projectData.fullDescription}
          </div>
        </motion.div>

        {/* Links Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="backdrop-blur-md rounded-2xl p-5 mb-6 bg-white/10"
        >
          <h3 className="text-white font-bold text-lg mb-4">Liên kết</h3>
          <div className="flex flex-wrap gap-3">
            {projectData.links.github && (
              <a
                href={projectData.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              >
                <FaGithub size={16} />
                <span className="text-sm">GitHub</span>
                <MdOpenInNew size={14} />
              </a>
            )}
            {projectData.links.demo && (
              <a
                href={projectData.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white transition-all"
              >
                <FaExternalLinkAlt size={16} />
                <span className="text-sm font-semibold">Live Demo</span>
                <MdOpenInNew size={14} />
              </a>
            )}
            {projectData.links.documentation && (
              <a
                href={projectData.links.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              >
                <FaBookmark size={16} />
                <span className="text-sm">Documentation</span>
                <MdOpenInNew size={14} />
              </a>
            )}
          </div>
        </motion.div>

        {/* Engagement Metrics Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="backdrop-blur-md rounded-2xl p-5 bg-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <FaHeart
                  size={18}
                  className={
                    isLiked ? "text-red-500 fill-red-500" : "text-red-400"
                  }
                />
                <span className="text-sm font-medium">
                  {projectData.engagement.likes}
                </span>
              </button>
              <div className="flex items-center gap-2 text-white/80">
                <FaComment size={18} className="text-blue-400" />
                <span className="text-sm font-medium">
                  {projectData.engagement.comments}
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <FaShare size={18} className="text-yellow-400" />
                <span className="text-sm font-medium">
                  {projectData.engagement.shares}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <FaEye size={16} />
              <span>{projectData.engagement.views} views</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
