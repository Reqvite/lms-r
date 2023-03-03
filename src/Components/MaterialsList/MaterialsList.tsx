import { FC } from "react";
import { FaYoutube } from "react-icons/fa";
import styled from "styled-components";

export const MaterialsList: FC = ({ materials }: any) => {
  return (
    <Wrap>
      <h3></h3>
      <ul>
        {materials.map(({ id, type, url }: any) => {
          return (
            <li key={id}>
              <FaYoutube />
              {id}
            </li>
          );
        })}
      </ul>
    </Wrap>
  );
};

const Wrap = styled.div``;
