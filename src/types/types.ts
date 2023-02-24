import { ReactElement } from "react";

export enum Pages {
  REGISTER,
  LOGIN,
}

export interface AuthState {
  user: {
    name: string | null;
    email: string | null;
    role: string | null;
    hasAccess?: boolean;
  };
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  error: any;
}

export interface TestsState {
  items: any;
  finishedTests: any;
  isLoading: boolean;
  error: any;
}

export interface RestrictedRouteProps {
  component: ReactElement;
  redirectTo?: string;
}
