import { ReactElement } from "react";

export interface RouteI {
  component: ReactElement;
  redirectTo?: string;
  isAllowed?: boolean;
}
