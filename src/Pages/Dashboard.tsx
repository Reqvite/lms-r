import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "Components/Header/Header";
import Loader from "Components/Loader/Loader";
import styled from "styled-components";
import MainBox from "Components/MainBox/MainBox";
import Footer from "Components/Footer/Footer";

const Dashboard = () => {
  return (
    <>
      <Container>
        <Header />
        <MainBox>
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
