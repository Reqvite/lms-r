// import { FC } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { Modal } from "../Components/ui/Modals/Modal";
import { MaterialsList } from "../Components/MaterialsList/MaterialsList";
import { materials } from "../data/Fundamentals of electrical engineering/materials";

const Materials = () => {
  const [materialsLength, setMaterialsLength] = useState(null);
  const [lectures, setLectures] = useState(null);
  const [labs, setLabs] = useState(null);
  const [practices, setPractices] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState(null);

  const { topicID, courseID } = useParams();

  useEffect(() => {
    const course = materials[Number(courseID)];

    const [topic] = course.topics.filter(
      (topic) => Number(topicID) === topic.id
    );
    setMaterialsLength(topic.materials.length);

    const lectures = topic.materials.filter(({ type }) => {
      return type === "Лекції";
    });
    setLectures(lectures);

    const labs = topic.materials.filter(({ type }) => {
      return type === "Лабалаторні роботи";
    });
    setLabs(labs);

    const practices = topic.materials.filter(({ type }) => {
      return type === "Практичні роботи";
    });
    setPractices(practices);
  }, [topicID, courseID]);

  const toggleModal = (id, url) => {
    setShowModal(!showModal);
    setModalVideoUrl(url);
  };

  return (
    <Wrap>
      {materialsLength === 0 && <p>Немає матеріалів з вибранної теми</p>}

      {lectures && (
        <MaterialsList materials={lectures} toggleModal={toggleModal} />
      )}
      {practices && (
        <MaterialsList materials={practices} toggleModal={toggleModal} />
      )}
      {labs && <MaterialsList materials={labs} toggleModal={toggleModal} />}

      {showModal && (
        <Modal toggleModal={toggleModal}>
          <iframe
            width="660"
            height="415"
            src={modalVideoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Modal>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  padding-bottom: 56px;
  height: 100vh;
`;

export default Materials;
