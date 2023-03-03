import { getDate } from "helpers/helpers";
import Loader from "Components/Loader/Loader";
import { useAuth } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "redux/admin/operations";
import { selectIsLoading, selectUsers } from "redux/admin/selectors";
import { AppDispatch } from "redux/store";
import {
  Button,
  FirstText,
  HeaderBox,
  ListText,
  StatisticList,
  StatisticListItem,
} from "Components/GlobalStyle/Box.styled";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminUserControllBox = () => {
  const dispatch: AppDispatch = useDispatch();
  const [status, setStatus] = useState<boolean>(false);
  const usersLoading = useSelector(selectIsLoading);
  const users = useSelector(selectUsers);
  const { user } = useAuth();

  useEffect(() => {
    if (!usersLoading && users?.length === 0 && status) {
      toast.error("Даних за цим запитом не знайдено", {
        autoClose: 3000,
      });
      setStatus(false);
    }
  }, [status, users, usersLoading]);

  const submit = () => {
    if (user.role === "admin" && user.hasAccess) {
      dispatch(fetchUsers());
      setStatus(true);
    }
  };

  return (
    <Box>
      <HeaderBox>
        <p>Користувачи</p>
        <Button onClick={submit}>Пошук</Button>
      </HeaderBox>
      {!usersLoading ? (
        <>
          {status && (
            <StatisticList>
              <StatisticListItem>
                <FirstText>Ім'я</FirstText>
                <FirstText>Пошта</FirstText>
                <ListText>Здані тести</ListText>
                <ListText>Дата</ListText>
              </StatisticListItem>
              {users?.map(
                ({ _id, fullname, email, testResults, createdAt }: any) => (
                  <StatisticListItem key={_id}>
                    <FirstText>{fullname}</FirstText>
                    <FirstText>{email}</FirstText>
                    <ListText>
                      {testResults.length !== 0
                        ? testResults.join(",")
                        : "Пусто"}
                    </ListText>
                    <ListText>{getDate(createdAt)}</ListText>
                  </StatisticListItem>
                )
              )}
            </StatisticList>
          )}
        </>
      ) : (
        <Loader height="200px" />
      )}
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  max-width: 800px;
  max-height: 700px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${(p) => p.theme.space[4]}px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
`;

export default AdminUserControllBox;
