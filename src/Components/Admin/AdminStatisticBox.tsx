import { useEffect, useState } from "react";
import Loader from "Components/Loader";
import { useAuth } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { fetchAllUsersData } from "redux/admin/operations";
import styled from "styled-components";
import { toast } from "react-toastify";
import { getDate } from "helpers/helpers";
import {
  Button,
  FirstText,
  HeaderBox,
  ListText,
  StatisticList,
  StatisticListItem,
} from "Components/GlobalStyle/Box.styled";
import { selectAdminTests, selectIsLoading } from "redux/admin/selectors";

const AdminStatisticBox = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();
  const [status, setStatus] = useState<boolean>(false);
  const tests = useSelector(selectAdminTests);
  const testLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (!testLoading && tests?.length === 0 && status) {
      toast.error("Даних за цим запитом не знайдено", {
        autoClose: 3000,
      });
      setStatus(false);
    }
  }, [testLoading, tests, status]);

  const handleParams = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const params = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      limit: (form.elements.namedItem("limit") as HTMLInputElement).value,
    };
    if (user.role === "admin" && user.hasAccess) {
      dispatch(fetchAllUsersData(params));
      setStatus(true);
    }
    form.reset();
  };

  return (
    <Box>
      <HeaderBox>
        <p>Результати тестів</p>
        <FormBox onSubmit={handleParams}>
          <InputBox>
            <Label htmlFor="email">
              <Input
                type="text"
                id="email"
                name="email"
                placeholder="Пошта або повне Ім'я"
              />
            </Label>
            <Label htmlFor="limit">
              <Input
                type="number"
                id="limit"
                name="limit"
                placeholder="Ліміт"
              />
            </Label>
          </InputBox>
          <Button>Пошук</Button>
        </FormBox>
      </HeaderBox>
      {!testLoading ? (
        <>
          {status && (
            <StatisticList>
              <StatisticListItem>
                <FirstText>Ім'я</FirstText>
                <FirstText>Пошта</FirstText>
                <ListText>Назва тесту</ListText>
                <ListText>Оцінка</ListText>
                <ListText>Дата</ListText>
              </StatisticListItem>
              {tests.map(
                ({ _id, mark, testTitle, createdAt, fullname, email }: any) => (
                  <StatisticListItem key={_id}>
                    <FirstText>{fullname}</FirstText>
                    <FirstText>{email}</FirstText>
                    <ListText>{testTitle}</ListText>
                    <ListText>{mark.total}</ListText>
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
  margin-top: ${(p) => p.theme.space[2]}px;

  @media screen and (min-width: 960px) {
    margin-top: 0;
    margin-left: ${(p) => p.theme.space[2]}px;
  }
`;

const FormBox = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const InputBox = styled.div``;

const Label = styled.label`
  :not(:first-child) {
    margin-top: ${(p) => p.theme.space[2]}px;
  }

  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 100%;
  max-width: 250px;
  border-radius: 12px;
  padding: 10px 24px;
`;

export default AdminStatisticBox;
