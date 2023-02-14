import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { register } from "redux/auth/operations";

import { ThunkDispatch } from "redux-thunk";
import { RootState } from "redux/store";
import { AnyAction } from "@reduxjs/toolkit";
import styled from "styled-components";

type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

const AuthForm: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
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

  return (
    <Container>
      <Header>Login</Header>
      <Description>Don’t have an account? Signup now!</Description>
      <Box>
        <Form onSubmit={handleSubmit}>
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
`;

const Header = styled.h2`
  text-align: center;
  font-weight: 500;
  font-size: 32px;
  line-height: 1.2;
`;
const Description = styled.p`
  font-size: 16px;
  line-height: 1.25;
`;
const Box = styled.div`
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
