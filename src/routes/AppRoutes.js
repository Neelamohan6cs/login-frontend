import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectRoute"; // ✅ Make sure this path is correct

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
