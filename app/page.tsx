"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "react-icons/fa";
import { SiReact, SiNodedotjs, SiPython, SiAmazon } from "react-icons/si";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdShare,
  MdOpenInNew,
} from "react-icons/md";

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

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
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
            <div className="hidden md:flex items-center justify-center gap-2 flex-1">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
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
                  className="px-4 lg:px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 bg-gradient-to-r from-orange-400/90 to-pink-500/90 text-white hover:from-orange-400 hover:to-pink-500 shadow-lg shadow-orange-500/30 border border-orange-300/30 inline-flex items-center gap-2 relative overflow-hidden"
                >
                  <FaBook className="w-3.5 h-3.5 relative z-10" />
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
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 md:hidden transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
      >
        <div className="h-full bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl border-r border-white/20 shadow-2xl overflow-y-auto">
          <div className="p-6">
            {/* Menu Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2 mb-6">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 active:scale-[0.98] ${
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
              className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-orange-400/90 to-pink-500/90 text-white font-semibold shadow-lg shadow-orange-500/30 border border-orange-300/30 inline-flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaBook size={18} />
              <span>Bài Viết</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 pt-6 pb-24 max-w-7xl mx-auto">
        {/* Profile Summary - Centered */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 p-1 mb-4">
            <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-purple-200 to-blue-300 flex items-center justify-center">
                <FaUser size={48} className="text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Bùi Văn Châu</h2>
          <p className="text-orange-400 text-lg mb-6">
            Senior Full-Stack Developer
          </p>

          <div className="flex gap-8 mb-8">
            {[
              { value: "5+", label: "Năm KN" },
              { value: "20+", label: "Dự Án" },
              { value: "15+", label: "Khách Hàng" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* About Section */}
            <div id="gioi-thieu" className="scroll-mt-24">
              <SectionCard
                iconComponent={<FaUser className="text-white" size={20} />}
                title="Giới Thiệu"
                iconBg="bg-gradient-to-br from-orange-400 to-orange-600"
                isActive={activeSection === "gioi-thieu"}
              >
                <p className="text-white text-sm leading-relaxed">
                  Tôi là một Full-Stack Developer với hơn 5 năm kinh nghiệm
                  trong việc phát triển ứng dụng web và mobile. Đam mê công nghệ
                  và luôn học hỏi những xu hướng mới nhất. Chuyên môn về React,
                  Node.js, Python và các công nghệ cloud hiện đại.
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
                <div className="grid grid-cols-2 gap-3">
                  <SkillCard
                    name="React"
                    level="Expert"
                    iconComponent={
                      <SiReact size={24} className="text-cyan-400" />
                    }
                  />
                  <SkillCard
                    name="Node.js"
                    level="Expert"
                    iconComponent={
                      <SiNodedotjs size={24} className="text-green-500" />
                    }
                  />
                  <SkillCard
                    name="Python"
                    level="Advanced"
                    iconComponent={
                      <SiPython size={24} className="text-yellow-400" />
                    }
                  />
                  <SkillCard
                    name="AWS"
                    level="Advanced"
                    iconComponent={
                      <SiAmazon size={24} className="text-orange-500" />
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
                    text="minh.nguyen@email.com"
                  />
                  <ContactItem
                    iconComponent={
                      <MdPhone size={18} className="text-green-400" />
                    }
                    text="+84 123 456 789"
                  />
                  <ContactItem
                    iconComponent={
                      <MdLocationOn size={18} className="text-orange-400" />
                    }
                    text="Hồ Chí Minh, Việt Nam"
                  />
                  <ContactItem
                    iconComponent={
                      <FaLinkedin size={18} className="text-blue-400" />
                    }
                    text="linkedin.com/in/minhnguyen"
                  />
                  <ContactItem
                    iconComponent={
                      <FaGithub size={18} className="text-gray-400" />
                    }
                    text="github.com/minhnguyen"
                  />
                </div>
              </SectionCard>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
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
                      title: "Senior Full-Stack Developer",
                      company: "TechViet Solutions",
                      period: "2021 - Hiện tại",
                      description:
                        "Phát triển và duy trì các ứng dụng web quy mô lớn, quản lý team 6 developers.",
                    },
                    {
                      title: "Full-Stack Developer",
                      company: "Digital Innovation Co.",
                      period: "2019 - 2021",
                      description:
                        "Xây dựng các giải pháp e-commerce và hệ thống quản lý nội dung.",
                    },
                    {
                      title: "Junior Developer",
                      company: "StartUp Hub",
                      period: "2018 - 2019",
                      description:
                        "Tham gia phát triển MVP cho các startup công nghệ.",
                    },
                  ].map((exp, index) => (
                    <ExperienceItem
                      key={index}
                      title={exp.title}
                      company={exp.company}
                      period={exp.period}
                      description={exp.description}
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
                <div className="space-y-3">
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
                </div>
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
                    text="minh.nguyen@email.com"
                  />
                  <ContactItem
                    iconComponent={
                      <MdPhone size={18} className="text-green-400" />
                    }
                    text="+84 123 456 789"
                  />
                  <ContactItem
                    iconComponent={
                      <MdLocationOn size={18} className="text-orange-400" />
                    }
                    text="Hồ Chí Minh, Việt Nam"
                  />
                  <ContactItem
                    iconComponent={
                      <FaLinkedin size={18} className="text-blue-400" />
                    }
                    text="linkedin.com/in/minhnguyen"
                  />
                  <ContactItem
                    iconComponent={
                      <FaGithub size={18} className="text-gray-400" />
                    }
                    text="github.com/minhnguyen"
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
      className={`backdrop-blur-md rounded-2xl p-5 mb-4 border transition-all duration-200 ${
        isActive
          ? "bg-white/20 border-white/40 shadow-2xl shadow-white/20"
          : "bg-white/10 border-white/20"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 ${
            iconBg || "bg-gradient-to-br from-orange-400 to-orange-600"
          } ${isActive ? "scale-110" : ""}`}
        >
          {iconComponent}
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function SkillCard({
  name,
  level,
  iconComponent,
}: {
  name: string;
  level: string;
  iconComponent: React.ReactNode;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 transition-transform duration-200 active:scale-[0.98]">
      <div className="mb-2 flex items-center justify-center">
        {iconComponent}
      </div>
      <div className="text-white font-semibold text-sm">{name}</div>
      <div className="text-gray-300 text-xs">{level}</div>
    </div>
  );
}

function ExperienceItem({
  title,
  company,
  period,
  description,
}: {
  title: string;
  company: string;
  period: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="w-1 bg-orange-400 rounded-full"></div>
      <div className="flex-1">
        <div className="text-white font-bold text-sm mb-1">{title}</div>
        <div className="text-blue-300 text-xs mb-1">{company}</div>
        <div className="text-gray-300 text-xs mb-2">{period}</div>
        <div className="text-white text-xs leading-relaxed">{description}</div>
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
      <div className="bg-white/10 backdrop-blur-sm rounded-xl mt-4 p-4 border border-white/10 relative transition-transform duration-200 active:scale-[0.98] hover:bg-white/15 cursor-pointer">
        <div className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-white/70 hover:text-white active:scale-95 transition-transform">
          <MdOpenInNew size={16} />
        </div>
        <div className="text-white font-bold text-sm mb-2 pr-8">{title}</div>
        <div className="text-white text-xs mb-3 leading-relaxed">
          {description}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, tagIndex) => {
            const config = tagConfigs[tagIndex];
            return (
              <span
                key={tagIndex}
                className={`${config.bg} ${config.text} ${config.border} backdrop-blur-sm border text-xs font-bold px-2 py-1 rounded-lg`}
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
}: {
  iconComponent: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
        {iconComponent}
      </div>
      <span className="text-white text-sm">{text}</span>
    </div>
  );
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
