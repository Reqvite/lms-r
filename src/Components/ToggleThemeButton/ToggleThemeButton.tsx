import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "redux/store";
import { toggleTheme } from "redux/theme/themeSlice";
import { selectTheme } from "redux/theme/selectors";

const ToggleThemeButton = () => {
  const dispatch: AppDispatch = useDispatch();

  const { theme }: any = useSelector(selectTheme);

  const handleTheme = () => {
    dispatch(toggleTheme(theme === "light" ? "dark" : "light"));
  };
  return <button onClick={handleTheme}>Theme</button>;
};

export default ToggleThemeButton;
