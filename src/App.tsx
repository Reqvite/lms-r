import { GlobalStyle } from "Components/GlobalStyle/GlobalStyle";
import LoginForm from "Pages/LoginFiorm";
import SignupForm from "Pages/SignupForm";
import { Route, Routes } from "react-router-dom";

function App() {
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
