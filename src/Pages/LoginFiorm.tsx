import { FC } from "react";
import AuthForm from "Components/AuthForm/AuthForm";

import { Pages } from "types/types";

const LoginForm: FC = () => {
  return (
    <AuthForm
      title="Login"
      description="Don&#39;t have an account? Sign Up now!"
      page={Pages.LOGIN}
    />
  );
};

export default LoginForm;
