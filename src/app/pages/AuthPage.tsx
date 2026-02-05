import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@/app/components/ui/skill-swap-input";
import { Button } from "@/app/components/ui/skill-swap-button";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    // Navigate to onboarding on signup, or dashboard on login
    if (isLogin) {
      navigate("/app");
    } else {
      navigate("/app/onboarding");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #F9FAFB 0%, #E8F1F4 50%, #F3F7F9 100%)",
      }}
    >
      {/* Decorative circles - subtle */}
      <div
        className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "var(--primary-light)" }}
      />
      <div
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "var(--accent-light)" }}
      />

      <div
        className="w-full max-w-[420px] p-8 rounded-2xl shadow-2xl relative z-10 animate-in fade-in duration-500"
        style={{
          backgroundColor: "var(--card)",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <span className="text-white font-semibold text-2xl">SS</span>
            </div>
            <div>
              <h1
                className="text-[26px] leading-tight"
                style={{ color: "var(--text-primary)", fontWeight: 600 }}
              >
                Skill Swap
              </h1>
            </div>
          </div>
          {/* Brand Tagline */}
          <p
            className="text-[14px] text-center italic"
            style={{ color: "var(--text-secondary)" }}
          >
            "Learn by teaching. Teach by learning."
          </p>
        </div>

        {/* Title */}
        <h2
          className="text-[32px] text-center mb-2"
          style={{ color: "var(--text-primary)", fontWeight: 600 }}
        >
          {isLogin ? "Welcome Back" : "Get Started"}
        </h2>
        <p
          className="text-[14px] text-center mb-8"
          style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
        >
          {isLogin
            ? "Sign in to continue your learning journey"
            : "Join our community of learners and teachers"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {!isLogin && (
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              required
            />
          )}

          <Button type="submit" className="w-full mt-6" size="lg">
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        {/* Toggle Link */}
        <div className="mt-6 text-center">
          <span
            style={{ color: "var(--text-secondary)" }}
            className="text-[14px]"
          >
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[14px] hover:underline transition-all"
            style={{ color: "var(--accent-indigo)", fontWeight: 600 }}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
