import { FC } from "react";
import { useAuth } from "hooks";
import { Navigate } from "react-router-dom";
import { RouteI } from "types/routeTypes";

const RestrictedRoute: FC<RouteI> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;
