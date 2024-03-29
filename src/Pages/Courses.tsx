import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { courses } from "data/tests";

const Courses: FC = () => {
  const [showCourses, setShowCourses] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setShowCourses(location.pathname === "/dashboard/courses");
  }, [location.pathname]);

  return (
    <>
      {showCourses && (
        <List>
          {courses.map(({ id, title }: any) => (
            <ListItem
              key={id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLinkText to={`${id}`} onClick={() => setShowCourses(false)}>
                {title}
              </NavLinkText>
            </ListItem>
          ))}
        </List>
      )}
      <Outlet />
    </>
  );
};

const List = styled.ul`
  display: grid;
  gap: 10px;
  justify-content: center;
  grid-template-columns: auto;
  @media screen and (min-width: 700px) {
    grid-template-columns: auto auto;
  }
  @media screen and (min-width: 980px) {
    grid-template-columns: auto auto auto;
  }
`;
const ListItem = styled(motion.li)`
  margin-left: 3px;
  width: 300px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
  margin-left: ${(p) => p.theme.space[3]}px;
`;

const NavLinkText = styled(NavLink)`
  display: block;
  padding: ${(p) => p.theme.space[4]}px;
  font-size: ${(p) => p.theme.fontSizes[4]}px;
  line-height: ${(p) => p.theme.lineHeights.heading};
  font-weight: ${(p) => p.theme.fontWeights.bold};
`;

export default Courses;
