import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { TiUserDelete } from "react-icons/ti";
import { selectTheme } from "redux/theme/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getDate } from "helpers/getDate";
import { deleteUser } from "redux/admin/operations";
import { AppDispatch } from "redux/store";

const modalRoot: any = document.querySelector("#user-modal-root");

const UserModal = ({ toggleModal, user }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [deleteStatus, setDeleteStatus] = useState<boolean>(false);
  const { theme }: any = useSelector(selectTheme);
  const {
    _id,
    fullname,
    email,
    testResults,
    createdAt,
    updatedAt,
    testStatistics,
  } = user[0];

  useEffect(() => {
    window.addEventListener("keydown", closeModal);
    return () => {
      window.removeEventListener("keydown", closeModal);
    };
  });

  const closeModal = (e: any) => {
    if (e.code === "Escape") {
      toggleModal();
    }
  };

  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const handleDeleteButton = (id: string) => {
    if (!deleteStatus) {
      setDeleteStatus(true);
      return;
    }

    setDeleteStatus(false);
    dispatch(deleteUser({ id }));
    toggleModal();
    toast.dismiss();
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalContainer>
        <ul>
          <ListItem>
            <p>Ім'я:</p>
            <TextInfo>{fullname}</TextInfo>
          </ListItem>
          <ListItem>
            <p>Пошта:</p>
            <TextInfo>{email}</TextInfo>
          </ListItem>
          <ListItem>
            <p>Завершені тести:</p>
            <TextInfo>
              {testResults.length !== 0 ? testResults.join(",") : "Пусто"}
            </TextInfo>
          </ListItem>
          <ListItem>
            <p>Статистика (не склав/склав):</p>
            <TextInfo>
              {testResults.length !== 0 ? testStatistics.join(":") : "Пусто"}
            </TextInfo>
          </ListItem>
          <ListItem>
            <p>Дата реєстрації:</p>
            <TextInfo>{getDate(createdAt)}</TextInfo>
          </ListItem>
          <ListItem>
            <p>Дата останього логіну:</p>
            <TextInfo>{getDate(updatedAt)}</TextInfo>
          </ListItem>
        </ul>
        <ButtonsBox>
          <DeleteUserButton
            onClick={() => handleDeleteButton(_id)}
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{ scale: 0.95 }}
          >
            {!deleteStatus ? (
              <TiUserDelete
                size={25}
                color={theme === "light" ? "black" : "white"}
              />
            ) : (
              "Підтвердити видалення"
            )}
          </DeleteUserButton>
        </ButtonsBox>
      </ModalContainer>
    </Overlay>,
    modalRoot
  );
};
const Overlay = styled.div`
  ${(p) => p.theme.flexCentered}
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.8);
`;
const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 40px;
  padding-bottom: 40px;
  width: 95%;
  max-width: 500px;
  height: auto;
  background-color: ${(p) => p.theme.colors.mainBackground};
  border-radius: 5px;
`;

const ListItem = styled.li`
  display: flex;
  :not(:first-child) {
    margin-top: ${(p) => p.theme.space[2]}px;
  }
`;

const TextInfo = styled.p`
  margin-left: auto;
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(p) => p.theme.space[3]}px;
`;
const DeleteUserButton = styled(motion.button)`
  ${(p) => p.theme.components.buttons.secondaryButton}
`;

export default UserModal;
