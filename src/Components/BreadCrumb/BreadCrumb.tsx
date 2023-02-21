import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const BreadCrumb = () => {
  const { pathname } = useLocation();

  const crumbs = pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => crumb.charAt(0).toUpperCase() + crumb.slice(1));

  return (
    <div>
      {crumbs.map((crumb, index) => {
        const link = `/${crumbs.slice(0, index + 1).join("/")}`;
        return (
          <span key={link}>
            <NavListItemLink to={link.toLowerCase()}>{crumb}</NavListItemLink>
            {index < crumbs.length - 1 && " > "}
          </span>
        );
      })}
      <List>
        <li>
          <NavListItemLink to="testing">Тести</NavListItemLink>
        </li>
        <li>
          <NavListItemLink to="guide">Конспект</NavListItemLink>
        </li>
      </List>
    </div>
  );
};

export const NavListItemLink = styled(NavLink)`
  font-weight: ${(p) => p.theme.fontWeights.bold};
  padding: ${(p) => p.theme.space[3]}px ${(p) => p.theme.space[3]}px;
  &.active {
    ${(p) => p.theme.components.activeNavLink}
  }
`;

export const List = styled.ul`
  display: flex;
  margin-top: ${(p) => p.theme.space[5]}px;
`;

export default BreadCrumb;
