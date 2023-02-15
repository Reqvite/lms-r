import AuthForm from "Components/AuthForm/AuthForm";

import { Pages } from "types/pages";

const LoginForm = () => {
  return (
    <AuthForm
      title="Login"
      description="Don&#39;t have an account? Sign Up now!"
      page={Pages.LOGIN}
    />
  );
};

export default LoginForm;
