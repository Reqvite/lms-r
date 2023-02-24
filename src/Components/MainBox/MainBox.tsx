import { FC } from "react";
import styled from "styled-components";

interface MainBoxProps {
  children: React.ReactNode;
}

const MainBox: FC<MainBoxProps> = ({ children }) => {
  return <Box>{children}</Box>;
};

const Box = styled.main`
  height: 100%;
  margin-top: 80px;
  padding: ${(p) => p.theme.space[4]}px ${(p) => p.theme.space[3]}px;
  overflow: hidden;
`;

export default MainBox;
