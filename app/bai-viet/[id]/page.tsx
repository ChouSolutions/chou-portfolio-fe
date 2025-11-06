"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaUser,
  FaHeart,
  FaComment,
  FaShare,
  FaBookmark,
  FaReply,
  FaImage,
  FaSmile,
  FaAt,
  FaPaperPlane,
  FaChevronDown,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

export default function ChiTietBaiVietPage({
  params,
}: {
  params: { id: string };
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showMoreComments, setShowMoreComments] = useState(false);

  // Mock data - trong thực tế sẽ fetch từ API
  const postData = {
    id: params.id,
    author: {
      name: "Alexandra Chen",
      role: "Digital Artist",
      avatar: null,
      location: "San Francisco, CA",
    },
    timeAgo: "2 hours ago",
    content: {
      text: "✨ Just finished this new digital masterpiece! What do you think? ✨\n\nThis artwork represents the fusion of technology and nature, exploring how digital landscapes can evoke the same emotions as natural ones. The neon colors symbolize the energy of innovation while the geometric shapes represent structure and precision. The creative process took me 3 weeks to complete, experimenting with different lighting techniques and color grading. I'm particularly proud of how the holographic elements turned out!",
      hashtags: [
        "#DigitalArt",
        "#FuturisticDesign",
        "#NeonArt",
        "#CreativeProcess",
        "#Cyberpunk",
      ],
      image: true,
    },
    engagement: {
      likes: 1247,
      comments: 89,
      shares: 156,
      views: "12.8K",
    },
    likedBy: {
      users: ["marcus_designs", "sarah_kim"],
      others: 1245,
      avatars: [
        { name: "User 1", avatar: null },
        { name: "User 2", avatar: null },
        { name: "User 3", avatar: null },
        { name: "User 4", avatar: null },
      ],
    },
    comments: [
      {
        id: 1,
        author: {
          name: "Marcus Johnson",
          avatar: null,
        },
        timeAgo: "1h ago",
        content:
          "Absolutely stunning work! The color composition is incredible 🔥 This reminds me of Blade Runner aesthetics but with your unique twist. How long did this take you?",
        likes: 47,
      },
      {
        id: 2,
        author: {
          name: "Sarah Kim",
          avatar: null,
        },
        timeAgo: "2h ago",
        content:
          "This is giving me major cyberpunk vibes! Love the geometric elements ✨ The way you've blended the organic and digital is phenomenal!",
        likes: 23,
      },
      {
        id: 3,
        author: {
          name: "David Rodriguez",
          avatar: null,
        },
        timeAgo: "3h ago",
        content:
          "What software did you use for this? The lighting effects are phenomenal! 🤩 Would love to see a time-lapse of your process.",
        likes: 15,
      },
    ],
    moreCommentsCount: 86,
  };

  const handlePostComment = () => {
    if (commentText.trim()) {
      // Handle post comment logic here
      console.log("Posting comment:", commentText);
      setCommentText("");
    }
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
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-white/15 via-purple-200/15 to-blue-200/15 border-b border-white/10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-3">
          <Link href="/bai-viet" className="inline-block">
            <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <FaArrowLeft size={18} />
              <span className="text-sm font-medium">Quay lại</span>
            </button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl  mx-auto px-4 pt-6">
        {/* Post Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className=" rounded-2xl mb-6"
        >
          {/* Author Info */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                <FaUser size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-base mb-1">
                  {postData.author.name}
                </div>
                <div className="text-white/70 text-xs mb-1">
                  {postData.author.role} • {postData.timeAgo}
                </div>
                <div className="flex items-center gap-1 text-white/60 text-xs">
                  <MdLocationOn size={10} />
                  <span>{postData.author.location}</span>
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

          {/* Post Content */}
          <div className="mb-4">
            <p className="text-white text-sm leading-relaxed whitespace-pre-line">
              {postData.content.text}
            </p>
          </div>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {postData.content.hashtags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-400/30 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Artwork Image */}
          {postData.content.image && (
            <div className="relative w-full rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-pink-500/30">
              <div className="aspect-[16/10] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/40 via-blue-400/40 to-pink-400/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500/50 to-blue-500/50 flex items-center justify-center backdrop-blur-sm">
                      <FaImage size={32} className="text-white/70" />
                    </div>
                    <p className="text-white/60 text-sm">Digital Artwork</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Engagement Metrics Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="backdrop-blur-md rounded-2xl p-5 mb-6 bg-white/10"
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
                  {postData.engagement.likes}
                </span>
              </button>
              <div className="flex items-center gap-2 text-white/80">
                <FaComment size={18} className="text-blue-400" />
                <span className="text-sm font-medium">
                  {postData.engagement.comments}
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <FaShare size={18} className="text-yellow-400" />
                <span className="text-sm font-medium">
                  {postData.engagement.shares}
                </span>
              </div>
            </div>
            <div className="text-white/70 text-sm">
              {postData.engagement.views} views
            </div>
          </div>

          {/* Liked By */}
          <div className="pt-4">
            <p className="text-white/70 text-xs mb-3">
              Liked by{" "}
              <span className="text-white font-medium">
                {postData.likedBy.users[0]}
              </span>
              ,{" "}
              <span className="text-white font-medium">
                {postData.likedBy.users[1]}
              </span>{" "}
              and {postData.likedBy.others.toLocaleString()} others
            </p>
            <div className="flex items-center gap-2">
              {postData.likedBy.avatars.map((user, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center"
                >
                  <FaUser size={12} className="text-white" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-medium">+99</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="backdrop-blur-md rounded-2xl p-5 mb-6 bg-white/10"
        >
          {/* Comments Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <FaComment size={18} className="text-blue-400" />
              <h3 className="text-white font-bold text-base">
                Comments ({postData.engagement.comments})
              </h3>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors text-sm">
              <span>Latest</span>
              <FaChevronDown size={12} />
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-5">
            {(showMoreComments
              ? postData.comments
              : postData.comments.slice(0, 3)
            ).map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <FaUser size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-semibold text-sm">
                      {comment.author.name}
                    </span>
                    <span className="text-white/60 text-xs">
                      {comment.timeAgo}
                    </span>
                  </div>
                  <p className="text-white/90 text-sm mb-2 leading-relaxed">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-white/70 hover:text-red-400 transition-colors">
                      <FaHeart size={14} />
                      <span className="text-xs">{comment.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-xs">
                      <FaReply size={12} />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Comments */}
          {!showMoreComments && postData.moreCommentsCount > 0 && (
            <button
              onClick={() => setShowMoreComments(true)}
              className="mt-5 w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <span>View {postData.moreCommentsCount} more comments</span>
              <FaChevronDown size={12} />
            </button>
          )}
        </motion.div>

        {/* Comment Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="backdrop-blur-md rounded-2xl p-5 bg-white/10"
        >
          <div className="flex gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center flex-shrink-0">
              <FaUser size={16} className="text-white" />
            </div>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-sm"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handlePostComment();
                }
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors">
                <FaImage size={16} />
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors">
                <FaSmile size={16} />
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors">
                <FaAt size={16} />
              </button>
            </div>
            <button
              onClick={handlePostComment}
              disabled={!commentText.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
            >
              <span>Post</span>
              <FaPaperPlane size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
