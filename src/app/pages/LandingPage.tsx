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
          raysColor="#F2EAB2"
          raysSpeed={0.2}
          lightSpread={1}
          rayLength={5}
          followMouse={false}
          mouseInfluence={0.15}
          noiseAmount={0}
          distortion={0.111}
          className="opacity-90"
          pulsating={false}
          fadeDistance={10}
          saturation={0.6}
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
    </div>
  );
}
