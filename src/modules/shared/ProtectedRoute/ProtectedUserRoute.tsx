import React from "react";
import { useAuth } from "../../../contexts/AuthContext";

const ProtectedUserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {  loading } = useAuth();

  if (loading) return null; // Or a spinner while checking





  return <>{children}</>;
};

export default ProtectedUserRoute;
