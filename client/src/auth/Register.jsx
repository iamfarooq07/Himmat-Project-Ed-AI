import React, { useContext, useState } from "react";
import { UserContext } from "../context/context.jsx";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const { registerUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role");
      return;
    }
    try {
      const data = await registerUser({
        userName: name,
        email,
        password,
        role,
      });
      console.log("Success:", data);
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2] p-6">
      <div className="bg-white w-full max-w-md rounded-[20px] border border-[#EAE8E3] px-8 py-9">
        {/* Logo Icon */}
        <div className="flex items-center justify-between mb-6">
          {/* Back Button */}
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back</span>
          </Link>

          {/* Logo/Icon */}
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
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[13px] font-medium text-[#444] mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-[#E4E2DC] rounded-[10px] text-sm text-[#1A1A1A] placeholder-[#BDBAB4] focus:outline-none focus:border-[#3B8C5A] focus:bg-white transition"
              required
            />
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
            className="w-full bg-[#3B8C5A] hover:bg-[#2F7048] text-white font-semibold py-3 rounded-[10px] text-[14.5px] transition active:scale-[0.98] mt-1"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[13px] text-[#888] mt-5">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#3B8C5A] font-medium hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
