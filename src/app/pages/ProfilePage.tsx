import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Calendar, 
  Star, 
  Award, 
  BookOpen, 
  GraduationCap,
  Settings,
  Edit
} from "lucide-react";

/* ── Mock Profile Data ── */
const PROFILE = {
  name: "Alex Johnson",
  bio: "Full-stack developer passionate about learning and sharing knowledge. Always eager to connect with fellow learners!",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  location: "San Francisco, CA",
  joinedDate: "January 2024",
  xp: 2450,
  level: 12,
  rating: 4.8,
  completedSwaps: 28,
  teachSkills: [
    { name: "React Development", proficiency: "Expert", category: "Frontend" },
    { name: "TypeScript", proficiency: "Advanced", category: "Languages" },
    { name: "Node.js", proficiency: "Intermediate", category: "Backend" },
  ],
  learnSkills: [
    { name: "UI/UX Design", progress: 45 },
    { name: "Python", progress: 20 },
    { name: "Data Science", progress: 10 },
  ],
  achievements: [
    { name: "Quick Learner", icon: "🚀", description: "Completed 5 skill swaps in first month" },
    { name: "Top Mentor", icon: "🏆", description: "Rated 4.9+ by learners" },
    { name: "Bookworm", icon: "📚", description: "Shared 50+ learning resources" },
  ],
};

/* ── Stats Card Component ── */
function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) {
  return (
    <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-neutral-700/50 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-neutral-400">{label}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Skill Progress Bar ── */
function SkillProgress({ name, progress }: { name: string; progress: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-white font-medium">{name}</span>
        <span className="text-neutral-400">{progress}%</span>
      </div>
      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
        />
      </div>
    </div>
  );
}

/* ── Main Profile Page ── */
export default function ProfilePage() {
  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-neutral-700">
                <AvatarImage src={PROFILE.avatar} alt={PROFILE.name} />
                <AvatarFallback className="text-4xl bg-neutral-800">
                  {PROFILE.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Edit className="w-4 h-4 text-neutral-900" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">{PROFILE.name}</h1>
                  <p className="text-neutral-400 mt-1">{PROFILE.bio}</p>
                </div>
                <Button 
                  onClick={() => window.location.href = '/app/settings'}
                  variant="outline" 
                  className="border-neutral-700 text-white hover:bg-neutral-800"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 text-neutral-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{PROFILE.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {PROFILE.joinedDate}</span>
                </div>
              </div>

              {/* XP & Level */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">Level {PROFILE.level}</span>
                </div>
                <div className="flex-1 max-w-xs">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-400">XP</span>
                    <span className="text-white">{PROFILE.xp} / 3000</span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                      style={{ width: `${(PROFILE.xp / 3000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Star} label="Rating" value={PROFILE.rating} />
          <StatCard icon={BookOpen} label="Completed" value={PROFILE.completedSwaps} />
          <StatCard icon={GraduationCap} label="Teaching" value={PROFILE.teachSkills.length} />
          <StatCard icon={Award} label="Achievements" value={PROFILE.achievements.length} />
        </div>

        {/* Teach Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              Skills I Teach
            </h2>
          </div>
          <div className="space-y-4">
            {PROFILE.teachSkills.map((skill) => (
              <div key={skill.name} className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-xl">
                <div>
                  <p className="text-white font-medium">{skill.name}</p>
                  <p className="text-sm text-neutral-400">{skill.category}</p>
                </div>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                  {skill.proficiency}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Learn Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              Skills I'm Learning
            </h2>
          </div>
          <div className="space-y-4">
            {PROFILE.learnSkills.map((skill) => (
              <SkillProgress key={skill.name} name={skill.name} progress={skill.progress} />
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Achievements
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROFILE.achievements.map((achievement) => (
              <div key={achievement.name} className="p-4 bg-neutral-800/50 rounded-xl text-center">
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <p className="text-white font-semibold">{achievement.name}</p>
                <p className="text-sm text-neutral-400 mt-1">{achievement.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Edit Info Note */}
        <div className="text-center">
          <p className="text-neutral-500 text-sm">
            Want to edit your profile?{" "}
            <button 
              onClick={() => window.location.href = '/app/settings'}
              className="text-white underline hover:text-neutral-300"
            >
              Go to Settings
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

