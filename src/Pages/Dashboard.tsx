import { FC, useEffect, useState } from "react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "Components/Header/Header";
import Loader from "Components/Loader/Loader";
import styled from "styled-components";
import MainBox from "Components/MainBox/MainBox";
import Footer from "Components/Footer/Footer";
import MobileMenu from "Components/MobileMenu/MobileMenu";

const Dashboard: FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 835) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [showMenu]);

  return (
    <>
      <Container>
        {showMenu ? <MobileMenu /> : <Header />}
        <MainBox showMenu={showMenu}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </MainBox>
        <Footer />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100vh;
`;

export default Dashboard;
