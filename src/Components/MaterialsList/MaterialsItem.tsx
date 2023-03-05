import { FC } from "react";
import { FaYoutube } from "react-icons/fa";
import styled from "styled-components";

export const MaterialsItem: FC = ({ key }: any) => {
  console.log(key);

  return (
    <Element key={key}>
      <FaYoutube />
      <Button type="button">{key}</Button>
    </Element>
  );
};

const Element = styled.li``;
const Button = styled.button``;
