import { courses } from "data/tests";
import styled from "styled-components";

const Courses = () => {
  return (
    <List>
      {courses.map(({ id, title }) => (
        <Box key={id}>{title}</Box>
      ))}
    </List>
  );
};

const List = styled.ul`
  display: flex;
`;
const Box = styled.li`
  margin-left: 3px;
  padding: ${(p) => p.theme.space[3]}px;
  width: 100%;
  max-width: 350px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
`;

export default Courses;
