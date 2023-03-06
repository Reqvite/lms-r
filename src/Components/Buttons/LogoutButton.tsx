import { motion } from "framer-motion";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "redux/auth/operations";
import { AppDispatch } from "redux/store";
import { selectTheme } from "redux/theme/selectors";
import styled from "styled-components";

const LogoutButton = () => {
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
};

const Button = styled(motion.button)`
  ${(p) => p.theme.components.buttons.iconButton}
  margin-left: ${(p) => p.theme.space[3]}px;
`;

export default LogoutButton;
