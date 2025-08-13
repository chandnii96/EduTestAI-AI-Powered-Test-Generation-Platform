import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  Zap,
  Brain,
  Target,
  Users,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Menu,
  X,
  Sparkles,
  Clock,
  BarChart3,
  Shield,
  Globe,
  Rocket,
  TrendingUp,
  Award,
  Lightbulb,
  Code,
  BookOpen,
  Calculator,
  Atom,
  Languages,
  Music,
  Palette,
  Camera,
  HeartHandshake,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const handleGenerateClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      navigate("/login"); 
      return;
    }
    navigate("/create"); 
  };
  

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const subjects = [
    {
      icon: <Code className="w-6 h-6" />,
      name: "Programming",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      name: "Mathematics",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Atom className="w-6 h-6" />,
      name: "Physics",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      name: "Literature",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Languages className="w-6 h-6" />,
      name: "Languages",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Music className="w-6 h-6" />,
      name: "Music Theory",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      name: "Art History",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Camera className="w-6 h-6" />,
      name: "Photography",
      color: "from-gray-500 to-slate-600",
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      name: "Psychology",
      color: "from-emerald-500 to-green-500",
    },
  ];

  const achievements = [
    {
      number: "50K+",
      label: "Tests Generated",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      number: "98%",
      label: "Accuracy Rate",
      icon: <Target className="w-6 h-6" />,
    },
    {
      number: "15K+",
      label: "Happy Users",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "4.9/5",
      label: "User Rating",
      icon: <Star className="w-6 h-6" />,
    },
    {
      number: "24/7",
      label: "AI Available",
      icon: <Clock className="w-6 h-6" />,
    },
    { number: "99.9%", label: "Uptime", icon: <Shield className="w-6 h-6" /> },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student @ MIT",
      content:
        "The AI understands context better than any human tutor I've worked with. My test scores improved by 40%!",
      rating: 5,
      avatar: "SC",
      color: "from-blue-500 to-purple-500",
    },
    {
      name: "Dr. Michael Ross",
      role: "Professor @ Stanford",
      content:
        "Revolutionary tool for educators. I've saved 15+ hours weekly on test creation while improving quality.",
      rating: 5,
      avatar: "MR",
      color: "from-green-500 to-teal-500",
    },
    {
      name: "Emma Rodriguez",
      role: "High School Teacher",
      content:
        "My students are more engaged than ever. The adaptive difficulty keeps everyone challenged appropriately.",
      rating: 5,
      avatar: "ER",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "James Wilson",
      role: "Training Manager @ Google",
      content:
        "We use this for all employee assessments. The analytics provide incredible insights into learning gaps.",
      rating: 5,
      avatar: "JW",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Dr. Lisa Park",
      role: "Medical School Director",
      content:
        "Essential for medical education. Creates comprehensive exams that truly test understanding, not memorization.",
      rating: 5,
      avatar: "LP",
      color: "from-indigo-500 to-purple-500",
    },
    {
      name: "Alex Thompson",
      role: "Certification Body CEO",
      content:
        "Scaled our certification program 10x while maintaining quality. The AI generates industry-standard questions.",
      rating: 5,
      avatar: "AT",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Neural Intelligence",
      description:
        "Advanced transformer models understand context, nuance, and learning objectives to create perfect assessments.",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Targeting",
      description:
        "Adaptive algorithms analyze performance patterns to generate questions at the optimal difficulty curve.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Speed",
      description:
        "Generate comprehensive tests in seconds with real-time feedback and instant detailed analytics.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Universal Knowledge",
      description:
        "Trained on diverse academic content spanning every subject from quantum physics to ancient literature.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Academic Integrity",
      description:
        "Built-in plagiarism detection and question uniqueness ensures authentic, original assessments every time.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Performance Analytics",
      description:
        "Deep insights into learning patterns, knowledge gaps, and progress tracking with predictive modeling.",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for individual learners",
      features: [
        "5 tests per month",
        "Basic subjects",
        "Standard difficulty",
        "Email support",
      ],
      color: "from-gray-600 to-gray-700",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "month",
      description: "Ideal for serious students & educators",
      features: [
        "Unlimited tests",
        "All subjects",
        "Advanced difficulty",
        "Priority support",
        "Analytics dashboard",
        "Export options",
      ],
      color: "from-blue-500 to-purple-600",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For institutions & organizations",
      features: [
        "White-label solution",
        "API access",
        "Custom integrations",
        "Dedicated support",
        "Advanced analytics",
        "Bulk user management",
      ],
      color: "from-purple-600 to-pink-600",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Cursor Glow Effect */}
      <div
        className="fixed w-96 h-96 pointer-events-none z-0 opacity-20"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
          transition: "all 0.1s ease-out",
        }}
      />

      <Navbar />

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-400 transition-colors"
            >
              Process
            </a>
            <a
              href="#testimonials"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-400 transition-colors"
            >
              Reviews
            </a>
            <a
              href="#pricing"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-400 transition-colors"
            >
              Pricing
            </a>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform">
              Start Free
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-6000"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-8 animate-fade-in hover:scale-105 transition-transform">
            <div className="relative">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <div className="absolute inset-0 animate-ping">
                <Sparkles className="w-5 h-5 text-blue-400 opacity-30" />
              </div>
            </div>
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Powered by Advanced AI • Trusted by 50K+ Users
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-8xl  font-medium font-black mb-8 leading-none mt-20">
            <span className="block animate-slide-up">Create Perfect</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent animate-slide-up animation-delay-200 bg-300% animate-gradient">
              AI Tests
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl text-gray-400 font-normal animate-slide-up animation-delay-400">
              in seconds
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-1xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in animation-delay-600">
            Transform any subject into comprehensive, personalized assessments.
            Our AI understands context, adapts difficulty, and provides instant
            insights
            <span className="block mt-2 text-lg text-blue-400">
              — trusted by educators worldwide.
            </span>
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20 animate-fade-in animation-delay-800 "
            
          >
            <button onClick={handleGenerateClick} className="group relative bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 px-8 py-1 rounded-xl font-semibold text-base hover:shadow-xl hover:shadow-purple-500/40 transition-all transform hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative flex items-center justify-center gap-2">
                <Rocket className="w-5 h-5" />
                Generate Test
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button className="group border-2 border-white/20 px-8 py-2 rounded-2xl font-semibold text-xl hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm flex items-center justify-center gap-3 hover:scale-105">
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Watch 2min Demo
            </button>
          </div>

          {/* Demo Preview */}
          <div className="relative max-w-5xl mx-auto animate-fade-in animation-delay-1000">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl border border-white/10 p-8 backdrop-blur-2xl hover:border-white/20 transition-all duration-500 hover:transform hover:scale-[1.02]">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-3">
                  {subjects.slice(0, 4).map((subject) => (
                    <div
                      key={subject.name}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${subject.color} shadow-lg`}
                    >
                      {subject.icon}
                    </div>
                  ))}
                </div>
                <div className="text-lg font-semibold text-gray-200">
                  AI Test Preview
                </div>
              </div>
              <div className="bg-black/60 border border-white/10 rounded-2xl p-6 mb-4">
                <div className="text-left text-gray-100 mb-2 font-medium">
                  Q1. What is the output of the following code snippet?
                </div>
                <pre className="bg-gray-900 rounded-lg p-4 text-sm text-blue-300 mb-2 overflow-x-auto">
                  {`def foo():
    return [i**2 for i in range(3)]
print(foo())`}
                </pre>
                <div className="flex flex-col gap-2">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-md text-left hover:scale-105 transition-all">
                    A) [1, 2, 3]
                  </button>
                  <button className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-2 rounded-md text-left hover:scale-105 transition-all">
                    B) [0, 1, 4]
                  </button>
                  <button className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-2 rounded-md text-left hover:scale-105 transition-all">
                    C) [1, 4, 9]
                  </button>
                  <button className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-2 rounded-md text-left hover:scale-105 transition-all">
                    D) [0, 1, 2]
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-400">
                  Programming • Medium
                </span>
                <button className="flex items-center gap-1 text-blue-400 hover:underline">
                  Next Question <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section
        className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-2 md:grid-cols-3 gap-8 text-center"
        id="achievements"
      >
        {achievements.map((ach) => (
          <div
            key={ach.label}
            className="flex flex-col items-center justify-center bg-gradient-to-br from-white/5 to-white/0 rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all"
          >
            <div className="mb-3">{ach.icon}</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {ach.number}
            </div>
            <div className="text-gray-300 mt-1">{ach.label}</div>
          </div>
        ))}
      </section>

      {/* Features Section */}

      <section id="features" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-400 via-blue-600 to-slate-400 bg-clip-text text-transparent">
            Why Choose TestGenius?
          </h2>
        </div>

        <div className="relative">
          <div className="flex animate-scroll gap-8 w-max">
            {/* First set of features */}
            {features.map((feature, index) => (
              <div
                key={`first-${feature.title}`}
                className="bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-teal-900/30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-cyan-400/20 flex flex-col items-center text-center min-w-[340px] min-h-[280px] hover:scale-105 hover:from-blue-800/40 hover:via-purple-800/30 hover:to-teal-800/40 transition-all duration-300 hover:border-cyan-300/30 hover:shadow-cyan-500/10 hover:shadow-2xl"
              >
                <div className="mb-6 text-cyan-300">{feature.icon}</div>
                <div className="text-2xl font-semibold mb-4 text-blue-100">
                  {feature.title}
                </div>
                <div className="text-slate-300">{feature.description}</div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {features.map((feature, index) => (
              <div
                key={`second-${feature.title}`}
                className="bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-teal-900/30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-cyan-400/20 flex flex-col items-center text-center min-w-[340px] min-h-[280px] hover:scale-105 hover:from-blue-800/40 hover:via-purple-800/30 hover:to-teal-800/40 transition-all duration-300 hover:border-cyan-300/30 hover:shadow-cyan-500/10 hover:shadow-2xl"
              >
                <div className="mb-6 text-cyan-300">{feature.icon}</div>
                <div className="text-2xl font-semibold mb-4 text-blue-100">
                  {feature.title}
                </div>
                <div className="text-slate-300">{feature.description}</div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 20s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 flex flex-col items-center text-center">
            <Lightbulb className="w-8 h-8 mb-4 text-yellow-400" />
            <div className="text-xl font-semibold mb-2">1. Choose Subject</div>
            <div className="text-gray-300">
              Pick from 20+ subjects or enter your own topic.
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 flex flex-col items-center text-center">
            <BookOpen className="w-8 h-8 mb-4 text-blue-400" />
            <div className="text-xl font-semibold mb-2">2. Set Difficulty</div>
            <div className="text-gray-300">
              Select easy, medium, or hard. The AI adapts to your level.
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 flex flex-col items-center text-center">
            <Award className="w-8 h-8 mb-4 text-purple-400" />
            <div className="text-xl font-semibold mb-2">
              3. Get Instant Test
            </div>
            <div className="text-gray-300">
              Receive a personalized, ready-to-use test in seconds.
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* Features Section */}

      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
          What Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className={`bg-gradient-to-br from-emerald-900/30 via-teal-900/20 to-cyan-900/30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-emerald-400/20 flex flex-col items-center text-center hover:scale-105 hover:from-emerald-800/40 hover:via-teal-800/30 hover:to-cyan-800/40 transition-all duration-500 hover:border-emerald-300/30 hover:shadow-emerald-500/20 hover:shadow-2xl animate-float-${
                index + 1
              } min-h-[320px]`}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600/40 to-teal-600/40 backdrop-blur-sm flex items-center justify-center text-2xl font-bold mb-6 border border-emerald-400/30 text-emerald-200 animate-pulse-glow">
                {t.avatar}
              </div>
              <div className="text-xl font-semibold mb-2 text-emerald-100">
                {t.name}
              </div>
              <div className="text-sm text-teal-300 mb-4">{t.role}</div>
              <div className="text-slate-300 mb-4 flex-grow">"{t.content}"</div>
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-twinkle"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-violet-300 via-purple-200 to-fuchsia-300 bg-clip-text text-transparent">
            Pricing Plans
          </h2>
        </div>

        <div className="relative">
          <div className="flex animate-scroll gap-8 w-max">
            {/* First set of pricing plans */}
            {pricingPlans.map((plan, index) => (
              <div
                key={`first-${plan.name}`}
                className={`relative bg-gradient-to-br from-violet-900/30 via-purple-900/20 to-fuchsia-900/30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border ${
                  plan.popular ? "border-violet-400/40" : "border-violet-400/20"
                } flex flex-col items-center text-center min-w-[360px] min-h-[400px] hover:scale-105 hover:from-violet-800/40 hover:via-purple-800/30 hover:to-fuchsia-800/40 transition-all duration-300 hover:border-violet-300/50 hover:shadow-violet-500/10 hover:shadow-2xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg border border-violet-400/30">
                    Most Popular
                  </div>
                )}
                <div className="text-2xl font-bold mb-3 text-violet-100">
                  {plan.name}
                </div>
                <div className="text-4xl font-extrabold mb-3 text-purple-200">
                  {plan.price}
                  <span className="text-lg font-normal text-slate-400">
                    /{plan.period}
                  </span>
                </div>
                <div className="mb-6 text-slate-300">{plan.description}</div>
                <ul className="mb-8 space-y-3 text-left flex-grow">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-auto px-8 py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 border border-violet-400/30"
                      : "bg-white/10 hover:bg-white/20 border border-white/20"
                  } text-white backdrop-blur-sm`}
                >
                  {plan.popular
                    ? "Start Pro"
                    : plan.name === "Starter"
                    ? "Start Free"
                    : "Contact Us"}
                </button>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {pricingPlans.map((plan, index) => (
              <div
                key={`second-${plan.name}`}
                className={`relative bg-gradient-to-br from-violet-900/30 via-purple-900/20 to-fuchsia-900/30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border ${
                  plan.popular ? "border-violet-400/40" : "border-violet-400/20"
                } flex flex-col items-center text-center min-w-[360px] min-h-[400px] hover:scale-105 hover:from-violet-800/40 hover:via-purple-800/30 hover:to-fuchsia-800/40 transition-all duration-300 hover:border-violet-300/50 hover:shadow-violet-500/10 hover:shadow-2xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg border border-violet-400/30">
                    Most Popular
                  </div>
                )}
                <div className="text-2xl font-bold mb-3 text-violet-100">
                  {plan.name}
                </div>
                <div className="text-4xl font-extrabold mb-3 text-purple-200">
                  {plan.price}
                  <span className="text-lg font-normal text-slate-400">
                    /{plan.period}
                  </span>
                </div>
                <div className="mb-6 text-slate-300">{plan.description}</div>
                <ul className="mb-8 space-y-3 text-left flex-grow">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-auto px-8 py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 border border-violet-400/30"
                      : "bg-white/10 hover:bg-white/20 border border-white/20"
                  } text-white backdrop-blur-sm`}
                >
                  {plan.popular
                    ? "Start Pro"
                    : plan.name === "Starter"
                    ? "Start Free"
                    : "Contact Us"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes scroll-reverse {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }

          @keyframes float-1 {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes float-2 {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }

          @keyframes float-3 {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
            }
          }

          @keyframes pulse-glow {
            0%,
            100% {
              box-shadow: 0 0 20px rgba(52, 211, 153, 0.3);
            }
            50% {
              box-shadow: 0 0 30px rgba(52, 211, 153, 0.5);
            }
          }

          @keyframes twinkle {
            0%,
            100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(1.1);
            }
          }

          .animate-scroll {
            animation: scroll 25s linear infinite;
          }

          .animate-scroll-reverse {
            animation: scroll-reverse 30s linear infinite;
          }

          .animate-float-1 {
            animation: float-1 4s ease-in-out infinite;
          }

          .animate-float-2 {
            animation: float-2 5s ease-in-out infinite 1s;
          }

          .animate-float-3 {
            animation: float-3 4.5s ease-in-out infinite 2s;
          }

          .animate-pulse-glow {
            animation: pulse-glow 3s ease-in-out infinite;
          }

          .animate-twinkle {
            animation: twinkle 2s ease-in-out infinite;
          }

          .animate-scroll:hover,
          .animate-scroll-reverse:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-400 bg-gradient-to-t from-black via-gray-900 to-black border-t border-white/10">
        <div className="mb-2">
          &copy; {new Date().getFullYear()} TestGenius. All rights reserved.
        </div>
        <div className="flex justify-center gap-4 text-sm">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}
