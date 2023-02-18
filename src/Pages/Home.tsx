import { useAuth } from "hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { fetchUserTests } from "redux/tests/operations";
import { selectUserTests } from "redux/tests/selectors";
import styled from "styled-components";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  const tests = useSelector(selectUserTests);
  const { user } = useAuth();

  useEffect(() => {
    dispatch(fetchUserTests());
  }, [dispatch]);

  const getDate = (createdAt: string): string => {
    const date = new Date(createdAt);
    return `${date.getHours()}:${date.getMinutes()} : ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

  return (
    <>
      <h2>Statistic</h2>
      <div>
        <UserName>Hello, {user.name}!</UserName>
      </div>
      <StatisticBox>
        <StatisticListHeader>Your results</StatisticListHeader>
        <StatisticList>
          {[...tests]
            .reverse()
            .map(({ _id, mark, testTitle, createdAt }: any) => (
              <StatisticListItem key={_id}>
                <ListText>Назва тесту: {testTitle}</ListText>
                <ListText>Ваша оцінка: {mark}</ListText>
                <ListText>{getDate(createdAt)}</ListText>
              </StatisticListItem>
            ))}
        </StatisticList>
      </StatisticBox>
    </>
  );
};

const UserName = styled.p`
  display: flex;
  justify-content: center;
  margin-top: ${(p) => p.theme.space[3]}px;
  margin-left: auto;
  margin-right: auto;
  padding: ${(p) => p.theme.space[3]}px;
  width: 100%;
  max-width: 350px;
  font-size: ${(p) => p.theme.fontSizes[3]}px;
  line-height: ${(p) => p.theme.lineHeights.heading};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
  text-align: center;
`;

const StatisticListHeader = styled.p`
  margin-top: ${(p) => p.theme.space[3]}px;
  font-size: ${(p) => p.theme.fontSizes[3]}px;
  line-height: ${(p) => p.theme.lineHeights.body};
  font-weight: ${(p) => p.theme.fontWeights.bold};
`;

const StatisticBox = styled.div`
  width: 100%;
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
`;
const StatisticList = styled.ul`
  margin-top: ${(p) => p.theme.space[3]}px;
  padding: ${(p) => p.theme.space[4]}px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
`;

const StatisticListItem = styled.li`
  display: flex;
  text-align: center;
`;

export const ListText = styled.p`
  line-height: ${(p) => p.theme.lineHeights.body};
  margin-right: auto;
  margin-left: auto;
`;

export default Home;
