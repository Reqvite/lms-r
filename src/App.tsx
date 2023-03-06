import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { refreshUser } from "redux/auth/operations";
import { AppDispatch } from "redux/store";
import { useAuth } from "hooks";
import { GlobalStyle } from "Components/GlobalStyle/GlobalStyle";
import DashboardSharedLayout from "Components/DashboardSharedLayout";
import RestrictedRoute from "Components/Routes/RestrictedRoute";
import PrivateRoute from "Components/Routes/PrivateRoute";
import Loader from "Components/Loader";
import Alert from "Components/Alert";
import Home from "Pages/Home";
import LoginForm from "Pages/LoginFiorm";
import SignupForm from "Pages/SignupForm";
import Courses from "Pages/Courses";
import Course from "Pages/Course";
import AdminPanel from "Pages/AdminPanel";
import { darkTheme, lightTheme } from "./theme/theme";
import { selectTheme } from "redux/theme/selectors";

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isRefreshing, isLoggedIn, user } = useAuth();
  const { theme: themeMode }: any = useSelector(selectTheme);
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  const location = useLocation();
  const shouldRedirect = !isRefreshing && !isLoggedIn;
  const path = shouldRedirect ? "/login" : location.pathname;

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
              redirectTo="dashboard"
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
            <PrivateRoute
              component={<DashboardSharedLayout />}
              redirectTo={path}
              isAllowed={shouldRedirect}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />}>
            <Route path=":courseID/*" element={<Course />} />
          </Route>
          <Route
            path="admin-panel"
            element={
              <PrivateRoute
                component={<AdminPanel />}
                redirectTo="/dashboard"
                isAllowed={user.role !== "admin" && !user.hasAccess}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <GlobalStyle location={location} />
      <Alert theme={themeMode} />
    </ThemeProvider>
  );
};

export default App;
