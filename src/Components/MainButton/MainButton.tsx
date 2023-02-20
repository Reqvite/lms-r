import { motion } from "framer-motion";
import styled from "styled-components";

const MainButton = () => {
  return (
    <Button
      type="submit"
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{ scale: 0.95 }}
    >
      Submit
    </Button>
  );
};

const Button = styled(motion.button)`
  ${(p) => p.theme.components.buttons.mainButton}
  align-self: center;
  margin-top: 10px;
`;

export default MainButton;
