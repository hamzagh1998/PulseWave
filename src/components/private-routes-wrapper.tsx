import { Navigate } from "react-router-dom";

import { useIsAuthenticated } from "@/hooks/use-is-authenticated";
import { AUTH_PATHES } from "@/routes/auth.routes";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRouteWrapper({ children }: PrivateRouteProps) {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated === null) {
    //* Render a loading indicator while checking the auth state
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={"/" + AUTH_PATHES.SIGNIN} />
  );
}
