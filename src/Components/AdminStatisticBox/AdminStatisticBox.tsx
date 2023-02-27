import { useEffect, useState } from "react";
import Loader from "Components/Loader/Loader";
import { useAuth } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { fetchAllUsersData } from "redux/tests/operations";
import { selectIsLoading, selectUserTests } from "redux/tests/selectors";
import styled from "styled-components";
import { toast } from "react-toastify";

const AdminStatisticBox = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();
  const [status, setStatus] = useState(false);
  const tests = useSelector(selectUserTests);
  const testLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (!testLoading && tests.length === 0 && status) {
      toast.error("Даних за цим запитом не знайдено", {
        autoClose: 3000,
      });
    }
  }, [testLoading, tests, status]);

  const getDate = (createdAt: string): string => {
    const date = new Date(createdAt);
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} : ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

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
              {[...tests].map(
                ({ _id, mark, testTitle, createdAt, fullname, email }: any) => (
                  <StatisticListItem key={_id}>
                    <ListText>{fullname}</ListText>
                    <ListText>{email}</ListText>
                    <ListText>Назва тесту: {testTitle}</ListText>
                    <ListText>Оцінка: {mark.total}</ListText>
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

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
// const StatisticListHeader = styled.p`
//   font-size: ${(p) => p.theme.fontSizes[3]}px;
//   line-height: ${(p) => p.theme.lineHeights.body};
//   font-weight: ${(p) => p.theme.fontWeights.bold};
// `;
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
  border-radius: 12px;
  padding: 10px 24px;
`;

const Button = styled.button`
  margin-left: ${(p) => p.theme.space[3]}px;
  ${(p) => p.theme.components.buttons.secondaryButton}
`;

const Box = styled.div`
  width: 100%;
  max-width: 800px;
  max-height: 700px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${(p) => p.theme.space[4]}px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
  margin-top: ${(p) => p.theme.space[3]}px;
  margin-right: auto;
  margin-left: auto;
`;

const StatisticList = styled.ul`
  margin-top: ${(p) => p.theme.space[3]}px;
`;

const StatisticListItem = styled.li`
  border: 1px solid #9090c296;
  border-radius: 5px;
  @media screen and (min-width: 680px) {
    flex: 1;
    display: flex;
    align-items: center;
  }
  :not(:first-child) {
    margin-top: ${(p) => p.theme.space[2]}px;
  }
`;

export const ListText = styled.p`
  flex: 1;
  margin-left: ${(p) => p.theme.space[3]}px;
  text-align: center;
  font-size: ${(p) => p.theme.fontSizes[2]}px;
  line-height: ${(p) => p.theme.lineHeights.body};
`;
export default AdminStatisticBox;
