import { FC } from "react";
import { useAuth } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { logOut } from "redux/auth/operations";
import { AppDispatch } from "redux/store";
import { motion } from "framer-motion";
import { IoIosLogOut } from "react-icons/io";
import { selectTheme } from "redux/theme/selectors";
import styled from "styled-components";
import ToggleThemeButton from "Components/ToggleThemeButton/ToggleThemeButton";

const Header: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();
  const { theme }: any = useSelector(selectTheme);

  const location = useLocation();
  const navigation = [
    { id: 1, title: "Домашня сторінка", path: "" },
    { id: 2, title: "Курси", path: "courses" },
    { id: 3, title: "Панель Адміністратора", path: "admin-panel" },
  ];

  return location.pathname.length >= 20 &&
    location.pathname.includes("courses") ? null : (
    <HeaderBox as="header">
      <Nav>
        <List>
          {navigation.map(({ id, title, path }) =>
            id === 3 && user.role !== "admin" && !user.hasAccess ? null : (
              <ListItem
                key={id}
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
      <LogoutButton
        onClick={() => dispatch(logOut())}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
      >
        <IoIosLogOut size={30} color={theme === "light" ? "black" : "white"} />
      </LogoutButton>
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
`;

export const NavListItemLink = styled(NavLink)`
  display: block;
  padding: ${(p) => p.theme.space[3]}px ${(p) => p.theme.space[3]}px;
  font-weight: ${(p) => p.theme.fontWeights.bold};
  &.active {
    ${(p) => p.theme.components.activeNavLink}
  }
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

const LogoutButton = styled(motion.button)`
  ${(p) => p.theme.components.buttons.iconButton}
  margin-left: ${(p) => p.theme.space[3]}px;
`;

export default Header;
