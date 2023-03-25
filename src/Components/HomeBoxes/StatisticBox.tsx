import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { fetchAllTests, fetchUserTests } from "redux/tests/operations";
import { selectIsLoading, selectUserTests } from "redux/tests/selectors";
import Loader from "Components/ui/Loader";
import styled from "styled-components";
import { getDate } from "helpers/getDate";
import { motion } from "framer-motion";

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
        <StatisticListHeader>Результати тестів</StatisticListHeader>
        <ResultsButton
          onClick={handleResultButton}
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
        >
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

export const Box = styled.div`
  width: 100%;
  max-width: 800px;
  max-height: 650px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${(p) => p.theme.space[4]}px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
`;

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

export const StatisticList = styled.ul`
  margin-top: ${(p) => p.theme.space[3]}px;
`;

export const StatisticListItem = styled.li`
  text-align: center;
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

export const FirstText = styled.p`
  flex: 1;
  margin-left: ${(p) => p.theme.space[3]}px;
  text-align: center;
  font-size: ${(p) => p.theme.fontSizes[2]}px;
  line-height: ${(p) => p.theme.lineHeights.body};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  :hover {
    white-space: normal;
    overflow: visible;
  }
`;

const ResultsButton = styled(motion.button)`
  ${(p) => p.theme.components.buttons.secondaryButton}
`;

const Error = styled.p`
  ${(p) => p.theme.flexCentered}
  min-height: 200px;
`;

export default StatisticBox;
