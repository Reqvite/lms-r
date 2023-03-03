import { motion } from "framer-motion";
import { FC } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import BreadCrumbList from "./BreadCrumbItem";

const BreadCrumb: FC<any> = ({ topics, selectTopic, onData }) => {
  const { pathname } = useLocation();

  const handleData = (topicTitle: string, id: any): void => {
    onData(topicTitle, id);
  };

  const crumbs: any = [];
  const path = pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => crumb.charAt(0).toUpperCase() + crumb.slice(1));

  // console.log(path);

  path.forEach((crumb: string) => {
    if (crumb === "Dashboard") {
      crumbs.push({ crumb, title: "Домашня Сторінка" });
    } else if (crumb === "Courses") {
      crumbs.push({ crumb, title: "Курси" });
    } else if (crumb === "Guide") {
      crumbs.push({ crumb, title: "Конспект" });
    } else if (crumb === "Testing") {
      crumbs.push({ crumb, title: "Тести" });
    } else if (crumb === "Materials") {
      crumbs.push({ crumb, title: "Матеріали" });
    } else {
      crumbs.push({ crumb, title: "none" });
    }
  });

  return (
    <>
      <Box>
        <BreadCrumbList
          crumbs={crumbs}
          handleData={handleData}
          topics={topics}
          selectTopic={selectTopic}
          path={path}
        />
      </Box>
      <List>
        <ListItem>
          <NavListItemLink to="guide">Конспект</NavListItemLink>
        </ListItem>
        <ListItem>
          <NavListItemLink to="materials">Матеріали</NavListItemLink>
        </ListItem>
        <ListItem>
          <NavListItemLink to="testing">Тести</NavListItemLink>
        </ListItem>
      </List>
      <Outlet />
    </>
  );
};

export const Box = styled.div`
  margin-bottom: ${(p) => p.theme.space[2]}px;
`;

export const BreadCrumbsList = styled.ul`
  align-self: flex-end;
  display: flex;
  margin-right: auto;
`;
export const BreadCrumbsItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-left: ${(p) => p.theme.space[2]}px;
`;
export const BreadCrumbsLink = styled(NavLink)`
  padding: ${(p) => p.theme.space[3]}px ${(p) => p.theme.space[2]}px;
  font-weight: ${(p) => p.theme.fontWeights.bold};

  @media screen and (max-width: 500px) {
    font-size: 3vw;
  }
`;

export const List = styled(motion.ul)`
  display: flex;
  justify-content: center;
  margin-top: ${(p) => p.theme.space[2]}px;
  margin-bottom: ${(p) => p.theme.space[3]}px;
`;

export const ListItem = styled.li``;

export const NavListItemLink = styled(NavLink)`
  display: block;
  font-weight: ${(p) => p.theme.fontWeights.bold};
  padding: ${(p) => p.theme.space[3]}px ${(p) => p.theme.space[3]}px;
  &.active {
    ${(p) => p.theme.components.activeNavLink}
  }
`;

export default BreadCrumb;
