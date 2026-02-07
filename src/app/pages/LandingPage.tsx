import { useNavigate } from "react-router";
import LightRays from "@/app/components/ui/LightRays";
import MagicBento from "@/app/components/ui/MagicBento";

export function LandingPage() {
  const navigate = useNavigate();

  const featureCards = [
    { color: '#0f172a', title: 'Smart Matching', description: 'AI-powered algorithm finds your perfect skill partners', label: 'AI' },
    { color: '#0f172a', title: 'Real-time Chat', description: 'Connect instantly with built-in messaging', label: 'Chat' },
    { color: '#0f172a', title: 'Skill Tracking', description: 'Monitor your teaching and learning progress', label: 'Progress' },
    { color: '#0f172a', title: 'Global Community', description: 'Join learners from around the world', label: 'Worldwide' },
    { color: '#0f172a', title: 'Secure Platform', description: 'Enterprise-grade security for your data', label: 'Safe' },
    { color: '#0f172a', title: 'Instant Swaps', description: 'Start exchanging skills in minutes', label: 'Fast' }
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-950">
      {/* Light Rays Background */}
      <div className="absolute inset-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#a5b4fc"
          raysSpeed={0.8}
          lightSpread={0.6}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.1}
          distortion={0.2}
          className="opacity-80"
          pulsating={true}
          fadeDistance={1.2}
          saturation={1.4}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/40 to-slate-950/30"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Skill Swap
        </h1>
        
        {/* Beautiful Quote */}
        <p className="text-lg md:text-xl text-indigo-200/80 mb-8 max-w-xl italic font-light">
          "Every skill you share plants a seed of growth in someone else's garden. 
          Together, we bloom brighter than we ever could alone."
        </p>

        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl drop-shadow-md">
          Connect with people, exchange skills, and grow together in a community
          of learners.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => navigate("/auth")}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              const element = document.getElementById("features");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-slate-900 transition-all shadow-lg"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Magic Bento Features Section */}
      <div
        id="features"
        className="relative z-10 py-20 px-6 bg-slate-950"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">How It Works</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Discover the magic of skill exchange with our interactive platform
          </p>
          
          <div className="flex justify-center">
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
              cards={featureCards}
            />
          </div>
        </div>
      </div>

      {/* Learn More Section */}
      <div
        id="learn-more"
        className="relative z-10 bg-white text-slate-900 py-20 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Get Started Today</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">1. Create Profile</h3>
              <p>Add your skills and what you want to learn.</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">2. Find Matches</h3>
              <p>Get matched with people who complement your skills.</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">3. Start Learning</h3>
              <p>Connect and exchange knowledge through skill swaps.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
