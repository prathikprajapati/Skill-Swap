"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight, Star, TrendingUp, Award, Zap } from "lucide-react";

// Mock data for the book - using sample users
const mockBookUsers = [
  {
    id: "1",
    name: "Aarav Mehta",
    avatar: "https://images.unsplash.com/photo-1649433658557-54cf58577c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwcm9mZXNzaW9uYWwlMjBtYW58ZW58MXx8fHwxNzcwMDYzOTE3fDA&ixlib=rb-4.1.0&q=80&w=400",
    matchScore: 92,
    profession: "Software Engineer",
    offeredSkills: ["Java", "System Design", "Spring Boot"],
    wantedSkills: ["DSA", "React"],
  },
  {
    id: "2",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MDAzODM3MHww&ixlib=rb-4.1.0&q=80&w=400",
    matchScore: 88,
    profession: "Data Scientist",
    offeredSkills: ["Python", "Machine Learning", "SQL"],
    wantedSkills: ["JavaScript", "React"],
  },
  {
    id: "3",
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1656313826909-1f89d1702a81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwMDE4MDQ4fDA&ixlib=rb-4.1.0&q=80&w=400",
    matchScore: 85,
    profession: "UX Designer",
    offeredSkills: ["Photoshop", "UI/UX Design", "Figma"],
    wantedSkills: ["HTML", "CSS"],
  },
  {
    id: "4",
    name: "Lakshmi Iyer",
    avatar: "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3MDA1Njc2NXww&ixlib=rb-4.1.0&q=80&w=400",
    matchScore: 78,
    profession: "Music Teacher",
    offeredSkills: ["Guitar", "Music Theory"],
    wantedSkills: ["Piano", "Singing"],
  },
  {
    id: "5",
    name: "Rohan Gupta",
    avatar: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDA3MzA5MXww&ixlib=rb-4.1.0&q=80&w=400",
    matchScore: 82,
    profession: "Competitive Programmer",
    offeredSkills: ["DSA", "Competitive Programming"],
    wantedSkills: ["Web Development", "Node.js"],
  },
];

interface BookProps {
  className?: string;
}

