import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/theme/selectors";
import styled from "styled-components";

const Loader = ({ height }: any) => {
  const { theme: themeMode }: any = useSelector(selectTheme);
  return (
    <Box style={{ minHeight: `${height}` }}>
      <RotatingLines
        strokeColor={themeMode === "light" ? "grey" : "white"}
        strokeWidth="5"
        animationDuration="0.75"
        width="30"
        visible={true}
      />
    </Box>
  );
};

export default Loader;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
