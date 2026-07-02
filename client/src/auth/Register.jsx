import { useState, useContext } from "react";
import { UserContext } from "../context/context.jsx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Please select your role to continue.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to the Terms and Conditions.");
      return;
    }

    setLoading(true);
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      const data = await registerUser({
        userName: fullName,
        email,
        password,
        role,
      });

      if (data?.token) {
        navigate(
          role === "instructor" ? "/instructordashborad" : "/studentdashborad",
        );
      }
      toast.success("Registration Successfully", {
        autoClose: 1000,
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
      toast.error("Registration failed. Please try again.", {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const inp =
    "w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-[#E4E2DC] rounded-[10px] text-sm text-[#1A1A1A] placeholder-[#BDBAB4] focus:outline-none focus:border-[#3B8C5A] focus:bg-white transition disabled:opacity-60";

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col font-sans antialiased">
      {/* Body */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[520px]">
          {/* Card */}
          <div className="bg-white rounded-2xl border border-[#EAE8E3] px-8 py-9 shadow-sm">
            {/* Icon + Heading */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 bg-[#E8F4ED] rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="ti ti-user-plus text-[#3B8C5A] text-[22px]" />
              </div>
              <div>
                <h1 className="text-[20px] font-semibold text-[#1A1A1A] tracking-tight">
                  Create your account
                </h1>
                <p className="text-[12.5px] text-[#999]">
                  Join thousands of learners today
                </p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-[10px] flex items-start gap-2">
                <i className="ti ti-alert-circle text-red-500 text-[15px] mt-0.5 flex-shrink-0" />
                <p className="text-[12.5px] text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First + Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-medium text-[#444] mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter Your First Name"
                    className={inp}
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-medium text-[#444] mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter Your Last Name"
                    className={inp}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

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

              {/* Role */}
              <div>
                <label className="block text-[12.5px] font-medium text-[#444] mb-1.5">
                  I am a...
                </label>

                {/* Role cards */}
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    {
                      value: "student",
                      icon: "ti-school",
                      label: "Student",
                      sub: "Browse & learn",
                    },
                    {
                      value: "instructor",
                      icon: "ti-chalkboard",
                      label: "Instructor",
                      sub: "Create & teach",
                    },
                  ].map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => !loading && setRole(r.value)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-[10px] border-2 transition
                        ${
                          role === r.value
                            ? "border-[#3B8C5A] bg-[#E8F4ED]"
                            : "border-[#E4E2DC] bg-[#FAFAF9] hover:border-[#3B8C5A]/40"
                        }`}
                    >
                      <i
                        className={`ti ${r.icon} text-[20px] ${role === r.value ? "text-[#3B8C5A]" : "text-[#AAA]"}`}
                      />
                      <span
                        className={`text-[12.5px] font-medium ${role === r.value ? "text-[#2F7048]" : "text-[#555]"}`}
                      >
                        {r.label}
                      </span>
                      <span className="text-[10.5px] text-[#AAA]">{r.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Password + Confirm */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-medium text-[#444] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 6 chars"
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
                        className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"} text-[15px]`}
                      />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[12.5px] font-medium text-[#444] mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className={inp}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 accent-[#3B8C5A] rounded cursor-pointer"
                  disabled={loading}
                />
                <label
                  htmlFor="terms"
                  className="text-[12px] text-[#666] cursor-pointer select-none"
                >
                  I agree to the{" "}
                  <span className="text-[#3B8C5A] font-medium hover:underline cursor-pointer">
                    Terms &amp; Conditions
                  </span>
                </label>
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
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-[12px] text-[#AAA] mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#3B8C5A] font-medium hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
