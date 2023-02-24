import { FC } from "react";
import AuthForm from "Components/AuthForm/AuthForm";

import { Pages } from "types/types";

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
