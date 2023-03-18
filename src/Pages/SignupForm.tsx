import { FC } from "react";
import AuthForm from "Components/AuthForm";

import { Pages } from "types/authTypes";

const SignupForm: FC = () => {
  return (
    <AuthForm
      title="Реєстрація"
      description="Увійдіть!"
      page={Pages.REGISTER}
      text={"Вже є аккаунт?"}
    />
  );
};

export default SignupForm;
