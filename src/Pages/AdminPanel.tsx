import AdminStatisticBox from "Components/Admin/AdminStatisticBox";
import AdminUserControllBox from "Components/Admin/AdminUserControllBox";
import Loader from "Components/Loader";
import { useAuth } from "hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAccess } from "redux/auth/operations";
import { AppDispatch } from "redux/store";
import styled from "styled-components";

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
    <Box>
      <AdminUserControllBox />
      <AdminStatisticBox />
    </Box>
  );
};

const Box = styled.div`
  @media screen and (min-width: 960px) {
    display: flex;
  }
`;
export default AdminPanel;
