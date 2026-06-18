import React, { useContext, useState } from "react";
import { UserContext } from "../context/context.jsx";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Please select a role to continue.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({ userName: name, email, password, role });

      // Redirect based on role after successful register
      if (data?.token) {
        if (role === "instructor") {
          navigate("/instructordashborad");
        } else {
          navigate("/studentdashborad");
        }
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2] p-6">
      <div className="bg-white w-full max-w-md rounded-[20px] border border-[#EAE8E3] px-8 py-9">
        {/* Top row: back button */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-[13px] text-[#555]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          {/* Logo */}
          <div className="w-9 h-9 bg-[#E8F4ED] rounded-[9px] flex items-center justify-center">
            <svg
              className="w-4 h-4 stroke-[#3B8C5A]"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-7">
          <h2 className="text-[22px] font-semibold text-[#1A1A1A] tracking-tight">
            Create your account
          </h2>
          <p className="text-[13.5px] text-[#888] mt-1.5">
            Join thousands of learners today
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-[10px] flex items-start gap-2">
            <svg
              className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <p className="text-[13px] text-red-600">{error}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-[13px] font-medium text-[#444] mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-[#E4E2DC] rounded-[10px] text-sm text-[#1A1A1A] placeholder-[#BDBAB4] focus:outline-none focus:border-[#3B8C5A] focus:bg-white transition"
              required
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[13px] font-medium text-[#444] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-[#E4E2DC] rounded-[10px] text-sm text-[#1A1A1A] placeholder-[#BDBAB4] focus:outline-none focus:border-[#3B8C5A] focus:bg-white transition"
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[13px] font-medium text-[#444] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full px-3.5 py-2.5 pr-10 bg-[#FAFAF9] border border-[#E4E2DC] rounded-[10px] text-sm text-[#1A1A1A] placeholder-[#BDBAB4] focus:outline-none focus:border-[#3B8C5A] focus:bg-white transition"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAA] hover:text-[#666] transition"
                tabIndex={-1}
              >
                {showPassword ? (
                  <i className="ti ti-eye-off text-[16px]" />
                ) : (
                  <i className="ti ti-eye text-[16px]" />
                )}
              </button>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-[13px] font-medium text-[#444] mb-1.5">
              I am a...
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-[#E4E2DC] rounded-[10px] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#3B8C5A] focus:bg-white transition appearance-none cursor-pointer"
                required
                disabled={loading}
              >
                <option value="" disabled hidden>
                  Select your role
                </option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-[#AAA]">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3B8C5A] hover:bg-[#2F7048] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-[10px] text-[14.5px] transition active:scale-[0.98] mt-1 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[13px] text-[#888] mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#3B8C5A] font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
