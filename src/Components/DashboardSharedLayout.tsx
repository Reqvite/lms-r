import { FC, useEffect, useState } from "react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "Components/Header";
import Loader from "Components/ui/Loader";
import styled from "styled-components";
import Main from "Components/Main";
import Footer from "Components/Footer";
import MobileMenu from "Components/ui/MobileMenu";
import { useWindowSize } from "hooks";

const DashboardSharedLayout: FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width <= 835) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [windowSize]);

  return (
    <>
      <Container>
        {windowSize.width <= 835 ? <MobileMenu /> : <Header />}
        <Main showMenu={showMenu}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Main>
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

export default DashboardSharedLayout;
