import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@/context/UserContext"; // adjust import path if needed

interface ProtectedRouteProps {
    children: React.ReactElement;
    roles?: string[]; // optional role-based protection
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
    const { user } = useUser();

    // If user not logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Optional: Role-based check
    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Otherwise render the protected page
    return children;
}
