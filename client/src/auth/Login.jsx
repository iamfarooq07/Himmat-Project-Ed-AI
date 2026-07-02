import { useState, useContext } from "react";
import { UserContext } from "../context/context.jsx";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

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
      console.log("password", password);
      console.log("data", data);

      // apiResponse: login sends token in data.data field
      const token = data?.token || data?.data;

      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const role = payload?.role;

        toast.success("Login Successfully", {
          autoClose: 1000,
        });

        navigate(
          role === "instructor" ? "/instructordashborad" : "/studentdashborad",
        );
      } else {
        setError("Login failed — no token received. Try again.");
        toast.error("Login failed", {
          autoClose: 1000,
        });
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inp =
    "w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-[#E4E2DC] rounded-[10px] text-sm text-[#1A1A1A] placeholder-[#BDBAB4] focus:outline-none focus:border-[#3B8C5A] focus:bg-white transition disabled:opacity-60";

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col font-sans antialiased">
      {/* Body */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px]">
          {/* Card */}
          <div className="bg-white rounded-2xl border border-[#EAE8E3] px-8 py-9 shadow-sm">
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-12 h-12 bg-[#E8F4ED] rounded-xl flex items-center justify-center">
                <i className="ti ti-user-circle text-[#3B8C5A] text-[24px]" />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-7">
              <h1 className="text-[22px] font-semibold text-[#1A1A1A] tracking-tight">
                Welcome back
              </h1>
              <p className="text-[13px] text-[#999] mt-1">
                Sign in to continue learning
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-[10px] flex items-start gap-2">
                <i className="ti ti-alert-circle text-red-500 text-[15px] mt-0.5 flex-shrink-0" />
                <p className="text-[12.5px] text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[12.5px] font-medium text-[#444] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className={inp}
                  required
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[12.5px] font-medium text-[#444]">
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
                    className={`${inp} pr-10`}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAA] hover:text-[#555] transition"
                    tabIndex={-1}
                  >
                    <i
                      className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"} text-[16px]`}
                    />
                  </button>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[13px] text-[#888]">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-[#3B8C5A] font-medium hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-[#3B8C5A] hover:bg-[#2F7048] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-[10px] text-[14px] transition active:scale-[0.98] flex items-center justify-center gap-2 mt-1"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            {/* <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[#EAE8E3]" />
              <span className="text-[11.5px] text-[#BBB]">OR</span>
              <div className="flex-1 h-px bg-[#EAE8E3]" />
            </div> */}

            {/* Role hint chips */}
            {/* <div className="grid grid-cols-2 gap-2.5">
              <div className="border border-[#EAE8E3] rounded-[10px] p-3 text-center">
                <i className="ti ti-school text-[#3B8C5A] text-[18px]" />
                <p className="text-[11.5px] font-medium text-[#555] mt-1">
                  I'm a Student
                </p>
                <p className="text-[10.5px] text-[#AAA]">Browse &amp; learn</p>
              </div>
              <div className="border border-[#EAE8E3] rounded-[10px] p-3 text-center">
                <i className="ti ti-chalkboard text-[#B07A1A] text-[18px]" />
                <p className="text-[11.5px] font-medium text-[#555] mt-1">
                  I'm an Instructor
                </p>
                <p className="text-[10.5px] text-[#AAA]">Create &amp; teach</p>
              </div>
            </div> */}
          </div>

          {/* Footer note */}
          <p className="text-center text-[12px] text-[#AAA] mt-5">
            By signing in you agree to our{" "}
            <span className="text-[#3B8C5A] hover:underline cursor-pointer">
              Terms
            </span>{" "}
            &amp;{" "}
            <span className="text-[#3B8C5A] hover:underline cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
