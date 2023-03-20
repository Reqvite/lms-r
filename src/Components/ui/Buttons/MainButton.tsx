import { FC, memo } from "react";
import { useAuth } from "hooks";
import { motion } from "framer-motion";
import styled from "styled-components";
import Loader from "Components/ui/Loader";

interface MainButtonProps {
  title?: string;
}

const MainButton: FC<MainButtonProps> = memo(({ title }) => {
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
});

const Button = styled(motion.button)`
  ${(p) => p.theme.components.buttons.mainButton}
  align-self: center;
  margin-top: 10px;
`;

export default MainButton;
