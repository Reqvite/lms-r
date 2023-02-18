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
import Testing from "Pages/Testing";
import Guide from "Pages/Guide";
import { RestrictedRoute } from "Components/RestrictedRoute/RestrictedRoute";
import { PrivateRoute } from "Components/PrivateRoute/PrivateRoute";
import { useAuth } from "hooks";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme/theme";
import { selectTheme } from "redux/theme/selectors";

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isRefreshing } = useAuth();

  const { theme: themeMode }: any = useSelector(selectTheme);

  const theme = themeMode === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Loading...</p>
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
          <Route path="testing" element={<Testing />} />
          <Route path="guide" element={<Guide />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
