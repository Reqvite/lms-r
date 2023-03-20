import { FC } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

interface MainBoxProps {
  children: React.ReactNode;
  showMenu: boolean;
}

const Main: FC<MainBoxProps> = ({ children, showMenu }) => {
  const location = useLocation();

  const dynamicStyles =
    location.pathname.length >= 20 && location.pathname.includes("courses");
  const height = showMenu ? "60px" : "80px";
  return (
    <Box
      style={{
        marginTop: dynamicStyles && !showMenu ? 0 : height,
        paddingTop: showMenu ? "0" : dynamicStyles ? "16px" : "32px",
      }}
    >
      {children}
    </Box>
  );
};

const Box = styled.main`
  margin-top: 80px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 32px;
`;

export default Main;
