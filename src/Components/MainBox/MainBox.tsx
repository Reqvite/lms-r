import styled from "styled-components";

const MainBox = ({ children }: any) => {
  return <Box>{children}</Box>;
};

const Box = styled.div`
  width: 100%;
  margin-top: 93px;
`;

export default MainBox;
