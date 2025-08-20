import { useAuth } from "@/provider/auth-context";
import React from "react";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    <div>loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default AuthLayout;
