import styled from "styled-components";

const MainBox = ({ children }: any) => {
  return <Box>{children}</Box>;
};

const Box = styled.main`
  margin-top: 80px;
  padding: ${(p) => p.theme.space[4]}px ${(p) => p.theme.space[3]}px;
`;

export default MainBox;
