import { FC } from "react";
import { Navigate } from "react-router-dom";
import { RouteI } from "types/routeTypes";

const PrivateRoute: FC<RouteI> = ({
  component: Component,
  redirectTo = "/",
  isAllowed,
}) => {
  return isAllowed ? <Navigate to={redirectTo} /> : Component;
};

export default PrivateRoute;
