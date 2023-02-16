import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { login, register } from "redux/auth/operations";
import { AppDispatch } from "redux/store";
import styled from "styled-components";
import { Pages } from "types/types";

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
      <Description
        as={NavLink}
        to={page === Pages.LOGIN ? "/register" : "/login"}
      >
        {description}
      </Description>
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
  ${(p) => p.theme.flexCentered}
  flex-direction: column;
  padding: 10px;
  height: 100vh;
  background-color: ${(p) => p.theme.colors.lightBackground};
`;

const Header = styled.h2`
  text-align: center;
  font-weight: 500;
  font-size: ${(p) => p.theme.fontSizes[4]}px;
  line-height: 1.2;
`;
const Description = styled.p`
  margin-top: ${(p) => p.theme.space[2]}px;
  font-size: ${(p) => p.theme.fontSizes[2]}px;
  line-height: 1.25;
  text-align: center;
`;
const Box = styled.div`
  margin-top: ${(p) => p.theme.space[2]}px;
  width: 100%;
  max-width: 650px;
  min-width: 250px;
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
  font-size: ${(p) => p.theme.fontSizes[3]}px;
  line-height: 1.2;
`;

const Input = styled.input`
  margin-top: 5px;
  border-radius: 12px;
  padding: 10px 24px;
`;

const Button = styled.button`
  ${(p) => p.theme.buttons.mainButton}
  align-self: center;
  margin-top: 10px;
`;

export default AuthForm;
