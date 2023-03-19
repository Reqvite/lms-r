import { FC } from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
// import { MaterialsItem } from "Components/MaterialsItem/MaterialsItem";
import { FaYoutube } from "react-icons/fa";

export const MaterialsList: FC = ({ materials, toggleModal }: any) => {
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const [type] = materials.map((item: any) => item.type);
    setTitle(type);
  }, [materials]);

  return (
    <Wrap>
      {title && <h3>{title}</h3>}
      <List>
        {materials.map(({ id, url }: any) => (
          <Element key={id}>
            <FaYoutube />
            <Button type="button" onClick={() => toggleModal(id, url)}>
              {id}
            </Button>
          </Element>
        ))}
      </List>
    </Wrap>
  );
};

const Wrap = styled.div``;
const List = styled.ul``;

const Element = styled.li``;
const Button = styled.button``;
