import { useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectIsLoggedIn,
  selectRefreshing,
  selectUser,
} from "redux/auth/selectors";

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectRefreshing);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    isLoading,
    error,
  };
};
