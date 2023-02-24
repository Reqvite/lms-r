import { useEffect } from "react";
import { GlobalStyle } from "Components/GlobalStyle/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { refreshUser } from "redux/auth/operations";
import { AppDispatch } from "redux/store";
import LoginForm from "Pages/LoginFiorm";
import SignupForm from "Pages/SignupForm";
import Dashboard from "Pages/Dashboard";
import Home from "Pages/Home";
import { RestrictedRoute } from "Components/RestrictedRoute/RestrictedRoute";
import { PrivateRoute } from "Components/PrivateRoute/PrivateRoute";
import { useAuth } from "hooks";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme/theme";
import { selectTheme } from "redux/theme/selectors";
import Loader from "Components/Loader/Loader";
import Alert from "Components/Alert/Alert";
import Courses from "Pages/Courses";
import Course from "Pages/Course";
import AdminPanel from "Pages/AdminPanel";

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isRefreshing } = useAuth();
  const { theme: themeMode }: any = useSelector(selectTheme);
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  // const location = useLocation();
  // console.log(location);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader height={"100vh"} />
  ) : (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/register"
          element={
            <RestrictedRoute
              component={<SignupForm />}
              redirectTo="/dashboard"
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute
              component={<LoginForm />}
              redirectTo="/dashboard"
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute component={<Dashboard />} redirectTo="/login" />
          }
        >
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />}>
            <Route path=":courseID/*" element={<Course />} />
          </Route>
          <Route path="admin-panel" element={<AdminPanel />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <GlobalStyle />
      <Alert />
    </ThemeProvider>
  );
};

export default App;
