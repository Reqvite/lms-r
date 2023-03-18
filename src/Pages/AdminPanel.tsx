import { FC } from "react";
import { useAuth } from "hooks";
import AdminStatisticBox from "Components/AdminBoxes/AdminStatisticBox";
import AdminUserBox from "Components/AdminBoxes/AdminUserBox";
import Loader from "Components/ui/Loader";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAccess } from "redux/auth/operations";
import { AppDispatch } from "redux/store";
import styled from "styled-components";

const AdminPanel: FC = () => {
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
