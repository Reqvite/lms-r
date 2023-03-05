import StatisticBox from "Components/StatisticBox";
import { useAuth } from "hooks";
import styled from "styled-components";

const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <Box>
        <UserName>Привіт, {user.name}!</UserName>
      </Box>
      <StatisticBox />
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

export default Home;
