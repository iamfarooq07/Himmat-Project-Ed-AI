import React, { useState } from "react";

// Nav items updated for Instructor view
const navItems = [
  { icon: "ti-layout-dashboard", label: "Dashboard", path: "/" },
  { icon: "ti-book-2", label: "My Courses", path: "/courses" },
  { icon: "ti-users", label: "Students", path: "/students" },
  { icon: "ti-wallet", label: "Earnings", path: "/earnings" },
  { icon: "ti-settings", label: "Settings", path: "/settings" },
];

// Data updated to reflect courses taught by the instructor
const instructorCourses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    students: 142,
    rating: 4.8,
    revenue: 2840,
    color: "green",
  },
  {
    id: 2,
    title: "Data Science with Python",
    students: 95,
    rating: 4.6,
    revenue: 1900,
    color: "amber",
  },
  {
    id: 3,
    title: "Machine Learning Basics",
    students: 64,
    rating: 4.9,
    revenue: 1600,
    color: "blue",
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    students: 210,
    rating: 4.7,
    revenue: 3150,
    color: "pink",
  },
];

const courseStyles = {
  green: {
    bg: "bg-[#E8F4ED]",
    icon: "text-[#3B8C5A]",
    badge: "bg-[#E8F4ED] text-[#2F7048]",
    symbol: "ti-code",
  },
  amber: {
    bg: "bg-[#FEF4E4]",
    icon: "text-[#B07A1A]",
    badge: "bg-[#FEF4E4] text-[#8A5E10]",
    symbol: "ti-chart-bar",
  },
  blue: {
    bg: "bg-[#E6F0FB]",
    icon: "text-[#2A6CB5]",
    badge: "bg-[#F0EDE8] text-[#555]",
    symbol: "ti-brain",
  },
  pink: {
    bg: "bg-[#FBEAF0]",
    icon: "text-[#A03560]",
    badge: "bg-[#FBEAF0] text-[#A03560]",
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

      {/* Instructor Profile */}
      <div className="mt-auto flex items-center gap-2.5 px-2.5 py-2">
        <div className="w-9 h-9 rounded-full bg-[#FEF4E4] flex items-center justify-center text-[13px] font-semibold text-[#B07A1A]">
          SM
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#1A1A1A]">Sara Malik</p>
          <p className="text-[11.5px] text-[#AAA]">Instructor</p>
        </div>
      </div>
    </aside>
  );
}

function StatCard({ label, value, sub, isRevenue }) {
  return (
    <div className="bg-white border border-[#EAE8E3] rounded-xl p-4">
      <p className="text-[12px] text-[#AAA] mb-1.5">{label}</p>
      <p className="text-[22px] font-semibold text-[#1A1A1A]">
        {isRevenue ? `$${value.toLocaleString()}` : value}
      </p>
      <p className="text-[12px] text-[#3B8C5A] mt-1">{sub}</p>
    </div>
  );
}

function CourseRow({ course }) {
  const s = courseStyles[course.color];

  return (
    <div className="bg-white border border-[#EAE8E3] rounded-xl p-4 flex items-center justify-between gap-3.5">
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <div
          className={`w-11 h-11 ${s.bg} rounded-[10px] flex items-center justify-center flex-shrink-0`}
        >
          <i className={`ti ${s.symbol} ${s.icon} text-[20px]`} />
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-medium text-[#1A1A1A] truncate">
            {course.title}
          </p>
          <p className="text-[12px] text-[#AAA] mt-0.5">
            <i className="ti ti-star-filled text-[#B07A1A] mr-1" />
            {course.rating} Rating · {course.students} Students
          </p>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <span className={`text-[12px] font-semibold block text-[#1A1A1A]`}>
          ${course.revenue.toLocaleString()}
        </span>
        <span className="text-[11px] text-[#AAA]">Total Earnings</span>
      </div>
    </div>
  );
}

function InstructorDashboard() {
  const [active, setActive] = useState("Dashboard");

  // Calculations based on data
  const totalStudents = instructorCourses.reduce((a, c) => a + c.students, 0);
  const totalEarnings = instructorCourses.reduce((a, c) => a + c.revenue, 0);

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex">
      {/* Sidebar */}
      <Sidebar active={active} setActive={setActive} />

      {/* Main Content */}
      <main className="ml-[220px] flex-1 p-7">
        {/* Topbar */}
        <div className="flex justify-between items-start mb-7">
          <div>
            <h1 className="text-[20px] font-semibold text-[#1A1A1A]">
              Welcome back, Sara
            </h1>
            <p className="text-[13px] text-[#999] mt-1">
              Here is what's happening with your courses today.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-4 bg-[#3B8C5A] text-white text-[13px] font-medium rounded-[9px] flex items-center gap-1.5 hover:bg-[#2F7048] transition">
              <i className="ti ti-plus text-[14px]" /> Create Course
            </button>
            <button className="w-9 h-9 bg-white border border-[#EAE8E3] rounded-[9px] flex items-center justify-center">
              <i className="ti ti-bell text-[#888] text-[18px]" />
            </button>
          </div>
        </div>

        {/* Instructor Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatCard
            label="Active Courses"
            value={instructorCourses.length}
            sub="2 courses trending"
          />
          <StatCard
            label="Total Students"
            value={totalStudents.toLocaleString()}
            sub="+24 new this week"
          />
          <StatCard
            label="Total Earnings"
            value={totalEarnings}
            sub="Payout on 1st July"
            isRevenue={true}
          />
        </div>

        {/* Course Performance List */}
        <div className="flex justify-between items-center mb-3.5">
          <h2 className="text-[15px] font-semibold text-[#1A1A1A]">
            Course Performance
          </h2>
          <button className="text-[12px] text-[#3B8C5A] font-medium hover:underline">
            View Analytics
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {instructorCourses.map((c) => (
            <CourseRow key={c.id} course={c} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboard;
