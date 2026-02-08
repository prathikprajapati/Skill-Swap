import { useState, useMemo } from "react";
import { Button } from "@/app/components/ui/skill-swap-button";
import { SkillChip } from "@/app/components/ui/skill-chip";
import { currentUser, mockMatches } from "@/app/data/mockData";
import { useTheme, themes, type ThemeType } from "@/app/contexts/ThemeContext";
import { 
  X, Award, Target, Plus, CheckCircle, Sparkles, 
  Zap, Heart, Star, Trophy, Flame, TrendingUp, 
  Camera, Edit3, Share2, MessageCircle, Moon, Sun, 
  Cloud, Palette, Sparkle, Rainbow, Ghost, Coffee,
  Check
} from "lucide-react";
import MagicBento from "@/app/components/ui/MagicBento";

// Gamification levels
const getLevelInfo = (xp: number) => {
  if (xp < 100) return { level: 1, title: "Novice", nextLevel: 100, color: "#64748b" };
  if (xp < 300) return { level: 2, title: "Apprentice", nextLevel: 300, color: "#10b981" };
  if (xp < 600) return { level: 3, title: "Practitioner", nextLevel: 600, color: "#3b82f6" };
  if (xp < 1000) return { level: 4, title: "Expert", nextLevel: 1000, color: "#8b5cf6" };
  return { level: 5, title: "Master", nextLevel: 2000, color: "#f59e0b" };
};

// Achievements data
const achievements = [
  { id: 1, icon: Flame, title: "7-Day Streak", desc: "Active for 7 days straight", unlocked: true, color: "#f97316" },
  { id: 2, icon: Heart, title: "First Match", desc: "Found your first skill partner", unlocked: true, color: "#ec4899" },
  { id: 3, icon: Trophy, title: "Skill Master", desc: "Taught 5 skills to others", unlocked: false, color: "#eab308" },
  { id: 4, icon: Star, title: "Top Rated", desc: "Maintained 4.8+ rating", unlocked: true, color: "#6366f1" },
  { id: 5, icon: Zap, title: "Quick Learner", desc: "Learned 3 skills in a month", unlocked: false, color: "#06b6d4" },
  { id: 6, icon: CheckCircle, title: "Trusted", desc: "Verified profile completed", unlocked: true, color: "#10b981" },
];

// Theme cards data with icons
const allThemes: { id: ThemeType; icon: typeof Sun; bg: string; isDark: boolean }[] = [
  { id: "sapphire-dreams", icon: Sparkle, bg: "from-blue-900 to-indigo-950", isDark: true },
  { id: "deep-space", icon: Moon, bg: "from-slate-900 to-rose-950", isDark: true },
  { id: "lavender-mist", icon: Palette, bg: "from-indigo-200 to-purple-200", isDark: false },
  { id: "graphite-mint", icon: Cloud, bg: "from-teal-800 to-emerald-900", isDark: true },
  { id: "forest-mist", icon: Sun, bg: "from-emerald-900 to-teal-800", isDark: true },
  { id: "royal-gold", icon: Award, bg: "from-amber-900 to-yellow-950", isDark: true },
  { id: "cosmic-purple", icon: Sparkles, bg: "from-purple-950 to-fuchsia-950", isDark: true },
  { id: "warm-burgundy", icon: Heart, bg: "from-rose-100 to-amber-100", isDark: false },
  { id: "olive-garden", icon: Coffee, bg: "from-lime-800 to-green-900", isDark: true },
];

