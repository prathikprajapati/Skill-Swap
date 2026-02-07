import { useNavigate } from "react-router";
import LightRays from "@/app/components/ui/LightRays";
import { Sparkles, Users, BookOpen, ArrowRight, ChevronDown, Moon, Sun, Flag } from "lucide-react";
import { useState } from "react";

export function LandingPage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);


  const scrollToLearnMore = () => {
    const element = document.getElementById("learn-more");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`relative w-full min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      
      {/* Theme Toggle Button */}
      {/* <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-300" />
        ) : (
          <Moon className="w-5 h-5 text-slate-600" />
        )}
      </button> */}

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Light Rays Background */}
        <div className="absolute inset-0">

          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.1}
            lightSpread={5}
            rayLength={10}
            followMouse={false}
            mouseInfluence={0.15}
            noiseAmount={0.02}
            distortion={0.05}
            className="opacity-120"
            pulsating={false}
            fadeDistance={1.5}
            saturation={1.2}
          />

          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-indigo-300" />
            <span className="text-sm font-medium text-slate-300">
              Where skills meet stories
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6">
            Skill
            <span className="text-indigo-400">Swap</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
            Exchange knowledge, build connections, and grow together in a community 
            where everyone has something to teach and something to learn.
          </p>

          {/* Quote */}
          <blockquote className="relative mb-12 max-w-lg">
            <div className="absolute -top-4 -left-2 text-6xl text-indigo-500/20 font-serif">
              "
            </div>
            <p className="relative text-base md:text-lg text-slate-400 italic leading-relaxed px-6">
              Every skill shared is a gift that multiplies—teach once, learn forever, 
              and watch magic bloom between strangers who become friends.
            </p>
            <div className="absolute -bottom-8 -right-2 text-6xl text-indigo-500/20 font-serif">
              "
            </div>
          </blockquote>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/auth")}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-400/40 hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={scrollToLearnMore}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-200 font-semibold rounded-xl border border-white/10 transition-all duration-300 hover:border-white/20"
            >
              Learn More
            </button>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToLearnMore}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-white transition-colors animate-bounce"
            aria-label="Scroll to learn more"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="learn-more"
        className="relative z-10 bg-slate-900/80 backdrop-blur-sm border-t border-white/5 py-24 px-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">
              Simple Process
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Three simple steps to start your learning journey
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="group relative bg-slate-800/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-indigo-500/50 backdrop-blur-sm">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="mt-6">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Step 01
                </span>
                <h3 className="mt-2 text-xl font-bold text-white">
                  Create Profile
                </h3>
                <p className="mt-3 text-slate-400 leading-relaxed">
                  Share your expertise and tell us what you want to learn. Your profile is your gateway to meaningful connections.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative bg-slate-800/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-indigo-500/50 backdrop-blur-sm">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="mt-6">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Step 02
                </span>
                <h3 className="mt-2 text-xl font-bold text-white">
                  Find Matches
                </h3>
                <p className="mt-3 text-slate-400 leading-relaxed">
                  Our smart matching connects you with people whose skills complement yours perfectly.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative bg-slate-800/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-indigo-500/50 backdrop-blur-sm">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="mt-6">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Step 03
                </span>
                <h3 className="mt-2 text-xl font-bold text-white">
                  Start Learning
                </h3>
                <p className="mt-3 text-slate-400 leading-relaxed">
                  Connect, collaborate, and grow together through skill exchanges that benefit everyone.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={() => navigate("/auth")}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-400/40 hover:scale-105"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
