import { FC, useEffect } from "react";
import TestBox from "Components/TestBox/TestBox";
import styled from "styled-components";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import { fetchUserTests } from "redux/tests/operations";

const Testing: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserTests());
  }, [dispatch]);
  return (
    <>
      <Box>
        <UserName>Виберіть тест</UserName>
      </Box>
      <TestBox />
    </>
  );
};

const Box = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: ${(p) => p.theme.space[3]}px;
  width: 100%;
  max-width: 350px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
`;

const UserName = styled.p`
  font-size: ${(p) => p.theme.fontSizes[3]}px;
  line-height: ${(p) => p.theme.lineHeights.heading};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  text-align: center;
`;

export default Testing;
