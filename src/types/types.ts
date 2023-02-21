import { ReactElement } from "react";

export enum Pages {
  REGISTER,
  LOGIN,
}

export interface AuthState {
  user: { name: string | null; email: string | null };
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
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
