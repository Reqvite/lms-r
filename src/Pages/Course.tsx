import { FC } from "react";
import BreadCrumb from "Components/BreadCrumb/BreadCrumb";
import { Navigate, Route, Routes } from "react-router-dom";
import Guide from "./Guide";
import Testing from "./Testing";

const Course: FC = () => {
  return (
    <div>
      <BreadCrumb />
      <Routes>
        <Route path="/" element={<Navigate to="guide" replace />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </div>
  );
};

export default Course;
