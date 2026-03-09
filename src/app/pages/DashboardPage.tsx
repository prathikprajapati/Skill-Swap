import { useState } from "react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ProfileCard } from "@/components/ruixen/profile-card";
import { Button } from "@/components/ui/button";
import { 
  Search,
  Filter,
  TrendingUp,
  Clock,
  Star,
  Sparkles,
  ChevronRight,
  Users,
  BookOpen,
  GraduationCap
} from "lucide-react";

/* ── Mock User Data ── */
const MOCK_USERS = [
  {
    id: "1",
    name: "Mia Tanaka",
    bio: "Visual storyteller blending minimalism with bold aesthetics.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    followers: 1847,
    posts: 124,
    verified: true,
    teachSkill: "UI/UX Design",
    learnSkill: "React Development",
  },
  {
    id: "2",
    name: "James Wilson",
    bio: "Full-stack developer passionate about clean code and scalable systems.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    followers: 2341,
    posts: 89,
    verified: true,
    teachSkill: "React & TypeScript",
    learnSkill: "UI Design",
  },
  {
    id: "3",
    name: "Emma Chen",
    bio: "Product designer with a focus on accessibility and inclusive design.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    followers: 1567,
    posts: 67,
    verified: false,
    teachSkill: "Figma & Prototyping",
    learnSkill: "Backend Development",
  },
  {
    id: "4",
    name: "David Kim",
    bio: "Mobile app developer specializing in React Native and Flutter.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    followers: 3421,
    posts: 201,
    verified: true,
    teachSkill: "Mobile Development",
    learnSkill: "Machine Learning",
  },
  {
    id: "5",
    name: "Sarah Johnson",
    bio: "Data scientist with a passion for visualization and storytelling.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
    followers: 987,
    posts: 45,
    verified: true,
    teachSkill: "Python & Data Science",
    learnSkill: "Frontend Development",
  },
  {
    id: "6",
    name: "Alex Rivera",
    bio: "DevOps engineer helping teams ship faster with CI/CD pipelines.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    followers: 1876,
    posts: 112,
    verified: true,
    teachSkill: "DevOps & Cloud",
    learnSkill: "Mobile Development",
  },
];

/* ── Skill Tags ── */
const SKILL_TAGS = [
  "UI/UX Design",
  "React",
  "TypeScript",
  "Python",
  "Mobile Dev",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Figma",
  "Node.js",
];

/* ── Dashboard Hero Section ── */
function DashboardHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text
      gsap.fromTo(textRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" as const }
      );
      
      // Animate visual
      gsap.fromTo(visualRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" as const, delay: 0.3 }
      );
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 items-center">
          {/* Left - Text Content (70%) */}
          <div ref={textRef} className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white/80">Welcome back!</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Find Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Skill Partner
              </span>
            </h1>
            
            <p className="text-lg text-neutral-400 max-w-xl">
              Connect with learners who need your expertise and teachers who can help you grow. 
              Start swapping skills today.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">12K+</p>
                  <p className="text-sm text-neutral-400">Active Users</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">5K+</p>
                  <p className="text-sm text-neutral-400">Skills Shared</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">98%</p>
                  <p className="text-sm text-neutral-400">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search skills or users..."
                  className="w-full pl-11 pr-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
                />
              </div>
              <Button variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Right - Visual (30%) */}
          <div ref={visualRef} className="lg:col-span-2 hidden lg:block">
            <div className="relative">
              {/* Decorative SVG */}
              <svg viewBox="0 0 400 400" className="w-full h-auto">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.8 }} />
                  </linearGradient>
                </defs>
                <circle cx="200" cy="200" r="150" fill="url(#grad1)" opacity="0.3" />
                <circle cx="200" cy="200" r="100" fill="url(#grad1)" opacity="0.5" />
                <circle cx="200" cy="200" r="50" fill="url(#grad1)" opacity="0.8" />
                <text x="200" y="210" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">
                  Skill Swap
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Skill Filters ── */
function SkillFilters() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <section className="py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Teach/Learn Toggle */}
          <div className="flex items-center gap-2 bg-neutral-800/50 rounded-xl p-1">
            <button className="px-4 py-2 bg-white text-neutral-900 rounded-lg text-sm font-medium transition-colors">
              Teach
            </button>
            <button className="px-4 py-2 text-neutral-400 hover:text-white rounded-lg text-sm font-medium transition-colors">
              Learn
            </button>
          </div>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-2">
            {SKILL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(activeFilter === tag ? null : tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeFilter === tag
                    ? "bg-white text-neutral-900"
                    : "bg-neutral-800/50 text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── User Cards Grid ── */
function UserCardsSection() {
  return (
    <section className="py-8 px-4 md:px-8 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Recommended for You</h2>
          <Button variant="ghost" className="text-neutral-400 hover:text-white">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_USERS.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProfileCard
                variant="half"
                image={user.image}
                name={user.name}
                bio={user.bio}
                followers={user.followers}
                posts={user.posts}
                verified={user.verified}
                onFollow={() => console.log("Follow:", user.id)}
                onFavorite={(fav) => console.log("Favorite:", user.id, fav)}
              />
              {/* Skill info below card */}
              <div className="mt-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span className="text-neutral-400">Teaches: </span>
                  <span className="text-white">{user.teachSkill}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Main Dashboard Page ── */
export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <DashboardHero />
      <SkillFilters />
      <UserCardsSection />
    </div>
  );
}