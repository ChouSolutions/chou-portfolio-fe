"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaUser,
  FaStar,
  FaBriefcase,
  FaCode,
  FaComments,
  FaLinkedin,
  FaGithub,
  FaBook,
  FaBars,
  FaTimes,
  FaGraduationCap,
  FaGlobe,
} from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiGraphql,
  SiPostgresql,
  SiDocker,
  SiTailwindcss,
  SiHasura,
  SiTypescript,
} from "react-icons/si";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdShare,
  MdOpenInNew,
} from "react-icons/md";
import { AVATAR_URL } from "../utils/avatar";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const sections = [
    { id: "gioi-thieu", label: "Giới Thiệu" },
    { id: "ky-nang", label: "Kỹ Năng" },
    { id: "kinh-nghiem", label: "Kinh Nghiệm" },
    { id: "du-an", label: "Dự Án" },
    { id: "lien-he", label: "Liên Hệ" },
  ];

  const scrollToSection = (id: string) => {
    // Set active section immediately when clicked
    setActiveSection(id);
    setIsMenuOpen(false); // Close menu on mobile

    // Find all elements with this id (there might be multiple for responsive design)
    const elements = document.querySelectorAll(`#${id}`);
    let element: Element | null = null;

    // Find the element that is actually visible (not hidden)
    for (const el of elements) {
      const htmlEl = el as HTMLElement;
      const style = window.getComputedStyle(htmlEl);
      if (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        htmlEl.offsetParent !== null
      ) {
        element = el;
        break;
      }
    }

    // Fallback to first element if no visible one found
    if (!element && elements.length > 0) {
      element = elements[0];
    }

    if (element) {
      const headerOffset = 120;
      const elementPosition = (element as HTMLElement).getBoundingClientRect()
        .top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(to bottom, #25368A, #46288B, #482689, #213989)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-white/15 via-purple-200/15 to-blue-200/15 border-b border-white/10 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-2.5 sm:py-3">
            {/* Hamburger Menu Button - Mobile Only */}
            <button
              className="md:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center justify-center gap-1.5 lg:gap-2 flex-1 flex-wrap">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-white/35 text-white shadow-md shadow-white/20"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white/90"
                  }`}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={
                    activeSection === section.id
                      ? { scale: 1.02 }
                      : { scale: 1 }
                  }
                >
                  {section.label}
                </motion.button>
              ))}
              <motion.div
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  href="/bai-viet"
                  className="px-3 lg:px-4 xl:px-5 py-2 lg:py-2.5 rounded-full text-xs lg:text-sm font-semibold whitespace-nowrap transition-all duration-300 bg-gradient-to-r from-orange-400/90 to-pink-500/90 text-white hover:from-orange-400 hover:to-pink-500 shadow-lg shadow-orange-500/30 border border-orange-300/30 inline-flex items-center gap-1.5 lg:gap-2 relative overflow-hidden"
                >
                  <FaBook className="w-3 h-3 lg:w-3.5 lg:h-3.5 relative z-10" />
                  <span className="relative z-10">Bài Viết</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-pink-300/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
              </motion.div>
            </div>

            {/* Button Bài Viết - Mobile (visible when menu closed) */}
            {!isMenuOpen && (
              <div className="md:hidden">
                <Link
                  href="/bai-viet"
                  className="p-2 rounded-lg bg-gradient-to-r from-orange-400/90 to-pink-500/90 text-white shadow-lg shadow-orange-500/30 border border-orange-300/30 inline-flex items-center justify-center active:scale-95 transition-transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaBook size={18} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/50 backdrop-blur-sm transition-opacity duration-200"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 max-w-[85vw] z-50 md:hidden transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
      >
        <div className="h-full bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl border-r border-white/20 shadow-2xl overflow-y-auto">
          <div className="p-4 sm:p-6">
            {/* Menu Header */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-white">Menu</h2>
              <button
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaTimes size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2 mb-4 sm:mb-6">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all duration-200 active:scale-[0.98] ${
                    activeSection === section.id
                      ? "bg-white/25 text-white shadow-lg"
                      : "bg-white/10 text-white/80 active:bg-white/20"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Bài Viết Button */}
            <Link
              href="/bai-viet"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-400/90 to-pink-500/90 text-white font-semibold shadow-lg shadow-orange-500/30 border border-orange-300/30 inline-flex items-center justify-center gap-2 active:scale-[0.98] transition-transform text-sm sm:text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaBook size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>Bài Viết</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-16 sm:pb-24 max-w-7xl mx-auto">
        {/* Profile Summary - Centered */}
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <motion.div
            className="w-32 h-32 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 p-1 mb-3 sm:mb-4 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-full h-full rounded-full overflow-hidden relative group">
              <Image
                src={AVATAR_URL}
                alt="Bùi Văn Châu"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 96px, 128px"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-blue-500/0 group-hover:from-purple-400/20 group-hover:to-blue-500/20 transition-all duration-300 rounded-full" />
            </div>
          </motion.div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 text-center px-2">
            Bùi Văn Châu
          </h2>
          <p className="text-orange-400 text-base sm:text-lg mb-2 text-center px-2">
            Full-Stack Web Developer
          </p>
          <div className="flex items-start gap-2 text-white/80 text-xs sm:text-sm mb-1 px-4 text-center sm:text-left">
            <FaGraduationCap
              size={14}
              className="text-yellow-400 flex-shrink-0 mt-0.5 sm:mt-0"
            />
            <span className="leading-relaxed">
              Tốt nghiệp loại Giỏi (GPA 3.6/4.0) – Đại học Đông Á, Đà Nẵng
            </span>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* About Section */}
            <div id="gioi-thieu" className="scroll-mt-24">
              <SectionCard
                iconComponent={<FaUser className="text-white" size={20} />}
                title="Giới Thiệu"
                iconBg="bg-gradient-to-br from-orange-400 to-orange-600"
                isActive={activeSection === "gioi-thieu"}
              >
                <p className="text-white text-xs sm:text-sm leading-relaxed space-y-2">
                  <span className="block">
                    Mình là{" "}
                    <span className="font-semibold text-blue-400">
                      Web Developer
                    </span>{" "}
                    mê làm những website{" "}
                    <span className="italic text-teal-300">mượt mà</span>,{" "}
                    <span className="italic text-teal-300">nhanh</span> và{" "}
                    <span className="italic text-teal-300">đẹp mắt</span>.
                  </span>
                  <span className="block">
                    Thường mình dùng{" "}
                    <span className="font-semibold text-yellow-300">
                      Next.js
                    </span>{" "}
                    và{" "}
                    <span className="font-semibold text-yellow-300">
                      NestJS
                    </span>{" "}
                    làm công nghệ chính, lo từ{" "}
                    <span className="text-purple-300 font-medium">
                      frontend
                    </span>{" "}
                    đến{" "}
                    <span className="text-purple-300 font-medium">backend</span>{" "}
                    luôn.
                  </span>
                  <span className="block">
                    Mình thích cảm giác nhìn trang web mình code{" "}
                    <span className="text-green-300 font-medium">
                      chạy mượt
                    </span>
                    ,{" "}
                    <span className="text-green-300 font-medium">
                      load nhanh
                    </span>{" "}
                    và mang lại{" "}
                    <span className="text-pink-300 font-medium">
                      trải nghiệm dễ chịu cho người dùng
                    </span>
                    . 💻✨
                  </span>
                </p>
              </SectionCard>
            </div>

            {/* Skills Section */}
            <div id="ky-nang" className="scroll-mt-24">
              <SectionCard
                iconComponent={<FaStar className="text-white" size={20} />}
                title="Kỹ Năng"
                iconBg="bg-gradient-to-br from-yellow-400 to-orange-500"
                isActive={activeSection === "ky-nang"}
              >
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                  <SkillCard
                    name="Next.js"
                    iconComponent={
                      <SiNextdotjs size={24} className="text-white" />
                    }
                  />
                  <SkillCard
                    name="React"
                    iconComponent={
                      <SiReact size={24} className="text-cyan-400" />
                    }
                  />
                  <SkillCard
                    name="NestJS"
                    iconComponent={
                      <SiNestjs size={24} className="text-red-500" />
                    }
                  />
                  <SkillCard
                    name="GraphQL"
                    iconComponent={
                      <SiGraphql size={24} className="text-pink-500" />
                    }
                  />
                  <SkillCard
                    name="PostgreSQL"
                    iconComponent={
                      <SiPostgresql size={24} className="text-blue-600" />
                    }
                  />
                  <SkillCard
                    name="Docker"
                    iconComponent={
                      <SiDocker size={24} className="text-blue-400" />
                    }
                  />
                  <SkillCard
                    name="TailwindCSS"
                    iconComponent={
                      <SiTailwindcss size={24} className="text-cyan-500" />
                    }
                  />
                  <SkillCard
                    name="Hasura"
                    iconComponent={
                      <SiHasura size={24} className="text-purple-500" />
                    }
                  />
                </div>
              </SectionCard>
            </div>

            {/* Contact Info Section */}
            <div id="lien-he" className="scroll-mt-24 hidden md:block">
              <SectionCard
                iconComponent={<FaComments className="text-white" size={20} />}
                title="Thông Tin Liên Hệ"
                iconBg="bg-gradient-to-br from-green-400 to-emerald-600"
                isActive={activeSection === "lien-he"}
              >
                <div className="space-y-3">
                  <ContactItem
                    iconComponent={
                      <MdEmail size={18} className="text-blue-400" />
                    }
                    text="buichau40@gmail.com"
                    href="mailto:buichau40@gmail.com"
                  />
                  <ContactItem
                    iconComponent={
                      <MdPhone size={18} className="text-green-400" />
                    }
                    text="0362 091 690"
                    href="tel:0362091690"
                  />
                  <ContactItem
                    iconComponent={
                      <MdLocationOn size={18} className="text-orange-400" />
                    }
                    text="Đà Nẵng"
                  />
                  <ContactItem
                    iconComponent={
                      <FaGithub size={18} className="text-gray-400" />
                    }
                    text="github.com/Chaudz"
                    href="https://github.com/Chaudz"
                  />
                </div>
              </SectionCard>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Experience Section */}
            <div id="kinh-nghiem" className="scroll-mt-24">
              <SectionCard
                iconComponent={<FaBriefcase className="text-white" size={20} />}
                title="Kinh Nghiệm"
                iconBg="bg-gradient-to-br from-blue-400 to-blue-600"
                isActive={activeSection === "kinh-nghiem"}
              >
                <div className="space-y-4">
                  {[
                    {
                      title: "Nhân viên chính thức",
                      company: "Công ty Cổ phần CRB GROUP",
                      period: "2025 – nay",
                      description:
                        "Dự án: Nhân Sinh Quán – Nền tảng xem tử vi và kết nối người dùng với cố vấn trực tiếp. Công nghệ: Next.js, NestJS, Hasura, PostgreSQL, Docker, TailwindCSS",
                      projectUrl: "https://nhansinhquan.com.vn/",
                      contributions: [
                        "Thiết kế kiến trúc Next.js (App Router) làm nền tảng frontend chính, kết nối với backend Hasura/NestJS.",
                        "Xây dựng giao diện hiện đại, responsive bằng TailwindCSS, đảm bảo tính thẩm mỹ và hiệu năng.",
                        "Tích hợp đăng nhập Google và Zalo (OAuth/OpenID), quản lý phiên và refresh token.",
                        "Phát triển tính năng gọi video trực tiếp (video call) giữa người dùng và cố vấn trong trình duyệt.",
                        "Xây dựng diễn đàn trao đổi cộng đồng, hồ sơ advisor và module bình luận.",
                        "Tối ưu hiệu năng render (ISR, caching tầng Edge) và triển khai CI/CD với Docker.",
                      ],
                    },
                    {
                      title: "Thực tập sinh",
                      company: "Công ty Naikyo",
                      period: "2024, 4 tháng",
                      description:
                        "Được đào tạo và tham gia phát triển dự án với các công nghệ: GraphQL (Hasura), React, NestJS. Làm quen quy trình làm việc nhóm, code review, và quản lý source bằng Git workflow.",
                      contributions: [],
                    },
                  ].map((exp, index) => (
                    <ExperienceItem
                      key={index}
                      title={exp.title}
                      company={exp.company}
                      period={exp.period}
                      description={exp.description}
                      projectUrl={exp.projectUrl}
                      contributions={exp.contributions}
                    />
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* Featured Projects Section */}
            <div id="du-an" className="scroll-mt-24">
              <SectionCard
                iconComponent={<FaCode className="text-white" size={20} />}
                title="Dự Án Nổi Bật"
                iconBg="bg-gradient-to-br from-purple-500 to-pink-500"
                isActive={activeSection === "du-an"}
              >
                {/* is updating */}
                <div className="space-y-3">
                  <p className="text-white text-xs sm:text-sm leading-relaxed">
                    Đang cập nhật...
                  </p>
                </div>
                {/* <div className="space-y-3">
                  {[
                    {
                      id: 1,
                      title: "E-Commerce Platform",
                      description:
                        "Nền tảng thương mại điện tử với React & Node.js",
                      tags: ["React", "Node.js", "MongoDB"],
                      tagConfigs: [
                        {
                          bg: "bg-yellow-400/20",
                          text: "text-yellow-300",
                          border: "border-yellow-400/30",
                        },
                        {
                          bg: "bg-green-400/20",
                          text: "text-green-300",
                          border: "border-green-400/30",
                        },
                        {
                          bg: "bg-blue-400/20",
                          text: "text-blue-300",
                          border: "border-blue-400/30",
                        },
                      ],
                    },
                    {
                      id: 2,
                      title: "Task Management App",
                      description:
                        "Ứng dụng quản lý công việc với real-time sync",
                      tags: ["Vue.js", "Laravel", "Redis"],
                      tagConfigs: [
                        {
                          bg: "bg-purple-400/20",
                          text: "text-purple-300",
                          border: "border-purple-400/30",
                        },
                        {
                          bg: "bg-orange-400/20",
                          text: "text-orange-300",
                          border: "border-orange-400/30",
                        },
                        {
                          bg: "bg-red-400/20",
                          text: "text-red-300",
                          border: "border-red-400/30",
                        },
                      ],
                    },
                    {
                      id: 3,
                      title: "AI Chat Bot",
                      description:
                        "Chatbot thông minh với NLP và machine learning",
                      tags: ["Python", "TensorFlow", "FastAPI"],
                      tagConfigs: [
                        {
                          bg: "bg-yellow-400/20",
                          text: "text-yellow-300",
                          border: "border-yellow-400/30",
                        },
                        {
                          bg: "bg-teal-400/20",
                          text: "text-teal-300",
                          border: "border-teal-400/30",
                        },
                        {
                          bg: "bg-pink-400/20",
                          text: "text-pink-300",
                          border: "border-pink-400/30",
                        },
                      ],
                    },
                  ].map((project, index) => (
                    <ProjectCard
                      key={index}
                      id={project.id}
                      title={project.title}
                      description={project.description}
                      tags={project.tags}
                      tagConfigs={project.tagConfigs}
                    />
                  ))}
                </div> */}
              </SectionCard>
            </div>

            <div id="lien-he" className="scroll-mt-24 md:hidden block">
              <SectionCard
                iconComponent={<FaComments className="text-white" size={20} />}
                title="Thông Tin Liên Hệ"
                iconBg="bg-gradient-to-br from-green-400 to-emerald-600"
                isActive={activeSection === "lien-he"}
              >
                <div className="space-y-3">
                  <ContactItem
                    iconComponent={
                      <MdEmail size={18} className="text-blue-400" />
                    }
                    text="buichau40@gmail.com"
                    href="mailto:buichau40@gmail.com"
                  />
                  <ContactItem
                    iconComponent={
                      <MdPhone size={18} className="text-green-400" />
                    }
                    text="0362 091 690"
                    href="tel:0362091690"
                  />
                  <ContactItem
                    iconComponent={
                      <MdLocationOn size={18} className="text-orange-400" />
                    }
                    text="Đà Nẵng"
                  />
                  <ContactItem
                    iconComponent={
                      <FaGithub size={18} className="text-gray-400" />
                    }
                    text="github.com/Chaudz"
                    href="https://github.com/Chaudz"
                  />
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      {/* <motion.div
        className="fixed right-6 bottom-6 flex flex-col gap-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <FloatingButton
          color="bg-green-500"
          iconComponent={<MdPhone size={24} />}
        />
        <FloatingButton
          color="bg-gradient-to-br from-purple-500 to-blue-500"
          iconComponent={<MdEmail size={24} />}
        />
        <FloatingButton
          color="bg-gradient-to-br from-orange-400 to-yellow-500"
          iconComponent={<MdShare size={24} />}
        />
      </motion.div> */}
    </motion.div>
  );
}

function SectionCard({
  iconComponent,
  title,
  children,
  iconBg,
  isActive = false,
}: {
  iconComponent: React.ReactNode;
  title: string;
  children: React.ReactNode;
  iconBg?: string;
  isActive?: boolean;
}) {
  return (
    <div
      className={`backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-3 sm:mb-4 border transition-all duration-200 ${
        isActive
          ? "bg-white/20 border-white/40 shadow-2xl shadow-white/20"
          : "bg-white/10 border-white/20"
      }`}
    >
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-transform duration-200 flex-shrink-0 ${
            iconBg || "bg-gradient-to-br from-orange-400 to-orange-600"
          } ${isActive ? "scale-110" : ""}`}
        >
          {iconComponent}
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function SkillCard({
  name,
  iconComponent,
}: {
  name: string;
  iconComponent: React.ReactNode;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 transition-transform duration-200 active:scale-[0.98]">
      <div className="mb-1.5 sm:mb-2 flex items-center justify-center">
        {iconComponent}
      </div>
      <div className="text-white font-semibold text-xs sm:text-sm text-center leading-tight">
        {name}
      </div>
    </div>
  );
}

function ExperienceItem({
  title,
  company,
  period,
  description,
  projectUrl,
  contributions = [],
}: {
  title: string;
  company: string;
  period: string;
  description: string;
  projectUrl?: string;
  contributions?: string[];
}) {
  return (
    <div className="flex gap-2 sm:gap-3">
      <div className="w-0.5 sm:w-1 bg-orange-400 rounded-full flex-shrink-0"></div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-bold text-xs sm:text-sm mb-0.5 sm:mb-1">
          {title}
        </div>
        <div className="text-blue-300 text-xs mb-0.5 sm:mb-1">{company}</div>
        <div className="text-gray-300 text-xs mb-1.5 sm:mb-2">{period}</div>
        <div className="text-white text-xs leading-relaxed mb-1.5 sm:mb-2">
          {description}
        </div>
        {projectUrl && (
          <div className="mb-1.5 sm:mb-2">
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-xs underline break-all inline-flex items-center gap-1"
            >
              <FaGlobe size={12} />
              <span>Truy cập website: {projectUrl}</span>
              <MdOpenInNew size={12} />
            </a>
          </div>
        )}
        {contributions.length > 0 && (
          <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-1.5">
            <div className="text-white/90 font-semibold text-xs mb-1 sm:mb-1.5">
              Đóng góp nổi bật:
            </div>
            <ul className="list-disc list-inside space-y-0.5 sm:space-y-1">
              {contributions.map((contribution, index) => (
                <li
                  key={index}
                  className="text-white/80 text-xs leading-relaxed"
                >
                  {contribution}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({
  id,
  title,
  description,
  tags,
  tagConfigs,
}: {
  id: number;
  title: string;
  description: string;
  tags: string[];
  tagConfigs: Array<{ bg: string; text: string; border: string }>;
}) {
  return (
    <Link href={`/du-an/${id}`}>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl mt-3 sm:mt-4 p-3 sm:p-4 border border-white/10 relative transition-transform duration-200 active:scale-[0.98] hover:bg-white/15 cursor-pointer">
        <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-white/70 hover:text-white active:scale-95 transition-transform">
          <MdOpenInNew size={14} className="sm:w-4 sm:h-4" />
        </div>
        <div className="text-white font-bold text-xs sm:text-sm mb-1.5 sm:mb-2 pr-6 sm:pr-8">
          {title}
        </div>
        <div className="text-white text-xs mb-2 sm:mb-3 leading-relaxed">
          {description}
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {tags.map((tag, tagIndex) => {
            const config = tagConfigs[tagIndex];
            return (
              <span
                key={tagIndex}
                className={`${config.bg} ${config.text} ${config.border} backdrop-blur-sm border text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
}

function ContactItem({
  iconComponent,
  text,
  href,
}: {
  iconComponent: React.ReactNode;
  text: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
        {iconComponent}
      </div>
      <span className="text-white text-xs sm:text-sm break-words">{text}</span>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-opacity hover:opacity-80 active:opacity-70"
      >
        {content}
      </a>
    );
  }

  return content;
}

function FloatingButton({
  color,
  iconComponent,
}: {
  color: string;
  iconComponent: React.ReactNode;
}) {
  return (
    <motion.button
      className={`${color} w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg`}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {iconComponent}
    </motion.button>
  );
}
