import { courses } from "data/tests";
import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const Courses = () => {
  const [showCourses, setShowCourses] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setShowCourses(location.pathname === "/dashboard/courses");
  }, [location.pathname]);

  return (
    <>
      {showCourses && (
        <List>
          {courses.map(({ id, title }) => (
            <Box key={id}>
              <NavLink to={`${id}`} onClick={() => setShowCourses(false)}>
                {title}
              </NavLink>
            </Box>
          ))}
        </List>
      )}
      <Outlet />
    </>
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
