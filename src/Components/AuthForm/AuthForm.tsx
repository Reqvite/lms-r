import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "redux/auth/operations";

import { AppDispatch } from "redux/store";

import styled from "styled-components";
import { Pages } from "types/pages";

interface AuthFormProps {
  page: number;
  description: string;
  title: string;
}

const AuthForm: FC<AuthFormProps> = ({ page, description, title }) => {
  const dispatch: AppDispatch = useDispatch();

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
      <Description>{description}</Description>
      <Box>
        <Form onSubmit={page === Pages.LOGIN ? handleLogin : handleRegister}>
          {page === Pages.REGISTER && (
            <Label htmlFor="fullname">
              Fullname
              <Input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Your fullname"
                required
              />
            </Label>
          )}
          <Label htmlFor="email">
            Email
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              required
            />
          </Label>
          <Label htmlFor="password">
            Password
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              required
            />
          </Label>
          <Button type="submit">Submit</Button>
        </Form>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.theme.colors.profileItemsBg};
`;

const Header = styled.h2`
  text-align: center;
  font-weight: 500;
  font-size: 32px;
  line-height: 1.2;
`;
const Description = styled.p`
  margin-top: ${(p) => p.theme.space[2]}px;
  font-size: 16px;
  line-height: 1.25;
`;
const Box = styled.div`
  margin-top: ${(p) => p.theme.space[2]}px;
  width: 620px;
  padding: 44px;
  background-color: rgba(214, 214, 214, 0.44);
  backdrop-filter: blur(2px);
  border-radius: 12px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  font-size: 24px;
  line-height: 1.2;
`;

const Input = styled.input`
  margin-top: 5px;
  border-radius: 12px;
  padding: 10px 24px;
  width: 531px;
`;

const Button = styled.button`
  align-self: center;
  margin-top: 10px;
  padding: 10px;
  max-width: 200px;
  border-radius: 12px;
  cursor: pointer;
`;

export default AuthForm;
