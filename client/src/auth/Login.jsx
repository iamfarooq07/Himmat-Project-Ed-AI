import React, { useState, useContext } from "react";
import { UserContext } from "../context/context.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        email,
        password,
      });

      console.log("Success:", data);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-content bg-[#F7F5F2] p-6">
      <div className="bg-white w-full max-w-md mx-auto rounded-[20px] border border-[#EAE8E3] px-8 py-9">
        {/* Logo Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-11 h-11 bg-[#E8F4ED] rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 stroke-[#3B8C5A]"
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
            Welcome back
          </h2>
          <p className="text-[13.5px] text-[#888] mt-1.5">
            Enter your details to sign in
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[13px] font-medium text-[#444]">
                Password
              </label>
              <a
                href="#"
                className="text-[12px] text-[#3B8C5A] hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-[#E4E2DC] rounded-[10px] text-sm text-[#1A1A1A] placeholder-[#BDBAB4] focus:outline-none focus:border-[#3B8C5A] focus:bg-white transition"
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              id="remember-me"
              type="checkbox"
              className="w-[15px] h-[15px] accent-[#3B8C5A] cursor-pointer rounded"
            />
            <label
              htmlFor="remember-me"
              className="text-[13px] text-[#666] cursor-pointer select-none"
            >
              Remember me for 30 days
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#3B8C5A] hover:bg-[#2F7048] text-white font-semibold py-3 rounded-[10px] text-[14.5px] transition active:scale-[0.98] mt-1"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[13px] text-[#888] mt-5">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-[#3B8C5A] font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