export const Book: React.FC<BookProps> = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  const currentUser = mockBookUsers[currentIndex];
  
  // Mock additional data
  const userLevel = Math.floor(Math.random() * 20) + 5;
  const sessionsCompleted = Math.floor(Math.random() * 50) + 10;
  const rating = (4 + Math.random()).toFixed(1);
  const completionRate = Math.floor(85 + Math.random() * 15);

  const handleNext = () => {
    if (isFlipping) return;
    setFlipDirection("next");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % mockBookUsers.length);
      setIsFlipping(false);
    }, 600);
  };

  const handlePrev = () => {
    if (isFlipping) return;
    setFlipDirection("prev");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + mockBookUsers.length) % mockBookUsers.length);
      setIsFlipping(false);
    }, 600);
  };

  return (
    <div className={`relative w-full max-w-5xl mx-auto ${className}`}>
      {/* Book Container */}
      <div className="relative" style={{ perspective: "2000px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ 
              rotateY: flipDirection === "next" ? -90 : 90,
              opacity: 0 
            }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ 
              rotateY: flipDirection === "next" ? 90 : -90,
              opacity: 0 
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative flex w-full h-[600px] shadow-2xl"
            style={{
              transformStyle: "preserve-3d",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Left Page - Profile */}
            <div
              className="relative flex-1 p-10 overflow-hidden"
              style={{
                backgroundColor: "var(--ivory)",
                backgroundImage: `
                  linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px),
                  linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
              }}
            >
              {/* Paper texture overlay */}
              <div 
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage: "url(data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)",
                }}
              />
              
              {/* Inner shadow on left edge */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,0.1), transparent)",
                }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Avatar with Level Badge and Match Score */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-28 h-28 rounded-full overflow-hidden border-4"
                      style={{ borderColor: "var(--primary)" }}
                    >
                      <ImageWithFallback
                        src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"}
                        alt={currentUser.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Level Badge - attached to avatar */}
                    <div
                      className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full flex flex-col items-center justify-center border-4"
                      style={{
                        backgroundColor: "var(--primary)",
                        borderColor: "var(--ivory)",
                        boxShadow: "var(--neon-glow)",
                      }}
                    >
                      <span className="text-[9px] font-bold" style={{ color: "var(--background)" }}>
                        LVL
                      </span>
                      <span className="text-[18px] font-bold leading-none" style={{ color: "var(--background)" }}>
                        {userLevel}
                      </span>
                    </div>
                  </div>

                  {/* Name and Match Badge */}
                  <div className="flex-1">
                    <h2
                      className="text-[28px] mb-1"
                      style={{ color: "var(--background)", fontWeight: 700, lineHeight: 1.2 }}
                    >
                      {currentUser.name}
                    </h2>
                    <p className="text-[14px] mb-3" style={{ color: "#666" }}>
                      {currentUser.profession || "Professional"}
                    </p>
                    
                    {/* Match Score Badge */}
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                      style={{
                        backgroundColor: "var(--primary)",
                        boxShadow: "0 4px 12px rgba(139, 139, 255, 0.3)",
                      }}
                    >
                      <Zap className="w-4 h-4" style={{ color: "var(--background)" }} />
                      <span className="text-[16px] font-bold" style={{ color: "var(--background)" }}>
                        {currentUser.matchScore}% Match
                      </span>
                    </div>
                  </div>
                </div>

                {/* Credibility Stats */}
                <div
                  className="grid grid-cols-3 gap-3 p-4 rounded-xl mb-6"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-4 h-4" style={{ color: "#FFB800" }} />
                      <span className="text-[18px] font-bold" style={{ color: "var(--background)" }}>
                        {rating}
                      </span>
                    </div>
                    <p className="text-[10px]" style={{ color: "#666" }}>
                      Rating
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Award className="w-4 h-4" style={{ color: "var(--primary)" }} />
                      <span className="text-[18px] font-bold" style={{ color: "var(--background)" }}>
                        {sessionsCompleted}
                      </span>
                    </div>
                    <p className="text-[10px]" style={{ color: "#666" }}>
                      Sessions
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-4 h-4" style={{ color: "var(--success)" }} />
                      <span className="text-[18px] font-bold" style={{ color: "var(--background)" }}>
                        {completionRate}%
                      </span>
                    </div>
                    <p className="text-[10px]" style={{ color: "#666" }}>
                      Completion
                    </p>
                  </div>
                </div>

                {/* Can Teach - More prominent */}
                <div className="mb-4">
                  <p
                    className="text-[11px] mb-2 font-bold tracking-wide"
                    style={{ color: "#666" }}
                  >
                    CAN TEACH
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.offeredSkills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="group relative px-4 py-2 rounded-lg"
                        style={{
                          backgroundColor: "var(--primary)",
                          boxShadow: "0 2px 8px rgba(139, 139, 255, 0.2)",
                        }}
                      >
                        <span
                          className="text-[13px] font-semibold"
                          style={{ color: "var(--background)" }}
                        >
                          {skill}
                        </span>
                        {/* Skill level indicator */}
                        <div
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                          style={{
                            backgroundColor: "#FFB800",
                            color: "var(--background)",
                          }}
                        >
                          {Math.floor(Math.random() * 3) + 3}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Spine - Realistic book spine */}
            <div
              className="relative w-12 flex-shrink-0"
              style={{
                background: `
                  linear-gradient(
                    to right,
                    rgba(0, 0, 0, 0.3) 0%,
                    rgba(0, 0, 0, 0.15) 15%,
                    rgba(0, 0, 0, 0.05) 30%,
                    rgba(0, 0, 0, 0.02) 50%,
                    rgba(0, 0, 0, 0.05) 70%,
                    rgba(0, 0, 0, 0.15) 85%,
                    rgba(0, 0, 0, 0.3) 100%
                  )
                `,
              }}
            >
              {/* Spine texture lines */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0"
                  style={{
                    top: `${(i + 1) * 12}%`,
                    height: "1px",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  }}
                />
              ))}
            </div>

            {/* Right Page - Skills & CTA */}
            <div
              className="relative flex-1 p-10 overflow-hidden"
              style={{
                backgroundColor: "var(--ivory)",
                backgroundImage: `
                  linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px),
                  linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
              }}
            >
              {/* Paper texture overlay */}
              <div 
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage: "url(data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)",
                }}
              />
              
              {/* Inner shadow on right edge */}
              <div 
                className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none"
                style={{
                  background: "linear-gradient(to left, rgba(0,0,0,0.1), transparent)",
                }}
              />

              {/* Page corner fold effect */}
              <div
                className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%)",
                }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <h3
                  className="text-[20px] italic mb-6 text-center"
                  style={{ color: "#999", fontFamily: "Georgia, serif" }}
                >
                  "Learning Goals & Exchange"
                </h3>

                {/* Wants to Learn - MORE PROMINENT */}
                <div
                  className="mb-6 p-6 rounded-xl"
                  style={{
                    backgroundColor: "var(--primary)",
                    boxShadow: "0 8px 20px rgba(139, 139, 255, 0.3)",
                  }}
                >
                  <p
                    className="text-[12px] mb-3 font-bold tracking-wide"
                    style={{ color: "var(--background)" }}
                  >
                    🎯 WANTS TO LEARN
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.wantedSkills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-2 rounded-lg border-2"
                        style={{
                          backgroundColor: "var(--ivory)",
                          borderColor: "var(--background)",
                        }}
                      >
                        <span
                          className="text-[14px] font-semibold"
                          style={{ color: "var(--background)" }}
                        >
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exchange benefits */}
                <div className="mb-6 space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: "rgba(0,0,0,0.03)" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--success)" }}>
                      <span className="text-[14px]">✓</span>
                    </div>
                    <span className="text-[13px]" style={{ color: "#666" }}>
                      Perfect skill exchange match
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: "rgba(0,0,0,0.03)" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--primary)" }}>
                      <Zap className="w-4 h-4" style={{ color: "var(--background)" }} />
                    </div>
                    <span className="text-[13px]" style={{ color: "#666" }}>
                      Both benefit from exchange
                    </span>
                  </div>
                </div>

                {/* CTA Button with XP reward */}
                <button
                  className="mt-auto w-full py-4 rounded-xl font-bold text-[16px] transition-all transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--background)",
                    boxShadow: "0 8px 24px rgba(139, 139, 255, 0.4)",
                  }}
                >
                  <span>Send Request</span>
                  <span
                    className="px-3 py-1 rounded-full text-[13px]"
                    style={{
                      backgroundColor: "var(--background)",
                      color: "var(--primary)",
                    }}
                  >
                    +50 XP
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons with Labels */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrev}
          disabled={isFlipping}
          className="group flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-lg border-2 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "var(--glass-bg)",
            borderColor: "var(--glass-border)",
          }}
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" style={{ color: "var(--primary)" }} />
          <span className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>
            Previous Match
          </span>
        </button>

        <div className="text-center">
          <p className="text-[12px] mb-1" style={{ color: "var(--text-secondary)" }}>
            Viewing
          </p>
          <p className="text-[16px] font-bold" style={{ color: "var(--primary)" }}>
            {currentIndex + 1} / {mockBookUsers.length}
          </p>
        </div>

        <button
          onClick={handleNext}
          disabled={isFlipping}
          className="group flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-lg border-2 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "var(--glass-bg)",
            borderColor: "var(--glass-border)",
          }}
        >
          <span className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>
            Next Match
          </span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: "var(--primary)" }} />
        </button>
      </div>
    </div>
  );
};

export default Book;
