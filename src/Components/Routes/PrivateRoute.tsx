import { FC } from "react";
import { Navigate } from "react-router-dom";
import { RestrictedRouteProps } from "types/types";

const PrivateRoute: FC<RestrictedRouteProps> = ({
  component: Component,
  redirectTo = "/",
  isAllowed,
}) => {
  return isAllowed ? <Navigate to={redirectTo} /> : Component;
};

export default PrivateRoute;
