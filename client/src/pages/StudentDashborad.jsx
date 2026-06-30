import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/context.jsx";
import AiChat from "../components/AiChat.jsx";

// ─── Category colors ───────────────────────────────────────────────────────────
const categoryStyle = {
  Programming: { bg: "bg-[#E8F4ED]", text: "text-[#3B8C5A]", bar: "bg-[#3B8C5A]", icon: "ti-code" },
  Design:      { bg: "bg-[#FBEAF0]", text: "text-[#A03560]", bar: "bg-[#D4507A]", icon: "ti-palette" },
  Business:    { bg: "bg-[#FEF4E4]", text: "text-[#B07A1A]", bar: "bg-[#C88A20]", icon: "ti-briefcase" },
  Marketing:   { bg: "bg-[#E6F0FB]", text: "text-[#2A6CB5]", bar: "bg-[#3A7DC9]", icon: "ti-speakerphone" },
  Other:       { bg: "bg-[#F0EDE8]", text: "text-[#777]",    bar: "bg-[#AAA]",    icon: "ti-book" },
};

const navItems = [
  { icon: "ti-layout-dashboard", label: "Dashboard" },
  { icon: "ti-books",            label: "Browse Courses" },
  { icon: "ti-robot",            label: "AI Tutor" },
  { icon: "ti-certificate",      label: "Certificates" },
  { icon: "ti-settings",         label: "Settings" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function getInitials(email = "") { return email ? email.slice(0, 2).toUpperCase() : "U"; }
function getGreeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}
function getStyle(category) { return categoryStyle[category] || categoryStyle.Other; }

// ─── Skeleton loader ───────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white border border-[#EAE8E3] rounded-xl p-4 flex gap-3.5 animate-pulse">
      <div className="w-11 h-11 bg-[#F0EDE8] rounded-[10px] flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-[#F0EDE8] rounded w-3/4" />
        <div className="h-3 bg-[#F0EDE8] rounded w-1/2" />
        <div className="h-2 bg-[#F0EDE8] rounded w-full mt-2" />
      </div>
    </div>
  );
}

