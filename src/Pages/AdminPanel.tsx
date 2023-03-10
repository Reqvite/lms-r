import AdminStatisticBox from "Components/Admin/AdminStatisticBox";
import AdminUserBox from "Components/Admin/AdminUserBox";
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
      <AdminUserBox />
      <AdminStatisticBox />
    </Box>
  );
};

const Box = styled.div`
  @media screen and (min-width: 960px) {
    display: flex;
    justify-content: center;
    align-items: start;
  }
`;
export default AdminPanel;
