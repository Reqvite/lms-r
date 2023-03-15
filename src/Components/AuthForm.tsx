import React, { FC } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { login, register } from "redux/auth/operations";
import { AppDispatch } from "redux/store";
import styled, { useTheme } from "styled-components";
import { Pages } from "types/types";
import MainButton from "Components/Buttons/MainButton";

interface AuthFormProps {
  page: number;
  description: string;
  title: string;
  text: string;
}

const AuthForm: FC<AuthFormProps> = ({ page, description, text, title }) => {
  const dispatch: AppDispatch = useDispatch();
  const theme: any = useTheme();

  const handleRegister = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const credentials = {
      fullname: (form.elements.namedItem("fullname") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    };
    dispatch(register(credentials));
    form.reset();
  };

  const handleLogin = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const credentials = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    };
    dispatch(login(credentials));
    form.reset();
  };

  return (
    <Container>
      <Header>{title}</Header>
      <Wrap>
        <AdditionalDescription>{text}</AdditionalDescription>
        <Description
          as={NavLink}
          to={page === Pages.LOGIN ? "/register" : "/login"}
        >
          {description}
        </Description>
      </Wrap>

      <Box>
        <Form onSubmit={page === Pages.LOGIN ? handleLogin : handleRegister}>
          {page === Pages.REGISTER && (
            <Label htmlFor="fullname">
              Ваше повне ім'я
              <Input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Олександр Олександров"
                required
                whileHover={{ borderColor: theme.colors.accentColor }}
                whileFocus={{ outlineColor: theme.colors.accentColor }}
              />
            </Label>
          )}
          <Label htmlFor="email">
            Електронна пошта
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="olexandr@gmail.com"
              required
              whileHover={{ borderColor: theme.colors.accentColor }}
              whileFocus={{ outlineColor: theme.colors.accentColor }}
            />
          </Label>
          <Label htmlFor="password">
            Пароль
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Ваш пароль, 6 символів мінімум"
              required
              whileHover={{ borderColor: theme.colors.accentColor }}
              whileFocus={{ outlineColor: theme.colors.accentColor }}
            />
          </Label>
          <MainButton title={page === Pages.LOGIN ? "Вхід" : "Реєстрація"} />
        </Form>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  ${(p) => p.theme.flexCentered}
  flex-direction: column;
  height: 100vh;
  background-color: ${(p) => p.theme.colors.mainBackground};
  padding-left: 20px;
  padding-right: 20px;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.h2`
  text-align: center;
  font-size: ${(p) => p.theme.fontSizes[4]}px;
  line-height: ${(p) => p.theme.lineHeights.heading};
`;
const Description = styled.p`
  margin-top: ${(p) => p.theme.space[2]}px;
  margin-left: ${(p) => p.theme.space[2]}px;
  font-size: ${(p) => p.theme.fontSizes[3]}px;
  line-height: ${(p) => p.theme.lineHeights.body};
  text-align: center;
  color: ${(p) => p.theme.colors.accentColor};
`;

const AdditionalDescription = styled.p`
  margin-top: ${(p) => p.theme.space[2]}px;
  font-size: ${(p) => p.theme.fontSizes[2]}px;
  line-height: ${(p) => p.theme.lineHeights.body};
  text-align: center;
`;

const Box = styled.div`
  margin-top: ${(p) => p.theme.space[2]}px;
  width: 100%;
  max-width: 650px;
  min-width: 250px;
  padding: 44px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  backdrop-filter: blur(2px);
  border-radius: 12px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  margin-top: ${(p) => p.theme.space[2]}px;
  display: flex;
  flex-direction: column;
  font-size: ${(p) => p.theme.fontSizes[3]}px;
  line-height: 1.2;
`;

const Input = styled(motion.input)`
  margin-top: ${(p) => p.theme.space[2]}px;
  border-radius: 12px;
  padding: 10px 24px;
`;

export default AuthForm;
