import BreadCrumb from "Components/BreadCrumb/BreadCrumb";
import { Route, Routes } from "react-router-dom";
import Guide from "./Guide";
import Testing from "./Testing";

const Course = () => {
  return (
    <div>
      <BreadCrumb />
      <Routes>
        <Route path="testing" element={<Testing />} />
        <Route path="guide" element={<Guide />} />
      </Routes>
    </div>
  );
};

export default Course;
