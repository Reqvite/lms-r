import { useAuth } from "hooks";
import { useDispatch } from "react-redux";
import { fetchUsers } from "redux/admin/operations";
import { AppDispatch } from "redux/store";
import styled from "styled-components";

const AdminUserControllBox = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();

  const submit = (e: any) => {
    e.preventDefault();

    if (user.role === "admin" && user.hasAccess) {
      dispatch(fetchUsers());
    }
  };

  return (
    <Box>
      <button onClick={submit}>submit</button>
    </Box>
  );
};

export default AdminUserControllBox;

const Box = styled.div`
  width: 100%;
  max-width: 800px;
  max-height: 700px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${(p) => p.theme.space[4]}px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
  margin-top: ${(p) => p.theme.space[3]}px;
  margin-right: auto;
  margin-left: auto;
`;
