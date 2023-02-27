import AdminStatisticBox from "Components/AdminStatisticBox/AdminStatisticBox";
import Loader from "Components/Loader/Loader";
import { useAuth } from "hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAccess } from "redux/auth/operations";
import { AppDispatch } from "redux/store";

const AdminPanel = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, isLoading, error } = useAuth();

  useEffect(() => {
    if (!user.hasAccess) {
      dispatch(userAccess());
    }
  }, [dispatch, user]);

  return isLoading ? (
    <Loader height="50vh" />
  ) : user.role !== "admin" || !user.hasAccess ? (
    <p>{error}</p>
  ) : (
    <AdminStatisticBox />
  );
};

export default AdminPanel;
