import { FC } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

interface MainButtonProps {
  title: string;
}

const MainButton: FC<MainButtonProps> = ({ title }) => {
  return (
    <Button
      type="submit"
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {title}
    </Button>
  );
};

const Button = styled(motion.button)`
  ${(p) => p.theme.components.buttons.mainButton}
  align-self: center;
  margin-top: 10px;
`;

export default MainButton;
