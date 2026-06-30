import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/context.jsx";
import AiChat from "../components/AiChat.jsx";

// ─── Config ────────────────────────────────────────────────────────────────────
const CATEGORIES = ["Programming", "Design", "Business", "Marketing", "Other"];

const categoryStyle = {
  Programming: { bg: "bg-[#E8F4ED]", text: "text-[#3B8C5A]", icon: "ti-code" },
  Design: { bg: "bg-[#FBEAF0]", text: "text-[#A03560]", icon: "ti-palette" },
  Business: {
    bg: "bg-[#FEF4E4]",
    text: "text-[#B07A1A]",
    icon: "ti-briefcase",
  },
  Marketing: {
    bg: "bg-[#E6F0FB]",
    text: "text-[#2A6CB5]",
    icon: "ti-speakerphone",
  },
  Other: { bg: "bg-[#F0EDE8]", text: "text-[#777]", icon: "ti-book" },
};

const navItems = [
  { icon: "ti-layout-dashboard", label: "Dashboard" },
  { icon: "ti-book-2", label: "My Courses" },
  { icon: "ti-circle-plus", label: "Create Course" },
  { icon: "ti-robot", label: "AI Assistant" },
  { icon: "ti-users", label: "Students" },
  { icon: "ti-settings", label: "Settings" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const getInitials = (e = "") => (e ? e.slice(0, 2).toUpperCase() : "U");
const getGreeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};
const getStyle = (cat) => categoryStyle[cat] || categoryStyle.Other;
const emptyForm = {
  title: "",
  description: "",
  category: "Programming",
  price: 0,
};

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="bg-white border border-[#EAE8E3] rounded-xl p-4 flex gap-3.5 animate-pulse">
      <div className="w-11 h-11 bg-[#F0EDE8] rounded-[10px] flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-[#F0EDE8] rounded w-2/3" />
        <div className="h-3 bg-[#F0EDE8] rounded w-1/3" />
      </div>
      <div className="w-16 h-8 bg-[#F0EDE8] rounded-lg" />
    </div>
  );
}

// ─── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  const base =
    "fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 px-4 py-3 rounded-[12px] shadow-lg text-[13.5px] font-medium border";
  const styles =
    type === "success"
      ? `${base} bg-[#E8F4ED] border-[#B6D9C5] text-[#2F7048]`
      : `${base} bg-red-50 border-red-200 text-red-600`;
  return (
    <div className={styles}>
      <i
        className={`ti ${type === "success" ? "ti-circle-check" : "ti-alert-circle"} text-[17px]`}
      />
      {msg}
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
        <i className="ti ti-x text-[14px]" />
      </button>
    </div>
  );
}

