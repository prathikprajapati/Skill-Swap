import { useNavigate } from "react-router";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-lg">
          Skill Swap
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl drop-shadow-md">
          Connect with people, exchange skills, and grow together in a community
          of learners.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => navigate("/auth")}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              // Scroll to learn more section or navigate
              const element = document.getElementById("learn-more");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all shadow-lg"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Learn More Section */}
      <div
        id="learn-more"
        className="relative z-10 bg-white text-black py-20 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">How It Works</h2>
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
