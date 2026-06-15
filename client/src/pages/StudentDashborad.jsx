import React, { useState } from "react";

const navItems = [
  { icon: "ti-layout-dashboard", label: "Dashboard", path: "/" },
  { icon: "ti-book-2", label: "My Courses", path: "/courses" },
  { icon: "ti-calendar", label: "Schedule", path: "/schedule" },
  { icon: "ti-certificate", label: "Certificates", path: "/certificates" },
  { icon: "ti-settings", label: "Settings", path: "/settings" },
];

const courses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    instructor: "Sara Malik",
    lessons: 42,
    progress: 78,
    color: "green",
  },
  {
    id: 2,
    title: "Data Science with Python",
    instructor: "Bilal Raza",
    lessons: 35,
    progress: 52,
    color: "amber",
  },
  {
    id: 3,
    title: "Machine Learning Basics",
    instructor: "Hira Noor",
    lessons: 28,
    progress: 33,
    color: "blue",
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    instructor: "Zara Sheikh",
    lessons: 20,
    progress: 100,
    color: "pink",
  },
];

const courseStyles = {
  green: {
    bg: "bg-[#E8F4ED]",
    icon: "text-[#3B8C5A]",
    bar: "bg-[#3B8C5A]",
    badge: "bg-[#E8F4ED] text-[#2F7048]",
    symbol: "ti-code",
  },
  amber: {
    bg: "bg-[#FEF4E4]",
    icon: "text-[#B07A1A]",
    bar: "bg-[#C88A20]",
    badge: "bg-[#FEF4E4] text-[#8A5E10]",
    symbol: "ti-chart-bar",
  },
  blue: {
    bg: "bg-[#E6F0FB]",
    icon: "text-[#2A6CB5]",
    bar: "bg-[#3A7DC9]",
    badge: "bg-[#F0EDE8] text-[#777]",
    symbol: "ti-brain",
  },
  pink: {
    bg: "bg-[#FBEAF0]",
    icon: "text-[#A03560]",
    bar: "bg-[#3B8C5A]",
    badge: "bg-[#E8F4ED] text-[#2F7048]",
    symbol: "ti-palette",
  },
};

function Sidebar({ active, setActive }) {
  return (
    <aside className="w-[220px] bg-white border-r border-[#EAE8E3] flex flex-col px-4 py-6 fixed top-0 left-0 h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 mb-6">
        <div className="w-[34px] h-[34px] bg-[#E8F4ED] rounded-[9px] flex items-center justify-center">
          <i className="ti ti-layers-subtract text-[#3B8C5A] text-[17px]" />
        </div>
        <span className="text-[15px] font-semibold text-[#1A1A1A]">
          LearnHub
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-[9px] text-[13.5px] transition text-left w-full
              ${
                active === item.label
                  ? "bg-[#E8F4ED] text-[#2F7048] font-medium"
                  : "text-[#666] hover:bg-[#F0F0EC]"
              }`}
          >
            <i className={`ti ${item.icon} text-[17px]`} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="mt-auto flex items-center gap-2.5 px-2.5 py-2">
        <div className="w-9 h-9 rounded-full bg-[#E8F4ED] flex items-center justify-center text-[13px] font-semibold text-[#3B8C5A]">
          AK
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#1A1A1A]">Ahmed Khan</p>
          <p className="text-[11.5px] text-[#AAA]">Student</p>
        </div>
      </div>
    </aside>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white border border-[#EAE8E3] rounded-xl p-4">
      <p className="text-[12px] text-[#AAA] mb-1.5">{label}</p>
      <p className="text-[22px] font-semibold text-[#1A1A1A]">{value}</p>
      <p className="text-[12px] text-[#3B8C5A] mt-1">{sub}</p>
    </div>
  );
}

function CourseCard({ course }) {
  const s = courseStyles[course.color];
  const isDone = course.progress === 100;

  return (
    <div className="bg-white border border-[#EAE8E3] rounded-xl p-4 flex items-center gap-3.5">
      <div
        className={`w-11 h-11 ${s.bg} rounded-[10px] flex items-center justify-center flex-shrink-0`}
      >
        <i className={`ti ${s.symbol} ${s.icon} text-[20px]`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-medium text-[#1A1A1A]">{course.title}</p>
        <p className="text-[12px] text-[#AAA] mt-0.5">
          {course.instructor} · {course.lessons} lessons
        </p>
        <div className="h-[5px] bg-[#F0EDE8] rounded-full mt-2">
          <div
            className={`h-[5px] ${s.bar} rounded-full`}
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>
      <span
        className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${s.badge} flex-shrink-0`}
      >
        {isDone ? "Done" : `${course.progress}%`}
      </span>
    </div>
  );
}

function StudentDashborad() {
  const [active, setActive] = useState("Dashboard");
  const avgProgress = Math.round(
    courses.reduce((a, c) => a + c.progress, 0) / courses.length,
  );
  const completed = courses.filter((c) => c.progress === 100).length;

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex">
      <Sidebar active={active} setActive={setActive} />

      <main className="ml-[220px] flex-1 p-7">
        {/* Topbar */}
        <div className="flex justify-between items-start mb-7">
          <div>
            <h1 className="text-[20px] font-semibold text-[#1A1A1A]">
              Good morning, Ahmed
            </h1>
            <p className="text-[13px] text-[#999] mt-1">
              You have 2 lessons pending today
            </p>
          </div>
          <button className="w-9 h-9 bg-white border border-[#EAE8E3] rounded-[9px] flex items-center justify-center">
            <i className="ti ti-bell text-[#888] text-[18px]" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatCard
            label="Enrolled courses"
            value={courses.length}
            sub="Active this week"
          />
          <StatCard
            label="Completed"
            value={completed}
            sub="Certificate earned"
          />
          <StatCard
            label="Avg. progress"
            value={`${avgProgress}%`}
            sub="Keep it up!"
          />
        </div>

        {/* Courses */}
        <h2 className="text-[15px] font-semibold text-[#1A1A1A] mb-3.5">
          My courses
        </h2>
        <div className="flex flex-col gap-2.5">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default StudentDashborad;
