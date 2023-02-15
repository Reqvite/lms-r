import { useEffect } from "react";
import { GlobalStyle } from "Components/GlobalStyle/GlobalStyle";
import LoginForm from "Pages/LoginFiorm";
import SignupForm from "Pages/SignupForm";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { refreshUser } from "redux/auth/operations";
import { AppDispatch } from "redux/store";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="/register" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/homepage" />
        </Route>
      </Routes>
      <GlobalStyle />
    </>
  );
}

export default App;