export function ProfilePage() {
  const { theme: currentTheme, setTheme } = useTheme();
  const [offeredSkills, setOfferedSkills] = useState(currentUser.offeredSkills);
  const [wantedSkills, setWantedSkills] = useState(currentUser.wantedSkills);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillType, setNewSkillType] = useState<"offer" | "want">("offer");
  const [newSkillLevel, setNewSkillLevel] = useState("beginner");
  const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<"teaching" | "learning">("teaching");
  const [isEditing, setIsEditing] = useState(false);

  // Calculate XP based on activity
  const userXP = useMemo(() => {
    return (offeredSkills.length * 50) + (wantedSkills.length * 30) + 340;
  }, [offeredSkills.length, wantedSkills.length]);

  const levelInfo = getLevelInfo(userXP);
  const xpProgress = ((userXP % (levelInfo.nextLevel / 2)) / (levelInfo.nextLevel / 2)) * 100;

  const handleRemoveSkill = (skill: string, type: "offer" | "want") => {
    if (type === "offer") {
      setOfferedSkills(offeredSkills.filter((s) => s !== skill));
    } else {
      setWantedSkills(wantedSkills.filter((s) => s !== skill));
    }
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;

    if (newSkillType === "offer") {
      setOfferedSkills([...offeredSkills, newSkillName]);
    } else {
      setWantedSkills([...wantedSkills, newSkillName]);
    }

    setNewSkillName("");
    setNewSkillLevel("beginner");
    setShowAddSkillModal(false);
    setShowSuccessFeedback(true);
    setTimeout(() => setShowSuccessFeedback(false), 2000);
  };

  // Profile stats for MagicBento - Action-oriented milestones
  const profileStats = [
    { color: '#1e1b4b', title: 'Teaching', description: `${offeredSkills.length} skills shared`, label: 'Teaching' },
    { color: '#1e1b4b', title: 'Learning', description: `${wantedSkills.length} goals set`, label: 'Growth' },
    { color: '#1e1b4b', title: `Level ${levelInfo.level}`, description: `${userXP}/${levelInfo.nextLevel} XP`, label: 'XP' },
    { color: '#1e1b4b', title: '12 Day Streak', description: 'Keep it up! 🔥', label: 'Streak' },
    { color: '#1e1b4b', title: '4.9 Rating', description: 'Top 10% rated', label: 'Stars' },
    { color: '#1e1b4b', title: '23 Swaps', description: 'Completed sessions', label: 'Done' }
  ];

  // Profile completion calculation
  const profileStrength = useMemo(() => {
    let score = 20;
    if (offeredSkills.length > 0) score += 25;
    if (wantedSkills.length > 0) score += 25;
    if (offeredSkills.length >= 3) score += 15;
    if (wantedSkills.length >= 3) score += 15;
    return Math.min(score, 100);
  }, [offeredSkills.length, wantedSkills.length]);

  const getStrengthLabel = (score: number) => {
    if (score < 40) return { label: "Starter", color: "#ef4444", message: "Add skills to get discovered!" };
    if (score < 70) return { label: "Rising", color: "#f59e0b", message: "Good start! Add more skills." };
    if (score < 90) return { label: "Strong", color: "#3b82f6", message: "Almost there! Keep building." };
    return { label: "All-Star", color: "#10b981", message: "Amazing profile! You'll get great matches." };
  };

  const strengthInfo = getStrengthLabel(profileStrength);

  return (
    <div className="max-w-[1400px] pb-20">
      {/* Hero Profile Card - Solid dark blue with subtle glow */}
      <div 
        className="relative mb-8 rounded-3xl overflow-hidden p-8 text-white shadow-2xl"
        style={{ 
          backgroundColor: '#1A1A2E',
          boxShadow: '0 0 60px rgba(99, 102, 241, 0.15), 0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative flex items-start gap-6">
          <div className="relative">
            <div 
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold border-2 shadow-lg"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {currentUser.name.charAt(0)}
            </div>
            <div 
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white shadow-lg"
              style={{ backgroundColor: levelInfo.color }}
            >
              {levelInfo.level}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>{currentUser.name}</h1>
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
              >
                <Sparkles className="w-4 h-4" />
                Pro
              </span>
              {strengthInfo.label === "All-Star" && (
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                  style={{ backgroundColor: 'rgba(250, 204, 21, 0.2)', color: '#FDE047' }}
                >
                  <Star className="w-4 h-4" />
                  All-Star
                </span>
              )}
            </div>
            <p className="mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>{currentUser.email}</p>
            
            <div className="flex items-center gap-4 max-w-md">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium" style={{ color: '#FFFFFF' }}>{levelInfo.title}</span>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>{userXP} / {levelInfo.nextLevel} XP</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${xpProgress}%`, 
                      background: `linear-gradient(90deg, ${levelInfo.color}, #8b5cf6)` 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              className="p-3 rounded-xl transition-all backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            >
              <Camera className="w-5 h-5" />
            </button>
            <button 
              className="p-3 rounded-xl transition-all backdrop-blur-sm flex items-center gap-2"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              onClick={() => setIsEditing(!isEditing)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            >
              <Edit3 className="w-5 h-5" />
              <span className="text-sm font-medium">Edit Profile</span>
            </button>
            <button 
              className="p-3 rounded-xl transition-all backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Strength Indicator
      <div className="mb-8 p-6 rounded-2xl border-2 transition-all duration-300" style={{ 
        backgroundColor: 'var(--card)', 
        borderColor: strengthInfo.color + '40',
        boxShadow: `0 4px 20px ${strengthInfo.color}20`
      }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: strengthInfo.color + '20' }}>
              <TrendingUp className="w-5 h-5" style={{ color: strengthInfo.color }} />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Profile Strength: <span style={{ color: strengthInfo.color }}>{strengthInfo.label}</span>
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {strengthInfo.message}
              </p>
            </div>
          </div>
          <span className="text-2xl font-bold" style={{ color: strengthInfo.color }}>
            {profileStrength}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-1000"
            style={{ 
              width: `${profileStrength}%`, 
              background: `linear-gradient(90deg, ${strengthInfo.color}, ${strengthInfo.color}80)` 
            }}
          />
        </div>
      </div> */}

      {/* Main Content Grid - Bento 70% | Skills+Activity 30% */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Left Side - MagicBento (70%) */}
        <div className="col-span-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#E0E0E0', fontWeight: 500 }}>
            Your Journey
          </h2>
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={400}
            particleCount={12}
            glowColor="99, 102, 241"
            disableAnimations={false}
            cards={profileStats}
          />
        </div>

        {/* Right Side - Skills & Activity (30%) */}
        <div className="col-span-4 space-y-4">
          {/* Skills Section */}
          <div 
            className="p-5 rounded-2xl border"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            {/* Skills Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab("teaching")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1 ${
                  activeTab === "teaching" 
                    ? "bg-indigo-500 text-white shadow-md" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Award className="w-4 h-4" />
                Teach ({offeredSkills.length})
              </button>
              <button
                onClick={() => setActiveTab("learning")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1 ${
                  activeTab === "learning" 
                    ? "bg-purple-500 text-white shadow-md" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Target className="w-4 h-4" />
                Learn ({wantedSkills.length})
              </button>
            </div>

            <div className="min-h-[120px]">
              {(activeTab === "teaching" ? offeredSkills : wantedSkills).length > 0 ? (
                <div className="flex flex-wrap gap-2 items-center">
                  {(activeTab === "teaching" ? offeredSkills : wantedSkills).slice(0, 6).map((skill, index) => (
                    <div 
                      key={skill}
                      className="animate-in fade-in zoom-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <SkillChip
                        skill={skill}
                        type={activeTab === "teaching" ? "offer" : "want"}
                        onRemove={() => handleRemoveSkill(skill, activeTab === "teaching" ? "offer" : "want")}
                      />
                    </div>
                  ))}
                  {(activeTab === "teaching" ? offeredSkills : wantedSkills).length > 6 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                      +{(activeTab === "teaching" ? offeredSkills : wantedSkills).length - 6} more
                    </span>
                  )}
                  <button 
                    onClick={() => {
                      setNewSkillType(activeTab === "teaching" ? "offer" : "want");
                      setShowAddSkillModal(true);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-1 border border-indigo-500/30"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500 mb-2">
                    No {activeTab === "teaching" ? "skills" : "goals"} yet
                  </p>
                  <button 
                    onClick={() => {
                      setNewSkillType(activeTab === "teaching" ? "offer" : "want");
                      setShowAddSkillModal(true);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-all"
                  >
                    <Plus className="w-3 h-3 inline mr-1" />
                    Add First
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div 
            className="p-5 rounded-2xl border"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <h3 className="font-bold mb-3 text-sm" style={{ color: 'var(--text-primary)' }}>
              Recent Activity
            </h3>
            <div className="space-y-2">
              {[
                { icon: MessageCircle, text: "Matched with Sarah", time: "2h", color: "#3b82f6" },
                { icon: CheckCircle, text: "Completed JS swap", time: "1d", color: "#10b981" },
                { icon: Star, text: "5⭐ from Mike", time: "2d", color: "#f59e0b" },
                { icon: Flame, text: "7-day streak!", time: "3d", color: "#f97316" },
              ].map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-all">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: activity.color + '15' }}>
                      <Icon className="w-4 h-4" style={{ color: activity.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{activity.text}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements - Full Width with tooltips */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: '#E0E0E0', fontWeight: 500 }}>
          Achievements
        </h2>
        <div className="grid grid-cols-6 gap-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={achievement.id}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer group ${
                  achievement.unlocked 
                    ? 'hover:scale-105 hover:shadow-lg' 
                    : 'opacity-50 grayscale'
                }`}
                style={{
                  backgroundColor: achievement.unlocked ? achievement.color + '10' : 'var(--section-bg)',
                  borderColor: achievement.unlocked ? achievement.color + '40' : '#2D2D2D',
                  borderRadius: '8px',
                }}
                title={`${achievement.title}: ${achievement.desc}`}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: achievement.unlocked ? achievement.color + '20' : 'var(--secondary)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: achievement.unlocked ? achievement.color : 'var(--text-disabled)' }} />
                </div>
                <p className="text-xs font-medium" style={{ color: '#E0E0E0', fontWeight: 500 }}>
                  {achievement.title}
                </p>
                <p className="text-[10px] mt-1" style={{ color: '#BDBDBD' }}>
                  {achievement.desc}
                </p>
                {achievement.unlocked && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: achievement.color }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Theme Cards - Grid Layout */}
      <div className="mb-2">
        <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
          Choose Your Vibe
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 p-4">
          {allThemes.map((theme) => {
            const Icon = theme.icon;
            const themeData = themes[theme.id];
            const isActive = currentTheme === theme.id;
            
            return (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 group text-left bg-gradient-to-br ${theme.bg} ${
                  isActive ? 'ring-2 ring-offset-2 ring-indigo-500 scale-105 shadow-lg' : 'hover:shadow-md'
                }`}
                  style={{ 
                    borderColor: isActive ? themeData.colors["--primary"] : 'transparent',
                    borderRadius: '12px',
                    minHeight: '100px',
                  }}

              >
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: theme.isDark ? '#FFFFFF' : '#1a1a2e' }} />
                  </div>
                  {isActive && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/90 shadow-sm">
                      <Check className="w-4 h-4 text-indigo-600" />
                    </div>
                  )}
                </div>
                <h3 className={`font-semibold text-sm mb-1 ${theme.isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                  {themeData.name}
                </h3>
                <p className={`text-xs leading-relaxed ${theme.isDark ? 'text-white/80' : 'text-gray-700'}`} style={{ fontSize: '12px', opacity: 0.9 }}>
                  {themeData.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>


      {/* Success Feedback */}
      {showSuccessFeedback && (
        <div className="fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl animate-in slide-in-from-bottom-4 fade-in flex items-center gap-3 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Skill added! +50 XP 🎉</span>
        </div>
      )}

      {/* Add Skill Modal */}
      {showAddSkillModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={() => setShowAddSkillModal(false)}
        >
          <div 
            className="w-full max-w-[480px] p-6 rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Add New {newSkillType === "offer" ? "Skill" : "Goal"}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {newSkillType === "offer" 
                    ? "What can you teach others?" 
                    : "What do you want to learn?"}
                </p>
              </div>
              <button
                onClick={() => setShowAddSkillModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Name
                </label>
                <input
                  type="text"
                  placeholder={newSkillType === "offer" ? "e.g., React, Guitar, Spanish" : "e.g., Machine Learning, Cooking"}
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proficiency Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["beginner", "intermediate", "expert"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setNewSkillLevel(level)}
                      className={`py-3 px-4 rounded-xl border-2 font-medium capitalize transition-all ${
                        newSkillLevel === level
                          ? newSkillType === "offer"
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddSkill}
                  disabled={!newSkillName.trim()}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium text-white transition-all ${
                    newSkillType === "offer"
                      ? "bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300"
                      : "bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300"
                  }`}
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add {newSkillType === "offer" ? "to Teaching" : "to Learning"}
                </button>
                <button 
                  onClick={() => setShowAddSkillModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl font-medium border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
