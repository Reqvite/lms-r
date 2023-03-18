import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { toggleTheme } from "redux/theme/themeSlice";
import { selectTheme } from "redux/theme/selectors";
import { AnimatePresence, motion } from "framer-motion";
import { WiMoonWaningCrescent2, WiSolarEclipse } from "react-icons/wi";
import styled from "styled-components";

const ToggleThemeButton: FC = memo(() => {
  const dispatch: AppDispatch = useDispatch();

  const { theme }: any = useSelector(selectTheme);

  const handleTheme = (): void => {
    const value = theme === "light" ? "dark" : "light";
    dispatch(toggleTheme(value));
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Button
        onClick={handleTheme}
        key={theme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        {theme === "light" ? (
          <WiMoonWaningCrescent2 size={30} color="black" />
        ) : (
          <WiSolarEclipse size={30} color="white" />
        )}
      </Button>
    </AnimatePresence>
  );
});

const Button = styled(motion.button)`
  ${(p) => p.theme.components.buttons.iconButton}
  margin-left: ${(p) => p.theme.space[3]}px;
`;
export default ToggleThemeButton;
