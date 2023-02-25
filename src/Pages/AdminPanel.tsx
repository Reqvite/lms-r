import AdminStatisticBox from "Components/AdminStatisticBox/AdminStatisticBox";
import Loader from "Components/Loader/Loader";
import { useAuth } from "hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAccess } from "redux/auth/operations";
import { AppDispatch } from "redux/store";
import { fetchAllUsersData } from "redux/tests/operations";

const AdminPanel = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, isLoading, error } = useAuth();

  useEffect(() => {
    dispatch(userAccess());
    if (user.role === "admin" && user.hasAccess) {
      dispatch(fetchAllUsersData());
    }
  }, [dispatch, user]);

  // if (user.role !== "admin" || !user.hasAccess) {
  //   return <Navigate to="/dashboard" />;
  // }

  return isLoading ? (
    <Loader height="100vh" />
  ) : user.role !== "admin" || !user.hasAccess ? (
    <p>{error}</p>
  ) : (
    <AdminStatisticBox />
  );
};

export default AdminPanel;
