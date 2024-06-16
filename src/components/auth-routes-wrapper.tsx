import { Navigate } from "react-router-dom";

import { useIsAuthenticated } from "@/hooks/use-is-authenticated";

type AuthRouteProps = {
  children: React.ReactNode;
};

export function AuthRouteWrapper({ children }: AuthRouteProps) {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated === null) {
    //* Render a loading indicator while checking the auth state
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Navigate to="/home" /> : children;
}
