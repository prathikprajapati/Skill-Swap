import { useState, useEffect } from "react";
import { motion } from "motion/react";

const typingWords = ["Java", "Python", "French", "Japanese", "Marketing", "Stock Basics", "SQL", "React", "Design", "Photography"];

const testimonials = [
  { id: 1, name: "Sarah Chen", text: "Found an amazing mentor for React. My coding skills improved 10x!" },
  { id: 2, name: "Mike Johnson", text: "Teaching others helped me understand concepts better. Win-win!" },
  { id: 3, name: "Emma Davis", text: "Connected with professionals worldwide. Best platform ever!" },
  { id: 4, name: "Alex Kumar", text: "Learned Japanese from a native speaker. Absolutely incredible experience!" },
  { id: 5, name: "Lisa Wang", text: "My marketing skills went from zero to hero. Thank you Skill Swap!" },
  { id: 6, name: "Tom Brown", text: "Teaching SQL helped me land my dream job. Forever grateful!" },
];

interface DashboardHeroProps {
  userName?: string;
}

export function DashboardHero({ userName = "Learner" }: DashboardHeroProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const waveGif = "https://images.unsplash.com/photo-1680182784939-45e8755efaab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJ0b29uJTIwY2F0JTIwd2F2aW5nJTIwaGVsbG8lMjBmcmllbmRseXxlbnwxfHx8fDE3NzI0NzY1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080";

  // Typing animation effect
  useEffect(() => {
    const word = typingWords[currentWordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayedText.length < word.length) {
            setDisplayedText(word.slice(0, displayedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(displayedText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
          }
        }
      },
      isDeleting ? 50 : 150
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <>
      {/* Hero Section */}
      <section
        className="min-h-[80vh] flex items-center justify-center px-8 py-16"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-12 gap-8">
          {/* Left Content - 70% */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1
                className="text-[56px] mb-4"
                style={{ color: "var(--ivory)", fontWeight: 700, lineHeight: 1.2 }}
              >
                Hello {userName}!!!
              </h1>

              <h2
                className="text-[32px] mb-8"
                style={{ color: "var(--text-secondary)", fontWeight: 400, lineHeight: 1.4 }}
              >
                What do you want to learn{" "}
                <span
                  className="inline-block min-w-[200px]"
                  style={{ color: "var(--primary)", fontWeight: 600 }}
                >
                  {displayedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8"
            >
              <div
                className="w-32 h-[2px] mb-6"
                style={{ backgroundColor: "var(--primary)" }}
              />
              <h3
                className="text-[24px] mb-3"
                style={{ color: "var(--primary)", fontWeight: 600 }}
              >
                Grab Whatever You Can
              </h3>


              <p
                className="text-[16px] max-w-xl"
                style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}
              >
                Connect with learners and experts worldwide. Share your knowledge,
                learn new skills, and grow together in our vibrant community.
              </p>
            </motion.div>
          </div>

          {/* Right Content - 30% */}
          <div className="col-span-12 lg:col-span-5 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-full max-w-sm"
            >
              <img
                src={waveGif}
                alt="Waving character"
                width={400}
                height={400}
                className="w-full h-auto rounded-2xl"
                style={{
                  filter: "drop-shadow(0 0 40px var(--primary))",
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Testimonials Scrolling */}
        <div className="absolute bottom-0 left-0 right-0 pb-8 overflow-hidden">
          {/* Scrolling Left */}
          <div className="flex whitespace-nowrap animate-scroll-left mb-4">
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <div
                key={`left-${idx}`}
                className="inline-flex items-center mx-4 px-6 py-3 rounded-full border backdrop-blur-sm"
                style={{
                  backgroundColor: "var(--glass-bg)",
                  borderColor: "var(--glass-border)",
                }}
              >
                <span
                  className="text-[14px] mr-2"
                  style={{ color: "var(--primary)", fontWeight: 600 }}
                >
                  {testimonial.name}:
                </span>
                <span
                  className="text-[14px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {testimonial.text}
                </span>
              </div>
            ))}
          </div>

          {/* Scrolling Right */}
          <div className="flex whitespace-nowrap animate-scroll-right">
            {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map(
              (testimonial, idx) => (
                <div
                  key={`right-${idx}`}
                  className="inline-flex items-center mx-4 px-6 py-3 rounded-full border backdrop-blur-sm"
                  style={{
                    backgroundColor: "var(--glass-bg)",
                    borderColor: "var(--glass-border)",
                  }}
                >
                  <span
                    className="text-[14px] mr-2"
                    style={{ color: "var(--accent)", fontWeight: 600 }}
                  >
                    {testimonial.name}:
                  </span>
                  <span
                    className="text-[14px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {testimonial.text}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-scroll-left { animation: scroll-left 30s linear infinite; }
        .animate-scroll-right { animation: scroll-right 30s linear infinite; }
      `}</style>
    </>
  );
}

