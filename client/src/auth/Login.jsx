import React, { useState, useContext } from "react";
import { UserContext } from "../context/context.jsx";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });

      // Redirect based on role
      if (data?.token) {
        const role = data.role || parseRole(data.token);
        if (role === "instructor") {
          navigate("/instructordashborad");
        } else {
          navigate("/studentdashborad");
        }
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // decode role from JWT if not in response directly
  function parseRole(token) {
    try {
      return JSON.parse(atob(token.split(".")[1])).role;
    } catch {
      return "student";
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2] p-6">
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
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[13px] font-medium text-[#444]">
                Password
              </label>
              <button
                type="button"
                className="text-[12px] text-[#3B8C5A] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3B8C5A] hover:bg-[#2F7048] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-[10px] text-[14.5px] transition active:scale-[0.98] mt-1 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[13px] text-[#888] mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#3B8C5A] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