// ─── Confirm Delete Modal ──────────────────────────────────────────────────────
function ConfirmModal({ course, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-2xl border border-[#EAE8E3] w-full max-w-sm p-6 shadow-xl">
        <div className="w-11 h-11 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ti ti-trash text-red-500 text-[20px]" />
        </div>
        <h3 className="text-[15px] font-semibold text-[#1A1A1A] text-center mb-1">
          Delete Course?
        </h3>
        <p className="text-[13px] text-[#888] text-center mb-5">
          "<span className="font-medium text-[#555]">{course?.title}</span>"
          will be permanently removed.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 h-9 bg-[#F7F5F2] border border-[#EAE8E3] text-[#555] rounded-[9px] text-[13px] font-medium hover:bg-[#EEE] transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 h-9 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white rounded-[9px] text-[13px] font-medium transition flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Course Form ───────────────────────────────────────────────────────────────
function CourseForm({ initial, onClose, onSave }) {
  const [form, setForm] = useState(
    initial
      ? {
          title: initial.title,
          description: initial.description,
          category: initial.category,
          price: initial.price,
        }
      : emptyForm,
  );
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState("");
  const isEdit = !!initial?._id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErr("");
    if (!form.title.trim()) {
      setFormErr("Course title is required.");
      return;
    }
    if (!form.description.trim()) {
      setFormErr("Description is required.");
      return;
    }
    setSaving(true);
    try {
      await onSave(form, isEdit ? initial._id : null);
      onClose();
    } catch (err) {
      setFormErr(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const inp =
    "w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-[#E4E2DC] rounded-[10px] text-[13.5px] text-[#1A1A1A] placeholder-[#BDBAB4] focus:outline-none focus:border-[#3B8C5A] focus:bg-white transition";

  return (
    <div className="bg-white border border-[#EAE8E3] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[16px] font-semibold text-[#1A1A1A]">
            {isEdit ? "Edit Course" : "Create New Course"}
          </h2>
          <p className="text-[12.5px] text-[#AAA] mt-0.5">
            {isEdit
              ? "Update the course details below"
              : "Fill in the details to publish a new course"}
          </p>
        </div>
        <button
          onClick={onClose}
          type="button"
          className="w-8 h-8 bg-[#F7F5F2] hover:bg-[#EEE] border border-[#EAE8E3] rounded-[8px] flex items-center justify-center text-[#888] transition"
        >
          <i className="ti ti-x text-[15px]" />
        </button>
      </div>

      {formErr && (
        <div className="mb-4 px-3.5 py-3 bg-red-50 border border-red-200 rounded-[10px] text-[12.5px] text-red-600 flex items-center gap-2">
          <i className="ti ti-alert-circle text-[14px]" />
          {formErr}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[12.5px] font-medium text-[#444] mb-1.5">
            Course Title *
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Complete Python Bootcamp"
            className={inp}
          />
        </div>
        <div>
          <label className="block text-[12.5px] font-medium text-[#444] mb-1.5">
            Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="What will students learn in this course?"
            rows={4}
            className={`${inp} resize-none`}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[12.5px] font-medium text-[#444] mb-1.5">
              Category
            </label>
            <div className="relative">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`${inp} appearance-none cursor-pointer pr-8`}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#AAA]">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-[12.5px] font-medium text-[#444] mb-1.5">
              Price (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#AAA] text-[13px]">
                $
              </span>
              <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="0 for Free"
                className={`${inp} pl-7`}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-[#F7F5F2] rounded-[10px] border border-[#EAE8E3]">
          {(() => {
            const s = getStyle(form.category);
            return (
              <>
                <div
                  className={`w-9 h-9 ${s.bg} rounded-[8px] flex items-center justify-center flex-shrink-0`}
                >
                  <i className={`ti ${s.icon} ${s.text} text-[17px]`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-medium text-[#1A1A1A] truncate">
                    {form.title || "Course Title Preview"}
                  </p>
                  <p className={`text-[11px] font-medium ${s.text}`}>
                    {form.category} ·{" "}
                    {form.price === 0 ? "Free" : `$${form.price}`}
                  </p>
                </div>
              </>
            );
          })()}
        </div>

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-10 bg-[#F7F5F2] border border-[#EAE8E3] text-[#555] rounded-[10px] text-[13px] font-medium hover:bg-[#EEE] transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 h-10 bg-[#3B8C5A] hover:bg-[#2F7048] disabled:opacity-60 text-white rounded-[10px] text-[13px] font-medium transition flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isEdit ? "Saving..." : "Creating..."}
              </>
            ) : (
              <>
                <i
                  className={`ti ${isEdit ? "ti-check" : "ti-circle-plus"} text-[15px]`}
                />
                {isEdit ? "Save Changes" : "Create Course"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Course Row ────────────────────────────────────────────────────────────────
function CourseRow({ course, onEdit, onDelete }) {
  const s = getStyle(course.category);
  return (
    <div className="bg-white border border-[#EAE8E3] rounded-xl p-4 flex items-center gap-3.5 hover:border-[#D0D0C8] transition">
      <div
        className={`w-11 h-11 ${s.bg} rounded-[10px] flex items-center justify-center flex-shrink-0`}
      >
        <i className={`ti ${s.icon} ${s.text} text-[20px]`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-medium text-[#1A1A1A] truncate">
          {course.title}
        </p>
        <p className="text-[12px] text-[#AAA] mt-0.5">
          <span className={`${s.text} font-medium`}>{course.category}</span>
          {" · "}
          {course.lectures?.length ?? 0} lectures
          {" · "}
          <span className="text-[#3B8C5A] font-medium">
            {course.price === 0 ? "Free" : `$${course.price}`}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => onEdit(course)}
          className="w-8 h-8 bg-[#F7F5F2] hover:bg-[#E8F4ED] border border-[#EAE8E3] rounded-[8px] flex items-center justify-center transition"
          title="Edit"
        >
          <i className="ti ti-pencil text-[#3B8C5A] text-[14px]" />
        </button>
        <button
          onClick={() => onDelete(course)}
          className="w-8 h-8 bg-[#F7F5F2] hover:bg-red-50 border border-[#EAE8E3] rounded-[8px] flex items-center justify-center transition"
          title="Delete"
        >
          <i className="ti ti-trash text-red-400 text-[14px]" />
        </button>
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
        <span className="text-[15px] font-semibold text-[#1A1A1A]">
          LearnHub
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-[9px] text-[13.5px] transition text-left w-full
              ${
                active === item.label
                  ? item.label === "Create Course"
                    ? "bg-[#3B8C5A] text-white font-medium"
                    : "bg-[#E8F4ED] text-[#2F7048] font-medium"
                  : item.label === "Create Course"
                    ? "text-[#3B8C5A] hover:bg-[#E8F4ED] border border-[#3B8C5A]/30"
                    : "text-[#666] hover:bg-[#F0F0EC]"
              }`}
          >
            <i className={`ti ${item.icon} text-[17px]`} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-2">
        <div className="flex items-center gap-2.5 px-2.5 py-2">
          <div className="w-9 h-9 rounded-full bg-[#FEF4E4] flex items-center justify-center text-[13px] font-semibold text-[#B07A1A] flex-shrink-0">
            {getInitials(user?.email)}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[#1A1A1A] truncate">
              {user?.email || "Instructor"}
            </p>
            <p className="text-[11.5px] text-[#AAA]">Instructor</p>
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

// ─── Main Component ────────────────────────────────────────────────────────────
function InstructorDashboard() {
  const [active, setActive] = useState("Dashboard");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const showToast = (msg, type = "success") => setToast({ msg, type });
  const hideToast = () => setToast(null);

  const fetchCourses = async () => {
    setLoading(true);
    setApiError("");

    try {
      const res = await axios.get("/api/courses");
      setCourses(res.data?.data?.courses || []);
    } catch (err) {
      if (err?.response?.status === 404) {
        setCourses([]);
      } else {
        setApiError(err?.response?.data?.message || "Failed to load courses.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleSetActive = (label) => {
    if (label === "Create Course") {
      setEditTarget(null);
    }
    setActive(label);
  };

  const handleSave = async (formData, id) => {
    const payload = { ...formData, instructor: user._id };
    if (id) {
      await axios.put(`/api/courses/${id}`, payload);
      showToast("Course updated successfully!");
    } else {
      await axios.post("/api/courses", payload);
      showToast("Course created successfully!");
    }
    await fetchCourses();
    setActive("My Courses");
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/api/courses/${deleteTarget._id}`);
      showToast("Course deleted.");
      setDeleteTarget(null);
      await fetchCourses();
    } catch (err) {
      showToast(err?.response?.data?.message || "Delete failed.", "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (course) => {
    setEditTarget(course);
    setActive("Create Course");
  };

  const freeCount = courses.filter((c) => c.price === 0).length;

  // ── Helper functions inside layout ───────────────────────────────────────────
  const renderDashboardOrCourses = () => (
    <>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-[#EAE8E3] rounded-xl p-4">
          <p className="text-[12px] text-[#AAA] mb-1.5">Total Courses</p>
          <p className="text-[22px] font-semibold text-[#1A1A1A]">
            {loading ? "—" : courses.length}
          </p>
          <p className="text-[12px] text-[#3B8C5A] mt-1">
            Published on platform
          </p>
        </div>
        <div className="bg-white border border-[#EAE8E3] rounded-xl p-4">
          <p className="text-[12px] text-[#AAA] mb-1.5">Free Courses</p>
          <p className="text-[22px] font-semibold text-[#1A1A1A]">
            {loading ? "—" : freeCount}
          </p>
          <p className="text-[12px] text-[#3B8C5A] mt-1">Open access</p>
        </div>
        <div className="bg-white border border-[#EAE8E3] rounded-xl p-4">
          <p className="text-[12px] text-[#AAA] mb-1.5">Paid Courses</p>
          <p className="text-[22px] font-semibold text-[#1A1A1A]">
            {loading ? "—" : courses.length - freeCount}
          </p>
          <p className="text-[12px] text-[#3B8C5A] mt-1">Premium content</p>
        </div>
      </div>

      {/* List header */}
      <div className="flex justify-between items-center mb-3.5">
        <h2 className="text-[15px] font-semibold text-[#1A1A1A]">
          All Courses{" "}
          {!loading && (
            <span className="ml-2 text-[12px] font-normal text-[#AAA]">
              ({courses.length})
            </span>
          )}
        </h2>
      </div>

      {apiError && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-[10px] flex items-center gap-2">
          <i className="ti ti-alert-circle text-red-500 text-[16px]" />
          <p className="text-[13px] text-red-600">{apiError}</p>
          <button
            onClick={fetchCourses}
            className="ml-auto text-[12px] text-red-500 underline"
          >
            Retry
          </button>
        </div>
      )}

      {loading && (
        <div className="flex flex-col gap-2.5">
          {[1, 2, 3].map((i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      )}

      {!loading && !apiError && courses.length === 0 && (
        <div className="bg-white border border-[#EAE8E3] rounded-xl p-10 text-center">
          <div className="w-12 h-12 bg-[#F0EDE8] rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="ti ti-book-2 text-[#AAA] text-[22px]" />
          </div>
          <p className="text-[14px] font-medium text-[#555]">No courses yet</p>
          <p className="text-[12.5px] text-[#AAA] mt-1 mb-4">
            Create your first course to get started
          </p>
          <button
            onClick={() => setActive("Create Course")}
            className="h-9 px-5 bg-[#3B8C5A] text-white text-[13px] font-medium rounded-[9px] hover:bg-[#2F7048] transition inline-flex items-center gap-1.5"
          >
            <i className="ti ti-circle-plus text-[14px]" /> Create Course
          </button>
        </div>
      )}

      {!loading && !apiError && courses.length > 0 && (
        <div className="flex flex-col gap-2.5">
          {courses.map((c) => (
            <CourseRow
              key={c._id}
              course={c}
              onEdit={handleEdit}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}
    </>
  );

  const renderContent = () => {
    if (active === "Dashboard" || active === "My Courses") {
      return renderDashboardOrCourses();
    }
    if (active === "Create Course") {
      return (
        <CourseForm
          initial={editTarget}
          onClose={() => {
            setActive("My Courses");
            setEditTarget(null);
          }}
          onSave={handleSave}
        />
      );
    }
    if (active === "Students") {
      return (
        <div className="bg-white border border-[#EAE8E3] rounded-xl p-10 text-center">
          <div className="w-12 h-12 bg-[#E6F0FB] rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="ti ti-users text-[#2A6CB5] text-[22px]" />
          </div>
          <p className="text-[14px] font-medium text-[#555]">Students</p>
          <p className="text-[12.5px] text-[#AAA] mt-1">
            Student management coming soon
          </p>
        </div>
      );
    }
    if (active === "AI Assistant") {
      return <AiChat />;
    }
    if (active === "Settings") {
      return (
        <div className="bg-white border border-[#EAE8E3] rounded-xl p-10 text-center">
          <div className="w-12 h-12 bg-[#F0EDE8] rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="ti ti-settings text-[#AAA] text-[22px]" />
          </div>
          <p className="text-[14px] font-medium text-[#555]">Settings</p>
          <p className="text-[12.5px] text-[#AAA] mt-1">
            Settings panel coming soon
          </p>
        </div>
      );
    }
  };

  // ── Single Main Return ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F7F5F2] flex">
      <Sidebar
        active={active}
        setActive={handleSetActive}
        user={user}
        onLogout={handleLogout}
      />

      <main className="ml-[220px] flex-1 p-7">
        {/* Topbar */}
        <div className="flex justify-between items-start mb-7">
          <div>
            <h1 className="text-[20px] font-semibold text-[#1A1A1A]">
              {getGreeting()},{" "}
              {user?.email ? user.email.split("@")[0] : "Instructor"}
            </h1>
            <p className="text-[13px] text-[#999] mt-1">
              {active === "Create Course"
                ? editTarget
                  ? "Edit your course details"
                  : "Create a new course for students"
                : "Manage your courses from here"}
            </p>
          </div>
          {active !== "Create Course" && (
            <button
              onClick={() => handleSetActive("Create Course")}
              className="h-9 px-4 bg-[#3B8C5A] text-white text-[13px] font-medium rounded-[9px] flex items-center gap-1.5 hover:bg-[#2F7048] transition"
            >
              <i className="ti ti-plus text-[14px]" /> Create Course
            </button>
          )}
        </div>

        {renderContent()}
      </main>

      {/* Delete Confirm */}
      {deleteTarget && (
        <ConfirmModal
          course={deleteTarget}
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Toast */}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={hideToast} />}
    </div>
  );
}

export default InstructorDashboard;
