import { newAdminReducer, store } from "redux/store";

export const accessMiddleware =
  ({ getState }: any) =>
  (next: any) =>
  (action: any) => {
    const result = next(action);

    if (action.payload?.data?.user?.role === "admin") {
      localStorage.clear();
      store.replaceReducer(newAdminReducer);
    }

    return result;
  };
