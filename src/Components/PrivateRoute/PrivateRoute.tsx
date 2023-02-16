import { useAuth } from "hooks";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { RestrictedRouteProps } from "types/types";

export const PrivateRoute: FC<RestrictedRouteProps> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const { isLoggedIn, isRefreshing } = useAuth();

  const shouldRedirect = !isRefreshing && !isLoggedIn;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
