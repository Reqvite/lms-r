import { FC } from "react";
import Loader from "Components/Loader";
import { useAuth } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "redux/admin/operations";
import { selectIsLoading, selectUsers } from "redux/admin/selectors";
import { AppDispatch } from "redux/store";
import {
  Button,
  FirstText,
  HeaderBox,
  ListText,
  StatisticList,
  StatisticListItem,
} from "Components/GlobalStyle/Box.styled";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserModal from "./Modal/UserModal";
import { AiFillTool } from "react-icons/ai";
import { selectTheme } from "redux/theme/selectors";
import { getDate } from "helpers/helpers";
import { motion } from "framer-motion";

const AdminUserControllBox: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [status, setStatus] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const isLoading = useSelector(selectIsLoading);
  const users = useSelector(selectUsers);
  const { user } = useAuth();

  const { theme }: any = useSelector(selectTheme);

  useEffect(() => {
    if (!isLoading && users?.length === 0 && status) {
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

const InfoButton = styled(motion.button)`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export default AdminUserControllBox;
