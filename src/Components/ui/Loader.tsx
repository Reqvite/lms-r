import { FC } from "react";
import { RotatingLines } from "react-loader-spinner";
import styled from "styled-components";

interface LoadProps {
  height?: string;
}

const Loader: FC<LoadProps> = ({ height }) => {
  return (
    <Box minHeight={height}>
      <RotatingLines
        strokeColor={"#9090c2"}
        strokeWidth="5"
        animationDuration="0.75"
        width="30"
        visible={true}
      />
    </Box>
  );
};

export default Loader;

const Box = styled.div<any>`
  min-height: ${(p) => p.minHeight};
  display: flex;
  justify-content: center;
  align-items: center;
`;
