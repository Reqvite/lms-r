import { useAuth } from "hooks";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { RestrictedRouteProps } from "types/types";

const RestrictedRoute: FC<RestrictedRouteProps> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;
