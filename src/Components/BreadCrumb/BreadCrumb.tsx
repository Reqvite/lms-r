import { motion } from "framer-motion";
import { FC } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const BreadCrumb: FC = () => {
  const { pathname } = useLocation();

  const crumbs: string[] = pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => crumb.charAt(0).toUpperCase() + crumb.slice(1));

  return (
    <Box>
      <BreadCrumbsList>
        {crumbs.map((crumb, index) => {
          const link = `/${crumbs.slice(0, index + 1).join("/")}`;
          return (
            <BreadCrumbsItem
              key={link}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BreadCrumbsLink to={link.toLowerCase()}>{crumb}</BreadCrumbsLink>
              {index < crumbs.length - 1 && <AiOutlineRight />}
            </BreadCrumbsItem>
          );
        })}
      </BreadCrumbsList>
      <List>
        <ListItem>
          <NavListItemLink to="guide">Конспект</NavListItemLink>
        </ListItem>
        <ListItem>
          <NavListItemLink to="testing">Тести</NavListItemLink>
        </ListItem>
      </List>
    </Box>
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

export const List = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: ${(p) => p.theme.space[2]}px;
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
