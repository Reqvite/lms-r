import Loader from "Components/Loader/Loader";
import { useSelector } from "react-redux";
import { selectIsLoading, selectUserTests } from "redux/tests/selectors";
import styled from "styled-components";

const AdminStatisticBox = () => {
  const tests = useSelector(selectUserTests);
  const testLoading = useSelector(selectIsLoading);

  const getDate = (createdAt: string): string => {
    const date = new Date(createdAt);
    return `${date.getHours()}:${date.getMinutes()} : ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

  return (
    <Box>
      <HeaderBox>
        <StatisticListHeader>Результати</StatisticListHeader>
      </HeaderBox>
      {!testLoading ? (
        <>
          {tests.length === 0 ? (
            <Error>Тестів ще немає</Error>
          ) : (
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
  justify-content: space-between;
`;
const StatisticListHeader = styled.p`
  font-size: ${(p) => p.theme.fontSizes[3]}px;
  line-height: ${(p) => p.theme.lineHeights.body};
  font-weight: ${(p) => p.theme.fontWeights.bold};
`;

const Box = styled.div`
  width: 100%;
  max-width: 800px;
  min-height: 300px;
  padding: ${(p) => p.theme.space[4]}px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
  margin-top: ${(p) => p.theme.space[3]}px;
  margin-right: auto;
  margin-left: auto;
`;

const Error = styled.p`
  ${(p) => p.theme.flexCentered}
  min-height: 200px;
`;
const StatisticList = styled.ul`
  margin-top: ${(p) => p.theme.space[3]}px;
`;

const StatisticListItem = styled.li`
  flex: 1;
  display: flex;
`;

export const ListText = styled.p`
  flex: 1;
  margin-left: ${(p) => p.theme.space[3]}px;
  text-align: center;
  font-size: ${(p) => p.theme.fontSizes[2]}px;
  line-height: ${(p) => p.theme.lineHeights.body};
`;
export default AdminStatisticBox;
