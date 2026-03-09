import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { BeamsBackground } from "@/components/ui/beams-background";
import { ContainerScroll, CardsContainer, CardTransformed, ReviewStars } from "@/components/blocks/animated-cards-stack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Users, 
  Zap, 
  Shield, 
  MessageCircle, 
  BookOpen,
  Star,
  Heart,
  Code,
  Palette,
  Music,
  Camera,
  Globe,
  Lightbulb
} from "lucide-react";

/* ── Testimonials Data ── */
const TESTIMONIALS = [
  {
    id: "testimonial-1",
    name: "Jessica H.",
    profession: "Web Designer",
    rating: 4.5,
    description: "The attention to detail and user experience in their work is exceptional. I'm thoroughly impressed with the final product.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    id: "testimonial-2",
    name: "Lisa M.",
    profession: "UX Designer",
    rating: 5,
    description: "Working with them was a game-changer for our project. Their expertise and professionalism exceeded our expectations.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
  },
  {
    id: "testimonial-3",
    name: "James S.",
    profession: "Frontend Developer",
    rating: 5,
    description: "Their innovative solutions and quick turnaround time made our collaboration incredibly successful. Highly recommended!",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
  },
  {
    id: "testimonial-4",
    name: "Jane D.",
    profession: "UI/UX Designer",
    rating: 4.5,
    description: "The quality of work and communication throughout the project was outstanding. They delivered exactly what we needed.",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
  },
];

/* ── Project Info Data ── */
const FEATURES = [
  {
    icon: Users,
    title: "Skill Matching",
    description: "Connect with learners who need your expertise and teachers who can help you grow.",
  },
  {
    icon: Zap,
    title: "Fast Progress",
    description: "Learn efficiently with our proven matching algorithm and progress tracking.",
  },
  {
    icon: Shield,
    title: "Verified Users",
    description: "All users are verified to ensure a safe and trusted learning environment.",
  },
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    description: "Communicate instantly with your skill partners through our built-in messaging.",
  },
];

/* ── Skills Data ── */
const SKILLS = [
  { icon: Code, name: "Programming", color: "text-blue-400" },
  { icon: Palette, name: "Design", color: "text-pink-400" },
  { icon: Music, name: "Music", color: "text-purple-400" },
  { icon: Camera, name: "Photography", color: "text-amber-400" },
  { icon: Globe, name: "Languages", color: "text-green-400" },
  { icon: Lightbulb, name: "Business", color: "text-yellow-400" },
];

/* ── Hero Section Component ── */
function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
              Skill Swap
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 mb-8 max-w-2xl mx-auto">
            Exchange skills with others. Teach what you know, learn what you don't.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-6 text-lg font-semibold"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/auth')}
              className="border-white/20 text-white hover:bg-white/10 hover:text-white px-8 py-6 text-lg font-semibold"
            >
              Sign In
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Project Info Section ── */
function ProjectInfoSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-neutral-950/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Skill Swap?
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Our platform connects skilled individuals who want to learn and teach,
            creating a thriving community of knowledge exchange.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-colors"
            >
              <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Skills Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Popular Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {SKILLS.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 bg-neutral-800/50 border border-neutral-700 rounded-full px-4 py-2 hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <skill.icon className={`w-5 h-5 ${skill.color}`} />
                <span className="text-white">{skill.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Testimonials Section ── */
function TestimonialsSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-neutral-950/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Join thousands of satisfied learners and teachers who have transformed
            their skills through our platform.
          </p>
        </motion.div>

        <ContainerScroll className="h-[300vh]">
          <div className="sticky left-0 top-0 h-svh w-full py-12">
            <CardsContainer className="mx-auto size-full h-[450px] w-[350px]">
              {TESTIMONIALS.map((testimonial, index) => (
                <CardTransformed
                  arrayLength={TESTIMONIALS.length}
                  key={testimonial.id}
                  variant="dark"
                  index={index + 2}
                  role="article"
                >
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <ReviewStars
                      className="text-yellow-400"
                      rating={testimonial.rating}
                    />
                    <div className="mx-auto w-4/5 text-lg text-white">
                      <blockquote>{testimonial.description}</blockquote>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="!size-12 border border-stone-700">
                      <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="block text-lg font-semibold text-white">
                        {testimonial.name}
                      </span>
                      <span className="block text-sm text-neutral-400">
                        {testimonial.profession}
                      </span>
                    </div>
                  </div>
                </CardTransformed>
              ))}
            </CardsContainer>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}

/* ── Footer Component ── */
function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="py-12 px-4 md:px-8 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-neutral-900" />
            </div>
            <span className="text-2xl font-bold text-white">Skill Swap</span>
          </div>

          <div className="flex items-center gap-6 text-neutral-400">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-white text-neutral-900 hover:bg-neutral-100"
            >
              Get Started
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-neutral-500 text-sm">
          © {new Date().getFullYear()} Skill Swap. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ── Main Landing Page ── */
export default function LandingPage() {
  return (
    <BeamsBackground intensity="strong">
      <HeroSection />
      <ProjectInfoSection />
      <TestimonialsSection />
      <Footer />
    </BeamsBackground>
  );
}

