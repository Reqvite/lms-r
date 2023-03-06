import { FC } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useAuth } from "hooks";
import Loader from "Components/Loader";

interface MainButtonProps {
  title?: string;
}

const MainButton: FC<MainButtonProps> = ({ title }) => {
  const { isLoading } = useAuth();
  return (
    <Button
      type="submit"
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {!isLoading ? title : <Loader />}
    </Button>
  );
};

const Button = styled(motion.button)`
  ${(p) => p.theme.components.buttons.mainButton}
  align-self: center;
  margin-top: 10px;
`;

export default MainButton;
