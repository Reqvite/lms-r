import { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { fetchAllTests, fetchUserTests } from "redux/tests/operations";
import { selectIsLoading, selectUserTests } from "redux/tests/selectors";
import Loader from "Components/Loader";
import styled from "styled-components";
import { getDate } from "helpers/helpers";
import {
  Box,
  FirstText,
  ListText,
  StatisticList,
  StatisticListItem,
} from "Components/GlobalStyle/Box.styled";

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
                {allList && <FirstText>Ім'я</FirstText>}
                <ListText>Назва тесту</ListText>
                <ListText>Оцінка</ListText>
                <ListText>Дата</ListText>
              </StatisticListItem>
              {[...tests].map(
                ({ _id, mark, testTitle, createdAt, fullname }: any) => (
                  <StatisticListItem key={_id}>
                    {allList && <FirstText>{fullname}</FirstText>}
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

export const HeaderBox = styled.div`
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

export default StatisticBox;
