import { FC, forwardRef } from "react";
import { motion } from "framer-motion";
import { BiCalendar } from "react-icons/bi";
import styled from "styled-components";

const StartCustomInput: FC = forwardRef<any>(({ value, onClick }: any, ref) => (
  <Button
    whileHover={{
      scale: 1.05,
    }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    ref={ref}
    type="button"
  >
    <BiCalendar size={20} style={{ marginRight: "2px" }} />
    {value}
  </Button>
));

const Button = styled(motion.button)`
  ${(p) => p.theme.components.buttons.secondaryButton}
  margin-top: ${(p) => p.theme.space[2]}px;
  margin-bottom: ${(p) => p.theme.space[2]}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default StartCustomInput;
