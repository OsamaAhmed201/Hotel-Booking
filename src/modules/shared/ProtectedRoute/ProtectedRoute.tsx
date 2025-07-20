import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return null; // Or a spinner while checking



  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role === "user") return <Navigate to="/landing" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
