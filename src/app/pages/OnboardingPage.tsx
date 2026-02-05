import { useState } from "react";
import { useNavigate } from "react-router";
import Stepper, { Step } from "@/app/components/ui/Stepper";

export function OnboardingPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleComplete = () => {
    // Mark onboarding as completed (could save to localStorage or API)
    localStorage.setItem("onboardingCompleted", "true");
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log("Step changed to:", step);
          }}
          onFinalStepCompleted={handleComplete}
          backButtonText="Previous"
          nextButtonText="Next"
        >
          <Step>
            <h2 className="text-2xl font-bold text-center mb-4">
              Welcome to Skill Swap!
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Let's get you started with a quick tour of the platform.
            </p>
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">👋</span>
              </div>
            </div>
          </Step>

          <Step>
            <h2 className="text-2xl font-bold text-center mb-4">
              Complete Your Profile
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Add your skills and interests to find the perfect matches.
            </p>
            <div className="text-center">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">📝</span>
              </div>
            </div>
          </Step>

          <Step>
            <h2 className="text-2xl font-bold text-center mb-4">
              Find Skill Partners
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Browse recommendations and connect with people who complement your
              skills.
            </p>
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">🤝</span>
              </div>
            </div>
          </Step>

          <Step>
            <h2 className="text-2xl font-bold text-center mb-4">
              Start Learning & Teaching
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Exchange knowledge and grow together in our community.
            </p>
            <div className="text-center">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">🚀</span>
              </div>
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  );
}
