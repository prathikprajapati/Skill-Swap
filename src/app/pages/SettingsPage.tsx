import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Palette, 
  BookOpen, 
  GraduationCap,
  Bell, 
  Shield, 
  LogOut,
  Sun,
  Moon,
  Plus,
  X,
  ChevronRight,
  Check
} from "lucide-react";

/* ── Mock Data ── */
const PROFILE = {
  name: "Alex Johnson",
  email: "alex@example.com",
  bio: "Full-stack developer passionate about learning and sharing knowledge.",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
};

/* ── Available Skills ── */
const AVAILABLE_SKILLS = [
  "React", "TypeScript", "Node.js", "Python", "Java", "Go", "Rust",
  "UI/UX Design", "Figma", "Adobe XD", "Photoshop", "Illustrator",
  "Mobile Development", "React Native", "Flutter", "Swift", "Kotlin",
  "Data Science", "Machine Learning", "TensorFlow", "PyTorch",
  "DevOps", "AWS", "Docker", "Kubernetes", "CI/CD",
  "Graphic Design", "Video Editing", "3D Modeling", "Animation"
];

/* ── Section Component ── */
function SettingsSection({ 
  title, 
  icon: Icon, 
  children 
}: { 
  title: string; 
  icon: any; 
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

/* ── Skills Manager Component ── */
function SkillsManager({ type }: { type: "teach" | "learn" }) {
  const [skills, setSkills] = useState<string[]>(
    type === "teach" 
      ? ["React Development", "TypeScript", "Node.js"]
      : ["UI/UX Design", "Python"]
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setShowDropdown(false);
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        {type === "teach" ? (
          <>
            <GraduationCap className="w-5 h-5 text-blue-400" />
            Skills I Can Teach
          </>
        ) : (
          <>
            <BookOpen className="w-5 h-5 text-purple-400" />
            Skills I Want to Learn
          </>
        )}
      </h3>
      
      {/* Selected Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 rounded-full text-sm text-white"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="w-4 h-4 hover:bg-neutral-700 rounded-full flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="inline-flex items-center gap-1 px-3 py-1.5 border border-dashed border-neutral-600 rounded-full text-sm text-neutral-400 hover:text-white hover:border-neutral-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 max-h-48 overflow-y-auto bg-neutral-800 border border-neutral-700 rounded-xl p-2 z-10">
            {AVAILABLE_SKILLS.filter(s => !skills.includes(s)).map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                className="w-full px-3 py-2 text-left text-sm text-neutral-300 hover:bg-neutral-700 hover:text-white rounded-lg transition-colors"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main Settings Page ── */
export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    requests: true,
    messages: true,
  });

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-neutral-400 mt-1">Manage your account preferences</p>
        </div>

        {/* Profile Info */}
        <SettingsSection title="Profile Information" icon={User}>
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={PROFILE.avatar} alt={PROFILE.name} />
                <AvatarFallback className="text-2xl bg-neutral-800">
                  {PROFILE.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Plus className="w-4 h-4 text-neutral-900" />
              </button>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
                <input
                  type="text"
                  defaultValue={PROFILE.name}
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={PROFILE.email}
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Bio</label>
                <textarea
                  defaultValue={PROFILE.bio}
                  rows={3}
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button className="bg-white text-neutral-900 hover:bg-neutral-100">
              Save Changes
            </Button>
          </div>
        </SettingsSection>

        {/* Theme */}
        <SettingsSection title="Appearance" icon={Palette}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Theme</p>
              <p className="text-sm text-neutral-400">Choose your preferred color scheme</p>
            </div>
            <div className="flex items-center gap-2 bg-neutral-800 rounded-xl p-1">
              <button
                onClick={() => setTheme("light")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  theme === "light" 
                    ? "bg-white text-neutral-900" 
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Sun className="w-4 h-4" />
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  theme === "dark" 
                    ? "bg-white text-neutral-900" 
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Moon className="w-4 h-4" />
                Dark
              </button>
            </div>
          </div>
        </SettingsSection>

        {/* Teach Skills */}
        <SettingsSection title="Skills" icon={BookOpen}>
          <SkillsManager type="teach" />
          <div className="my-6 border-t border-neutral-800" />
          <SkillsManager type="learn" />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="Notifications" icon={Bell}>
          <div className="space-y-4">
            {[
              { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
              { key: "push", label: "Push Notifications", desc: "Receive push notifications" },
              { key: "requests", label: "Request Alerts", desc: "Get notified about new skill swap requests" },
              { key: "messages", label: "Message Alerts", desc: "Get notified about new messages" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{item.label}</p>
                  <p className="text-sm text-neutral-400">{item.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications[item.key as keyof typeof notifications] 
                      ? "bg-blue-500" 
                      : "bg-neutral-700"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications[item.key as keyof typeof notifications] 
                        ? "translate-x-7" 
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </SettingsSection>

        {/* Privacy & Security */}
        <SettingsSection title="Privacy & Security" icon={Shield}>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 hover:bg-neutral-800 rounded-xl transition-colors">
              <span className="text-white">Change Password</span>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-neutral-800 rounded-xl transition-colors">
              <span className="text-white">Two-Factor Authentication</span>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-neutral-800 rounded-xl transition-colors">
              <span className="text-white">Privacy Settings</span>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </button>
          </div>
        </SettingsSection>

        {/* Logout */}
        <Button 
          variant="outline" 
          className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}

