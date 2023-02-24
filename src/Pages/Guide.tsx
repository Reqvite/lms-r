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
      ></Iframe>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding-bottom: 56px;
  height: 100vh;
`;
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  display: flex;
  border: none;
`;

export default Guide;
