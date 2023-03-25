import { FC, useEffect, useState } from "react";
import Loader from "Components/ui/Loader";
import { useAuth } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AppDispatch } from "redux/store";
import { toast } from "react-toastify";
import UserModal from "../ui/Modals/UserModal";
import { AiFillTool } from "react-icons/ai";
import styled from "styled-components";
import { selectTheme } from "redux/theme/selectors";
import { selectIsLoading, selectUsers } from "redux/admin/selectors";
import { fetchUsers } from "redux/admin/operations";
import { getDate } from "helpers/getDate";

const AdminUserControllBox: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [status, setStatus] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState(null);
  const isLoading = useSelector(selectIsLoading);
  const users = useSelector(selectUsers);
  const { user } = useAuth();

  const { theme }: any = useSelector(selectTheme);

  useEffect(() => {
    if (!isLoading.users && users?.length === 0 && status) {
      toast.error("Даних за цим запитом не знайдено", {
        autoClose: 3000,
      });
      setStatus(false);
    }
  }, [status, users, isLoading]);

  const handleUsers = () => {
    if (user.role === "admin" && user.hasAccess) {
      dispatch(fetchUsers());
      setStatus(true);
    }
  };

  const toggleModal = (id: string) => {
    setUserInfo(users.filter((user: any) => user._id === id));
    setShowModal(!showModal);
  };

  return (
    <>
      <Box>
        <HeaderBox>
          <p>Користувачи</p>
          <Button
            onClick={handleUsers}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Пошук
          </Button>
        </HeaderBox>
        {!isLoading.users ? (
          <>
            {status && (
              <StatisticList>
                <StatisticListItem>
                  <FirstText>Ім'я</FirstText>
                  <FirstText>Пошта</FirstText>
                  <ListText>Дата реєстрації</ListText>
                </StatisticListItem>
                {users?.map(({ _id, fullname, email, createdAt }: any) => (
                  <StatisticListItem key={_id}>
                    <FirstText>{fullname}</FirstText>
                    <FirstText>{email}</FirstText>
                    <ListText>{getDate(createdAt)}</ListText>
                    <InfoButton
                      onClick={() => toggleModal(_id)}
                      whileHover={{
                        scale: 1.05,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AiFillTool
                        size={25}
                        color={theme === "light" ? "black" : "white"}
                      />
                    </InfoButton>
                  </StatisticListItem>
                ))}
              </StatisticList>
            )}
          </>
        ) : (
          <Loader height="100px" />
        )}
      </Box>
      {showModal && <UserModal toggleModal={toggleModal} user={userInfo} />}
    </>
  );
};

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 100%;
  max-width: 800px;
  max-height: 700px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${(p) => p.theme.space[4]}px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
`;
const Button = styled(motion.button)`
  margin-left: ${(p) => p.theme.space[3]}px;
  ${(p) => p.theme.components.buttons.secondaryButton}
`;
const InfoButton = styled(motion.button)`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const StatisticList = styled.ul`
  margin-top: ${(p) => p.theme.space[3]}px;
`;

const StatisticListItem = styled.li`
  text-align: center;
  :not(:first-child) {
    border: 1px solid #9090c296;
  }
  border-radius: 5px;
  @media screen and (min-width: 550px) {
    flex: 1;
    display: flex;
    align-items: center;
  }
  :not(:first-child) {
    margin-top: ${(p) => p.theme.space[2]}px;
  }
`;

const ListText = styled.p`
  flex: 1;
  margin-left: ${(p) => p.theme.space[3]}px;
  text-align: center;
  font-size: ${(p) => p.theme.fontSizes[2]}px;
  line-height: ${(p) => p.theme.lineHeights.body};
`;

const FirstText = styled.p`
  flex: 1;
  margin-left: ${(p) => p.theme.space[3]}px;
  text-align: center;
  font-size: ${(p) => p.theme.fontSizes[2]}px;
  line-height: ${(p) => p.theme.lineHeights.body};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  :hover {
    white-space: normal;
    overflow: visible;
  }
`;

export default AdminUserControllBox;
