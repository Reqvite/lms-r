import { FC } from "react";
import styled from "styled-components";

const Guide: FC = () => {
  return (
    <Wrap>
      <Iframe
        id="theory"
        title="This is a unique title"
        sandbox="allow-same-origin allow-scripts"
        src="https://jodlei.github.io/notes-LMS-docosaurus/intro"
      />
    </Wrap>
  );
};

const Wrap = styled.div``;
const Iframe = styled.iframe`
  display: flex;
  flex-grow: 1;
  width: 100%;
  max-width: 100%;
  height: 100vh;
  max-height: 70vh;
  background-color: white;
  border: none;
`;

export default Guide;
