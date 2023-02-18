import ToggleThemeButton from "Components/ToggleThemeButton/ToggleThemeButton";
import { useAuth } from "hooks";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "redux/auth/operations";
import { AppDispatch } from "redux/store";
import styled from "styled-components";

const Sidebar = (theme: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();

  return (
    <Header as="header">
      <Nav>
        <List>
          <ListItem>
            <NavListItemLink to="" end>
              Home
            </NavListItemLink>
          </ListItem>
          <ListItem>
            <NavListItemLink to="testing">Tests</NavListItemLink>
          </ListItem>
          <ListItem>
            <NavListItemLink to="guide">Guide</NavListItemLink>
          </ListItem>
          <ListItem>
            <NavListItemLink to="classes">Classes</NavListItemLink>
          </ListItem>
          <ListItem>
            <NavListItemLink to="classes">Classes</NavListItemLink>
          </ListItem>
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
        <ToggleThemeButton />
      </UserBox>
      <NavButton onClick={() => dispatch(logOut())}>Logout</NavButton>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  align-items: baseline;
  width: 100%;
  border-radius: 0 0 5px 5px;
  background-color: ${(p) => p.theme.colors.headerBgColor};
  padding: ${(p) => p.theme.space[3]}px;
`;

const Nav = styled.nav`
  ${(p) => p.theme.flexCentered}
  margin-top: ${(p) => p.theme.space[3]}px;
`;

const List = styled.ul`
  ${(p) => p.theme.flexCentered}
`;

const ListItem = styled.li`
  :not(:first-child) {
    margin-left: ${(p) => p.theme.space[3]}px;
  }
`;

export const NavListItemLink = styled(NavLink)`
  padding: ${(p) => p.theme.space[3]}px ${(p) => p.theme.space[3]}px;
  &.active {
    ${(p) => p.theme.components.activeNavLink}
  }
  /* :hover:not(.active),
  :focus-visible:not(.active) { 
  } */
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

const NavButton = styled.button`
  ${(p) => p.theme.components.buttons.mainButton}
  margin-left: ${(p) => p.theme.space[3]}px;
`;

export default Sidebar;
