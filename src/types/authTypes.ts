export enum Pages {
  REGISTER,
  LOGIN,
}

export interface AuthStateI {
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

export interface AuthPayloadI {
  data: {
    user: {
      name: null | string;
      email: null | string;
      role: null | string;
      hasAccess: boolean;
    };
    token: string;
  };
}
