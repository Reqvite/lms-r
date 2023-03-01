import BreadCrumb from "Components/BreadCrumb/BreadCrumb";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Guide from "./Guide";
import Testing from "./Testing";
import { courses } from "data/tests";
import { FC, useEffect, useState } from "react";

import styled from "styled-components";

const Course: FC = () => {
  const { courseID } = useParams();

  const [topics, setTopics] = useState<string | null>(null);
  const [selectTopic, setSelectTopic] = useState<string | null>(null);
  const [isNavigate, setIsNavigate] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const course = courses.filter(
      (course: any) => String(course.id) === courseID
    );
    const topics = course[0].topics;
    setTopics(topics);
    if (!isNavigate) {
      setSelectTopic(topics[0].topicTitle);
      navigate(`${topics[0].id}`);
      setIsNavigate(true);
    }
  }, [courseID, selectTopic, isNavigate, navigate]);

  const handleData = (topicTitle: string, id: number) => {
    setSelectTopic(topicTitle);
    navigate(`${id}`);
  };

  return (
    <Wrap>
      <Routes>
        <Route
          path=":topicID/*"
          element={
            <BreadCrumb
              topics={topics}
              selectTopic={selectTopic}
              onData={handleData}
            />
          }
        >
          <Route path="" element={<Navigate to="guide" replace />} />
          <Route path="testing" element={<Testing />} />
          <Route path="guide" element={<Guide />} />
        </Route>
      </Routes>
    </Wrap>
  );
};
const Wrap = styled.div`
  height: 100%;
`;
export default Course;
