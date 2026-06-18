import React from "react";
import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";
import { Route, Routes } from "react-router-dom";
import StudentDashborad from "./pages/StudentDashborad.jsx";
import InstructorDashboard from "./pages/InstructorDashborad.jsx";
import LandingPage from "./pages/Landingpage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/instructordashborad"
        element={
          <ProtectedRoute role="instructor">
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/studentdashborad"
        element={
          <ProtectedRoute role="student">
            <StudentDashborad />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
