import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/context.jsx";

// role: "student" | "instructor" | undefined (any logged-in user)
function ProtectedRoute({ children, role }) {
  const { user, authLoading } = useContext(UserContext);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-[3px] border-[#3B8C5A] border-t-transparent rounded-full animate-spin" />
          <p className="text-[13px] text-[#AAA]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Wrong role — redirect to their own dashboard
    return (
      <Navigate
        to={user.role === "instructor" ? "/instructordashborad" : "/studentdashborad"}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;