// ─── Course detail modal ───────────────────────────────────────────────────────
function CourseModal({ course, onClose }) {
  if (!course) return null;
  const s = getStyle(course.category);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-[#EAE8E3] w-full max-w-lg p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${s.bg} rounded-[10px] flex items-center justify-center flex-shrink-0`}>
              <i className={`ti ${s.icon} ${s.text} text-[22px]`} />
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-[#1A1A1A] leading-tight">{course.title}</h3>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.text} mt-1 inline-block`}>
                {course.category}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-[#AAA] hover:text-[#555] transition flex-shrink-0">
            <i className="ti ti-x text-[18px]" />
          </button>
        </div>

        {/* Description */}
        <p className="text-[13px] text-[#555] leading-relaxed mb-4">{course.description}</p>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-[#F7F5F2] rounded-[10px] p-3">
            <p className="text-[11px] text-[#AAA] mb-0.5">Price</p>
            <p className="text-[15px] font-semibold text-[#1A1A1A]">
              {course.price === 0 ? "Free" : `$${course.price}`}
            </p>
          </div>
          <div className="bg-[#F7F5F2] rounded-[10px] p-3">
            <p className="text-[11px] text-[#AAA] mb-0.5">Lectures</p>
            <p className="text-[15px] font-semibold text-[#1A1A1A]">
              {course.lectures?.length ?? 0} lessons
            </p>
          </div>
        </div>

        <button className="w-full h-10 bg-[#3B8C5A] hover:bg-[#2F7048] text-white text-[13.5px] font-medium rounded-[10px] transition">
          Enroll Now
        </button>
      </div>
    </div>
  );
}

// ─── Course card ───────────────────────────────────────────────────────────────
function CourseCard({ course, onClick }) {
  const s = getStyle(course.category);
  return (
    <div
      onClick={() => onClick(course)}
      className="bg-white border border-[#EAE8E3] rounded-xl p-4 flex items-center gap-3.5 cursor-pointer hover:border-[#3B8C5A]/40 hover:shadow-sm transition group"
    >
      <div className={`w-11 h-11 ${s.bg} rounded-[10px] flex items-center justify-center flex-shrink-0`}>
        <i className={`ti ${s.icon} ${s.text} text-[20px]`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-medium text-[#1A1A1A] group-hover:text-[#3B8C5A] transition truncate">
          {course.title}
        </p>
        <p className="text-[12px] text-[#AAA] mt-0.5 truncate">
          {course.category} · {course.lectures?.length ?? 0} lessons
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${s.bg} ${s.text}`}>
          {course.price === 0 ? "Free" : `$${course.price}`}
        </span>
        <i className="ti ti-chevron-right text-[#CCC] text-[14px] group-hover:text-[#3B8C5A] transition" />
      </div>
    </div>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, user, onLogout }) {
  return (
    <aside className="w-[220px] bg-white border-r border-[#EAE8E3] flex flex-col px-4 py-6 fixed top-0 left-0 h-full z-30">
      <div className="flex items-center gap-2.5 px-2 mb-6">
        <div className="w-[34px] h-[34px] bg-[#E8F4ED] rounded-[9px] flex items-center justify-center">
          <i className="ti ti-layers-subtract text-[#3B8C5A] text-[17px]" />
        </div>
        <span className="text-[15px] font-semibold text-[#1A1A1A]">LearnHub</span>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-[9px] text-[13.5px] transition text-left w-full
              ${active === item.label ? "bg-[#E8F4ED] text-[#2F7048] font-medium" : "text-[#666] hover:bg-[#F0F0EC]"}`}
          >
            <i className={`ti ${item.icon} text-[17px]`} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-2">
        <div className="flex items-center gap-2.5 px-2.5 py-2">
          <div className="w-9 h-9 rounded-full bg-[#E8F4ED] flex items-center justify-center text-[13px] font-semibold text-[#3B8C5A] flex-shrink-0">
            {getInitials(user?.email)}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[#1A1A1A] truncate">{user?.email || "Student"}</p>
            <p className="text-[11.5px] text-[#AAA]">Student</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-2.5 py-2 rounded-[9px] text-[13px] text-red-500 hover:bg-red-50 transition"
        >
          <i className="ti ti-logout text-[16px]" />
          Logout
        </button>
      </div>
    </aside>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
function StudentDashborad() {
  const [active, setActive]         = useState("Dashboard");
  const [courses, setCourses]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [search, setSearch]         = useState("");
  const [filterCat, setFilterCat]   = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("/api/courses");
        // apiResponse structure: { success, message, data: { count, courses } }
        setCourses(res.data?.data?.courses || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleLogout = () => { logoutUser(); navigate("/login"); };

  // Filter logic
  const categories = ["All", ...Object.keys(categoryStyle)];
  const filtered = courses.filter((c) => {
    const matchCat = filterCat === "All" || c.category === filterCat;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Stats
  const freeCount  = courses.filter((c) => c.price === 0).length;
  const paidCount  = courses.length - freeCount;

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex">
      <Sidebar active={active} setActive={setActive} user={user} onLogout={handleLogout} />

      <main className="ml-[220px] flex-1 p-7">
        {/* Topbar */}
        <div className="flex justify-between items-start mb-7">
          <div>
            <h1 className="text-[20px] font-semibold text-[#1A1A1A]">
              {getGreeting()}, {user?.email ? user.email.split("@")[0] : "Student"}
            </h1>
            <p className="text-[13px] text-[#999] mt-1">
              {active === "AI Tutor" ? "Chat with your AI learning assistant" : "Browse and enroll in available courses"}
            </p>
          </div>
          <button className="w-9 h-9 bg-white border border-[#EAE8E3] rounded-[9px] flex items-center justify-center hover:bg-[#F0F0EC] transition">
            <i className="ti ti-bell text-[#888] text-[18px]" />
          </button>
        </div>

        {/* AI Tutor tab */}
        {active === "AI Tutor" ? (
          <AiChat />
        ) : active === "Certificates" ? (
          <div className="bg-white border border-[#EAE8E3] rounded-xl p-10 text-center">
            <div className="w-12 h-12 bg-[#FEF4E4] rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ti ti-certificate text-[#B07A1A] text-[22px]" />
            </div>
            <p className="text-[14px] font-medium text-[#555]">Certificates</p>
            <p className="text-[12.5px] text-[#AAA] mt-1">Complete courses to earn certificates</p>
          </div>
        ) : active === "Settings" ? (
          <div className="bg-white border border-[#EAE8E3] rounded-xl p-10 text-center">
            <div className="w-12 h-12 bg-[#F0EDE8] rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ti ti-settings text-[#AAA] text-[22px]" />
            </div>
            <p className="text-[14px] font-medium text-[#555]">Settings</p>
            <p className="text-[12.5px] text-[#AAA] mt-1">Settings panel coming soon</p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white border border-[#EAE8E3] rounded-xl p-4">
                <p className="text-[12px] text-[#AAA] mb-1.5">Total Courses</p>
                <p className="text-[22px] font-semibold text-[#1A1A1A]">{loading ? "—" : courses.length}</p>
                <p className="text-[12px] text-[#3B8C5A] mt-1">Available to enroll</p>
              </div>
              <div className="bg-white border border-[#EAE8E3] rounded-xl p-4">
                <p className="text-[12px] text-[#AAA] mb-1.5">Free Courses</p>
                <p className="text-[22px] font-semibold text-[#1A1A1A]">{loading ? "—" : freeCount}</p>
                <p className="text-[12px] text-[#3B8C5A] mt-1">No cost to join</p>
              </div>
              <div className="bg-white border border-[#EAE8E3] rounded-xl p-4">
                <p className="text-[12px] text-[#AAA] mb-1.5">Premium Courses</p>
                <p className="text-[22px] font-semibold text-[#1A1A1A]">{loading ? "—" : paidCount}</p>
                <p className="text-[12px] text-[#3B8C5A] mt-1">Expert content</p>
              </div>
            </div>

            {/* Search + Filter bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-[#AAA] text-[15px]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#EAE8E3] rounded-[10px] text-[13.5px] text-[#1A1A1A] placeholder-[#BDBAB4] focus:outline-none focus:border-[#3B8C5A] transition"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setFilterCat(cat)}
                    className={`px-3 py-2 rounded-[9px] text-[12.5px] font-medium transition border
                      ${filterCat === cat
                        ? "bg-[#3B8C5A] text-white border-[#3B8C5A]"
                        : "bg-white text-[#666] border-[#EAE8E3] hover:border-[#3B8C5A] hover:text-[#3B8C5A]"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Course list header */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-[15px] font-semibold text-[#1A1A1A]">
                All Courses
                {!loading && <span className="ml-2 text-[12px] font-normal text-[#AAA]">({filtered.length})</span>}
              </h2>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-[10px] flex items-center gap-2">
                <i className="ti ti-alert-circle text-red-500 text-[16px]" />
                <p className="text-[13px] text-red-600">{error}</p>
                <button onClick={() => window.location.reload()} className="ml-auto text-[12px] text-red-500 underline">Retry</button>
              </div>
            )}

            {loading && <div className="flex flex-col gap-2.5">{[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}</div>}

            {!loading && !error && filtered.length === 0 && (
              <div className="bg-white border border-[#EAE8E3] rounded-xl p-10 text-center">
                <div className="w-12 h-12 bg-[#F0EDE8] rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ti ti-books text-[#AAA] text-[22px]" />
                </div>
                <p className="text-[14px] font-medium text-[#555]">No courses found</p>
                <p className="text-[12.5px] text-[#AAA] mt-1">Try changing your search or filter</p>
              </div>
            )}

            {!loading && !error && filtered.length > 0 && (
              <div className="flex flex-col gap-2.5">
                {filtered.map((c) => (
                  <CourseCard key={c._id} course={c} onClick={setSelectedCourse} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Course detail modal */}
      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
}

export default StudentDashborad;
