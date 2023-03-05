import { FC } from "react";
import { ToastContainer } from "react-toastify";

export const Alert: FC<any> = ({ theme }) => {
  const handleTheme = theme === "light" ? "light" : "dark";

  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={handleTheme}
    />
  );
};

export default Alert;
