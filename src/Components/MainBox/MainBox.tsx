import { FC } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

interface MainBoxProps {
  children: React.ReactNode;
  showMenu: boolean;
}

const MainBox: FC<MainBoxProps> = ({ children, showMenu }) => {
  const location = useLocation();

  const dynamicStyles =
    location.pathname.length >= 20 && location.pathname.includes("courses");
  return (
    <Box
      style={{
        marginTop: dynamicStyles && !showMenu ? 0 : "80px",
        paddingTop: dynamicStyles && !showMenu ? "16px" : "32px",
      }}
    >
      {children}
    </Box>
  );
};

const Box = styled.main`
  margin-top: 80px;
  padding: ${(p) => p.theme.space[4]}px ${(p) => p.theme.space[3]}px;
`;

export default MainBox;
