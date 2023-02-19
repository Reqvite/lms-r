import StatisticBox from "Components/StatisticBox/StatisticBox";
import { useAuth } from "hooks";
import styled from "styled-components";

const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <div>
        <UserName>Привіт, {user.name}!</UserName>
      </div>
      <StatisticBox />
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

export default Home;
