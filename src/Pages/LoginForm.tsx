import { FC } from "react";
import AuthForm from "Components/AuthForm";

import { Pages } from "types/authTypes";

const LoginForm: FC = () => {
  return (
    <AuthForm
      title="Вхід"
      description="Зареєструйся зараз!"
      page={Pages.LOGIN}
      text={"Немає аккаунту?"}
    />
  );
};

export default LoginForm;
