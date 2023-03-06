import { stack as Menu } from "react-burger-menu";
import { FC, useState } from "react";
import { useAuth } from "hooks";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import ToggleThemeButton from "Components/Buttons/ToggleThemeButton";
import { selectTheme } from "redux/theme/selectors";
import { darkMenu, lightMenu } from "theme/theme";
import LogoutButton from "./Buttons/LogoutButton";

const MobileMenu: FC = () => {
  const { user } = useAuth();
  const { theme }: any = useSelector(selectTheme);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigation = [
    { id: 1, title: "Домашня сторінка", path: "" },
    { id: 2, title: "Курси", path: "courses" },
    { id: 3, title: "Панель Адміністратора", path: "admin-panel" },
  ];

  const isMenuOpen = ({ isOpen }: { isOpen: boolean }) => {
    setIsOpen(isOpen);
  };

  return (
    <HeaderBox as="header" style={{ height: isOpen ? "100vh" : "60px" }}>
      <Menu
        styles={theme === "light" ? lightMenu : darkMenu}
        right
        onStateChange={isMenuOpen}
      >
        <Nav>
          <UserBox>
            <Img
              src="https://freepngimg.com/thumb/google/66726-customer-account-google-service-button-search-logo.png"
              alt="User"
              width="50"
              height="50"
            />
            <UserName>{user.name}</UserName>
          </UserBox>
          <Box>
            <ToggleThemeButton />
            <LogoutButton />
          </Box>
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
      </Menu>
    </HeaderBox>
  );
};

const HeaderBox = styled.header`
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  background-color: ${(p) => p.theme.colors.headerBgColor};
  backdrop-filter: blur(3px);
`;

const Nav = styled.nav`
  display: flex;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(p) => p.theme.space[2]}px;
`;

const List = styled.ul`
  margin-top: ${(p) => p.theme.space[2]}px;
`;
const ListItem = styled(motion.li)``;

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

export default MobileMenu;
