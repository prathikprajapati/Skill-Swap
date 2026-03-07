"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  Star,
  Zap,
  Target,
  Award,
  MessageCircle,
  Settings,
  X,
  Loader2,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ThemeSelector } from "@/app/components/ThemeSelector";
import { SkillChip } from "@/app/components/ui/skill-chip";
import { useAuth } from "@/app/contexts/AuthContext";
import { usersApi, type UserSkill } from "@/app/api/users";
import { gamificationApi, type GamificationData } from "@/app/api/gamification";
import { useQuery } from "@tanstack/react-query";

export function ProfilePage() {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [offeredSkills, setOfferedSkills] = useState<UserSkill[]>([]);
  const [wantedSkills, setWantedSkills] = useState<UserSkill[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch user skills
  useEffect(() => {
    const fetchData = async () => {
      try {
        setSkillsLoading(true);
        const userData = await usersApi.getMe();
        setOfferedSkills(userData.offeredSkills || []);
        setWantedSkills(userData.wantedSkills || []);
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
      } finally {
        setSkillsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch gamification data with React Query
  const { 
    data: gamificationData, 
    isLoading: gamificationLoading, 
  } = useQuery<GamificationData>({
    queryKey: ['gamificationStats'],
    queryFn: () => gamificationApi.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Calculate level from XP
  const xpCurrent = gamificationData?.xp || (user as any)?.xp || 0;
  const achievements = gamificationData?.achievements || [];
  
  const getLevelInfo = (xp: number) => {
    if (xp < 100) return { level: 1, title: "Novice", nextLevel: 100, nextLevelXP: 100 };
    if (xp < 300) return { level: 2, title: "Apprentice", nextLevel: 300, nextLevelXP: 300 };
    if (xp < 600) return { level: 3, title: "Practitioner", nextLevel: 600, nextLevelXP: 600 };
    if (xp < 1000) return { level: 4, title: "Expert", nextLevel: 1000, nextLevelXP: 1000 };
    return { level: 5, title: "Master", nextLevel: 2000, nextLevelXP: 2000 };
  };
  
  const levelInfo = gamificationData?.level || getLevelInfo(xpCurrent);
  const xpForNextLevel = levelInfo.nextLevelXP || 100;
  const progressPercentage = gamificationData?.level?.progress || Math.min((xpCurrent / xpForNextLevel) * 100, 100);

  // Combined loading state
  const isLoading = skillsLoading || gamificationLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin" style={{ color: "var(--primary)" }} />
      </div>
    );
  }

  // Get user name safely
  const userName = (user as any)?.name || "User";
  const userEmail = (user as any)?.email || "";
  const userAvatar = (user as any)?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200";

  return (
    <div className="max-w-[1200px] mx-auto pb-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[42px] mb-8"
        style={{ color: "var(--ivory)", fontWeight: 700 }}
      >
        Your Profile
      </motion.h2>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - ID Card */}
        <div className="col-span-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 rounded-2xl border-2 relative overflow-hidden"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              boxShadow: "var(--neon-glow)",
            }}
          >
            {/* Background Pattern */}
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: "var(--primary)" }}
            />

            {/* Avatar with Level Badge */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div
                className="w-full h-full rounded-full overflow-hidden border-4"
                style={{ borderColor: "var(--primary)" }}
              >
                <ImageWithFallback
                  src={(user as any)?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"}
                  alt={(user as any)?.name || "User"}
                  className="w-full h-full object-cover"
                  width={128}
                  height={128}
                />
              </div>
              {/* Level Badge - on border */}
              <div
                className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full flex flex-col items-center justify-center border-4"
                style={{
                  backgroundColor: "var(--primary)",
                  borderColor: "var(--card)",
                  boxShadow: "var(--neon-glow)",
                }}
              >
                <span
                  className="text-[9px] font-bold"
                  style={{ color: "var(--background)" }}
                >
                  LVL
                </span>
                <span
                  className="text-[16px] font-bold leading-none"
                  style={{ color: "var(--background)" }}
                >
                  {levelInfo.level}
                </span>
              </div>
            </div>

            {/* User Info */}
            <h3
              className="text-[24px] text-center mb-2"
              style={{ color: "var(--text-primary)", fontWeight: 700 }}
            >
              {userName}
            </h3>
            <p
              className="text-[14px] text-center mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              {userEmail}
            </p>

            {/* Skills Section */}
            <div className="mb-6">
              <p className="text-[12px] mb-2" style={{ color: "var(--text-secondary)" }}>
                Skills ({offeredSkills.length + wantedSkills.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {offeredSkills.slice(0, 3).map((skill) => (
                  <SkillChip key={skill.id} skill={skill.name} type="offer" size="sm" />
                ))}
                {wantedSkills.slice(0, 3).map((skill) => (
                  <SkillChip key={skill.id} skill={skill.name} type="want" size="sm" />
                ))}
                {(offeredSkills.length + wantedSkills.length) > 6 && (
                  <span 
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: "var(--secondary)", 
                      color: "var(--text-tertiary)" 
                    }}
                  >
                    +{(offeredSkills.length + wantedSkills.length) - 6} more
                  </span>
                )}
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span
                  className="text-[12px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {levelInfo.title}
                </span>
                <span
                  className="text-[12px] font-bold"
                  style={{ color: "var(--primary)" }}
                >
                  {xpCurrent} / {xpForNextLevel} XP
                </span>
              </div>
              <div
                className="w-full h-3 rounded-full overflow-hidden"
                style={{ backgroundColor: "var(--secondary)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: "var(--primary)",
                    boxShadow: "0 0 10px var(--primary)",
                  }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div
                className="p-3 rounded-xl text-center"
                style={{ backgroundColor: "var(--section-bg)" }}
              >
                <Trophy className="w-5 h-5 mx-auto mb-1" style={{ color: "var(--primary)" }} />
                <p
                  className="text-[18px] font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {achievements.filter(a => a.unlocked).length}
                </p>
                <p
                  className="text-[10px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Badges
                </p>
              </div>
              <div
                className="p-3 rounded-xl text-center"
                style={{ backgroundColor: "var(--section-bg)" }}
              >
                <MessageCircle className="w-5 h-5 mx-auto mb-1" style={{ color: "var(--accent)" }} />
                <p
                  className="text-[18px] font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {offeredSkills.length + wantedSkills.length}
                </p>
                <p
                  className="text-[10px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Matches
                </p>
              </div>
              <div
                className="p-3 rounded-xl text-center"
                style={{ backgroundColor: "var(--section-bg)" }}
              >
                <Zap className="w-5 h-5 mx-auto mb-1" style={{ color: "var(--warning)" }} />
                <p
                  className="text-[18px] font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {offeredSkills.length}
                </p>
                <p
                  className="text-[10px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Skills
                </p>
              </div>
            </div>

            {/* Advanced Settings Button */}
            <button
              onClick={() => setShowAdvancedSettings(true)}
              className="w-full p-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all hover:scale-105"
              aria-label="Open advanced settings"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Advanced Settings</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column - Achievements */}
        <div className="col-span-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 rounded-2xl border-2"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6" style={{ color: "var(--primary)" }} />
              <h2
                className="text-[28px]"
                style={{ color: "var(--text-primary)", fontWeight: 700 }}
              >
                Achievements
              </h2>
            </div>

            <p
              className="text-[14px] mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Unlock badges by completing challenges and reaching milestones
            </p>

            <div className="grid grid-cols-5 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2 border-2 transition-all ${
                      achievement.unlocked
                        ? "group-hover:scale-110"
                        : "opacity-30 grayscale"
                    }`}
                    style={{
                      backgroundColor: achievement.unlocked
                        ? "var(--primary)"
                        : "var(--secondary)",
                      borderColor: achievement.unlocked
                        ? "var(--primary-dark)"
                        : "var(--border)",
                      boxShadow: achievement.unlocked
                        ? "var(--neon-glow)"
                        : "none",
                    }}
                  >
                    {achievement.icon}
                  </div>
                  <p
                    className="text-[11px] text-center"
                    style={{
                      color: achievement.unlocked
                        ? "var(--text-primary)"
                        : "var(--text-disabled)",
                      fontWeight: achievement.unlocked ? 600 : 400,
                    }}
                  >
                    {achievement.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Advanced Settings Modal */}
      <AnimatePresence>
        {showAdvancedSettings && (
          <>
            {/* Blur Veil */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 backdrop-blur-md"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
              onClick={() => setShowAdvancedSettings(false)}
            />

            {/* Modal - 60% width, centered */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-h-[80vh] z-50 rounded-2xl border-2 overflow-hidden"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--glass-border)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="p-6 border-b-2 flex items-center justify-between"
                style={{ borderColor: "var(--border)" }}
              >
                <h2
                  className="text-[28px]"
                  style={{ color: "var(--text-primary)", fontWeight: 700 }}
                >
                  Advanced Settings
                </h2>
                <button
                  onClick={() => setShowAdvancedSettings(false)}
                  className="p-2 rounded-full transition-all hover:scale-110"
                  aria-label="Close advanced settings"
                  style={{
                    backgroundColor: "var(--secondary)",
                    color: "var(--text-primary)",
                  }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
                {/* Theme Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      <Star className="w-5 h-5" style={{ color: "var(--background)" }} />
                    </div>
                    <h3
                      className="text-[20px]"
                      style={{ color: "var(--text-primary)", fontWeight: 600 }}
                    >
                      Appearance
                    </h3>
                  </div>
                  <ThemeSelector />
                </div>

                {/* Notifications Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      <MessageCircle className="w-5 h-5" style={{ color: "var(--background)" }} />
                    </div>
                    <h3
                      className="text-[20px]"
                      style={{ color: "var(--text-primary)", fontWeight: 600 }}
                    >
                      Notifications
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 rounded-lg cursor-pointer" style={{ backgroundColor: "var(--section-bg)" }}>
                      <span style={{ color: "var(--text-primary)" }}>New match requests</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" style={{ accentColor: "var(--primary)" }} />
                    </label>
                    <label className="flex items-center justify-between p-4 rounded-lg cursor-pointer" style={{ backgroundColor: "var(--section-bg)" }}>
                      <span style={{ color: "var(--text-primary)" }}>Messages</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" style={{ accentColor: "var(--primary)" }} />
                    </label>
                    <label className="flex items-center justify-between p-4 rounded-lg cursor-pointer" style={{ backgroundColor: "var(--section-bg)" }}>
                      <span style={{ color: "var(--text-primary)" }}>Achievement unlocks</span>
                      <input type="checkbox" className="w-5 h-5" style={{ accentColor: "var(--primary)" }} />
                    </label>
                  </div>
                </div>

                {/* Privacy Section */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "var(--warning)" }}
                    >
                      <Target className="w-5 h-5" style={{ color: "var(--background)" }} />
                    </div>
                    <h3
                      className="text-[20px]"
                      style={{ color: "var(--text-primary)", fontWeight: 600 }}
                    >
                      Privacy
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 rounded-lg cursor-pointer" style={{ backgroundColor: "var(--section-bg)" }}>
                      <span style={{ color: "var(--text-primary)" }}>Profile visibility</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" style={{ accentColor: "var(--primary)" }} />
                    </label>
                    <label className="flex items-center justify-between p-4 rounded-lg cursor-pointer" style={{ backgroundColor: "var(--section-bg)" }}>
                      <span style={{ color: "var(--text-primary)" }}>Show online status</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" style={{ accentColor: "var(--primary)" }} />
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
