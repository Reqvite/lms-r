import { FC } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { MaterialsList } from "../Components/MaterialsList/MaterialsList";
import { materials } from "../data/Fundamentals of electrical engineering/materials";

const Materials = () => {
  const [course, setCourse] = useState(null);
  const [topic, setTopic] = useState(null);
  const [lectures, setLectures] = useState(null);
  const [labs, setLabs] = useState(null);
  const [practices, setPractices] = useState(null);

  const { topicID, courseID } = useParams();

  useEffect(() => {
    const course = materials[Number(courseID)];

    const [topic] = course.topics.filter(
      (topic) => Number(topicID) === topic.id
    );
    setTopic(topic);

    const lectures = topic.materials.filter(({ type }) => {
      return type === "Лекція";
    });
    setLectures(lectures);

    const labs = topic.materials.filter(({ type }) => {
      return type === "Лабалаторна робота";
    });
    setLabs(labs);

    const practices = topic.materials.filter(({ type }) => {
      return type === "practice";
    });
    setPractices(practices);
  }, [topicID, courseID]);

  return (
    <Wrap>
      {lectures && <MaterialsList materials={lectures} />}
      {practices && <MaterialsList materials={practices} />}
      {practices && <MaterialsList materials={labs} />}
    </Wrap>
  );
};

const Wrap = styled.div`
  padding-bottom: 56px;
  height: 100vh;
`;

export default Materials;
