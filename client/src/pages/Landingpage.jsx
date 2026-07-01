import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/context.jsx";

// ─── Static Data ───────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
];

const stats = [
  { value: "12,000+", label: "Active Students" },
  { value: "340+", label: "Expert Courses" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50+", label: "Top Instructors" },
];

const features = [
  {
    icon: "ti-brain",
    title: "AI-Powered Tutor",
    desc: "Get instant answers to any learning question with our built-in AI assistant powered by Groq.",
    color: "green",
  },
  {
    icon: "ti-video",
    title: "Expert-Led Courses",
    desc: "Learn from industry professionals with structured, hands-on video lessons.",
    color: "blue",
  },
  {
    icon: "ti-certificate",
    title: "Verified Certificates",
    desc: "Earn recognized certificates to showcase your skills to employers.",
    color: "amber",
  },
  {
    icon: "ti-device-laptop",
    title: "Learn Anywhere",
    desc: "Study at your own pace on any device — desktop, tablet, or mobile.",
    color: "purple",
  },
  {
    icon: "ti-shield-check",
    title: "Role-Based Access",
    desc: "Separate dashboards for students and instructors with secure authentication.",
    color: "green",
  },
  {
    icon: "ti-chart-bar",
    title: "Track Your Progress",
    desc: "Visual progress tracking across all your enrolled courses in one place.",
    color: "blue",
  },
];

const colorMap = {
  green: { bg: "bg-[#E8F4ED]", text: "text-[#3B8C5A]" },
  blue: { bg: "bg-[#E6F0FB]", text: "text-[#2A6CB5]" },
  amber: { bg: "bg-[#FEF4E4]", text: "text-[#B07A1A]" },
  purple: { bg: "bg-[#F0EBF8]", text: "text-[#7C3AED]" },
};

const steps = [
  {
    num: "01",
    title: "Create Your Account",
    desc: "Sign up in seconds as a Student or Instructor — no credit card needed.",
    icon: "ti-user-plus",
  },
  {
    num: "02",
    title: "Browse or Create Courses",
    desc: "Students explore hundreds of courses. Instructors publish their own.",
    icon: "ti-books",
  },
  {
    num: "03",
    title: "Learn with AI Support",
    desc: "Ask your AI tutor anything as you study and get instant, clear explanations.",
    icon: "ti-robot",
  },
  {
    num: "04",
    title: "Earn Your Certificate",
    desc: "Complete a course and download a verified certificate to share.",
    icon: "ti-certificate",
  },
];

const plans = [
  {
    name: "Free",
    price: "0",
    desc: "Perfect for getting started",
    features: [
      "Access to free courses",
      "AI Tutor (limited)",
      "Progress tracking",
      "Community support",
    ],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "12",
    desc: "Best for serious learners",
    features: [
      "All Free features",
      "Unlimited AI Tutor",
      "Premium courses",
      "Verified certificates",
      "Priority support",
    ],
    cta: "Get Pro",
    highlight: true,
  },
  {
    name: "Instructor",
    price: "19",
    desc: "For educators & creators",
    features: [
      "All Pro features",
      "Create unlimited courses",
      "Student analytics",
      "Revenue dashboard",
      "AI course assistant",
    ],
    cta: "Start Teaching",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Is LearnHub free to use?",
    a: "Yes! You can sign up for free and access all free courses immediately. Premium courses require a Pro plan.",
  },
  {
    q: "How does the AI Tutor work?",
    a: "Our AI Tutor is powered by Groq's LLaMA model. Ask it any question about your course or topic and get clear, instant answers.",
  },
  {
    q: "Can I become an instructor?",
    a: "Absolutely. Register as an Instructor, create your courses, and start teaching. You get a full dashboard with student analytics.",
  },
  {
    q: "Are certificates recognized?",
    a: "LearnHub certificates are digitally verified and can be shared on LinkedIn or your portfolio.",
  },
];

// ─── FAQ Item (with toggle) ───────────────────────────────────────────────────
import { useState } from "react";

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-[12px] transition-all ${open ? "border-[#3B8C5A]/30 bg-[#F7FAF8]" : "border-[#EAE8E3] bg-white"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-[14px] font-medium text-[#1A1A1A]">{q}</span>
        <i
          className={`ti ${open ? "ti-minus" : "ti-plus"} text-[#3B8C5A] text-[16px] flex-shrink-0 ml-3`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-[13px] text-[#666] leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LandingPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const goToDashboard = () =>
    navigate(
      user?.role === "instructor"
        ? "/instructordashborad"
        : "/studentdashborad",
    );

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-[#1A1A1A]">
      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#EAE8E3]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-14 h-14 rounded-lg flex items-center justify-center">
              <img
                src="/project logo.png"
                alt="LMS With AI Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col">
              <h1 className="text-lg font-bold leading-none text-[#1A1A1A]">
                LMS<span className="text-[#3B8C5A]">With</span> AI
              </h1>
              <p className="text-xs text-gray-500">
                Learning Management System
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[13.5px] text-[#555] hover:text-[#3B8C5A] transition font-medium"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={goToDashboard}
                className="h-9 px-4 bg-[#3B8C5A] hover:bg-[#2F7048] text-white text-[13px] font-medium rounded-[9px] transition flex items-center gap-1.5"
              >
                <i className="ti ti-layout-dashboard text-[14px]" /> Dashboard
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[13.5px] font-medium text-[#555] hover:text-[#1A1A1A] px-3 py-2 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-[#3B8C5A] hover:bg-[#2F7048] text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-b from-[#F0FAF4] to-white pt-20 pb-24 px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#3B8C5A]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#E8F4ED] border border-[#B6D9C5] text-[#2F7048] px-3.5 py-1.5 rounded-full text-[12px] font-semibold mb-6">
            <span className="w-1.5 h-1.5 bg-[#3B8C5A] rounded-full animate-pulse" />
            AI-Powered Learning Platform
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-[58px] font-black tracking-tight leading-[1.1] text-[#0D1F13] mb-5">
            Learn Smarter with
            <br />
            <span className="text-[#3B8C5A]">AI</span> by Your Side
          </h1>

          {/* Subheading */}
          <p className="text-[16px] md:text-[17px] text-[#555] max-w-xl mx-auto leading-relaxed mb-9">
            LearnHub combines expert-led courses with an intelligent AI tutor —
            so you never get stuck and always move forward.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <Link
              to="/register"
              className="w-full sm:w-auto h-12 px-7 bg-[#3B8C5A] hover:bg-[#2F7048] text-white font-semibold rounded-[10px] text-[15px] transition shadow-lg shadow-[#3B8C5A]/20 flex items-center justify-center gap-2"
            >
              Start Learning Free
              <i className="ti ti-arrow-right text-[16px]" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto h-12 px-7 bg-white border border-[#EAE8E3] hover:border-[#3B8C5A]/40 text-[#1A1A1A] font-semibold rounded-[10px] text-[15px] transition flex items-center justify-center gap-2"
            >
              <i className="ti ti-play text-[#3B8C5A] text-[14px]" />
              Browse Courses
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white border border-[#EAE8E3] rounded-[14px] py-4 px-3 shadow-sm"
              >
                <p className="text-[24px] font-black text-[#3B8C5A]">
                  {s.value}
                </p>
                <p className="text-[12px] text-[#888] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6 bg-[#F7F5F2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[12px] font-semibold text-[#3B8C5A] uppercase tracking-widest">
              Everything You Need
            </span>
            <h2 className="text-[30px] md:text-[36px] font-bold text-[#1A1A1A] mt-2">
              Why students choose LearnHub
            </h2>
            <p className="text-[14px] text-[#888] mt-2 max-w-md mx-auto">
              A complete learning ecosystem — courses, AI support, certificates,
              and progress tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => {
              const c = colorMap[f.color];
              return (
                <div
                  key={f.title}
                  className="bg-white border border-[#EAE8E3] rounded-2xl p-6 hover:border-[#3B8C5A]/30 hover:shadow-md transition group"
                >
                  <div
                    className={`w-11 h-11 ${c.bg} rounded-[10px] flex items-center justify-center mb-4`}
                  >
                    <i className={`ti ${f.icon} ${c.text} text-[20px]`} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-[#1A1A1A] mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-[13px] text-[#777] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[12px] font-semibold text-[#3B8C5A] uppercase tracking-widest">
              Simple Process
            </span>
            <h2 className="text-[30px] md:text-[36px] font-bold text-[#1A1A1A] mt-2">
              Start learning in 4 steps
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="relative flex flex-col items-center text-center"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-[#EAE8E3] z-0" />
                )}
                {/* Icon circle */}
                <div className="relative z-10 w-12 h-12 bg-[#E8F4ED] border-2 border-[#3B8C5A]/20 rounded-full flex items-center justify-center mb-4">
                  <i className={`ti ${s.icon} text-[#3B8C5A] text-[20px]`} />
                </div>
                <span className="text-[11px] font-bold text-[#3B8C5A] mb-1">
                  {s.num}
                </span>
                <h3 className="text-[14px] font-semibold text-[#1A1A1A] mb-1">
                  {s.title}
                </h3>
                <p className="text-[12.5px] text-[#888] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI HIGHLIGHT BANNER ── */}
      <section className="py-16 px-6 bg-[#F0FAF4]">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-[#B6D9C5] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 bg-[#E8F4ED] rounded-2xl flex items-center justify-center flex-shrink-0">
              <i className="ti ti-robot text-[#3B8C5A] text-[32px]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-[22px] font-bold text-[#1A1A1A] mb-2">
                Meet your AI Tutor — powered by Groq
              </h3>
              <p className="text-[14px] text-[#666] leading-relaxed max-w-lg">
                Stuck on a concept? Just ask. Our AI tutor gives instant, clear
                explanations — available 24/7 inside your dashboard. No waiting,
                no searching.
              </p>
            </div>
            <Link
              to="/register"
              className="flex-shrink-0 h-11 px-6 bg-[#3B8C5A] hover:bg-[#2F7048] text-white font-semibold rounded-[10px] text-[13.5px] transition flex items-center gap-2"
            >
              Try It Free
              <i className="ti ti-arrow-right text-[14px]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[12px] font-semibold text-[#3B8C5A] uppercase tracking-widest">
              Pricing
            </span>
            <h2 className="text-[30px] md:text-[36px] font-bold text-[#1A1A1A] mt-2">
              Simple, transparent pricing
            </h2>
            <p className="text-[14px] text-[#888] mt-2">
              Start free. Upgrade when you're ready.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-7 flex flex-col transition
                  ${
                    p.highlight
                      ? "border-[#3B8C5A] bg-[#F0FAF4] shadow-xl shadow-[#3B8C5A]/10 relative"
                      : "border-[#EAE8E3] bg-white"
                  }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#3B8C5A] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-5">
                  <p className="text-[14px] font-semibold text-[#555]">
                    {p.name}
                  </p>
                  <p className="text-[13px] text-[#AAA] mt-0.5">{p.desc}</p>
                  <div className="flex items-end gap-1 mt-3">
                    <span className="text-[38px] font-black text-[#1A1A1A] leading-none">
                      ${p.price}
                    </span>
                    <span className="text-[13px] text-[#AAA] mb-1.5">
                      /month
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-[13px] text-[#444]"
                    >
                      <i className="ti ti-circle-check text-[#3B8C5A] text-[15px] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={`h-10 rounded-[9px] text-[13.5px] font-semibold flex items-center justify-center transition
                    ${
                      p.highlight
                        ? "bg-[#3B8C5A] hover:bg-[#2F7048] text-white"
                        : "bg-[#F7F5F2] hover:bg-[#EEE] text-[#1A1A1A] border border-[#EAE8E3]"
                    }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-[#F7F5F2]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[12px] font-semibold text-[#3B8C5A] uppercase tracking-widest">
              FAQ
            </span>
            <h2 className="text-[30px] font-bold text-[#1A1A1A] mt-2">
              Common questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-6 bg-[#3B8C5A]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[32px] md:text-[40px] font-black text-white leading-tight mb-4">
            Ready to start your
            <br />
            learning journey?
          </h2>
          <p className="text-[15px] text-[#C5E5D2] mb-9 max-w-md mx-auto">
            Join 12,000+ learners already using LearnHub. Free to start, no
            credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register"
              className="w-full sm:w-auto h-12 px-8 bg-white hover:bg-[#F0FAF4] text-[#3B8C5A] font-bold rounded-[10px] text-[15px] transition flex items-center justify-center gap-2"
            >
              Create Free Account
              <i className="ti ti-arrow-right text-[16px]" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto h-12 px-8 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-[10px] text-[15px] border border-white/20 transition flex items-center justify-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0D1F13] text-white pt-14 pb-6 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Top */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#3B8C5A] rounded-lg flex items-center justify-center">
                  <img
                    src="/project logo.png"
                    alt="LMS With AI"
                    className="w-7 h-7 object-contain"
                  />
                </div>

                <h2 className="text-xl font-bold">
                  LMS<span className="text-[#5CB87A]">With</span> AI
                </h2>
              </div>

              <p className="text-[#8DA796] text-sm leading-6">
                LMSWithAI is a modern Learning Management System that empowers
                students and instructors with AI-powered learning, course
                management, and progress tracking.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>

              <ul className="space-y-3 text-[#8DA796] text-sm">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>

                <li>
                  <a href="#pricing" className="hover:text-white">
                    Pricing
                  </a>
                </li>

                <li>
                  <Link to="/login" className="hover:text-white">
                    Login
                  </Link>
                </li>

                <li>
                  <Link to="/register" className="hover:text-white">
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Platform</h3>

              <ul className="space-y-3 text-[#8DA796] text-sm">
                <li>📚 Online Courses</li>
                <li>🤖 AI Learning Assistant</li>
                <li>👨‍🏫 Instructor Dashboard</li>
                <li>📈 Student Progress</li>
                <li>🏆 Certificates</li>
              </ul>
            </div>

            {/* Developer */}
            <div>
              <h3 className="font-semibold text-lg mb-4">
                Full Stack Developer
              </h3>

              <h4 className="text-[#5CB87A] font-bold text-xl">
                Muhammad Farooq
              </h4>

              <p className="text-[#8DA796] text-sm mt-3 leading-6">
                Full-Stack MERN Developer passionate about building scalable,
                AI-powered web applications with React, Node.js, Express.js, and
                MongoDB.
              </p>

              <div className="flex gap-4 mt-5 text-xl">
                <a href="#" className="hover:text-[#5CB87A]">
                  <i className="ti ti-brand-github"></i>
                </a>

                <a href="#" className="hover:text-[#5CB87A]">
                  <i className="ti ti-brand-linkedin"></i>
                </a>

                <a href="#" className="hover:text-[#5CB87A]">
                  <i className="ti ti-mail"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-[#234030] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#8DA796] text-sm">
              © {new Date().getFullYear()} LMSWithAI. All Rights Reserved.
            </p>

            <p className="text-sm text-[#8DA796]">
              Designed & Developed with ❤️ by{" "}
              <span className="text-[#5CB87A] font-semibold">
                Muhammad Farooq
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
