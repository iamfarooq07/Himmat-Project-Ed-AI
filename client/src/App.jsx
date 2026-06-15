import React from "react";
import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";
import { Route, Routes } from "react-router-dom";
import StudentDashborad from "./pages/StudentDashborad.jsx";
import InstructorDashboard from "./pages/InstructorDashborad.jsx";
import LandingPage from "./pages/Landingpage.jsx";

function App() {
  return (
    <div>
      {/* <Register /> */}
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="instructordashborad" element={<InstructorDashboard />} />
        <Route path="studentdashborad" element={<StudentDashborad />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
