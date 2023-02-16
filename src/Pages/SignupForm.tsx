import AuthForm from "Components/AuthForm/AuthForm";

import { Pages } from "types/types";

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
