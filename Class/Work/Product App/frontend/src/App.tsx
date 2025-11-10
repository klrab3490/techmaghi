import { Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import ProtectedRoute from "@/context/ProtectedRoute";
import { ThemeProvider } from "@/components/dark/theme-provider";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Products from "@/pages/Products";
import Dashboard from "@/pages/Dashboard";
import Unauthorized from "@/pages/Unauthorized";
import Navbar from "@/components/custom/Navbar";

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/products"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Products />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserProvider>
    </ThemeProvider>
  );
}
