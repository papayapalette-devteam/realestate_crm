// src/components/AuthGuard.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  // ✅ Get token from localStorage (or sessionStorage if you prefer)
  const token = localStorage.getItem("token");

  // ✅ You can also check for role if needed (for admin access)
  // const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    // 🚫 No token → redirect to login
    return <Navigate to="/login" replace />;
  }

  // ✅ Token exists → allow access
  return <Outlet />;
};

export default AuthGuard;
