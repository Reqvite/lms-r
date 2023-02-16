import { useAuth } from "hooks";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "redux/auth/operations";
import { AppDispatch } from "redux/store";
import styled from "styled-components";

const Sidebar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();

  return (
    <Box>
      <div>
        <Img
          src="https://freepngimg.com/thumb/google/66726-customer-account-google-service-button-search-logo.png"
          alt="User"
          width="150"
          height="150"
        />
        <UserName>{user.name}</UserName>
      </div>
      <Nav>
        <List>
          <ListItem>
            <NavLink to="/">Home</NavLink>
          </ListItem>
          <ListItem>
            <NavLink to="testing">Tests</NavLink>
          </ListItem>
          <ListItem>
            <NavLink to="guide">Guide</NavLink>
          </ListItem>
          <ListItem>
            <NavLink to="classes">Classes</NavLink>
          </ListItem>
          <ListItem>
            <NavLink to="classes">Classes</NavLink>
          </ListItem>
          <ListItem>
            <NavButton onClick={() => dispatch(logOut())}>Logout</NavButton>
          </ListItem>
        </List>
      </Nav>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 350px;
  border-radius: 20px;
  background-color: rgba(214, 214, 214, 0.44);
  padding: ${(p) => p.theme.space[4]}px ${(p) => p.theme.space[3]}px;
`;

const Img = styled.img`
  width: 100px;
  border-radius: 20px;
`;

const UserName = styled.p`
  margin-top: ${(p) => p.theme.space[3]}px;
`;
const Nav = styled.nav`
  ${(p) => p.theme.flexCentered}
  margin-top: ${(p) => p.theme.space[3]}px;
`;

const List = styled.ul`
  ${(p) => p.theme.flexCentered}
  flex-direction: column;
`;

const ListItem = styled.li`
  :not(:first-child) {
    margin-top: ${(p) => p.theme.space[3]}px;
  }
`;

const NavButton = styled.button`
  ${(p) => p.theme.buttons.mainButton}
`;

export default Sidebar;
