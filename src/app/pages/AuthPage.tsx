import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Lock, User, ArrowRight, ChevronLeft, Eye, EyeOff } from "lucide-react";
import LightRays from "@/app/components/ui/LightRays";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  // Prevent animation flash on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleMode = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setEmailError("");
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    if (isLogin) {
      navigate("/app");
    } else {
      navigate("/app/onboarding");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden bg-slate-950">
      {/* Divine Light Rays Background - Matching Landing Page */}
      <div className="absolute inset-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#818cf8"
          raysSpeed={0.8}
          lightSpread={6}
          rayLength={0.7}
          followMouse={false}
          mouseInfluence={0.15}
          noiseAmount={0.02}
          distortion={0.03}
          className="opacity-140"
          pulsating={false}
          fadeDistance={5}
          saturation={1.2}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950/90" />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-indigo-300/30 rounded-full"
            initial={{ 
              x: Math.random() * 1000, 
              y: Math.random() * 800 
            }}
            animate={{ 
              y: [null, -20, 20],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Back to Home */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors z-20"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>

      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Glass Card */}
        <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
          
          {/* Card Header Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative p-8 sm:p-10">
            {/* Logo Section */}
            <motion.div 
              className="flex flex-col items-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Skill<span className="text-indigo-400">Swap</span>
                  </h1>
                </div>
              </div>
              <p className="text-sm text-slate-400 text-center italic">
                &ldquo;Where skills become stories&rdquo;
              </p>
            </motion.div>

            {/* Animated Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold text-white mb-2">
                  {isLogin ? "Welcome Back" : "Begin Your Journey"}
                </h2>
                <p className="text-sm text-slate-400">
                  {isLogin 
                    ? "Sign in to continue your path of growth" 
                    : "Join thousands of learners sharing their gifts"}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20 transition-all"
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    emailError 
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-slate-700 focus:border-indigo-400/50 focus:ring-indigo-400/20"
                  }`}
                  required
                />
              </div>
              {emailError && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs ml-1"
                >
                  {emailError}
                </motion.p>
              )}

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>

            {/* Toggle Link */}
            <div className="mt-6 text-center">
              <span className="text-slate-400 text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
                <button
                type="button"
                onClick={toggleMode}
                className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors"
              >

                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
