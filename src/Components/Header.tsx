import { FC } from "react";
import { useAuth } from "hooks";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import ToggleThemeButton from "Components/ui/Buttons/ToggleThemeButton";
import LogoutButton from "./ui/Buttons/LogoutButton";
import { nanoid } from "@reduxjs/toolkit";

const navigation = [
  { id: 1, title: "Домашня сторінка", path: "" },
  { id: 2, title: "Курси", path: "courses" },
  { id: 3, title: "Панель Адміністратора", path: "admin-panel" },
];

const Header: FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  return location.pathname.length >= 20 &&
    location.pathname.includes("courses") ? null : (
    <HeaderBox as="header">
      <Nav>
        <List>
          {navigation.map(({ id, title, path }) =>
            id === 3 && user.role !== "admin" && !user.hasAccess ? null : (
              <ListItem
                key={nanoid()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavListItemLink to={path} end>
                  {title}
                </NavListItemLink>
              </ListItem>
            )
          )}
        </List>
      </Nav>
      <UserBox>
        <Img
          src="https://freepngimg.com/thumb/google/66726-customer-account-google-service-button-search-logo.png"
          alt="User"
          width="50"
          height="50"
        />
        <UserName>{user.name}</UserName>
      </UserBox>
      <ToggleThemeButton />
      <LogoutButton />
    </HeaderBox>
  );
};

const HeaderBox = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 93px;
  border-radius: 0 0 5px 5px;
  background-color: ${(p) => p.theme.colors.headerBgColor};
  backdrop-filter: blur(5px);
  padding: ${(p) => p.theme.space[3]}px;
`;

const Nav = styled.nav`
  ${(p) => p.theme.flexCentered}
`;

const List = styled.ul`
  ${(p) => p.theme.flexCentered}
`;

const ListItem = styled(motion.li)`
  :not(:first-child) {
    margin-left: ${(p) => p.theme.space[3]}px;
  }
  :last-child {
    margin-right: ${(p) => p.theme.space[5]}px;
  }
`;

export const NavListItemLink = styled(NavLink)`
  display: block;
  padding: ${(p) => p.theme.space[3]}px ${(p) => p.theme.space[3]}px;
  font-weight: ${(p) => p.theme.fontWeights.bold};
  &.active {
    ${(p) => p.theme.components.activeNavLink}
  }
  white-space: nowrap;
`;

const UserBox = styled.div`
  ${(p) => p.theme.flexCentered}
  flex-direction: column;
  margin-left: auto;
`;

const Img = styled.img`
  border-radius: 20px;
  align-self: center;
`;

const UserName = styled.p`
  text-align: center;
  margin-top: ${(p) => p.theme.space[2]}px;
`;

export default Header;
