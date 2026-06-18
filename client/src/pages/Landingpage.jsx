import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/context.jsx";

const navigation = [
  { label: "Courses", path: "#courses" },
  { label: "Become an Instructor", path: "#instructor" },
  { label: "Pricing", path: "#pricing" },
];

const features = [
  {
    icon: "ti-video-badge",
    title: "Expert-Led Video Courses",
    desc: "Learn from industry professionals with structured, bite-sized lessons.",
    color: "green",
  },
  {
    icon: "ti-certificate",
    title: "Verified Certificates",
    desc: "Earn recognized certificates to showcase your skills on LinkedIn.",
    color: "amber",
  },
  {
    icon: "ti-devices",
    title: "Flexible Learning",
    desc: "Study at your own pace, on any device, anytime that suits you.",
    color: "blue",
  },
];

const featureStyles = {
  green: { bg: "bg-[#E8F4ED]", icon: "text-[#3B8C5A]" },
  amber: { bg: "bg-[#FEF4E4]", icon: "text-[#B07A1A]" },
  blue: { bg: "bg-[#E6F0FB]", icon: "text-[#2A6CB5]" },
};

export default function LandingPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate(user.role === "instructor" ? "/instructordashborad" : "/studentdashborad");
    } else {
      navigate("/register");
    }
  };
  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans antialiased text-[#1A1A1A]">
      {/* 1. Header / Navbar */}
      <header className="bg-white border-b border-[#EAE8E3] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-[34px] h-[34px] bg-[#E8F4ED] rounded-[9px] flex items-center justify-center">
              <i className="ti ti-layers-subtract text-[#3B8C5A] text-[17px]" />
            </div>
            <span className="text-[15px] font-semibold">LearnHub</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.path}
                className="text-[13.5px] text-[#666] hover:text-[#1A1A1A] transition"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center h-9 px-4 bg-[#3B8C5A] text-white text-[13px] font-medium rounded-[9px] hover:bg-[#2F7048] transition"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[13.5px] font-medium text-[#666] hover:text-[#1A1A1A] px-3 py-2 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center h-9 px-4 bg-[#3B8C5A] text-white text-[13px] font-medium rounded-[9px] hover:bg-[#2F7048] transition"
                >
                  Start Learning
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-20 text-center">
        <span className="inline-block bg-[#E8F4ED] text-[#2F7048] text-[11px] font-medium px-2.5 py-1 rounded-full mb-4">
          Never Stop Learning
        </span>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.2] mb-4 max-w-2xl mx-auto">
          Advance your career with practical, expert-led online courses.
        </h1>
        <p className="text-[14px] text-[#666] max-w-lg mx-auto mb-7 leading-relaxed">
          Join LearnHub to master programming, data science, and design with
          beautiful, interactive tools and a structured curriculum.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleGetStarted}
            className="w-full sm:w-auto h-11 px-6 bg-[#3B8C5A] text-white text-[14px] font-medium rounded-[10px] hover:bg-[#2F7048] transition shadow-sm"
          >
            Explore All Courses
          </button>
          <button className="w-full sm:w-auto h-11 px-6 bg-white border border-[#EAE8E3] text-[#1A1A1A] text-[14px] font-medium rounded-[10px] hover:bg-[#F0F0EC] transition">
            View Pricing
          </button>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="bg-white border-t border-b border-[#EAE8E3] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[18px] font-semibold">
              Why Learn on LearnHub?
            </h2>
            <p className="text-[13px] text-[#999] mt-1">
              Simple, clean, and direct learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, idx) => {
              const s = featureStyles[f.color];
              return (
                <div
                  key={idx}
                  className="border border-[#EAE8E3] rounded-xl p-5 bg-[#F7F5F2]/30"
                >
                  <div
                    className={`w-10 h-10 ${s.bg} rounded-[9px] flex items-center justify-center mb-4`}
                  >
                    <i className={`ti ${f.icon} ${s.icon} text-[18px]`} />
                  </div>
                  <h3 className="text-[14px] font-medium mb-1.5">{f.title}</h3>
                  <p className="text-[12.5px] text-[#666] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CTA / Trust Banner */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-white border border-[#EAE8E3] rounded-2xl p-8 md:p-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            Ready to transform your skills?
          </h2>
          <p className="text-[13px] text-[#666] mb-6 max-w-sm mx-auto">
            Get unlimited access to over 100+ high-quality tracks today. Cancel
            anytime.
          </p>
          <button
            onClick={handleGetStarted}
            className="h-10 px-6 bg-[#3B8C5A] text-white text-[13.5px] font-medium rounded-[9px] hover:bg-[#2F7048] transition"
          >
            Create Free Account
          </button>
        </div>
      </section>

      {/* 5. Simple Footer */}
      <footer className="border-t border-[#EAE8E3] bg-white py-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-[#AAA]">
          <p>© 2026 LearnHub Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-[#666] transition">
              Privacy
            </a>
            <a href="#terms" className="hover:text-[#666] transition">
              Terms
            </a>
            <a href="#support" className="hover:text-[#666] transition">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
