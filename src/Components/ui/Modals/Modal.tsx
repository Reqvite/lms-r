import { FC } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot: any = document.querySelector("#video-modal-root");

export const Modal: FC = ({ toggleModal, children }: any) => {
  useEffect(() => {
    window.addEventListener("keydown", closeModal);
    return () => {
      window.removeEventListener("keydown", closeModal);
    };
  });

  const closeModal = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      toggleModal();
    }
  };

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <ModalContainer>{children}</ModalContainer>
    </Overlay>,
    modalRoot
  );
};

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;
export const ModalContainer = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;
