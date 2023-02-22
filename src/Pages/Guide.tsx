import { FC } from "react";

const Guide: FC = () => {
  return (
    <>
      <h2>Guide</h2>
      <iframe
        title="This is a unique title"
        style={{ overflow: "hidden" }}
        sandbox="allow-same-origin allow-scripts"
        src="https://jodlei.github.io/notes-LMS-docosaurus/"
        width="100%"
        height="1000px"
      />
    </>
  );
};

export default Guide;
