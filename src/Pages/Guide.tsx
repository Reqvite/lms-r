import { useWindowSize } from "hooks";
import { FC, useState } from "react";
import styled from "styled-components";
import { BsArrowsFullscreen } from "react-icons/bs";

const Guide: FC = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const windowSize = useWindowSize();

  const handleFullscreenButton = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Box isFullscreen={isFullscreen}>
      <Button onClick={handleFullscreenButton} size={windowSize.width}>
        <BsArrowsFullscreen size={20} color="#7474a5" />
      </Button>
      <Iframe
        isFullscreen={isFullscreen}
        size={windowSize.width}
        id="theory"
        title="This is a unique title"
        sandbox="allow-same-origin allow-scripts"
        src="https://jodlei.github.io/notes-LMS-docosaurus/intro"
      />
    </Box>
  );
};

const Box = styled.div<{ isFullscreen: boolean }>`
  position: ${(p) => !p.isFullscreen && "relative"};
`;

const Button = styled.button<{ size: number }>`
  background-color: transparent;
  border: none;
  z-index: 2001;
  position: absolute;
  right: ${(p) => (p.size >= 1036 ? "80px" : "25px")};
  top: 19px;
  cursor: pointer;
`;

interface IframeProps {
  isFullscreen: boolean;
  size: number;
}

const Iframe = styled.iframe<IframeProps>`
  height: ${(p) =>
    p.size >= 430 ? "calc(100vh - 150px)" : "calc(100vh - 250px)"};
  width: 100%;
  ${(p) =>
    p.isFullscreen &&
    `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2000;
    `}
  background-color: white;
  border: none;
`;

export default Guide;
