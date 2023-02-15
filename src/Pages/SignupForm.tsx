import AuthForm from "Components/AuthForm/AuthForm";

import { Pages } from "types/pages";

const SignupForm = () => {
  return (
    <AuthForm
      title="Sign up"
      description="Already have an account? Login now!"
      page={Pages.REGISTER}
    />
  );
};

export default SignupForm;
