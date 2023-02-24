import { FC } from "react";
import BreadCrumb from "Components/BreadCrumb/BreadCrumb";
import { Navigate, Route, Routes } from "react-router-dom";
import Guide from "./Guide";
import Testing from "./Testing";
import styled from "styled-components";

const Course: FC = () => {
  return (
    <Wrap>
      <BreadCrumb />
      <Routes>
        <Route path="/" element={<Navigate to="guide" replace />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </Wrap>
  );
};
const Wrap = styled.div`
  height: 100%;
`;
export default Course;
