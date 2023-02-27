import { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { fetchAllTests, fetchUserTests } from "redux/tests/operations";
import { selectIsLoading, selectUserTests } from "redux/tests/selectors";
import Loader from "Components/Loader/Loader";
import styled from "styled-components";

const StatisticBox: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [allList, setAllList] = useState<boolean>(false);

  const tests = useSelector(selectUserTests);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (!allList) {
      dispatch(fetchUserTests());
    } else {
      dispatch(fetchAllTests());
    }
  }, [dispatch, allList]);

  const handleResultButton = (): void => {
    setAllList(!allList);
  };
  const getDate = (createdAt: string): string => {
    const date = new Date(createdAt);
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} : ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

  return (
    <Box>
      <HeaderBox>
        <StatisticListHeader>Результати</StatisticListHeader>
        <ResultsButton onClick={handleResultButton}>
          {allList ? "Ваші" : "Усі"}
        </ResultsButton>
      </HeaderBox>
      {!isLoading ? (
        <>
          {tests.length === 0 ? (
            <Error>Ви ще не здали жодного тесту.</Error>
          ) : (
            <StatisticList>
              <StatisticListItem>
                {allList && <ListText>Ім'я</ListText>}
                <ListText>Назва тесту</ListText>
                <ListText>Оцінка</ListText>
                <ListText>Дата</ListText>
              </StatisticListItem>
              {[...tests].map(
                ({ _id, mark, testTitle, createdAt, fullname }: any) => (
                  <StatisticListItem key={_id}>
                    {allList && <ListText>{fullname}</ListText>}
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
  min-height: 300px;
  padding: ${(p) => p.theme.space[4]}px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
  margin-top: ${(p) => p.theme.space[3]}px;
  margin-right: auto;
  margin-left: auto;
`;

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StatisticListHeader = styled.p`
  margin-right: ${(p) => p.theme.space[2]}px;
  font-size: ${(p) => p.theme.fontSizes[3]}px;
  line-height: ${(p) => p.theme.lineHeights.body};
  font-weight: ${(p) => p.theme.fontWeights.bold};
`;

const ResultsButton = styled.button`
  ${(p) => p.theme.components.buttons.secondaryButton}
`;

const Error = styled.p`
  ${(p) => p.theme.flexCentered}
  min-height: 200px;
`;
const StatisticList = styled.ul`
  margin-top: ${(p) => p.theme.space[3]}px;
`;

const StatisticListItem = styled.li`
  :not(:first-child) {
    border: 1px solid #9090c296;
  }
  border-radius: 5px;
  @media screen and (min-width: 550px) {
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

export default StatisticBox;
