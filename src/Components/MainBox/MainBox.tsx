import styled from "styled-components";

const MainBox = ({ children }: any) => {
  return <Box>{children}</Box>;
};

const Box = styled.div`
  width: 100%;
  margin-left: ${(p) => p.theme.space[3]}px;
  border-radius: 20px;
  background-color: rgba(214, 214, 214, 0.44);
  padding: ${(p) => p.theme.space[4]}px ${(p) => p.theme.space[3]}px;
`;

export default MainBox;
