import { FC, memo } from "react";
import { motion } from "framer-motion";
import { IoIosLogOut } from "react-icons/io";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { selectTheme } from "redux/theme/selectors";
import { logOut } from "redux/auth/operations";

const LogoutButton: FC = memo(() => {
  const dispatch: AppDispatch = useDispatch();
  const { theme }: any = useSelector(selectTheme);
  return (
    <Button
      onClick={() => dispatch(logOut())}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <IoIosLogOut size={30} color={theme === "light" ? "black" : "white"} />
    </Button>
  );
});

const Button = styled(motion.button)`
  ${(p) => p.theme.components.buttons.iconButton}
  margin-left: ${(p) => p.theme.space[3]}px;
`;

export default LogoutButton;
